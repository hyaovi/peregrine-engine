import { SpotLight, SpotLightHelper } from "three";
import { AbstractLight } from "./AbsctractLight";

export class ThreeSpotLight extends AbstractLight {
  constructor(params: ILightObjectParams) {
    super(params);
    this.type = 'spot';
    this.createLight();
    this.object.castShadow = true;
  }
  createLight() {
    const {
      params: { light },
    } = this;
    const lightObject = new SpotLight(
      light?.color || 0xffffff,
      light?.intensity || 1,
      light?.distance || 0,
      light?.angle || Math.PI / 3,
      light?.penumbra || 0,
    );
    this.object.add(lightObject);
    // if (this.params.position) this.setPosition(this.params.position);
    this.helper = new SpotLightHelper(lightObject);
  }
}