import { PointLight, PointLightHelper } from "three";
import { AbstractLight } from "./AbsctractLight";

export class ThreePointLight extends AbstractLight {
  constructor(params: ILightObjectParams) {
    super(params);
    this.type = 'point';
    this.createLight();
    this.object.castShadow = true;
  }
  createLight() {
    const {
      params: { light },
    } = this;
    const lightObject = new PointLight(
      light?.color || 0xffffff,
      light?.intensity || 1,
      light?.distance || 0,
    );
    this.object.add(lightObject);
    // if (this.params.position) this.setPosition(this.params.position);
    this.helper = new PointLightHelper(lightObject);
  }
}