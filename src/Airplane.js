import * as THREE from 'three';
import Pilot from './Pilot';
import { COLORS } from './config';

class Airplane {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.createCabin();
    this.createEngine();
    this.createTail();
    this.createWing();
    this.createWindshield();
    this.createPropeller();
    this.createWheels()
    this.addPilot();
  }

  createCabin() {
    // BoxGeometry params width, height, depth, widthSegments, heightSegments, depthSegments
    const geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
    const matCockpit = new THREE.MeshPhongMaterial({
      color: COLORS.red, 
      shading: THREE.FlatShading
    });
    // we can access a specific vertex of a shape through
    // the vertices array, and then move its x, y and z property:
    geomCockpit.vertices[4].y -= 10;
    geomCockpit.vertices[4].z += 20;
    geomCockpit.vertices[5].y -= 10;
    geomCockpit.vertices[5].z -= 20;
    geomCockpit.vertices[6].y += 30;
    geomCockpit.vertices[6].z += 20;
    geomCockpit.vertices[7].y += 30;
    geomCockpit.vertices[7].z -= 20;

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
    engine.position.x = 50;
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
    tailPlane.position.set(-40, 20, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);
  }

  createWing() {
    const geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1);
    const matSideWing = new THREE.MeshPhongMaterial({
      color: COLORS.red, 
      shading: THREE.FlatShading
    });
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.position.set(0, 15, 0);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);
  }

  createWindshield() {
    const geomWindshield = new THREE.BoxGeometry(3,15,20,1,1,1);
    const matWindshield = new THREE.MeshPhongMaterial({
      color: COLORS.white,
      transparent:true, 
      opacity: .3,
      shading:THREE.FlatShading
    });
    const windshield = new THREE.Mesh(geomWindshield, matWindshield);
    windshield.position.set(5, 27 ,0);
    windshield.castShadow = true;
    windshield.receiveShadow = true;
    this.mesh.add(windshield);
  }

  createPropeller() {
    const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    geomPropeller.vertices[4].y -= 5;
    geomPropeller.vertices[4].z += 5;
    geomPropeller.vertices[5].y -= 5;
    geomPropeller.vertices[5].z -= 5;
    geomPropeller.vertices[6].y += 5;
    geomPropeller.vertices[6].z += 5;
    geomPropeller.vertices[7].y += 5;
    geomPropeller.vertices[7].z -= 5;
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
    
    const blade1 = new THREE.Mesh(geomBlade, matBlade);
    blade1.position.set(8, 0, 0);
    blade1.castShadow = true;
    blade1.receiveShadow = true;
    
    const blade2 = blade1.clone();
    blade2.rotation.x = Math.PI/2;

    blade2.castShadow = true;
    blade2.receiveShadow = true;

    this.propeller.add(blade1);
    this.propeller.add(blade2);
    this.propeller.position.set(60, 0, 0);
    this.mesh.add(this.propeller);
  }

  createWheels() {
    const wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
    const wheelProtecMat = new THREE.MeshPhongMaterial({
      color: COLORS.red,
      shading: THREE.FlatShading
    });
    const wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
    wheelProtecR.position.set(25, -20, 25);
    this.mesh.add(wheelProtecR);
  
    const wheelTireGeom = new THREE.BoxGeometry(24,24,4);
    const wheelTireMat = new THREE.MeshPhongMaterial({
      color: COLORS.brownDark,
      shading:THREE.FlatShading
    });
    const wheelTireR = new THREE.Mesh(wheelTireGeom,wheelTireMat);
    wheelTireR.position.set(25,-28,25);
  
    const wheelAxisGeom = new THREE.BoxGeometry(10,10,6);
    const wheelAxisMat = new THREE.MeshPhongMaterial({
      color: COLORS.brown,
      shading:THREE.FlatShading
    });
    const wheelAxis = new THREE.Mesh(wheelAxisGeom,wheelAxisMat);
    wheelTireR.add(wheelAxis);
  
    this.mesh.add(wheelTireR);
  
    const wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z ;
    this.mesh.add(wheelProtecL);
  
    const wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    this.mesh.add(wheelTireL);
  
    const wheelTireB = wheelTireR.clone();
    wheelTireB.scale.set(.5,.5,.5);
    wheelTireB.position.set(-35,-5,0);
    this.mesh.add(wheelTireB);

    const suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
    suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0))
    const suspensionMat = new THREE.MeshPhongMaterial({
      color: COLORS.red,
      shading:THREE.FlatShading
    });
    const suspension = new THREE.Mesh(suspensionGeom,suspensionMat);
    suspension.position.set(-35, -5, 0);
    suspension.rotation.z = -.3;
    this.mesh.add(suspension);
  }

  addPilot() {
    this.pilot = new Pilot();
    this.pilot.mesh.position.set(-10, 27, 0);
    this.mesh.add(this.pilot.mesh);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  getPosition(axis) {
    return this.mesh.position[axis];
  }

  setPositionY(value, increase = false) {
    if (increase) {
      this.mesh.position.y += value;
    } else {
     this.mesh.position.y = value; 
    }
  }

  setPositionX(value, increase = false) {
    if (increase) {
      this.mesh.position.x += value;
    } else {
     this.mesh.position.x = value; 
    }
  }

  setPositionZ(value, increase = false) {
    if (increase) {
      this.mesh.position.z += value;
    } else {
     this.mesh.position.z = value; 
    }
  }

  setRotationX(value, increase = false) {
    if (increase) {
      this.mesh.rotation.x += value;
    } else {
      this.mesh.rotation.x = value;
    } 
  }

  setRotationZ(value, increase = false) {
    if (increase) {
      this.mesh.rotation.z += value;
    } else {
      this.mesh.rotation.z = value;
    } 
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