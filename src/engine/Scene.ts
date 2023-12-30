import { Scene, Color } from 'three';
import { BaseObject } from './objects/BaseObject';

export class EngineScene extends BaseObject implements IBaseObjectClass {
  public instance: Scene;
  private sceneParams: ISceneParams;
  constructor(public getEngineContext: () => IEngineContext, sceneParams: ISceneParams) {
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
