import { AmbientLight } from "three";
import { AbstractLight } from "./AbsctractLight";

export class ThreeAmbienLight extends AbstractLight {
  constructor(params: ILightObjectParams) {
    super(params);
    this.type = 'ambient';
    this.createLight();
    this.object.castShadow = true;
  }
  createLight() {
    const {
      params: { light },
    } = this;
    this.object.add(new AmbientLight(light?.color || 0xffffff, light?.intensity || 1));
  }
}