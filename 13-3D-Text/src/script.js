    import './style.css'
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import * as dat from 'lil-gui';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

    /**
     * Base
     */
    // Debug
    const gui = new dat.GUI()

    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene();

    // Axes helper
    // const axisHelper = new THREE.AxesHelper();
    // scene.add(axisHelper); 

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load('/textures/matcaps/3.png');

    /**
     * Fonts
    */
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/helvetiker.json', (font) => {
        const textGeometry = new TextGeometry(
            'Ayush Golwadiya',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4,
            })
        // To Compute BoundingBox can be sphere or box
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     -(textGeometry.boundingBox.max.y -0.02)* 0.5,
        //     -(textGeometry.boundingBox.max.z - 0.03)* 0.5,
        // )
        textGeometry.center()

        const textMaterial = new THREE.MeshMatcapMaterial();
        textMaterial.map = matcapTexture;
        // textMaterial.wireframe = true;

        const text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);

        console.time('donuts')
        const geometry = new THREE.SphereGeometry(0.3,32,16);
        const material = new THREE.MeshMatcapMaterial({matcap:matcapTexture});
        for (let i = 0; i < 100; i++) {
            const mesh = new THREE.Mesh(geometry,material);

            // setting position
            mesh.position.x = (Math.random()-0.5)*10;
            mesh.position.y = (Math.random()-0.5)*10;
            mesh.position.z = ((Math.random()-0.5)*10);

            // Setting rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            // Scaling
            const scale = Math.random()*1.5;
            mesh.scale.set(scale,scale,scale);
          
            scene.add(mesh);
        }
        console.timeEnd('donuts')
    })



    /**
     * Object
     */
    // const cube = new THREE.Mesh(
    //     new THREE.BoxGeometry(1, 1, 1),
    //     new THREE.MeshBasicMaterial()
    // )
    // scene.add(cube)

    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {
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
    camera.position.x = 1
    camera.position.y = 1
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

    const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()