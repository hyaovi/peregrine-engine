// import * as THREE from 'three';

import { EngineRenderer } from './EngineRenderer';
import { ThreeControls } from './ThreeControls';
import { Grid } from './entities/Grid';
import { Signals } from './Signals';
import { EngineCamera } from './Camera';
import { EngineScene } from './Scene';
import { Raycaster } from './Raycaster';
import { Color } from 'three';

export const defaultEngineParams: IengineParamsType = {
  scene: {
    backgroundColor: new Color('#ccc'),
  },
  renderer: {
    pixelRatio: 1.5,
    antialias: true,
  },
  useDevicePixelRatio: false,
  isEditorMode: true,
  useControls: true,
  useRaycaster: true,
};

export class Engine {
  public readonly scene: EngineScene;
  public readonly camera: EngineCamera;
  public readonly renderer: EngineRenderer;
  public entities: IObjectEntityClass[];
  private params: IengineParamsType;
  public threeControls!: ThreeControls;
  public eventManager: Signals;
  public raycaster!: Raycaster;
  public isloading: boolean = false;
  public isReady: boolean = false;

  constructor(params: IengineParamsType = defaultEngineParams) {
    this.params = params;
    this.isReady = false;
    this.isloading = true;
    this.scene = new EngineScene(this.getEngineContext, params.scene);
    this.camera = new EngineCamera(this.getEngineContext);
    this.renderer = new EngineRenderer(params.renderer);
    if (params.useControls) {
      this.threeControls = new ThreeControls(this);
    }
    this.eventManager = new Signals(this);
    if (params.useRaycaster) {
      this.raycaster = new Raycaster(this);
    }
    this.entities = [];
  }

  init() {
    this.renderer.init(this.engineContext);
    this.initObjects();
    window.addEventListener('resize', () => this.onWindowResize());
    this.eventManager.init();
    this.isloading = false;
    this.isReady = true;
    this.raycaster.init();
    this.threeControls.init();
    this.start();
  }
  start() {
    this.addGrid();
    this.startObjects();
    this.loop()
  }
  public getEngineContext(): IEngineContext {
    return this.engineContext;
  }
  private addGrid(): void {
    if (this.params.isEditorMode) {
      this.addEntity(new Grid());
    }
  }

  addEntity(entity: IObjectEntityClass): void {
    if (!this.isReady) throw new Error('Engine is not ready');
    console.log('@@@ add entity')
    this.entities.push(entity);
    this.scene.instance.add(entity.object);
    entity.helper && this.scene.instance.add(entity.helper);
    this.renderer.requestRender();
  }
  private updateObjects(delta: number): void {
    if (!this.isReady) throw new Error('Engine is not ready');
    this.entities.forEach(
      (entity: IObjectEntityClass) => entity.update && entity.update(delta, this.engineContext),
    );
  }
  resizeObjects() {
    if (!this.isReady) throw new Error('Engine is not ready');
    this.entities.forEach(
      (entity: IObjectEntityClass) => entity.resize && entity.resize(this.engineContext),
    );
  }
  initObjects() {
    this.entities.forEach(
      (entity: IObjectEntityClass) => entity.init && entity.init(this.engineContext),
    );
  }
  startObjects() {
    this.entities.forEach(
      (entity: IObjectEntityClass) => entity.start && entity.start(this.engineContext),
    );
  }
  update(delta: number) {
    if (!this.isReady) throw new Error('Engine is not ready');
    this.updateObjects(delta);
  }
  onWindowResize() {
    if (!this.isReady) throw new Error('Engine is not ready');
    const { camera, renderer } = this.getEngineContext();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.resizeObjects();
    this.renderer.requestRender();
  }
  getEntityByName(name: string) {
    return this.entities.find((entity) => entity.name === name);
  }
  requestRenderer() {
    this.renderer.requestRender();
  }
  private loop(): void {
    requestAnimationFrame(() => this.loop());
    const delta = this.renderer.getDelta();
    this.updateObjects(delta);
    this.renderer.update(delta, this.engineContext);
  }

  // getters
  get engineContext() {
    return {
      camera: this.threeCamera,
      scene: this.threeScene,
      renderer: this.threeRenderer,
      requestRender: this.requestRenderer,
    };
  }
  get threeCamera() {
    return this.camera.instance;
  }
  get threeScene() {
    return this.scene.instance;
  }
  get threeRenderer() {
    return this.renderer.instance;
  }
  get isEditorMode() {
    return this.params.isEditorMode;
  }
  get canvas() {
    return this.threeRenderer.domElement;
  }
}
