import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { Button } from '@material-ui/core';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class App extends Component {

    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
    }
    
    sceneSetup = () => {
  
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      this.controls = new OrbitControls( this.camera, this.el );
      
      // set some distance from a cube that is located at z = 0
      this.camera.position.z = 5;
  
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.renderer.setClearColor("#A4A4A4");
      this.el.appendChild( this.renderer.domElement ); // mount using React ref

    };

    addCustomSceneObjects = () => {
      //const geometry = new THREE.BoxGeometry(2, 2, 2);
      /*const material = new THREE.MeshPhongMaterial( {
          color: 0x156289,
          emissive: 0x072534,
          side: THREE.DoubleSide,
          flatShading: true
      } );
      this.cube = new THREE.Mesh( geometry, material );
      this.scene.add( this.cube );*/

      this.loader = new GLTFLoader();

      this.loader.load( './Flamingo.glb', gltf => {
        gltf.scene.scale.set(0.02, 0.02, 0.02);
        gltf.scene.name="test";
        this.scene.add( gltf.scene );
       
       } );
  
      const lights = [];
      lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  
      lights[ 0 ].position.set( 0, 200, 0 );
      lights[ 1 ].position.set( 100, 200, 100 );
      lights[ 2 ].position.set( - 100, - 200, - 100 );
  
      this.scene.add( lights[ 0 ] );
      this.scene.add( lights[ 1 ] );
      this.scene.add( lights[ 2 ] );
    };
      
    startAnimationLoop = () => {
    this.renderer.render( this.scene, this.camera );
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };
    
    change1 = () =>{
      this.loader.load( './Horse.glb', gltf => {
        this.scene.remove( this.scene.getObjectByName("test") );
        gltf.scene.scale.set(0.015, 0.015, 0.015);
        gltf.scene.name="test1";
        this.scene.add( gltf.scene );
      });
    };

    change2 = () =>{
      this.loader.load( './Flamingo.glb', gltf => {
        this.scene.remove( this.scene.getObjectByName("test1") );
        gltf.scene.scale.set(0.015, 0.015, 0.015);
        gltf.scene.name="test";
        this.scene.add( gltf.scene );
      });
    };

    render() {
        return (
        <div style={style} ref={ref => (this.el = ref)} >
          <Button variant="outlined" color="secondary" onClick={this.change1}>Caballo</Button>
          <Button style={{marginLeft: 20}} variant="outlined" color="secondary" onClick={this.change2}>Flamengo</Button>
        </div>
        );
    }
}

const style={
  background: 'black',
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
