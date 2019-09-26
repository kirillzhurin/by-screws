import * as THREE from 'three';
import { COLORS } from './config';

class Airplane {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.createCabin();
    this.createEngine();
    this.createTail();
    this.createWing();
    this.createPropeller();
  }

  createCabin() {
    // BoxGeometry params width, height, depth, widthSegments, heightSegments, depthSegments
    const geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
    const matCockpit = new THREE.MeshPhongMaterial({
      color: COLORS.red, 
      shading: THREE.FlatShading
    });
    const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
  }

  createEngine() {
    const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    const matEngine = new THREE.MeshPhongMaterial({
      color: COLORS.white, 
      shading: THREE.FlatShading
    });
    const engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);
  }

  createTail() {
    const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    const matTailPlane = new THREE.MeshPhongMaterial({
      color: COLORS.red, 
      shading: THREE.FlatShading
    });
    const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);
  }

  createWing() {
    const geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    const matSideWing = new THREE.MeshPhongMaterial({
      color: COLORS.red, 
      shading: THREE.FlatShading
    });
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);
  }

  createPropeller() {
    const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    const matPropeller = new THREE.MeshPhongMaterial({
      color: COLORS.brown, 
      shading: THREE.FlatShading
    });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // blades
    const geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    const matBlade = new THREE.MeshPhongMaterial({
      color: COLORS.brownDark,
      shading: THREE.FlatShading
    });
    
    const blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);
  }

  setPositionY(value) {
    this.mesh.position.y = value;
  }

  setPositionX(value) {
    this.mesh.position.x = value;
  }

  setPositionZ(value) {
    this.mesh.position.z = value;
  }

  setScale(x, y, z) {
    this.mesh.scale.set(x, y, z)
  }

  setPropellerRotationX(value, increase = false) {
    if (increase) {
      this.propeller.rotation.x += value;
    } else {
      this.propeller.rotation.x = value;
    }
    
  }

}

export default Airplane;