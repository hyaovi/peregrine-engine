import {
  Object3D,
  Object3DEventMap,
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Vector3,
  DirectionalLightHelper,
  SpotLightHelper,
  PointLightHelper,
} from 'three';
import { BaseEntity } from './entities/BaseEntity';

type ObjectType =
  | Object3D<Object3DEventMap>
  | Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>;

type HelperType = DirectionalLightHelper | SpotLightHelper | PointLightHelper;

export class ObjectEntity extends BaseEntity {
  public object: ObjectType;
  public helper?: HelperType;
  public params: {} = {};
  public isRaycastable: boolean;

  constructor() {
    super();
    this.object = new Object3D();
    this.isRaycastable = true;
  }
  setPosition(position: ICoordinate3d | Vector3) {
    this.object.position.set(position.x, position.y, position.z);
  }
  setScale(scale: ICoordinate3d | Vector3) {
    this.object.scale.set(scale.x, scale.y, scale.z);
  }
  setRotation(rotation: ICoordinate3d | Vector3) {
    this.object.rotation.set(rotation.x, rotation.y, rotation.z);
  }

  init(engineContext: IEngineContext): void {
    super.init(engineContext);
  }
  start(engineContext: IEngineContext): void {
    super.start(engineContext);
  }
  stop(engineContext: IEngineContext): void {
    super.stop(engineContext);
  }
  resize(engineContext: IEngineContext): void {
    super.resize(engineContext);
  }
  update(delta: number, engineContext: IEngineContext): void {
    super.update(delta, engineContext);
  }
  destroy(engineContext: IEngineContext): void {
    super.destroy(engineContext);
  }

  raycasterClick(): void {
    super.raycasterClick();
  }
  get name() {
    return this.object.name;
  }
  set name(name: string) {
    this.object.name = name;
  }
  public getObject(): THREE.Mesh {
    return this.object.children[0] as THREE.Mesh;
  }
}
export { BaseEntity };

