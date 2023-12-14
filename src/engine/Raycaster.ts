import { Vector2, Raycaster as ThreeRaycaster, Object3D } from 'three';
import { Engine } from './Engine';
import { BaseEntity } from './entities/BaseEntity';

export class Raycaster extends BaseEntity implements IBaseEntityClass {
  private raycaster: THREE.Raycaster;
  private pointer: Vector2;

  constructor(private engine: Engine,) {
    super();
    this.raycaster = new ThreeRaycaster();
    this.pointer = new Vector2();
  }
  destroy(): void {
    document.removeEventListener('click', this.updateRayCaster.bind(this));
  }

  init() {
    document.addEventListener('click', this.updateRayCaster.bind(this));
  }
  updateRayCaster(event: MouseEvent) {
    const { camera, renderer } = this.engine.getEngineContext();
    const mouse = this.pointer;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(mouse, camera);
    const intersects = this.getIntersects();
    this.engine.threeControls.onIntersection(intersects)
  }
  getIntersects(): THREE.Intersection[] {
    const objects: Object3D[] = [];
    this.engine.entities.forEach((entity) => {
      if (entity.isRaycastable && entity.object) {
        objects.push(entity.object);
        // entity.helper && objects.push(entity.helper);
      }
    });
    return this.raycaster.intersectObjects(objects);
  }
}
