export interface ConstrainedKeyboardEvent {
	key: string;
	shiftKey: boolean;
	ctrlKey: boolean;
	altKey: boolean;
}

export type ConstrainedKeyboardEventHandler = (event: ConstrainedKeyboardEvent) => void;