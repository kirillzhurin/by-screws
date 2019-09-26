const animation = (scene, sea, sky, airplane) => {
  const mousePos={x: 0, y: 0};

  // now handle the mousemove event
  const handleMouseMove = event => {

    // here we are converting the mouse position value received 
    // to a normalized value varying between -1 and 1;
    // this is the formula for the horizontal axis:
    
    var tx = (event.clientX / scene.WIDTH) * 2 - 1;

    // for the vertical axis, we need to inverse the formula 
    // because the 2D y-axis goes the opposite direction of the 3D y-axis
    
    var ty = 1 - (event.clientY / scene.HEIGHT) * 2;
    mousePos.x = tx;
    mousePos.y = ty;

  }

  document.addEventListener('mousemove', handleMouseMove, false);

  const loop = () => {
    // Rotate the propeller, the sea and the sky
    sea.setRotationZ(.005, true);
    sky.setRotationZ(.005, true);
    updatePlane();
    scene.updateCameraFov(normalize(mousePos.x, -1, 1, 40, 80));
    airplane.pilot.updateHairs();
    sea.moveWaves();
    
    scene.render();

    requestAnimationFrame(loop);
  }

  const updatePlane = () => {
    // let's move the airplane between -100 and 100 on the horizontal axis, 
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)
    
    // var targetX = normalize(mousePos.x, -1, 1, -150, 150);
    // var targetY = normalize(mousePos.y, -1, 1, 25, 175);

    // // update the airplane's position
    // airplane.setPositionX(targetX);
    // airplane.setPositionY(targetY);
    
    // airplane.setPropellerRotationX(.3, true);

    var targetY = normalize(mousePos.y, -.75, .75, 25, 175);
	  var targetX = normalize(mousePos.x, -.75, .75, -100, 100);
	
    // Move the plane at each frame by adding a fraction of the remaining distance
    airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * .1;

    // Rotate the plane proportionally to the remaining distance
    airplane.setRotationZ((targetY - airplane.getPosition('y')) * .0128);
    airplane.setRotationX((airplane.getPosition('y') - targetY) * .0064);

	  airplane.propeller.rotation.x += .3;
  }

  const normalize = (v, vmin, vmax, tmin, tmax) =>{

    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + (pc * dt);
    return tv;
  }

  loop();
}

export default animation;
