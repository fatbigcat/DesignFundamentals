// SparkleTest.jsx
import React from 'react';
import Sparkles from './Sparkles';
import { Html } from '@react-three/drei';

const SparkleTest = () => {
    return (
        <Html>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    background: '#83a4d4',
                }}>
                <Sparkles>
                    <img
                        src="/assets/images/mai-col/town_colorAdjusted.png"
                        alt="Top Slide"
                        style={{
                            background: 'none',
                            border: 'none',
                            width: '300px',
                            height: '300px',
                        }}
                    />
                </Sparkles>
            </div>
        </Html>
    );
};

export default SparkleTest;
