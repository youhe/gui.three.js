gui.three.js
========

#### three.js & dat.GUI library ####

[three.js](https://github.com/mrdoob/three.js)
[dat.GUI](https://github.com/dataarts/dat.gui)

### Usage ###

```html
<script src="js/three.min.js"></script>
<script src="js/dat.gui.min.js"></script>
<script src="js/gui.three.min.js"></script>
```

```javascript
var camera, scene, renderer;
var geometry, material, mesh;
var gui;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	gui = new dat.GUI();
	new GUITHREE.Object3D('mesh', gui, mesh);

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	renderer.render( scene, camera );

}
```
