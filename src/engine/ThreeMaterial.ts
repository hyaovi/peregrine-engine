import * as THREE from 'three';
import { ThreeTexture } from './ThreeTexture';

export class ThreeMaterial {
  public texture!: ThreeTexture;
  private material: MaterialType;
  public params: IMaterialParams;
  constructor(params: IMaterialParams, textureParams?: ITextureParams) {
    this.params = params;
    const {type:materialType, ...materialParams} = params;
    const newMaterialParams: IMaterialBaseParams = { ...materialParams };

    if (textureParams) {
      this.createTexture(textureParams);
      newMaterialParams.map = this.getTexture();
    }
    this.material = this.createMaterial(materialType, newMaterialParams);
  }
  private createMaterial(materialType: MaterialNameType, params: IMaterialBaseParams): MaterialType {
    switch (materialType) {
      case 'standard':
        return new THREE.MeshStandardMaterial({ ...params });
      case 'basic':
        return new THREE.MeshBasicMaterial({ ...params });
      default:
        return new THREE.MeshStandardMaterial({ ...params });
    }
  }
  getTexture() {
    return this.texture.getTexture();
  }
  createTexture(params: ITextureParams) {
    this.setTexture(new ThreeTexture(params));
  }
  setTexture(texture: THREE.Texture | THREE.VideoTexture | ThreeTexture) {
    if (texture instanceof THREE.Texture) {
      this.texture.setTexture(texture);
    }
    if (texture instanceof ThreeTexture) {
      this.texture = texture;
    }
    if (this.material) {
      this.material.map = this.texture.getTexture();
      this.material.map.needsUpdate = true;
    }
    this.needsUpdate = true;
  }
  setMaterial(material: MaterialType) {
    this.material = material;
  }
  getMaterial(): MaterialType {
    return this.material;
  }
  set needsUpdate(val: Boolean) {
    if (val) {
      this.texture && (this.getTexture().needsUpdate = true);
      if (this.material) {
        this.material.needsUpdate = true;
        this.material.map && (this.material.map.needsUpdate = true);
      }
    }
  }
}
