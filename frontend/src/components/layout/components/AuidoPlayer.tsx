import { usePlayerStore } from '@/store/usePlayerStore';
import React, { useEffect, useRef } from 'react'

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext, playPrevious, repeatMode } = usePlayerStore()

    // Handle play/pause logic
    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    // Handle song ended event with repeat logic
    useEffect(() => {
        const audio = audioRef.current;
        
        const handleEnded = () => {
            if (repeatMode === 'one') {
                // For repeat one mode, restart the same song
                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(console.error);
                }
            } else {
                // For other modes, go to next song
                playNext();
            }
        };
        
        audio?.addEventListener('ended', handleEnded);

        return () => {
            audio?.removeEventListener("ended", handleEnded);
        };
    }, [playNext, repeatMode]);

    // Handle song change
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;
        
        const audio = audioRef.current;
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
        
        if (isSongChange) {
            audio.src = currentSong?.audioUrl;
            // Reset the playback position
            audio.currentTime = 0;
            prevSongRef.current = currentSong?.audioUrl;

            // Auto-play if needed
            if (isPlaying) {
                audio.play().catch(error => {
                    console.error('Error playing new song:', error);
                });
            }
        }

    }, [currentSong, isPlaying]);

    // Handle repeat mode changes to update audio loop property
    useEffect(() => {
        if (audioRef.current) {
            // Set loop property for repeat one mode (HTML5 native looping)
            audioRef.current.loop = repeatMode === 'one';
        }
    }, [repeatMode]);

    return (
        <audio 
            ref={audioRef} 
            // Optional: Add these for better error handling
            onError={(e) => console.error('Audio error:', e)}
            onCanPlay={() => console.log('Audio can play')}
            onLoadStart={() => console.log('Audio loading started')}
        />
    )
}

export default AudioPlayer;