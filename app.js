var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);

var scene,
  camera,
  renderer
var geometry,
  material,
  mesh
var ambientLight,
  pointLight
var col = {
  backgroundCol: 0xF3FFE2,
  materialCol: 0x00ff00
}



init()
animate()

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('myCanvas'),
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight);

  //shape
  geometry = new THREE.CubeGeometry(1, 1, 1);
  material = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
  // wireframe: true
  });
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh);

  //Ambient Light
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  //Point Light
  pointLight = new THREE.PointLight(0xffffff, 0.5)
  scene.add(pointLight)
  pointLight.position.z = 2



}

function animate() {
  //allways the first line
  stats.begin()

  requestAnimationFrame(animate)

  //animate color
  renderer.setClearColor(col.backgroundCol)
  mesh.material.color.setHex(col.materialCol)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01

  renderer.render(scene, camera)

  //allways the last line
  stats.end()
}


window.onload = function() {
  var gui = new dat.GUI()

  var f1 = gui.addFolder('mesh')
  f1.add(mesh.rotation, 'x', 0, 200).listen()
  f1.open()

  var f2 = gui.addFolder('camera')
  f2.add(camera.position, 'x', 0, 1)
  f2.add(camera.position, 'y', 0, 1)
  f2.add(camera.position, 'z', 1, 40)
  f2.open()

  var f3 = gui.addFolder('pointLight')
  f3.add(pointLight.position, 'z', 1, 40)
  f3.open()

  var f4 = gui.addFolder('color')
  f4.addColor(col, 'backgroundCol')
  f4.addColor(col, 'materialCol')
  // f4.addColor(ambientLight, 'color')
  // f4.addColor(pointLight, 'color')
  f4.open()
};
