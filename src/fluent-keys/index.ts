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
				return (event: React.KeyboardEvent) => {
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
				return (event: React.KeyboardEvent) => {
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
				return (event: React.KeyboardEvent) => {
					if (event.ctrlKey) {
						const toPropogate = next.then(outcome);

						toPropogate(event);
					}
				};
			}
		};
	}

	private static shift(next: Then): Then {
		return {
			then: (outcome: NullaryFunction) => {
				return (event: React.KeyboardEvent) => {
					if (event.shiftKey) {
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
		letter: Key.meets(/[a-zA-Z]/),
		space: Key.matches(" "),
		lowercase: {
			letter: Key.meets(/[a-z]/),
		},
		uppercase: {
			letter: Key.meets(/[A-Z]/),
		},
		numeral: Key.meets(new RegExp(/[0-9]/)),
		number: Key.meets(new RegExp(/[0-9]/)),
		alphanumeric: Key.meets(/[a-zA-Z0-9]/),
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
			shift: {
				meets: (regexp: RegExp) => Key.ctrl(Key.shift(Key.meets(regexp))),
				and: (...keys: string[]) => Key.ctrl(Key.shift(Key.matches(...keys))),
				plus: (...keys: string[]) => Key.ctrl(Key.shift(Key.matches(...keys))),
				matches: (...keys: string[]) => Key.ctrl(Key.shift(Key.matches(...keys))),
			},
		},
		shift: {
			meets: (regexp: RegExp) => Key.shift(Key.meets(regexp)),
			and: (...keys: string[]) => Key.shift(Key.matches(...keys)),
			plus: (...keys: string[]) => Key.shift(Key.matches(...keys)),
			matches: (...keys: string[]) => Key.shift(Key.matches(...keys)),
		}
	}
}