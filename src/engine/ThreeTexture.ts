import * as THREE from 'three';

const defaultTextureParams: ITextureParams = {
  asset: {
    type: 'image',
    url: '',
    othersParams: {},
  },
    wrapS: THREE.RepeatWrapping,
    wrapT: THREE.RepeatWrapping,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    anisotropy: 1,
};
export class ThreeTexture {
  private texture: THREE.Texture = new THREE.Texture();
  private texturePromise: Promise<THREE.Texture>;
  public params: ITextureParams;

  constructor(
    params: ITextureParams = defaultTextureParams,
    public engineContext?: IEngineContext,
  ) {
    let parameters = { ...defaultTextureParams, ...params };
    this.params = parameters;
    this.texturePromise = this.createTexture(parameters);
  }
  async ready() {
    return this.texturePromise;
  }

  private createTexture(params: ITextureParams = this.params): Promise<THREE.Texture> {
    const { asset,  ...parameters } = params;
    return new Promise<THREE.Texture>((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      this.texture = loader.load(
        asset.url,
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
        // this.texture.magFilter =
        //   parameters.magFilter !== undefined ? parameters.magFilter : THREE.LinearFilter;
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
  public setTexture(texture: THREE.Texture): void {
    this.texture = texture;
  }
}
