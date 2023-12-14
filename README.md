# khSelect

## Description

`khSelect` is a JavaScript function for creating customizable dropdown/select elements.

## Install via CDN:

```javascript
<script src="https://cdn.jsdelivr.net/gh/ystorm5/select@0.1/main.js"></script>
```

## Usage

```javascript
khSelect("inputID", [{ text: "abc", value: 1 }], {
    placeHolder: "Please Choose!",
    value: 1,
    hoverColor: "red",
    backgroundColor: "white",
    color: "black",
});
```
## Parameters

- `inputID` (string): ID of the input element for the dropdown.
- `obj` (array): Array of option objects with `text` (string) and `value`.
- `placeHolder` (string): Text displayed when no option is selected.
- `value` (any): Default value upon initialization.
- `hoverColor` (string): Color when hovering over options.
- `backgroundColor` (string): Background color of the dropdown.
- `color` (string): Text color for the dropdown.

