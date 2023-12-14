**src/**
├── **engine/**
│   ├── `ThreeEngine.ts` // Manages the Three.js scene, camera, and renderer.
│   ├── `ThreeControls.ts` // Handles Three.js OrbitControls and TransformControls.
│   ├── `ThreeRaycaster.ts` // Manages raycasting for object selection.
│
├── **objects/**
│   ├── `CustomObject3D.ts` // Base class for custom 3D objects.
│   ├── **geometries/**
│   │   ├── `BoxGeometry.ts` // Class for creating a box geometry.
│   │   ├── `CircleGeometry.ts` // Class for creating a circle geometry.
│   │   ├── `ConeGeometry.ts` // Class for creating a cone geometry.
│   │   ├── `CylinderGeometry.ts` // Class for creating a cylinder geometry.
│   │   ├── ... // Add more geometry classes as needed.
│   │
│   ├── **mediaObjects/**
│   │   ├── `ThreeImage.ts` // Handles image objects in the scene.
│   │   ├── `ThreeVideo.ts` // Handles video objects in the scene.
│   │
│   ├── `ThreeModel.ts` // Manages 3D model objects and animations.
│
├── **materials/**
│   ├── `ThreeMaterial.ts` // Class for defining custom materials if needed.
│
├── **types/**
│   ├── `index.ts` // Exports all TypeScript type definitions.
│   ├── `Three.d.ts` // Official TypeScript type declarations for Three.js.
│
├── **utils/**
│   ├── `index.ts` // Exports utility functions or classes if needed.
│
├── `main.ts` // Entry point of the application where you instantiate the engine and set up the main loop.
