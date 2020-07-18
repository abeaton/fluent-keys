import { NullaryFunction } from "./NullaryFunction";
import { ConstrainedKeyboardEventHandler } from "./ConstrainedKeyboardEvent";

export interface Then {
	then: (outcome: NullaryFunction) => ConstrainedKeyboardEventHandler;
}