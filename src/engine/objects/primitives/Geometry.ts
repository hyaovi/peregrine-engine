import {
  BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  BufferGeometry,
  PlaneGeometry,
  DoubleSide,
  Vector3,
} from 'three';

export const defaultGeometryMeshParams: IGeometryObjectParams = {
  geometry: {
    type: 'box',
    color: 'gold',
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
    color: 'gold',
    side: DoubleSide,
  },
  position: new Vector3(0, 0, 0),
  scale: new Vector3(1, 1, 1),
  rotation: new Vector3(1, 1, 1),
  name: 'geometry',
  type: 'box',
};

// export class Geometry extends ObjectEntity {
//   public material: MeshStandardMaterial | MeshBasicMaterial;
//   public geometry: BufferGeometry;
//   public params: IGeometryObjectParams;
//   public readonly isRaycastable: boolean;
//   constructor(parameters: IGeometryObjectParams = defaultGeometryMeshParams) {
//     super();
//     this.params = { ...defaultGeometryMeshParams, ...parameters };
//     this.isRaycastable = true;
//     this.material = new MeshStandardMaterial({
//       color: this.params.material.color || '#fff',
//       side: this.params.material.side || 2,
//     });
//     this.geometry = this.makeGeometry(parameters.type, parameters.geometry);
//     const object = new Mesh(this.geometry, this.material);

//     if (parameters.name) this.name = parameters.name;
//     this.object.add(object);

//     parameters.position && this.setPosition(parameters.position);
//     parameters.rotation && this.setRotation(parameters.rotation);
//     parameters.scale && this.setScale(parameters.scale);
//   }
//   makeGeometry(type: GeometryType, geometryParams: IGeometryObjectParams['geometry']) {
//     let geometry;
//     switch (type) {
//       case 'box':
//         geometry = new BoxGeometry(
//           geometryParams?.width || 1,
//           geometryParams?.height || 1,
//           geometryParams?.depth || 1,
//         );
//         break;
//       case 'sphere':
//         geometry = new SphereGeometry(
//           geometryParams?.radius || 1,
//           geometryParams?.widthSegments || 64,
//           geometryParams?.heightSegments || 64,
//         );
//         break;
//       case 'plane':
//         geometry = new PlaneGeometry(
//           geometryParams?.width || 1,
//           geometryParams?.height || 1,
//           geometryParams?.depth || 1,
//         );
//         break;

//       case 'cone':
//         geometry = new ConeGeometry(
//           geometryParams?.radius || 1,
//           geometryParams?.height || 1,
//           geometryParams?.radialSegments || 8,
//         );
//         break;

//       default:
//         throw new Error('Invalid geometry type');
//     }

//     return geometry;
//   }

//   update() {}
// }

export class ThreeBaseGeometry {
  protected geometry: BufferGeometry;
  private params: IGeometry;
  constructor(
    params: IGeometry = {
      type: 'box',
      color: 'yellow',
      height: 1,
      width: 1,
      depth: 1,
      widthSegments: 1,
      heightSegments: 1,
      radius: 1,
      radialSegments: 1,
    },
  ) {
    this.params = params;
    this.geometry = this.makeGeometry();
  }
  makeGeometry(params: IGeometry = this.params): BufferGeometry {
    const { type, ...geometryParams } = params;
    switch (type) {
      case 'box':
        return new BoxGeometry(
          geometryParams?.width || 1,
          geometryParams?.height || 1,
          geometryParams?.depth || 1,
        );
      case 'sphere':
        return new SphereGeometry(
          geometryParams?.radius || 1,
          geometryParams?.widthSegments || 64,
          geometryParams?.heightSegments || 64,
        );
      case 'plane':
        return new PlaneGeometry(
          geometryParams?.width || 1,
          geometryParams?.height || 1,
          geometryParams?.depth || 1,
        );

      case 'cone':
        return new ConeGeometry(
          geometryParams?.radius || 1,
          geometryParams?.height || 1,
          geometryParams?.radialSegments || 8,
        );

      default:
        throw new Error('Invalid geometry type');
    }
  }
  getGeometry() {
    return this.geometry;
  }
}
