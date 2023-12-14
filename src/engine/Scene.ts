import { Scene, Color } from 'three';
import { BaseEntity } from './entities/BaseEntity';

export class EngineScene extends BaseEntity implements IBaseEntityClass {
  public instance: Scene;
  private sceneParams: IsceneParams;
  constructor(public getEngineContext: () => IEngineContext, sceneParams: IsceneParams) {
    super();
    this.sceneParams = sceneParams;
    const scene = new Scene();
    this.instance = scene;
    this.init();
  }
  init(): void {
    this.instance.background = new Color(this.sceneParams.backgroundColor);
  }
}
