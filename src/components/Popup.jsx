import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import '../index.css';

function Popup({ images, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleClick = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose(); // Close the popup if it's the last image
        }
    };

    useEffect(() => {
        const img = new Image();
        img.src = images[currentIndex];
        img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
        };
    }, [currentIndex, images]);

    return (
        <Html
            fullscreen
            // wrapperClass="underlay"
            style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            scaleFactor={80}
            zIndexRange={[100, 0]}
            onPointerOver={(e) => {
                on;
            }}>
            <div
                className="popup"
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
                onPointerOver={(e) => {
                    console.log('ppp');
                }}
                style={{
                    width: `${2 * imageDimensions.width}px`,
                    height: `${2 * imageDimensions.height}px`,
                    backgroundImage: `url(${images[currentIndex]})`,
                }}>
                <div className="popup-content">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}>
                        🗙
                    </button>
                </div>
            </div>
        </Html>
    );
}

export default Popup;
