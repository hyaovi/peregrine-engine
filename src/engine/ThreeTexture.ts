import * as THREE from 'three';
import { BaseEntity } from './entities/BaseEntity';
// THREE.RepeatWrapping | THREE.ClampToEdgeWrapping | THREE.MirroredRepeatWrapping;
// THREE.NearestFilter   THREE.LinearFilter;
interface ITextureOption {
  wrapS: typeof THREE.RepeatWrapping;
  wrapT: typeof THREE.RepeatWrapping;
  magFilter: typeof THREE.LinearFilter;
  minFilter: typeof THREE.LinearFilter;
  anisotropy: number;
}

const defaultTextureParams: ITextureOption = {
  wrapS: THREE.RepeatWrapping,
  wrapT: THREE.RepeatWrapping,
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  anisotropy: 1,
};
export class ThreeTexture {
  private texture: THREE.Texture = new THREE.Texture();
  private texturePromise: Promise<THREE.Texture>;

  constructor(
    imagePath: string,
    params: ITextureOption = defaultTextureParams,
    public engineContext?: IEngineContext,
  ) {
    let parameters = { ...defaultTextureParams, ...params };

    this.texturePromise = this.createTexture(imagePath, parameters);
  }
  async ready() {
    return this.texturePromise;
  }

  private createTexture(imagePath: string, parameters?: ITextureOption): Promise<THREE.Texture> {
    return new Promise<THREE.Texture>((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      this.texture = loader.load(
        imagePath,
        (loadedTexture) => {
          resolve(loadedTexture);
        },
        undefined,
        (error) => reject(error),
      );

      // Set additional parameters if provided
      if (parameters) {
        this.texture.wrapS =
          parameters.wrapS !== undefined ? parameters.wrapS : THREE.ClampToEdgeWrapping;
        this.texture.wrapT =
          parameters.wrapT !== undefined ? parameters.wrapT : THREE.ClampToEdgeWrapping;
        this.texture.magFilter =
          parameters.magFilter !== undefined ? parameters.magFilter : THREE.LinearFilter;
        this.texture.minFilter =
          parameters.minFilter !== undefined
            ? parameters.minFilter
            : THREE.LinearMipmapLinearFilter;
        this.texture.anisotropy = parameters.anisotropy !== undefined ? parameters.anisotropy : 1;
      }
    });
  }

  public getTexture(): THREE.Texture {
    return this.texture;
  }
}
