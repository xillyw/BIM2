//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'tor';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

//Axes Helper
const axesHelper = new THREE.AxesHelper( 20 );
scene.add( axesHelper );

//Load the file
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
    object.position.x= 0
    object.position.y= 5
    object.position.z= 0
    object.castShadow = true
    object.receiveShadow = true
  },
 );

 //Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "tor" ? 25 : 500;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "tor" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "tor") {
controls = new OrbitControls(camera, renderer.domElement);
}

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
  window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Raycaster


//Create a Floor
function createFloor() {
  let pos = { x: 0, y: 0, z: 0 };
  let scale = { x: 15, y: 0.1, z: 15 };

  let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(),
       new THREE.MeshPhongMaterial({ color: 0xf9c834 }));
  blockPlane.position.set(pos.x, pos.y, pos.z);
  blockPlane.scale.set(scale.x, scale.y, scale.z);
  blockPlane.castShadow = true;
  blockPlane.receiveShadow = true;
  scene.add(blockPlane);

  blockPlane.userData.ground = true
}

// box
function createBox() {
  let scale = { x: 1, y: 1, z: 1 }
  let pos = { x: 1, y: scale.y / 2, z: 1 }

  let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), 
      new THREE.MeshPhongMaterial({ color: 0xDC143C }));
  box.position.set(pos.x, pos.y, pos.z);
  box.scale.set(scale.x, scale.y, scale.z);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box)

  box.userData.draggable = true
  box.userData.name = 'BOX'
}

createFloor()
createBox()





//Start the 3D rendering
animate();