import { Engine } from './Engine';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import {} from 'three';
import { ObjectEntity } from './Object';

export class ThreeControls extends ObjectEntity implements IObjectEntityClass {
  public orbit: OrbitControls;
  public transform: TransformControls;
  private engine: Engine;
  private unsubscribe!: Function;
  constructor(engine: Engine) {
    const name = 'threeControls';
    super();
    this.isRaycastable = false;
    this.engine = engine;
    this.orbit = new OrbitControls(
      this.engine.camera.instance,
      this.engine.renderer.instance.domElement,
    );
    this.orbit.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.orbit.dampingFactor = 0.25;
    this.orbit.screenSpacePanning = false;
    // this.orbit.maxPolarAngle = Math.PI / 2;

    // transforms
    this.transform = new TransformControls(
      this.engine.camera.instance,
      this.engine.renderer.instance.domElement,
    );
    this.transform.addEventListener('dragging-changed', (event) => {
      this.orbit.enabled = !event.value;
      this.engine.renderer.requestRender();
    });
    this.transform.addEventListener('change', () => this.engine.renderer.requestRender());
    this.orbit.addEventListener('change', () => this.engine.renderer.requestRender());
  }
  init(): void {
    // this.engine.addEntity(this);
    this.engine.threeScene.add(this.transform);
    // this.transform.attach(this.engine.entities.filter(e=>e.isRaycastable)[0].object as Object3D)

    this.listenTokeyDown();
    // this.unsubscribe = this.engine.eventManager.on(EVENT_NAMES.raycaster.intersect, onIntersection);
  }
  onIntersection (intersects: THREE.Intersection[]) {
    if (intersects.length) {
      const object = intersects[0].object;
      console.log('[threeControls] selecting :', object);
      this.transform.attach(object);
    }
  };
  public destroy(): void {
    // if (this.unsubscribe) this.unsubscribe();
  }
  // update() {
  //   this.orbit.update();
  // }
  listenTokeyDown() {
    window.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 87: // W
          this.transform.setMode('translate');
          break;

        case 69: // E
          this.transform.setMode('rotate');
          break;

        case 82: // R
          this.transform.setMode('scale');
          break;
      }
    });
  }
}
