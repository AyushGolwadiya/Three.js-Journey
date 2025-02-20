import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */

// Loaders
const loader = new THREE.TextureLoader();
const particleTexture = loader.load('/textures/particles/15.png');
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

/**
 * Particles
*/
const particlesGeometry = new THREE.BufferGeometry();
const count = 3000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);


for (let i = 0 ; i < count * 3 ; i++){
    // to allow this color enable particlesMaterial.vertexColors = true;
    positions[i] = (Math.random() - 0.5 )* 20;
    colors[i] = Math.random()
}

// Setting Attribute
particlesGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3))
// particlesGeometry.setAttribute('color',new THREE.BufferAttribute(colors,3));


const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = .3 ;
particlesMaterial.sizeAttenuation = true;
particlesMaterial.color = new THREE.Color(0xAA60C8);
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.transparent = true;
particlesMaterial.version = true;
// particlesMaterial.alphaTest = 0.0001;
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending
// particlesMaterial.vertexColors = true;


// Points
const particles = new THREE.Points(particlesGeometry,particlesMaterial);
scene.add(particles);

// // cube
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color:0xf0f0dd})
// );
// scene.add(cube);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    particles.rotation.x = Math.sin(elapsedTime) * .3;
    particles.position.y = Math.cos(elapsedTime) * .9;
    particles.rotation.z = Math.sin(elapsedTime * .3);

    // rotation
    // for ( let i = 0 ; i < count ; i++){
    //     const i3 = i * 3;
    //     let x = particlesGeometry.attributes.position.array[i3];
    //     particlesGeometry.attributes.position.array[i3 + 1] = Math.cos(elapsedTime + x) * .2;
    // }

    // particlesGeometry.attributes.position.needsUpdate = true;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()