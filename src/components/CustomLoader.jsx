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
                    src="src/assets/images/mai-col/town_colorAdjusted.png"
                    alt="Top Slide"
                    className="slide-top"
                    style={{ background: 'none', border: 'none' }}
                />
            )}
            {clickCount === 1 && <div className="slide-bottom"></div>}
        </div>
    );
};

export default CustomLoader;
