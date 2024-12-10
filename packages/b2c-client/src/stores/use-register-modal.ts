import { create } from 'zustand';

type State = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useRegisterModal = create<State>()((set) => ({
    open: false,
    onOpen: () => set(() => ({ open: true })),
    onClose: () => set(() => ({ open: false })),
}));
