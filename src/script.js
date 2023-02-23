import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import window from 'global'

const floor7 = document.getElementsByClassName('f7')[0]
const floor6 = document.getElementsByClassName('f6')[0]
const floor5 = document.getElementsByClassName('f5')[0]
const floor4 = document.getElementsByClassName('f4')[0]
const floor3 = document.getElementsByClassName('f3')[0]
const floor2 = document.getElementsByClassName('f2')[0]
const floor1 = document.getElementsByClassName('f1')[0]
const reset = document.getElementsByClassName('reset')[0]
const goto = document.getElementById('goto')

let selectedFloor;

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loading ICT model 
var loader = new ColladaLoader();
loader.load("/models/ICT/ICT_COLLADA.dae", function (result) {

    const meshes = result.scene.children[0].children

    for(const mesh of meshes) {
        mesh.translateZ(-400)
        mesh.translateX(-200)

        const geometry = mesh.geometry
        console.log(geometry)
        const edges = new THREE.EdgesGeometry(geometry)
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 100 }))

        line.translateZ(-400)
        line.translateX(-200)

        result.scene.add(line);
    }

    scene.add(result.scene);
});

// Selected floor
const geometry = new THREE.BoxGeometry(130,5,70)
const material = new THREE.MeshBasicMaterial({ color: "green", opacity: 0.2, transparent: true})
const selected = new THREE.Mesh(geometry, material)
material.depthWrite = false;
scene.add(selected)
selected.visible = false

function disableGoto() {
    goto.className = "goto-inactive"
    selected.material = new THREE.MeshBasicMaterial({ color: "green", opacity: 0.2, transparent: true})
    material.depthWrite = false;
}

function enableGoto() {
    goto.className = "goto-active"
    selected.material = new THREE.MeshBasicMaterial({ color: "dodgerblue", opacity: 0.4, transparent: true})
    material.depthWrite = false;
}

floor7.addEventListener('click', () => { 
    disableGoto()
    goto.innerHTML = "Floor 7 inside view coming soon!"
    selectedFloor = 7
    selected.visible = true
    selected.position.set(-11, 19, -8)
})

floor6.addEventListener('click', () => { 
    disableGoto()
    goto.innerHTML = "Floor 6 inside view coming soon!"
    selectedFloor = 6
    selected.visible = true
    selected.position.set(-11, 15, -8)
})

floor5.addEventListener('click', () => {
    disableGoto()
    goto.innerHTML = "Floor 5 inside view coming soon!"
    selectedFloor = 5
    selected.visible = true
    selected.position.set(-11, 11, -8)
})

floor4.addEventListener('click', () => {
    disableGoto()
    goto.innerHTML = "Floor 4 inside view coming soon!"
    selectedFloor = 4
    selected.visible = true
    selected.position.set(-11, 7, -8)
})

floor3.addEventListener('click', () => {
    disableGoto()
    goto.innerHTML = "Floor 3 inside view coming soon!"
    selectedFloor = 3
    selected.visible = true
    selected.position.set(-11, 3, -8)
})

floor2.addEventListener('click', () => {
    enableGoto()
    goto.innerHTML = "Click for inside view of floor 2! -->"
    selectedFloor = 2
    selected.visible = true
    selected.position.set(-11, -2, -8)
})

floor1.addEventListener('click', () => {
    disableGoto()
    goto.innerHTML = "Floor 1 inside view coming soon!"
    selectedFloor = 1
    selected.visible = true
    selected.position.set(-11, -8, -8)
})

goto.addEventListener('click', () => {
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
            window.location.assign("./f2.html")
            break;
        case 1:
            break;
    }
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