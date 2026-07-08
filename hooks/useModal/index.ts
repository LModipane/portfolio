import { create } from 'zustand';

type Model = 'AUTH' | null;

type ModelStore = {
	type: Model;
	isOpen: boolean;
	onClose: () => void;
	onOpen: (type: Model) => void;
};

const useModel = create<ModelStore>(set => ({
	data: {},
	type: null,
	isOpen: false,
	onClose: () => set({ type: null, isOpen: false }),
	onOpen: (type: Model) => set({ type, isOpen: true }),
}));

export default useModel;
