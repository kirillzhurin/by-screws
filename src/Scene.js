import * as THREE from 'three';

export default class Scene {
  fieldOfView = 60;
	nearPlane = 1;
  farPlane = 10000;
    
  constructor(options = {}) {
    this.getWindowSize();

    // Create the scene
    this.scene = new THREE.Scene()
    this.addFog(0xf7d9aa, 100, 950);
    this.createCamera();
    this.createRenderer();

    // Add the DOM element of the renderer to the 
	  // container created in the HTML
    if (options.container) {
      this.container = options.container;
    } else {
      this.container = document.body;
    }
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.handleWindowResize, false);
  }

  getWindowSize() {
    // Get the width and the height of the screen,
	  // use them to set up the aspect ratio of the camera 
	  // and the size of the renderer.
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.aspectRatio = this.WIDTH / this.HEIGHT;
  }

  handleWindowResize = () => {
    // update height and width of the renderer and the camera
    this.getWindowSize();
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
	  this.camera.aspect = this.aspectRatio;
	  this.camera.updateProjectionMatrix();
  }

  addFog(color, near, far) {
    if (!this.scene) {
      return;
    }
    // Add a fog effect to the scene
    this.scene.fog = new THREE.Fog(color, near, far);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      // Allow transparency to show the gradient background
		  // we defined in the CSS
      alpha: true,
      // Activate the anti-aliasing; this is less performant,
		  // for low-poly, it should be fine :)
      antialias: true
    });

    // Define the size of the renderer; in this case,
	  // it will fill the entire screen
	  this.renderer.setSize(this.WIDTH, this.HEIGHT);
	
	  // Enable shadow rendering
	  this.renderer.shadowMap.enabled = true;
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.nearPlane,
      this.farPlane
    );

    this.camera.position.x = 0;
	  this.camera.position.z = 200;
	  this.camera.position.y = 100;
  }

  addLight(light) {
    this.scene.add(light);
  }
}