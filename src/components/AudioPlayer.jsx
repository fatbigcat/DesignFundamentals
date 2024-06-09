import React, { useState, useRef, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

function AudioPlayer() {
    const [isMuted, setIsMuted] = useState(true); // Start muted to comply with autoplay policy
    const [volume, setVolume] = useState(0.0); // Start with volume at 0
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    useEffect(() => {
        if (audioRef.current) {
            // Play the audio initially muted
            audioRef.current
                .play()
                .then(() => {
                    // Unmute the audio after a few seconds and gradually increase the volume
                    setTimeout(() => {
                        setIsMuted(false); // Unmute the audio

                        let volumeInterval = setInterval(() => {
                            setVolume((prevVolume) => {
                                if (prevVolume >= 0.5) {
                                    // Adjust the target volume as needed
                                    clearInterval(volumeInterval);
                                    return 0.5;
                                }
                                return prevVolume + 0.01; // Adjust the increment as needed
                            });
                        }, 100); // Adjust the interval time as needed
                    }, 3000); // Unmute after 3 seconds, adjust the delay as needed
                })
                .catch((error) => {
                    console.error('Audio play failed:', error);
                });
        }
    }, []);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="audio-player">
            <audio ref={audioRef} src="src/assets/calmContinuous.mp3" loop />
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
