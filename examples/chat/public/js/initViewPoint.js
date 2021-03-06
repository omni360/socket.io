/* 
* @Author: chunlei.hou
* @Date:   2014-10-22 11:09:55
* @Last Modified by:   chunlei.hou
* @Last Modified time: 2014-10-22 12:56:05
*/

$(document).ready(function(){

	// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	var container;/*, stats;
*/
	var camera, controls, scene, renderer;

	var sWidth = $(".viewpoint").innerWidth();
	var sHeight = $(".viewpoint").innerHeight();

	init();
	render();

	function animate() {

		requestAnimationFrame(animate);
		controls.update();

	}

	function init() {

		camera = new THREE.PerspectiveCamera( 60, sWidth / sHeight, 1, 1000 );
		camera.position.z = 500;

		controls = new THREE.OrbitControls( camera );
		controls.damping = 0.2;
		controls.addEventListener( 'change', render );

		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0x334048, 0.002 );

		// world

		var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
		var material =  new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading } );

		for ( var i = 0; i < 500; i ++ ) {

			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = ( Math.random() - 0.5 ) * 1000;
			mesh.position.y = ( Math.random() - 0.5 ) * 1000;
			mesh.position.z = ( Math.random() - 0.5 ) * 1000;
			mesh.updateMatrix();
			mesh.matrixAutoUpdate = false;
			scene.add( mesh );

		}


		// lights

		light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 1, 1, 1 );
		scene.add( light );

		light = new THREE.DirectionalLight( 0x002288 );
		light.position.set( -1, -1, -1 );
		scene.add( light );

		light = new THREE.AmbientLight( 0x222222 );
		scene.add( light );


		// renderer

		renderer = new THREE.WebGLRenderer( { antialias: false } );
		renderer.setClearColor( scene.fog.color, 1 );
		renderer.setSize( sWidth, sHeight );

		container = $( ".viewpoint");
		container.append( renderer.domElement );

		// stats = new Stats();
		// stats.domElement.style.position = 'absolute';
		// stats.domElement.style.top = '0px';
		// stats.domElement.style.zIndex = 100;
		// container.append( stats.domElement );

		//

		window.addEventListener( 'resize', onWindowResize, false );

		controls.addEventListener('change', render);
		animate();

	}

	function onWindowResize() {

		camera.aspect = sWidth / sHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( sWidth, sHeight );

		render();

	}

	function render() {

		renderer.render( scene, camera );
		// stats.update();

	}

});