
import { usePlayerStore } from '@/store/usePlayerStore';
import React, { useEffect, useRef } from 'react'

const AuidoPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext, playPrevious } = usePlayerStore()

    // handle play/pause Logic
    useEffect(() => {
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying]);

    // handle play/pause Logic
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            playNext();
        }
        audio?.addEventListener('ended', handleEnded)

        return () => audio?.removeEventListener("ended", handleEnded);
    }, [playNext]);


    useEffect(() => {
        if (!audioRef.current || !currentSong) return;
        const audio = audioRef.current;
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
        if (isSongChange) {
            audio.src = currentSong?.audioUrl;
            // reset the playback position
            audio.currentTime = 0;

            prevSongRef.current = currentSong?.audioUrl;

            if (isPlaying) audio.play();
        }

    }, [currentSong, isPlaying])

    return (
        <audio ref={audioRef} />
    )
}

export default AuidoPlayer