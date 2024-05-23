import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState, Suspense } from 'react';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Plane from '../models/Plane';
import Bird from '../models/Bird';

const Home = () => {
    const [isRotating, _setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -25];
        let rotation = [0.1, -4.7, 0];
        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }
        return [screenScale, screenPosition, rotation];
    };
    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;

        if (window.innerWidth < 768) {
            //resizing non functional
            screenScale = [1.5, 1.5, 1.5];
            screenPosition = [0, -1.5, 10];
        } else {
            screenScale = [3, 3, 10];
            screenPosition = [0, -4, 10];
        }
        return [screenScale, screenPosition];
    };
    const [islandScale, islandPosition, islandRotation] =
        adjustIslandForScreenSize();

    const [planeScale, planePosition] = adjustPlaneForScreenSize();
    console.log(planePosition);
    return (
        <section className="w-full h-screen relative">
            {/*<div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                POPUP

            </div>*/}
            <Canvas
                className={`w-full h-screen bg-transparent ${
                    isRotating ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                camera={{ near: 0.001, far: 1000 }}>
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[10, 5, 10]} intensity={0.1} />
                    <ambientLight intensity={1.7} />
                    {/*<pointLight />*/}
                    <hemisphereLight
                        skyColor="#b1e1ff"
                        groundColor="#000000"
                        intensity={1}
                    />
                    <Bird />
                    <Sky isRotating={isRotating} />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        _setIsRotating={_setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane
                        isRotating={isRotating}
                        planeScale={planeScale}
                        planePosition={planePosition}
                        rotation={[0, 20, 0]}
                    />
                    <OrbitControls
                        enableZoom={true}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 3}
                        maxDistance={50}
                        minDistance={0}
                        zoomSpeed={1.2}
                    />
                </Suspense>
            </Canvas>
        </section>
    );
};

export default Home;