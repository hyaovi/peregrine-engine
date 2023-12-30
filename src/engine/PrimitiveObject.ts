import { Mesh, Vector3, DoubleSide, BoxGeometry, MeshStandardMaterial, BoxHelper } from 'three';
import { ObjectEntity } from './Object';
import { ThreeMaterial } from './ThreeMaterial';
import { ThreeBaseGeometry } from './objects/primitives/Geometry';
import { Engine } from './Engine';

export const defaultGeometryMeshParams: IGeometryObjectParams = {
  geometry: {
    type: 'box',
    color: '0xcvffdd',
    height: 1,
    width: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    radius: 1,
    radialSegments: 1,
  },
  material: {
    type: 'standard',
    color: 'orange',
    side: DoubleSide,
  },
  // texture: {
  //   type: 'image',
  //   url: 'https://365508.selcdn.ru/u_test/74/page_8553.__preview__.jpg?_=1701864100658',
  // },
  position: new Vector3(0, 0, 0),
  scale: new Vector3(1, 1, 1),
  rotation: new Vector3(1, 1, 1),
  name: 'geometry',
  type: 'box',
};

export class ThreePrimitiveObject extends ObjectEntity {
  public material!: ThreeMaterial;
  public geometry!: ThreeBaseGeometry;
  public params: IGeometryObjectParams;
  constructor(params: IGeometryObjectParams = defaultGeometryMeshParams) {
    super();
    // fill undefined with default params;
    this.params = { ...defaultGeometryMeshParams, ...params };
    this.engineContext = Engine.getEngineContext();

    this.geometry = this.makeGeometry();
    this.material = this.makeMaterial();
    const mesh = this.makeMesh();
    // const helper = this.makeHelper();
    // this.helper = helper;
    this.object.add(mesh);
    this.isRaycastable = true;
    this.params.position && this.setPosition(this.params.position);
    this.params.rotation && this.setRotation(this.params.rotation);
    this.params.scale && this.setScale(this.params.scale);
    this.helper && this.helper.update();
  }
  makeMesh() {
    return new Mesh(this.geometry.getGeometry(), this.material.getMaterial());
  }
  makeHelper(mesh = this.object): BoxHelper {
    return new BoxHelper(mesh, 0xffcc00);
  }
  makeMaterial() {
    const { material: materialParams, texture: textureParams } = this.params;
    const material = new ThreeMaterial(materialParams, textureParams);
    return material;
  }
  makeGeometry() {
    const { ...params } = this.params.geometry;
    return new ThreeBaseGeometry(params);
  }
  async ready() {
    if (this.material.texture) {
      await this.material.texture.ready();
    }
    return true;
  }
}
