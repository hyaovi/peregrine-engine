type GeometryType = 'box' | 'sphere' | 'cone' | 'plane';
type LightType = 'ambient' | 'directional' | 'point' | 'spot';

interface IrendererParams {
  antialias: true | false;
  pixelRatio: number;
}
interface IsceneParams {
  backgroundColor: THREE.Color | string;
}
interface IengineParamsType {
  scene: IsceneParams;
  renderer: IrendererParams;
  useDevicePixelRatio: boolean;
  isEditorMode: boolean;
  useControls:boolean,
  useRaycaster:boolean
}
interface IEngineContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  requestRender:Function
};
interface IGeometry {
  // type: GeometryType;
  color?: string;
  height?: number;
  width?: number;
  depth?: number;
  widthSegments?: number;
  heightSegments?: number;
  radius?: number;
  radialSegments?: number;
}
interface IMaterialParams {
  color?: string;
  side?: typeof THREE.DoubleSide;
}
interface ICoordinate3d {
  x: number;
  y: number;
  z: number;
}

interface IObjectLoaderParams {
  position?: THREE.Vector3 | ICoordinate3d;
  rotation?: THREE.Vector3 | ICoordinate3d;
  scale?: THREE.Vector3 | ICoordinate3d;
  name: string;
  type: GeometryType | LightType;
}
interface IGeometryObjectParams extends IObjectLoaderParams {
  geometry: IGeometry;
  material: IMaterialParams;
  type: GeometryType;
  texture?:ITextureOption
}
interface ITextureOption {
  type:'image'|'video';
  url:string;
  wrapS: typeof THREE.RepeatWrapping;
  wrapT: typeof THREE.RepeatWrapping;
  magFilter: typeof THREE.LinearFilter;
  minFilter: typeof THREE.LinearFilter;
  anisotropy:number
}


interface ILightObjectparams extends IObjectLoaderParams {
  light: {
    color?: string;
    intensity?: number;
    distance?: number;
    angle?: number;
    penumbra?: number;
  };
}
interface IObjectParams {
  type: 'Geometry' | 'Light';
  name?: string;
  params: IGeometryObjectParams | ILightObjectparams;
}

interface IBaseEntityClass {
  init(engineContext: IEngineContext): void;
  start(engineContext: IEngineContext): void;
  stop(engineContext: IEngineContext): void;
  resize(engineContext: IEngineContext): void;
  update(delta: number, engineContext: IEngineContext): void;
  destroy(engineContext?: IEngineContext): void;
}
type ObjectType =
  | THREE.Object3D<THREE.Object3DEventMap>
  | THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[],
      THREE.Object3DEventMap
    >;
interface IObjectEntityClass extends IBaseEntityClass {
  object: ObjectType;
  helper?: ObjectType;
  isRaycastable?: boolean;
  position?: ICoordinate3d;
  rotation?: ICoordinate3d;
  scale?: ICoordinate3d;
  name?: string;
}
type HelperType = THREE.DirectionalLightHelper | THREE.SpotLightHelper | THREE.PointLightHelper