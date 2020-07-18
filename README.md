# fluent-keys
A simple, fluent library for handling keyboard events.

## Problem statement

Writing one-off functions to handle keyboard events for specific keys can be tedious:

```
render() {
  const { text } = this.props;

  return <button onKeyDown={event => this.handleKeyDown(event)}>{text}</button>;
}

...

handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    this.props.doSomething();
  }
}
```

Not only do you have to add a new function (usually lower down in the file), but also need to add a fair amount of boiler plate. This is exacerbated if you end up needing special keys (i.e. ctrl, shift, alt) or multiple keys to map to a function.

## Using fluent-keys

One alternative is to use `fluent-keys`. It provides convenient alternatives to map key presses (that is either up, down, or press) to bound functions:

```
render() {
  const { doSomething, text } = this.props;

  return <button onKeyDown={Key.is.enter.then(doSomething)}>{text}</button>;
}
```

## Sample of API

| Example | Explanation |
| ------- | ----------- |
| `Key.is.alphanumeric.then(...)` | For any alphanumeric (capital and lowercase letters and numerals), invoke function |
| `Key.is.letter.then(...)` | For any letter (capital or lowercase), invoke function |
| `Key.is.lowercase.letter.then(...)` | Lowercase letters |
| `Key.is.uppercase.letter.then(...)` | Uppercase letters |
| `Key.matches('F').then(...)` | Can match any single character |
| `Key.matches('{', '[', '(').then(...)` | Can match any character in list of characters |
| `Key.is.space.then(...)` | Space bar |
| `Key.is.symbol.then(...)` | uses /[\W\S]/ regex |
| `Key.meets(/[1-5]/).then(...)` | can define arbitrary regex | 

## Some alternatives

Fluent-keys is a good choice for many use cases. That said, consider these other cool approaches. They may or may not be better for your usecase or complement fluent-keys:

* [glortho/react-keydown](https://github.com/glortho/react-keydown) - key decorators!
* [ayrton/react-key-handler](https://github.com/ayrton/react-key-handler) - a react component to handle keyboard events

## For your consideration

* I recommend trying out this library and seeing if it works well for you
* TODO: I haven't tested out how performant this library is
* TODO: I still need to publish as an NPM package
