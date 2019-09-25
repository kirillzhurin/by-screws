import './index.scss';
import Scene from './Scene';
import Sea from './Sea';
import Sky from './Sky';
import createLights from './lights';

window.addEventListener('load', () => {
  const container = document.getElementById('world');
  // set up the scene, the camera and the renderer
  const scene = new Scene({ container });
  
  // add the lights
  createLights(scene);

  const sea = new Sea();
  sea.setPositionY(-600);
  scene.addObject(sea);

  const sky = new Sky();
  sky.setPositionY(-600);
  scene.addObject(sky);

  scene.render();
  
});