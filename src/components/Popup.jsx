import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import '../index.css';

function Popup({ images, onClose, clickedMeshes, prerequisites, meshName }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleClick = () => {
        const prerequisite = prerequisites[meshName];
        if (currentIndex === 0) {
            if (prerequisite && !clickedMeshes[prerequisite]) {
                onClose();
            }
        }
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
            scaleFactor={100}
            zIndexRange={[100, 0]}>
            <div
                className="underlay"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}>
                <div
                    className="popup"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                    }}
                    style={{
                        width: `${imageDimensions.width}px`,
                        height: `${imageDimensions.height}px`,
                        backgroundImage: `url(${images[currentIndex]})`,
                    }}>
                    <div className="popup-content"></div>
                </div>
            </div>
        </Html>
    );
}

export default Popup;
