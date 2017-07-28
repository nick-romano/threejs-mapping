/*Most of this code was written and or adopted  from Bjørn Sandvik's blog: 
http://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html*/

var webGL = $('#three');


var width = window.innerWidth,
    height = window.innerHeight;


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
camera.position.z = 1.5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

scene.add(new THREE.AmbientLight(0x333333));
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,3,5);
scene.add(light);

var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 64, 64),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('2_no_clouds_4k.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: THREE.ImageUtils.loadTexture('water_4k.png'),
				specular:    new THREE.Color('grey')								
			})
		);
scene.add(sphere);


var clouds = new THREE.Mesh(
  new THREE.SphereGeometry(0.503, 64, 64),
  new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('fair_clouds_4k.png'),
    transparent: true
  })
);
scene.add(clouds);

var stars = new THREE.Mesh(
  new THREE.SphereGeometry(90, 64, 64), 
  new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('galaxy_starfield.png'), 
    side: THREE.BackSide
  })
);
scene.add(stars);

var controls = new THREE.TrackballControls(camera);
webGL.append(renderer.domElement);
render();

function render() {
  controls.update();
  sphere.rotation.y += 0.0005;
  clouds.rotation.y += 0.0005;  
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}