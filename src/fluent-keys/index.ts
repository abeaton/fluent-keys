import { Then } from "./Then";
import { NullaryFunction } from "./NullaryFunction";
import { ConstrainedKeyboardEvent } from "./ConstrainedKeyboardEvent";

export class Key {
	static readonly matches = (...keys: string[]): Then => {
		return {
			then: (outcome: NullaryFunction) => {
				return (event: ConstrainedKeyboardEvent) => {
					if (keys.some(key => key === event.key)) {
						outcome();
					}
				};
			}
		};
	}

	static readonly meets = (regexp: RegExp): Then => {
		return {
			then: (outcome: NullaryFunction) => {
				return (event: ConstrainedKeyboardEvent) => {
					if (regexp.test(event.key)) {
						outcome();
					}
				};
			}
		};
	}

	private static ctrl(next: Then): Then {
		return {
			then: (outcome: NullaryFunction) => {
				return (event: ConstrainedKeyboardEvent) => {
					if (event.ctrlKey) {
						const toPropogate = next.then(outcome);

						toPropogate(event);
					}
				};
			}
		};
	}

	private static alt(next: Then): Then {
		return {
			then: (outcome: NullaryFunction) => {
				return (event: ConstrainedKeyboardEvent) => {
					if (event.ctrlKey) {
						const toPropogate = next.then(outcome);

						toPropogate(event);
					}
				};
			}
		};
	}

	static readonly is = {
		enter: Key.matches("Enter"),
		escape: Key.matches("Escape"),
		letter: Key.meets(/^[a-zA-Z]{1}$/),
		space: Key.matches(" "),
		backspace: Key.matches("Backspace"),
		delete: Key.matches("Delete"),
		lowercase: {
			letter: Key.meets(/^[a-z]{1}$/),
		},
		uppercase: {
			letter: Key.meets(/^[A-Z]{1}$/),
		},
		numeral: Key.meets(new RegExp(/^[0-9]{1}$/)),
		number: Key.meets(new RegExp(/^[0-9]{1}$/)),
		alphanumeric: Key.meets(/^[a-zA-Z0-9]{1}$/),
		ctrl: {
			meets: (regexp: RegExp) => Key.ctrl(Key.meets(regexp)),
			and: (...keys: string[]) => Key.ctrl(Key.matches(...keys)),
			plus: (...keys: string[]) => Key.ctrl(Key.matches(...keys)),
			matches: (...keys: string[]) => Key.ctrl(Key.matches(...keys)),
			alt: {
				meets: (regexp: RegExp) => Key.ctrl(Key.alt(Key.meets(regexp))),
				and: (...keys: string[]) => Key.ctrl(Key.alt(Key.matches(...keys))),
				plus: (...keys: string[]) => Key.ctrl(Key.alt(Key.matches(...keys))),
				matches: (...keys: string[]) => Key.ctrl(Key.alt(Key.matches(...keys))),
			},
		},
	}
}