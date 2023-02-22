import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

import * as dat from 'lil-gui'
import { BufferGeometry } from 'three'

const floor5 = document.getElementsByClassName('f5')[0]
const floor4 = document.getElementsByClassName('f4')[0]
const floor3 = document.getElementsByClassName('f3')[0]
const floor2 = document.getElementsByClassName('f2')[0]
const floor1 = document.getElementsByClassName('f1')[0]
const reset = document.getElementsByClassName('reset')[0]


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loading ICT model 
var loader = new ColladaLoader();
loader.load("/models/ICT/ICT_COLLADA.dae", function (result) {

    const meshes = result.scene.children[0].children

    for(const mesh of meshes) {
        const geometry = mesh.geometry
        console.log(geometry)
        const edges = new THREE.EdgesGeometry(geometry)
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 100 }))
        result.scene.add(line);
    }

    scene.add(result.scene);
});

// Selected floor
const geometry = new THREE.BoxGeometry(130,5,70)
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, opacity: 0.2, transparent: true})
const selected = new THREE.Mesh(geometry, material)
selected.position.set(-11, 9, -8)
scene.add(selected)
selected.visible = false

floor5.addEventListener('click', () => {
    console.log('f5')
    selected.visible = true
    selected.position.set(-11, 30, -8)
})

floor4.addEventListener('click', () => {
    console.log('f4')
    selected.visible = true
    selected.position.set(-11, 23, -8)
})

floor3.addEventListener('click', () => {
    console.log('f3')
    selected.visible = true
    selected.position.set(-11, 16, -8)
})

floor2.addEventListener('click', () => {
    console.log('f2')
    selected.visible = true
    selected.position.set(-11, 9, -8)
})

floor1.addEventListener('click', () => {
    console.log('f1')
    selected.visible = true
    selected.position.set(-11, 2, -8)
})

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
camera.position.set(-78.6, 32, 45)

camera.rotation.set(-0.06, -0.76, 0.04)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(-10, 0, -10)
controls.enableDamping = true
controls.saveState()


// Resets camera rotation + selected floor
reset.addEventListener('click', () => {
    controls.reset()
    selected.visible = false
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