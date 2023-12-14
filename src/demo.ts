import './style.css';
import { Engine } from './engine/Engine';
import * as THREE from 'three';
import { ThreeAmbienLight, ThreeDirectionalLight } from './engine/entities/lights';
import { Geometry } from './engine/entities/primitives/Geometry';
import { ThreeTexture } from './engine/ThreeTexture';

const engine = new Engine();
engine.init();

(window as any).engine = engine;
window.THREE = THREE;

let texture = await new ThreeTexture(
  'https://365508.selcdn.ru/u_test/74/page_8553.__preview__.jpg?_=1701864100658',
);
await texture.ready();
texture = texture.getTexture() as THREE.Texture;
// texture = texture.getTexture();
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
engine.addEntity(
  new Geometry({
    name: 'sphere',
    type: 'sphere',
    geometry: { height: 3, radialSegments: 32 },
    material: { color: '#1E90FF' },
    position: { x: 0, y: 3, z: 0 },
    rotation: { x: Math.PI / 2, y: 0, z: 0 },
  }),
);
const cone = new Geometry({
  name: 'mycone',
  type: 'cone',
  geometry: { height: 3, radialSegments: 32 },
  material: { color: '#ff00cc' },
  position: { x: -6, y: 3, z: 0 },
  rotation: { x: Math.PI / 2, y: 0, z: 0 },
  scale: { x: 2, y: 2, z: 2 },
});
cone.getObject().material.map = texture;
engine.addEntity(cone);
const cube = new Geometry({
  name: 'myCube',
  type: 'box',
  geometry: { height: 1 },
  material: { color: '#ffcc00' },
  position: { x: 5, y: 3, z: 0 },
});
cube.getObject().material.map = texture;
engine.addEntity(cube);
engine.addEntity(
  new Geometry({
    name: 'plane',
    type: 'plane',
    geometry: { height: 3, radialSegments: 32 },
    material: { color: '#1ED0FF' },
    position: { x: 0, y: 2, z: 2 },
    rotation: { x: Math.PI / 2, y: 0, z: 0 },
  }),
);
