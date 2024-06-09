import React, { useState, useRef, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

function AudioPlayer() {
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="audio-player">
            <audio
                ref={audioRef}
                src="src/assets/calmContinuous.mp3"
                autoPlay
                loop
            />
            <button onClick={toggleMute}>
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                disabled={isMuted}
            />
        </div>
    );
}

export default AudioPlayer;
