import { Key } from "./fluent-keys";

describe("fluent keys", () => {
	it("should invoke 'then' function if key pressed matches", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.matches("Enter").then(outcome);

		onKeyboardEvent({ key: "Enter", ctrlKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should not invoke 'then' function if key doesn't match", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.matches("Enter").then(outcome);

		onKeyboardEvent({ key: "Escape", ctrlKey: false, altKey: false });
		
		expect(outcome).not.toHaveBeenCalled();
	});

	it("should invoke 'then' function if any key pressed matches", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.matches("Enter", "Escape", "x").then(outcome);

		onKeyboardEvent({ key: "Escape", ctrlKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should not invoke 'then' function if no key pressed matches", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.matches("Enter", "Escape", "x").then(outcome);

		onKeyboardEvent({ key: "n", ctrlKey: false, altKey: false });
		
		expect(outcome).not.toHaveBeenCalled();
	});

	it("should invoke 'then' function if any key pressed meets regex", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.meets(/[!]/).then(outcome);

		onKeyboardEvent({ key: "!", ctrlKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should not invoke 'then' function if no key pressed meets regex", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.meets(/[a-z]/).then(outcome);

		onKeyboardEvent({ key: "A", ctrlKey: false, altKey: false });
		
		expect(outcome).not.toHaveBeenCalled();
	});

	it("should invoke 'then' function if enter key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.enter.then(outcome);

		onKeyboardEvent({ key: "Enter", ctrlKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if space bar key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.space.then(outcome);

		onKeyboardEvent({ key: " ", ctrlKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if Backspace key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.backspace.then(outcome);

		onKeyboardEvent({ key: "Backspace", ctrlKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if Delete key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.delete.then(outcome);

		onKeyboardEvent({ key: "Delete", ctrlKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if escape key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.escape.then(outcome);

		onKeyboardEvent({ key: "Escape", ctrlKey: false, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if any letter key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.letter.then(outcome);
		const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'Z', 'Y', 'X', 'r', '?', 'Enter', '2'];

		letters.forEach(letter => onKeyboardEvent({ key: letter, ctrlKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(11);
	});

	it("should invoke 'then' function if any lower case letter key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.lowercase.letter.then(outcome);
		const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'Z', 'Y', 'X', 'r'];

		letters.forEach(letter => onKeyboardEvent({ key: letter, ctrlKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(8);
	});

	it("should invoke 'then' function if any uppercase letter key is pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.uppercase.letter.then(outcome);
		const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'Z', 'Y', 'X', 'r'];

		letters.forEach(letter => onKeyboardEvent({ key: letter, ctrlKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(3);
	});

	it("should invoke 'then' function if any numeral key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.numeral.then(outcome);
		const numerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', '*'];

		numerals.forEach(numeral => onKeyboardEvent({ key: numeral, ctrlKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(10);
	});

	it("should invoke 'then' function if any alphanumeric key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.alphanumeric.then(outcome);
		const characters = [')', 'Escape', '0', '4', '9', 'A', 'z'];

		characters.forEach(character => onKeyboardEvent({ key: character, ctrlKey: false, altKey: false }));
		
		expect(outcome).toHaveBeenCalledTimes(5);
	});

	it("should invoke 'then' function if Ctrl+o key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.ctrl.and("o").then(outcome);

		onKeyboardEvent({ key: "o", ctrlKey: true, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if Ctrl+Shift+? key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.ctrl.and("?").then(outcome);

		onKeyboardEvent({ key: "?", ctrlKey: true, altKey: false });
		
		expect(outcome).toHaveBeenCalled();
	});

	it("should invoke 'then' function if ctrl+alt+delete key pressed", () => {
		const outcome = jest.fn();
		const onKeyboardEvent = Key.is.ctrl.alt.plus("delete").then(outcome);

		onKeyboardEvent({ key: "delete", ctrlKey: true, altKey: true });
		
		expect(outcome).toHaveBeenCalled();
	});
});