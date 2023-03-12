import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { navToFloor } from './matterport';

export let state = 0;
export let selectedFloor;


// Media query for mobile
var x = window.matchMedia("(max-width: 30em)")

const floor7 = document.getElementsByClassName('f7')[0]
const floor6 = document.getElementsByClassName('f6')[0]
const floor5 = document.getElementsByClassName('f5')[0]
const floor4 = document.getElementsByClassName('f4')[0]
const floor3 = document.getElementsByClassName('f3')[0]
const floor2 = document.getElementsByClassName('f2')[0]
const floor1 = document.getElementsByClassName('f1')[0]
const reset = document.getElementsByClassName('reset')[0]
const switchView = document.getElementsByClassName('switch')[0]
const goto = document.getElementById('goto')
const sourceCode = document.getElementById('source-code')

// Really crappy, hacky way of doing this. I need to fix this.
const matterportFrame = document.getElementById('matterport')
const header = document.getElementById('header')


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

function clearScene() {
    // while(scene.children.length > 0){ 
    //     scene.remove(scene.children[0]); 
    //     console.log("removed " + scene.children[0])
    // }

    scene.remove(scene.children[4])
}

function loadICT() {
    state = 0
    clearScene()
    const ICTLoader = new ColladaLoader()
    ICTLoader.load("/models/ICT/ICT_COLLADA.dae", function (result) {

        // const meshes = result.scene.children[0].children

        // Adds outline to each mesh
        // for(const mesh of meshes) {
        //     mesh.translateZ(-400)
        //     mesh.translateX(-200)

        //     const geometry = mesh.geometry
        //     const edges = new THREE.EdgesGeometry(geometry)
        //     const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 }))
        
        //     line.translateZ(-400)
        //     line.translateX(-200)
        
        //     result.scene.add(line);
        // }

        var ICT = result.scene

        ICT.position.set(-1400, -1320, -1500)
        ICT.rotation.set(-Math.PI/2, 0, -Math.PI/2)
        ICT.scale.set(0.6,0.6,0.6)

        scene.add(result.scene);
        console.log(scene)
    });
}

function loadCampus() {
    state = 1
    clearScene()
    // Instantiate a loader
    const campusLoader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
    campusLoader.setDRACOLoader( dracoLoader );

    let campus;

    // Load a glTF resource
    campusLoader.load(
        // resource URL
        '/models/low-res-campus.glb',
        // called when the resource is loaded
        function ( gltf ) {

            campus = gltf.scene;
            campus.scale.set(10000,10000,10000)
            campus.translateX(21000)
            // campusScene.translateZ(50)
            campus.translateY(-3700)

            scene.add( campus );

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

        },
        // called while loading is progressing
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( 'An error happened' );

        }
    );
}
loadICT()




// Selected floor
const geometry = new THREE.BoxGeometry(70,5,130)
const material = new THREE.MeshBasicMaterial({ color: "green", opacity: 0.2, transparent: true})
const selected = new THREE.Mesh(geometry, material)
selected.material.depthWrite = false;
selected.scale.set(22,22,22)
scene.add(selected)
selected.visible = false

function disableGoto() {
    goto.className = "goto-inactive"
    selected.material = new THREE.MeshBasicMaterial({ color: "green", opacity: 0.2, transparent: true})
    selected.material.depthWrite = false;
}

function enableGoto() {
    goto.className = "goto-active"
    selected.material = new THREE.MeshBasicMaterial({ color: "dodgerblue", opacity: 0.4, transparent: true})
    selected.material.depthWrite = false;
}

floor7.addEventListener('click', () => { 

    console.log(camera.position)
    console.log(camera.rotation)

    disableGoto()
    goto.innerHTML = "Floor 7 inside view coming soon!"
    selectedFloor = 7
    selected.visible = true
    // selected.position.set(-11, 19, -8)
    selected.position.set(-1200, -600, -1900)
})

floor6.addEventListener('click', () => { 
    disableGoto()
    goto.innerHTML = "Floor 6 inside view coming soon!"
    selectedFloor = 6
    selected.visible = true
    // selected.position.set(-11, 15, -8)
    selected.position.set(-1200, -710, -1900)
})

