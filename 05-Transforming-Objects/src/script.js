import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group();
group.position.y = 1,
group.scale.y = 2, 
group.rotation.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
cube2.position.set(-2,0,0);
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color:0x0000ff}),
);
cube3.position.set(2,0,0);
group.add(cube3);






// Position
// mesh.position.x = 0.9,
// mesh.position.y = -0.6,
// mesh.position.z = 1,
// mesh.position.set(0.7,-0.6, 1)


// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

// Rotation
// mesh.rotation.reorder('YXZ'); 
// mesh.rotation.x = Math.PI *.25;
// mesh.rotation.y = Math.PI *.25;


// Axis Helper
// const axes = new THREE.AxesHelper();
// scene.add(axes);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
// console.log(mesh.position.distanceTo(camera.position));


// LookAt method
// camera.lookAt(mesh.position);    


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)