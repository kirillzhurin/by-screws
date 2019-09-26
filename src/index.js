import './index.scss';
import Scene from './Scene';
import Sea from './Sea';
import Sky from './Sky';
import Airplane from './Airplane';
import animation from './animation';

window.addEventListener('load', () => {
  const container = document.getElementById('world');
  // set up the scene, the camera and the renderer
  const scene = new Scene({ container });

  const sea = new Sea();
  sea.setPositionY(-600);
  scene.addObject(sea);

  const sky = new Sky();
  sky.setPositionY(-600);
  scene.addObject(sky);

  const airplane = new Airplane();
  airplane.setScale(.25, .25, .25);
  airplane.setPositionY(100);
  scene.addObject(airplane);
  animation(scene, sea, sky, airplane);
  
});