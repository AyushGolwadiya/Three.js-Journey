import * as THREE from 'three';
import * as dat from 'lil-gui'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let loader = new THREE.TextureLoader();
let texture = loader.load("./textures/color.jpg");
let roughness = loader.load("./textures/roughness.jpg");
let normal = loader.load("./textures/normal.png");
let height = loader.load("./textures/height.png");

const geometry = new THREE.BoxGeometry(3, 1.8, 2);
const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughnessMap: roughness,
    normalMap: normal,
    roughness: 0.5,
    metalness: 0.5
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Lights
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2);
highIntensityLight.position.set(10, 20, 15);
scene.add(highIntensityLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// GUI Controls
const gui = new dat.GUI();

const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'roughness', 0, 1).name("Roughness");
materialFolder.add(material, 'metalness', 0, 1).name("Metalness");
materialFolder.addColor({ color: material.color.getHex() }, 'color')
    .name("Color")
    .onChange(value => material.color.set(value));

const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube.scale, 'x', 0.1, 5).name("Scale X");
meshFolder.add(cube.scale, 'y', 0.1, 5).name("Scale Y");
meshFolder.add(cube.scale, 'z', 0.1, 5).name("Scale Z");
meshFolder.add(cube.position, 'x', -5, 5).name("Position X");
meshFolder.add(cube.position, 'y', -5, 5).name("Position Y");
meshFolder.add(cube.position, 'z', -5, 5).name("Position Z");
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name("Rotation X");
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name("Rotation Y");
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name("Rotation Z");

const lightFolder = gui.addFolder('Lights');
lightFolder.add(highIntensityLight, 'intensity', 0, 5).name("High Intensity Light");
lightFolder.add(directionalLight, 'intensity', 0, 5).name("Directional Light");
lightFolder.add(ambientLight, 'intensity', 0, 5).name("Ambient Light");
lightFolder.add(pointLight, 'intensity', 0, 5).name("Point Light Intensity");

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

animate();
