import { DirectionalLight, DirectionalLightHelper, Vector3 } from 'three';
import { AbstractLight } from './AbsctractLight';

export class ThreeDirectionalLight extends AbstractLight {
  constructor(params: ILightObjectParams) {
    super(params);
    this.type = 'directional';
    const [light, helper] = this.createLight();
    this.object.add(light);
    this.helper = helper;
    this.object.castShadow = true;
  }
  createLight(): [ObjectType, HelperType] {
    const {
      params: { light },
    } = this;
    const lightObject = new DirectionalLight(light?.color || 0xffffff, light?.intensity || 1);
    lightObject.lookAt(new Vector3(0, 0, 0));
    const lightHelper = new DirectionalLightHelper(lightObject, 1);
    return [lightObject, lightHelper];
  }
  update(delta: number): void {
    // this.object.updateMatrixWorld();
    // this.helper && this.helper.position.setFromMatrixPosition(this.object.matrixWorld);
    // this.helper && this.helper.updateMatrix();
    // this.helper && this.helper.update();
  }
}
