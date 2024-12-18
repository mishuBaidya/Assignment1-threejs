import  './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const textureCube = new THREE.CubeTextureLoader().load( [
    "../asset/skybox/space_rt.png",
    "../asset/skybox/space_lf.png",
    "../asset/skybox/space_up.png",
    "../asset/skybox/space_dn.png",
    "../asset/skybox/space_bk.png",
    "../asset/skybox/space_ft.png"

] );
scene.background = textureCube;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

//----------Light-------------//
const pointLight = new THREE.PointLight(0xffffff, 1000.0)



const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight);



//------------Helper-------------//
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50)
//
// scene.add(lightHelper,gridHelper);


const controls = new OrbitControls(camera, renderer.domElement);
controls.autor = true;

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
    })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);

    scene.add(star);
}

Array(400).fill().forEach(addStar);

//earth
const earthTexture = new THREE.TextureLoader().load('../asset/earth.jpg');
const earthNormalTexture = new THREE.TextureLoader().load('../asset/EarthNormalMap.png');

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(10, 32,32),
    new THREE.MeshBasicMaterial({map: earthTexture, normalMap:earthNormalTexture})
)

scene.add(earth);



// Moon

const moonTexture = new THREE.TextureLoader().load('../asset/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('../asset/normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32,32),
    new THREE.MeshBasicMaterial({map: moonTexture, normalMap: normalTexture})
)


moon.position.z = 20;
moon.position.setX(-20);

scene.add(moon);



//move camera
camera.position.set( 0, 0, 40 );
controls.update();


controls.keys = {
    LEFT: 'KeyA',
    RIGHT: 'KeyD'
}
controls.keyPanSpeed = 20;
controls.enableDamping = true;
controls.listenToKeyEvents(window);

window.addEventListener('keydown', (event) => {
    const moveSpeed = 0.2; // Adjust movement speed

    switch (event.code) {
        case 'KeyW': // Forward movement
            camera.position.z -= moveSpeed;
            break;
        case 'KeyS': // Backward movement
            camera.position.z += moveSpeed;
            break;
    }
});


function animate() {
    requestAnimationFrame(animate);
    //moveCamera();
    //controls.autoRotate = true;




    controls.update();

    renderer.render(scene, camera);
}

animate();