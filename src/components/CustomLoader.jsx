import React, { useState } from 'react';
import '../index.css';

const CustomLoader = ({ onClick }) => {
    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
        if (clickCount < 1) {
            setClickCount(clickCount + 1);
        } else {
            if (onClick) onClick();
        }
    };

    return (
        <div className="custom-loader" onClick={handleClick}>
            {clickCount === 0 && (
                <img
                    src="/assets/images/mai-col/town_colorAdjusted.png"
                    alt="Top Slide"
                    className="loader-image"
                    style={{ background: 'none', border: 'none' }}
                />
            )}
            {clickCount === 1 && (
                <img
                    src="/assets/images/mai-col/parchment.png"
                    alt="Bottom Slide"
                    className="loader-image"
                    style={{ background: 'none', border: 'none' }}
                />
            )}
        </div>
    );
};

export default CustomLoader;
