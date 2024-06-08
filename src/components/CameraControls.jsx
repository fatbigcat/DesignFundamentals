import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

extend({ OrbitControls });

export default function CameraController() {
    const controls = useRef();
    const { camera, gl } = useThree();

    const [keys, setKeys] = useState({
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
    });
    const [rotationVelocity, setRotationVelocity] = useState({
        theta: 0,
        phi: 0,
      });
    
    const dampingFactor = 0.9;

    useEffect(() => {
        const handleKeyDown = (event) => {
            setKeys((prevKeys) => ({ ...prevKeys, [event.key]: true }));
        };
        const handleKeyUp = (event) => {
            setKeys((prevKeys) => ({ ...prevKeys, [event.key]: false }));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame(() => {
        const rotationSpeed = 0.005;
        let newThetaVelocity = rotationVelocity.theta;
        let newPhiVelocity = rotationVelocity.phi;
    
        if (keys.ArrowUp) {
          newPhiVelocity -= rotationSpeed;
        }
        if (keys.ArrowDown) {
          newPhiVelocity += rotationSpeed;
        }
        if (keys.ArrowLeft) {
          newThetaVelocity -= rotationSpeed;
        }
        if (keys.ArrowRight) {
          newThetaVelocity += rotationSpeed;
        }
    
        // Apply damping
        newThetaVelocity *= dampingFactor;
        newPhiVelocity *= dampingFactor;
    
        // Update rotation velocity state
        setRotationVelocity({ theta: newThetaVelocity, phi: newPhiVelocity });
        if (controls.current) {
          const spherical = new THREE.Spherical();
          spherical.setFromVector3(camera.position);
    
          spherical.theta += newThetaVelocity;
          spherical.phi += newPhiVelocity;
    
          // Prevent camera flipping
          spherical.phi = Math.max(0.01, Math.min(Math.PI - 0.01, spherical.phi));
    
          camera.position.setFromSpherical(spherical);
          camera.lookAt(controls.current.target);
          controls.current.update();
        }
      });

    return (
        <OrbitControls
            ref={controls}
            args={[camera, gl.domElement]}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            maxDistance={100}
            minDistance={0}
            zoomSpeed={1.2}
            enableDamping:true
        />
    );
}
