import { create } from 'zustand';

type User = {
    email: string;
    username: string;
    fullName: string | null
    age: number | null;
    lastSeen: number | null;
};

type Action = {
    updateEmail: (email: string) => void
    updateUsername: (username: string) => void
    updateAge: (age: number) => void
    updateLastSeen: (lastSeen: number) => void
}

const useUserStore = create<User & Action>((set) => ({
    email: "",
    username: "",
    age: null,
    lastSeen: null,
    fullName: "Andrii Albrekht",
    updateEmail: (email: string) => set(() => ({ email: email })),
    updateUsername: (username: string) => set(() => ({ username: username })),
    updateAge: (age: number) => set(() => ({ age: age })),
    updateLastSeen: (lastSeen: number) => set(() => ({ lastSeen: lastSeen })),
    updateFullName: (fullName: string) => set(() => ({ fullName: fullName })),
}));

const useAppStore = create((set) => ({
    isLoggedIn: false,
    updateIsLoggedIn: (boolean: boolean) => set(() => ({ isLoggedIn: boolean })),
}));

export { useAppStore, useUserStore };