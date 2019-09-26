import * as THREE from 'three';
import { COLORS } from './config';

class Cloud {
  constructor() {
    // Create an empty container that will hold the different parts of the cloud
    this.mesh = new THREE.Object3D();
    
    // create a cube geometry;
    // this shape will be duplicated to create the cloud
    const geom = new THREE.BoxGeometry(20, 20, 20);
    
    // create a material; a simple white material will do the trick
    const mat = new THREE.MeshPhongMaterial({
      color: COLORS.white,  
    });
    
    // duplicate the geometry a random number of times
    const nBlocs = 3 + ~~(Math.random() * 3);
    for (let i = 0; i < nBlocs; i++) {
      // create the mesh by cloning the geometry
      const subMesh = new THREE.Mesh(geom, mat);
      
      // set the position and the rotation of each cube randomly
      subMesh.position.x = i * 15;
      subMesh.position.y = Math.random() * 10;
      subMesh.position.z = Math.random() * 10;
      subMesh.rotation.z = Math.random() * Math.PI * 2;
      subMesh.rotation.y = Math.random() * Math.PI * 2;

      // set the size of the cube randomly
      const size = .1 + Math.random() * .9;
      
      subMesh.scale.set(size, size, size);
      
      // allow each cube to cast and to receive shadows
      subMesh.castShadow = true;
      subMesh.receiveShadow = true;
      
      // add the cube to the container we first created
      this.mesh.add(subMesh);
    }
  }
}

export default Cloud;