import './index.scss';
import Scene from './Scene';
import createLights from './lights';

window.addEventListener('load', () => {
  const container = document.getElementById('world');
  // set up the scene, the camera and the renderer
  const scene = new Scene({ container });
  
  // add the lights
  createLights(scene);

  
});