import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'

/**
 * Base
 */

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Door
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// Bricks
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');

// grass
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');
const grassAmbientOcclusion = textureLoader.load('/textures/grass/ambientOcclusion.jpg');

grassColorTexture.repeat.set(8,8);
grassNormalTexture.repeat.set(8,8);
grassRoughnessTexture.repeat.set(8,8);
grassAmbientOcclusion.repeat.set(8,8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;

grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;

grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

grassAmbientOcclusion.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusion.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Group
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map:bricksColorTexture,
        aoMap:bricksAmbientOcclusionTexture,
        normalMap:bricksNormalTexture,
        roughnessMap:bricksRoughnessTexture,
    })
)
walls.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2))

walls.position.y = 2.5 * 0.5;
house.add(walls);

// roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color:'#b35f45'})
)
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof)

// door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
        transparent:true,
        alphaMap:doorAlphaTexture,
        aoMap:doorAmbientOcclusionTexture,
        displacementMap:doorHeightTexture,
        displacementScale:0.1,
        normalMap:doorNormalTexture,
        metalnessMap:doorMetalnessTexture,
        roughnessMap:doorRoughnessTexture,
    })
)
door.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2))
door.position.y = 1;
door.position.z = 4/2  + 0.01,
house.add(door);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map:grassColorTexture,
        aoMap:grassAmbientOcclusion,
        normalMap:grassNormalTexture,
        roughness:grassRoughnessTexture,

    })
)
floor.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16);
const bushMaterial = new THREE.MeshStandardMaterial({color:'#89c854'});

const bush1 = new THREE.Mesh(bushGeometry,bushMaterial);
bush1.scale.set(0.5,0.5,0.5);
bush1.position.set(0.9,0.25,2.2)

const bush2 = new THREE.Mesh(bushGeometry,bushMaterial);
bush2.scale.set(0.25,0.25,0.25);
bush2.position.set(1.5,0.1,2.2)

const bush3 = new THREE.Mesh(bushGeometry,bushMaterial);
bush3.scale.set(0.4,0.4,0.4);
bush3.position.set(-0.9,0.25,2.2);

const bush4 = new THREE.Mesh(bushGeometry,bushMaterial);
bush4.scale.set(0.2,0.2,0.2);
bush4.position.set(-1.3,0.1,2.4)

house.add(bush1,bush2,bush3,bush4);

// Grave
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6,.8,.2)
const graveMaterial = new THREE.MeshStandardMaterial({color:'#b2b6b1'});

for ( let i = 0 ; i < 50 ; i++ ) {
    const angle = Math.random() * Math.PI * 2; // Random Angle
    const radius = 3 + Math.random() * 5
    const x = Math.sin(angle) * radius ; // getting the x position
    const z = Math.cos(angle) * radius ; // getting the y position

    const grave = new THREE.Mesh(graveGeometry,graveMaterial);
    grave.position.set(x,0.3,z)
    grave.rotation.y =( Math.random() - 0.5) * 1;
    grave.rotation.z = (Math.random() - 0.1) * .4;
    grave.castShadow = true;
    graves.add(grave);
}

// Fog 
const fog = new THREE.Fog('#262837',1,15);
scene.fog = fog;
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// door light
const doorLight = new THREE.PointLight('#ff7d46',.8,7,);
doorLight.position.set(0,2.2,2.7)
house.add(doorLight);

// ghost lights
const ghost1 = new THREE.PointLight('#ff00ff',.8);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#0000ff',.5,3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#00ff00',.9,3);
scene.add(ghost3);

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')

// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.castShadow = true;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 15;

ghost1.castShadow = true;  
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 15;

ghost2.castShadow = true;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 15;

ghost3.castShadow = true;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 15;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const ghostAngle = elapsedTime * .4;
    ghost1.position.x = Math.cos(ghostAngle) * 4;
    ghost1.position.z = Math.sin(ghostAngle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghostAngle2 = - elapsedTime * .32;
    ghost2.position.x = Math.cos(ghostAngle2) * 5;
    ghost2.position.z = Math.sin(ghostAngle2) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 3);

    const ghostAngle3 = elapsedTime * .1;
    ghost3.position.x = Math.sin(ghostAngle3) * 4;
    ghost3.position.z = Math.cos(ghostAngle3) * 4;
    ghost3.position.y = Math.sin(elapsedTime) * 4;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()