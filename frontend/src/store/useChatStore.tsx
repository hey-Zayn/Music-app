import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface chatStore {
    users: any[],
    fetchUsers: () => Promise<void>,
    isLoading: boolean,
    error: string | null
}


export const useChatStore = create <chatStore> ((set) => ({
    users: [],
    isLoading: false,
    error: null,
    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.get('/users').then((res) => {
                const response = res.data.user;
                set({ users: response })
                // console.log(response);

            })
        } catch (error) {
            set({ error: error.response.data.message })
        } finally {
            set({ isLoading: false })
        }
    },
}))

