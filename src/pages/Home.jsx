import { Canvas, useThree } from '@react-three/fiber';
import { useState, Suspense, useEffect, useRef } from 'react';
import Sky from '../models/Sky';
import { Town } from '../models/Island';
import CameraController from '../components/CameraControls';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import CustomLoader from '../components/CustomLoader';
import '../index.css';
gsap.registerPlugin(MotionPathPlugin);

const Home = () => {
    const [isRotating, _setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [showLoader, setShowLoader] = useState(true);
    const cameraRef = useRef();
    const handleLoaderClick = () => {
        console.log('Loader clicked, hiding loader');
        setShowLoader(false);
    };

    if (!showLoader && cameraRef.current) {
        gsap.to(cameraRef.current.position, {
            //camera animations
            duration: 2,
            motionPath: {
                path: [
                    // { x: 30, y: 20, z: 30 }, // Top view
                    { x: 0, y: 0, z: 35 }, // Final position facing the building
                ],
                curviness: 1.25,
                autoRotate: true, //align camera with path
                ease: 'power1.out',
            },
            onUpdate: () => {
                cameraRef.current.lookAt(0, 0, 0); // Look at the center of the scene
            },
        });
    }

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [-1, -7.5, 5];
        let rotation = [0, -4.7, 0];
        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }
        return [screenScale, screenPosition, rotation];
    };

    // const adjustFishForScreenSize = () => {
    //     let screenScale, screenPosition;

    //     if (window.innerWidth < 768) {
    //         screenScale = [1.5, 1.5, 1.5];
    //         screenPosition = [0, 2, 30];
    //     } else {
    //         screenScale = [3, 3, 10];
    //         screenPosition = [0, 1, 30];
    //     }
    //     return [screenScale, screenPosition];
    // };

    // const [fishScale, fishPosition] = adjustFishForScreenSize();
    const [islandScale, islandPosition, islandRotation] =
        adjustIslandForScreenSize();
    useEffect(() => {
        console.log('Loader visibility changed:', showLoader);
    }, [showLoader]);

    return (
        <section className="w-full h-screen relative">
            {showLoader && <CustomLoader onClick={handleLoaderClick} />}
            {/*<div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                POPUP

            </div>*/}
            <Canvas
                className={`w-full h-screen bg-transparent ${
                    isRotating ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{
                    cursor: 'url(src/assets/images/Hand-Reaching-Out3.png) 9 5, auto',
                }}
                camera={{ position: [30, 15, 30], near: 0.01, far: 1000 }}
                onCreated={({ camera }) => {
                    //you need to tell it what to put in the ref
                    cameraRef.current = camera;
                    camera.lookAt(0, 0, 0); //initial look at the center of the scene
                }}>
                <Suspense fallback={null}>
                    <directionalLight position={[10, 5, 10]} intensity={0.1} />
                    <ambientLight intensity={1.7} color="#fce1bb" />
                    {/*<pointLight />*/}
                    <hemisphereLight
                        skyColor="#b1e1ff"
                        groundColor="#000000"
                        intensity={1}
                    />
                    <Sky isRotating={isRotating} />
                    <Town
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        _setIsRotating={_setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <CameraController />
                </Suspense>
            </Canvas>
            {!showLoader}
        </section>
    );
};

export default Home;
