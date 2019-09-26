import * as THREE from 'three';

class Scene {
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
    
  constructor(options = {}) {
    this.getWindowSize();

    // Create the scene
    this.scene = new THREE.Scene()
    this.addFog(0xf7d9aa, 100, 950);
    this.createLights();
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

  createLights() {
    // A hemisphere light is a gradient colored light; 
    // the first parameter is the sky color, the second parameter is the ground color, 
    // the third parameter is the intensity of the light
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)

    const ambientLight = new THREE.AmbientLight(0xdc8874, .5);
  
    // A directional light shines from a specific direction. 
    // It acts like the sun, that means that all the rays produced are parallel. 
    const shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    
    // Set the direction of the light  
    shadowLight.position.set(150, 350, 350);
    
    // Allow shadow casting 
    shadowLight.castShadow = true;
  
    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
  
    // define the resolution of the shadow; the higher the better, 
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;
    
    // to activate the lights, just add them to the scene
    this.scene.add(hemisphereLight);  
    this.scene.add(shadowLight);
    this.scene.add(ambientLight);
  }

  addObject(object) {
    this.scene.add(object.mesh);
  }

  updateCameraFov(fov) {
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default Scene;