import { Key } from "./fluent-keys";

describe("fluent keys", () => {
	it("should invoke 'then' function if key pressed matches", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.matches("Enter").then(outcome);

		onKeyboardEvent({ key: "Enter", ctrlKey: false, shiftKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should not invoke 'then' function if key doesn't match", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.matches("Enter").then(outcome);

		onKeyboardEvent({ key: "Escape", ctrlKey: false, shiftKey: false, altKey: false });
		
		expect(outcome).not.toHaveBeenCalled();
	});

	it("should invoke 'then' function if any key pressed matches", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.matches("Enter", "Escape", "x").then(outcome);

		onKeyboardEvent({ key: "Escape", ctrlKey: false, shiftKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should not invoke 'then' function if no key pressed matches", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.matches("Enter", "Escape", "x").then(outcome);

		onKeyboardEvent({ key: "n", ctrlKey: false, shiftKey: false, altKey: false });
		
		expect(outcome).not.toHaveBeenCalled();
	});

	it("should invoke 'then' function if any key pressed meets regex", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.meets(/[!]/).then(outcome);

		onKeyboardEvent({ key: "!", ctrlKey: false, shiftKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should not invoke 'then' function if no key pressed meets regex", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.meets(/[a-z]/).then(outcome);

		onKeyboardEvent({ key: "A", ctrlKey: false, shiftKey: false, altKey: false });
		
		expect(outcome).not.toHaveBeenCalled();
	});

	it("should invoke 'then' function if enter key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.enter.then(outcome);

		onKeyboardEvent({ key: "Enter", ctrlKey: false, shiftKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if space bar key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.space.then(outcome);

		onKeyboardEvent({ key: " ", ctrlKey: false, shiftKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if escape key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.escape.then(outcome);

		onKeyboardEvent({ key: "Escape", ctrlKey: false, shiftKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if any letter key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.letter.then(outcome);
		const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'Z', 'Y', 'X', 'r'];

		letters.forEach(letter => onKeyboardEvent({ key: letter, ctrlKey: false, shiftKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(letters.length);
	});

	it("should invoke 'then' function if any lower case letter key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.lowercase.letter.then(outcome);
		const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'Z', 'Y', 'X', 'r'];

		letters.forEach(letter => onKeyboardEvent({ key: letter, ctrlKey: false, shiftKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(8);
	});

	it("should invoke 'then' function if any uppercase letter key is pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.uppercase.letter.then(outcome);
		const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'Z', 'Y', 'X', 'r'];

		letters.forEach(letter => onKeyboardEvent({ key: letter, ctrlKey: false, shiftKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(3);
	});

	it("should invoke 'then' function if any numeral key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.numeral.then(outcome);
		const numerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

		numerals.forEach(numeral => onKeyboardEvent({ key: numeral, ctrlKey: false, shiftKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(numerals.length);
	});

	it("should invoke 'then' function if any alphanumeric key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.alphanumeric.then(outcome);
		const characters = ['0', '4', '9', 'A', 'z'];

		characters.forEach(character => onKeyboardEvent({ key: character, ctrlKey: false, shiftKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(characters.length);
	});

	it("should invoke 'then' function if Ctrl+o key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.ctrl.and("o").then(outcome);

		onKeyboardEvent({ key: "o", ctrlKey: true, shiftKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if Ctrl+Shift+? key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.ctrl.and("?").then(outcome);

		onKeyboardEvent({ key: "?", ctrlKey: true, shiftKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if shift+f key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.shift.and("F").then(outcome);

		onKeyboardEvent({ key: "F", ctrlKey: false, shiftKey: true, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if ctrl+alt+delete key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.ctrl.alt.plus("delete").then(outcome);

		onKeyboardEvent({ key: "delete", ctrlKey: true, shiftKey: false, altKey: true });
		
		expect(outcome).toHaveBeenCalled();
	});
});