import { ObjectEntity } from '../../Object';

const defaultLightParams: ILightObjectParams = {
  type: 'ambient',
  name: 'light',
  light: {
    intensity: 1,
    color: '0xffffff',
    distance: 0,
    angle: Math.PI / 3,
    penumbra: 0,
  },
  position: { x: 5, y: 10, z: 7 },
  scale: { x: 1, y: 1, z: 1 },
  rotation: { x: 0, y: 0, z: 0 },
};

export class AbstractLight extends ObjectEntity {
  public type: LightType;
  public params: ILightObjectParams;
  constructor(params: ILightObjectParams = defaultLightParams) {
    super();
    this.type = 'ambient';
    this.params = { ...defaultLightParams, ...params };
    if (params.name) this.name = params.name;
  }
  protected createLight() {}
}
