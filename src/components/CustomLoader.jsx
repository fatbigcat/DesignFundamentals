import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
                <motion.img
                    animate={{ x: 100 }}
                    transition={{ delay: 1 }}
                    src="/assets/images/mai-col/town_colorAdjusted.png"
                    alt="Top Slide"
                    className={"slide-top" + (clickCount === 0 ? " slide-in" : "")}
                    style={{ background: 'none', border: 'none' }}
                />
            )}
            {clickCount === 1 && (
                <div className="slide-bottom slide-in"></div>
            )}
        </div>
    );
};

export default CustomLoader;
