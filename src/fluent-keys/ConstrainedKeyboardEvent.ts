export interface ConstrainedKeyboardEvent {
	key: string;
	ctrlKey: boolean;
	altKey: boolean;
}

export type ConstrainedKeyboardEventHandler = (event: ConstrainedKeyboardEvent) => void;