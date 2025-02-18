import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'; 

/**
 * Debug Panel
 */
const gui = new dat.GUI();

// Textures Loader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// door
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const doorAmbientOcclusion = textureLoader.load('/textures/door/ambientOcclusion.jpg')

// matcap
const matcapTexture1 = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')


// gradient
const gradientTexture1 = textureLoader.load('/textures/gradients/3.jpg')
const gradientTexture2 = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture1.minFilter = THREE.NearestFilter;
gradientTexture1.magFilter = THREE.NearestFilter;
gradientTexture1.generateMipmaps = false;
gradientTexture2.minFilter = THREE.NearestFilter;
gradientTexture2.magFilter = THREE.NearestFilter;
gradientTexture2.generateMipmaps = false;

// EnvironmentMap
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg',
]) 


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Object
*/
// const material = new THREE.MeshBasicMaterial(); 
// material.map = doorColorTexture;
// material.color = new THREE.Color('red');
// material.wireframe = true;
// material.transparent = true;
// material.opacity = .5;
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide;
// // material.wireframe = true;
// material.flatShading = true;

// MeshMatCapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture7;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 10;
// material.specular = new THREE.Color(0xffffff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture2;

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusion;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = -.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.alphaMap = doorAlphaTexture;
// material.transparent = true;

const material = new THREE.MeshStandardMaterial();
material.metalness= 0.7;
material.roughness= 0.2;
material.envMap = environmentMapTexture;
      

gui.add(material ,'metalness').min(0).max(1).step(0.001);
gui.add(material ,'roughness').min(0).max(1).step(0.001);
gui.add(material,'aoMapIntensity').min(-5).max(5).step(1);
gui.add(material,'displacementScale').min(-2).max(2).step(0.05);


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,64,64,),
    material,
)
sphere.position.set(-1.5,0,0)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,100,100),
    material,
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.5,.2,64,128),
    material,
)
torus.position.x = 1.5

plane.geometry.setAttribute('uv2',new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2))
torus.geometry.setAttribute('uv2',new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2))
sphere.geometry.setAttribute('uv2',new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2))


scene.add(plane,sphere,torus)

/**
 * Light
*/
const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff,0.5);
pointLight.position.x = 2;
pointLight.position.y = 2;
pointLight.position.z = 2;
scene.add(pointLight);   

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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
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
    // // rotation
    // sphere.rotation.y = .1 * elapsedTime ;
    // plane.rotation.y = .1 * elapsedTime;
    // torus.rotation.y = .1 * elapsedTime;

    // sphere.rotation.x = .15 * elapsedTime;
    // plane.rotation.x = .15 * elapsedTime;
    // torus.rotation.x = .15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()