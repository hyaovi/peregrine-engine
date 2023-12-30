//
type GeometryType = 'box' | 'sphere' | 'cone' | 'plane';
type LightType = 'ambient' | 'directional' | 'point' | 'spot';
type ModelType = 'model';
type MaterialNameType = 'standard' | 'basic' | 'sprite';
type AssetType = 'image' | 'video';

type HelperType = THREE.DirectionalLightHelper | THREE.SpotLightHelper | THREE.PointLightHelper| THREE.BoxHelper;
type MaterialType = THREE.MeshStandardMaterial | THREE.MeshBasicMaterial | THREE.SpriteMaterial;
type TextureType = THREE.Texture | THREE.VideoTexture ;

interface IAssetParams {
  url: string;
  type: AssetType;
  othersParams?: {};
}

// Texture
interface ITextureBaseParams {
  wrapS?: THREE.Wrapping;
  wrapT?: THREE.Wrapping;
  magFilter?: THREE.TextureFilter;
  minFilter?: THREE.TextureFilter;
  anisotropy?: number;
}

interface ITextureParams extends ITextureBaseParams {
  asset: IAssetParams;
}

// Material
interface IMaterialBaseParams {
  color: string;
  side: THREE.Side;
  map?:TextureType
}
interface IMaterialParams extends IMaterialBaseParams {
  type: MaterialNameType;
}

// Primtive Geometry
interface IBaseGeometry {
  color?: string;
  height?: number;
  width?: number;
  depth?: number;
  widthSegments?: number;
  heightSegments?: number;
  radius?: number;
  radialSegments?: number;
}
interface IGeometry extends IBaseGeometry {
  type: GeometryType;
}

interface ICoordinate3D {
  x: number;
  y: number;
  z: number;
}

interface IObjectLoaderParams {
  position?: THREE.Vector3 | ICoordinate3D;
  rotation?: THREE.Vector3 | ICoordinate3D;
  scale?: THREE.Vector3 | ICoordinate3D;
  name?: string;
  type: GeometryType | LightType | ModelType;
}

interface IGeometryObjectParams extends IObjectLoaderParams {
  geometry: IGeometry;
  material: IMaterialParams;
  texture?: ITextureParams;
}
interface ILightObjectParams extends IObjectLoaderParams {
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
  params: IGeometryObjectParams | ILightObjectParams;
}

interface IBaseObjectClass {
  init(engineContext: IEngineContext): void;
  start(engineContext: IEngineContext): void;
  stop(engineContext: IEngineContext): void;
  resize(engineContext: IEngineContext): void;
  update(delta: number, engineContext: IEngineContext): void;
  destroy(engineContext?: IEngineContext): void;
}

type ObjectType = THREE.Object3D | THREE.Mesh;
interface IObjectEntityClass extends IBaseObjectClass {
  object: ObjectType;
  helper?: ObjectType;
  isRaycastable?: boolean;
  position?: ICoordinate3D;
  rotation?: ICoordinate3D;
  scale?: ICoordinate3D;
  name?: string;
}

// Engine interfaces
interface IRendererParams {
  antialias: boolean;
  pixelRatio: number;
}

interface ISceneParams {
  backgroundColor: THREE.Color | string;
}
interface IEngineParamsType {
  scene: ISceneParams;
  renderer: IRendererParams;
  useDevicePixelRatio: boolean;
  isEditorMode: boolean;
  useControls: boolean;
  useRaycaster: boolean;
}

interface IEngineContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  requestRender: () => void;
}
