import { PerspectiveCamera } from 'three';
import { BaseObject } from './objects/BaseObject';

export class EngineCamera extends BaseObject {
  public instance: PerspectiveCamera;
  constructor(public getEngineContext: () => IEngineContext) {
    super();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    camera.position.y = 5;
    this.instance = camera;
  }
  init(): void {
    this.updateCamera();
  }
  updateCamera() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }
}
