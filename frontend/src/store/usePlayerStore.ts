import type { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,
    
    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: songs[0] || null, // CRITICAL FIX: was get().currentSong || [0]
            currentIndex: 0 // CRITICAL FIX: was using old currentIndex
        });
    },
    
    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const index = Math.max(0, Math.min(startIndex, songs.length - 1));
        const song = songs[index];
        
        set({
            queue: songs,
            currentSong: song,
            currentIndex: index,
            isPlaying: true,
        });
    },
    
    setCurrentSong: (song: Song | null) => {
        if (!song) {
            set({ 
                currentSong: null, 
                isPlaying: false,
                currentIndex: -1 
            });
            return;
        }

        const songIndex = get().queue.findIndex(s => s._id === song._id);
        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
        });
    },
    
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;
        set({
            isPlaying: willStartPlaying,
        });
    },
    
    playNext: () => {
        const { currentIndex, queue } = get();
        
        if (queue.length === 0) return;
        
        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        } else {
            // Stop at the end or loop to start
            set({ 
                isPlaying: false,
                // Optional: loop to start
                // currentIndex: 0,
                // currentSong: queue[0]
            });
        }
    },
    
    playPrevious: () => {
        const { currentIndex, queue } = get();
        
        if (queue.length === 0) return;
        
        const prevIndex = currentIndex - 1;

        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex];
            set({
                currentSong: prevSong,
                currentIndex: prevIndex,
                isPlaying: true,
            });
        } else {
            // Stop at the beginning or loop to end
            set({ 
                isPlaying: false,
                // Optional: loop to end
                // currentIndex: queue.length - 1,
                // currentSong: queue[queue.length - 1]
            });
        }
    },
}));