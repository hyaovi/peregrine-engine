import { Clock, WebGLRenderer } from 'three';
import { BaseEntity } from './entities/BaseEntity';

export class EngineRenderer extends BaseEntity implements IBaseEntityClass {
  public instance!: WebGLRenderer;
  private clock!: Clock;
  private delta!: number;
  private params: IrendererParams;
  private renderRequested: boolean = false;

  constructor(rendererParams: IrendererParams) {
    super();
    this.params = rendererParams;
    this.clock = new Clock();
    const renderer = new WebGLRenderer({ antialias: rendererParams.antialias });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(this.params.pixelRatio);

    renderer.setSize(window.innerWidth, window.innerHeight);
    this.instance = renderer;
  }
  init(engineContext: IEngineContext): void {
    this.requestRender();
    this.render(engineContext)
  }
  render(engineContext:IEngineContext): void {
    if (!this.renderRequested) return;
    const { scene, camera, renderer } = engineContext;
    renderer.render(scene, camera);
    console.log('@@@@ renderer')
    this.renderRequested = false;
  }
  // Method to request a render
  requestRender(): void {
   setTimeout(() => {
     this.renderRequested = true;
   }, 1);
  }
  getDelta() {
    this.delta = this.clock.getDelta();
    return this.delta;
  }
  update(delta: number, engineContext: IEngineContext) {
    this.render(engineContext);
  }
}
