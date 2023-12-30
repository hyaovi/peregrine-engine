import './style.css';
import { Engine } from './engine/Engine';
import * as THREE from 'three';
import { ThreeAmbienLight, ThreeDirectionalLight } from './engine/objects/lights';
// import { Geometry } from './engine/objects/primitives/Geometry';
import { ThreeTexture } from './engine/ThreeTexture';
import { ThreePrimitiveObject } from './engine/PrimitiveObject';

const engine = Engine.getInstance();
engine.init();

(window as any).engine = engine;
window.THREE = THREE;
window.devicePixelRatio;
document.querySelector<HTMLDivElement>('#app')!.appendChild(engine.threeRenderer.domElement);

engine.addEntity(
  new ThreeAmbienLight({
    name: 'alight',
    type: 'ambient',
    light: {
      intensity: 0.1,
    },
  }),
);
engine.addEntity(
  new ThreeDirectionalLight({
    name: 'dlight',
    type: 'directional',
    light: {},
    position: { x: 10, y: 10, z: 7 },
  }),
);
const cone = new ThreePrimitiveObject({
  name: 'mybox',
  type: 'cone',
  texture: {
    asset: {
      type: 'image',
      url: 'https://365508.selcdn.ru/u_test/74/page_8553.__preview__.jpg?_=1701864100658',
    },

  },
  geometry: { type: 'cone', height: 3, radialSegments: 32 },
  material: { type: 'standard', color: 'dodgerblue', side: 2  },
  position: { x: -6, y: 3, z: 5 },
  rotation: { x: Math.PI / 2, y: 0, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});
await cone.ready();
console.log(cone);
// cone.material.setTexture(texture);
engine.addEntity(cone);
const tmesh = new ThreePrimitiveObject();
tmesh.ready().then(() => {
  engine.addEntity(tmesh);
});
tmesh.update = (delta, engineContext) => {
  tmesh.object.rotation.x += 0.03;
};
console.log(tmesh);