floor5.addEventListener('click', () => {
    disableGoto()
    goto.innerHTML = "Floor 5 inside view coming soon!"
    selectedFloor = 5
    selected.visible = true
    // selected.position.set(-11, 11, -8)
    selected.position.set(-1200, -820, -1900)
})

floor4.addEventListener('click', () => {
    disableGoto()
    goto.innerHTML = "Floor 4 inside view coming soon!"
    selectedFloor = 4
    selected.visible = true
    // selected.position.set(-11, 7, -8)
    selected.position.set(-1200, -930, -1900)
})

floor3.addEventListener('click', () => {
    disableGoto()
    goto.innerHTML = "Floor 3 inside view coming soon!"
    selectedFloor = 3
    selected.visible = true
    // selected.position.set(-11, 3, -8)
    selected.position.set(-1200, -1040, -1900)

})

floor2.addEventListener('click', () => {
    enableGoto()
    goto.innerHTML = "Click for inside view of floor 2! -->"
    selectedFloor = 2
    selected.visible = true
    // selected.position.set(-11, -2, -8)
    selected.position.set(-1200, -1150, -1900)
})

floor1.addEventListener('click', () => {
    enableGoto()
    goto.innerHTML = "Click for inside view of floor 1! -->"
    selectedFloor = 1
    selected.visible = true
    // selected.position.set(-11, -8, -8)
    selected.position.set(-1200, -1260, -1900)
})

goto.addEventListener('click', () => {
    if (state == 1) {
        state = 0;
        deativateMatterport()

    } else {
        state = 1;
        console.log('Going to floor ' + selectedFloor)
        selected.visible = false
        switch(selectedFloor) {
            case 5:
                break;
            case 4:
                break;
            case 3:
                break;
            case 2:
                activateMatterport()
                break;
            case 1:
                activateMatterport()
                break;
        }
    }
})

switchView.addEventListener('click', () => {
    if (state === 0) {
        loadCampus()
    }
    else {
        loadICT()
    }
})

// This hides everything except for the matterport iframe
function activateMatterport (){
    matterportFrame.className = "active"
    floor1.className = "inactive"
    floor2.className = "inactive"
    floor3.className = "inactive"
    floor4.className = "inactive"
    floor5.className = "inactive"
    floor6.className = "inactive"
    floor7.className = "inactive"
    reset.className = "inactive"
    header.className = "inactive"
    sourceCode.className = "inactive"
    goto.className = "goto-back"
    goto.innerHTML = "<-- Return to outside view"
    navToFloor()
}

// This shows everything except for the matterport iframe
function deativateMatterport (){
    matterportFrame.className = "inactive"
    selectedFloor = null;
    floor1.className = "f1"
    floor2.className = "f2"
    floor3.className = "f3"
    floor4.className = "f4"
    floor5.className = "f5"
    floor6.className = "f6"
    floor7.className = "f7"
    sourceCode.className = ""
    reset.className = "reset"
    header.className = ""
    goto.className = "goto-inactive"
    goto.innerHTML = "Click on a floor to go inside!"
}

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xd6e6ff, 2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000000)
// camera.rotation.set(-0.06, -0.76, 0.04)
// camera.position.set(-78.6, 32, 45)

camera.position.set(-1084.87, 89.24, 1000)
camera.rotation.set(-0.27, 0.03, 0.01)

if (x.matches) {
    // If media query matches
    camera.position.set(-120, 35, 140)
}

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(-1000, 0, -2000)
controls.enableDamping = true
controls.saveState()

// {
//     "x": -1084.8761315512888,
//     "y": 89.24873979487634,
//     "z": 381.2835663043385
// }

// {
//     "isEuler": true,
//     "_x": -0.2725851439463529,
//     "_y": 0.030744339940205662,
//     "_z": 0.008592808522515549,
//     "_order": "XYZ"
// }


// Resets camera rotation + selected floor
reset.addEventListener('click', () => {
    goto.className = "goto-inactive"
    goto.innerHTML = "Select a floor"
    selectedFloor = null
    controls.reset()
    selected.visible = false
    console.log(scene)
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas
})
renderer.setClearColor(0xffffff, 0);


renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // console.log(camera.position, camera.rotation)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()