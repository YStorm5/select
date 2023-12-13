/**
 * Initialize a custom select component.
 *
 * @param {string} inputId - The ID of the input element.
 * @param {Array<{text: string, value: any}>} obj - An array of objects representing the options.
 * @param {Object} option - Additional options for customization.
 * @param {string} [option.placeHolder='Please Choose!'] - The placeholder text.
 * @param {any} [option.value] - The default value when first initialized.
 * @param {string} [option.hoverColor='red'] - The color on hover.
 * @param {string} [option.backgroundColor='white'] - The background color.
 * @param {string} [option.color='black'] - The text color.
 *
 * @example
 * // Basic usage:
 * khSelect('inputID', [{ text: 'abc', value: 1 }], {
 *   placeHolder: 'Please Choose!',
 *   value: 1,       // Default value when first initialized
 *   hoverColor: 'red',
 *   backgroundColor: 'white',
 *   color: 'black'
 * });
 *
 */

function khSelect(
  inputId,
  obj,
  { placeHolder, value, hoverColor, backgroundColor, color } = {}
) {
  const input = document.getElementById(inputId);
  let isPlaceholder = placeHolder != "" ? true : false;
  const option = obj;

  const container = document.createElement("div");
  container.style.display = "inline-block";
  container.style.position = "relative";
  input.parentElement.insertBefore(container, input.nextElementSibling);
  const inputWidth = window.getComputedStyle(input).width;
  const inputHeight = window.getComputedStyle(input).height;
  input.hidden = true;
  container.clientHeight = inputHeight;

  const customInput = document.createElement("div");
  customInput.contentEditable = true;
  customInput.style.width = inputWidth;
  customInput.style.height = inputHeight;
  customInput.style.padding = window.getComputedStyle(input).padding;
  customInput.style.border = window.getComputedStyle(input).border;
  customInput.style.outline = window.getComputedStyle(input).outline;
  customInput.style.margin = window.getComputedStyle(input).margin;

  container.style.width = "auto";
  container.style.height = "auto";

  input.classList.forEach((e) => {
    customInput.classList.add(e);
  });
  if (input.value == "") {
    isPlaceholder = true;
    customInput.textContent = placeHolder;
  } else {
    isPlaceholder = false;
    customInput.textContent = "";
  }

  customInput.style.whiteSpace = "nowrap";
  customInput.style.textOverflow = "ellipsis";
  customInput.style.overflow = "hidden";
  container.append(customInput);

  if (value) {
    option.forEach((e) => {
      if (e.value == value) {
        customInput.textContent = e.text;
        input.value = e.value;
      }
    });
  }

  const optionCon = document.createElement("div");
  optionCon.style.position = "absolute";
  optionCon.style.top = inputHeight + "px";
  optionCon.style.height = "auto";
  optionCon.style.maxHeight = "200px";
  optionCon.style.overflowY = "auto";
  optionCon.style.width = inputWidth;
  optionCon.style.paddingBlock = "2px";
  optionCon.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  optionCon.hidden = true;
  optionCon.style.cursor = "pointer";
  optionCon.style.zIndex = "99999";
  optionCon.style.backgroundColor =
    backgroundColor == "" ? "white" : backgroundColor;
  container.append(optionCon);

  function renderOption(inputValue) {
    optionCon.innerHTML = null;
    let txt = inputValue.toLowerCase();
    const newOption = option.filter((e) =>
      e.text.toLocaleLowerCase().includes(txt)
    );

    if (newOption.length == 0) {
      const opt = document.createElement("div");
      opt.style.paddingInline = "4px";
      opt.style.paddingBlock = "6px";
      opt.innerText = "No options";
      optionCon.append(opt);
    } else {
      for (let i in newOption) {
        const opt = document.createElement("div");
        opt.addEventListener(
          "mouseover",
          () =>
            (opt.style.background = hoverColor == "" ? "lightblue" : hoverColor)
        );
        opt.addEventListener("mouseout", () => (opt.style.background = null));
        opt.addEventListener("click", (e) => {
          customInput.innerText = e.target.innerText;
          input.value = e.target.getAttribute("data-value");
          isPlaceholder = false;
          optionCon.hidden = true;
        });
        opt.style.paddingInline = "8px";
        opt.style.paddingBlock = "6px";
        opt.innerText = newOption[i]["text"];
        opt.style.wordWrap = "break-word";
        opt.setAttribute("data-value", newOption[i]["value"]);
        optionCon.append(opt);
      }
    }
  }

  document.addEventListener("click", function (event) {
    if (!container.contains(event.target)) {
      optionCon.hidden = true;
      if (customInput.textContent == "") {
        isPlaceholder = true;
        customInput.textContent = placeHolder;
        input.value = null;
      }
    }
  });

  customInput.addEventListener("focus", function () {
    optionCon.hidden = false;
    if (isPlaceholder && input.value == "") {
      isPlaceholder = false;
      customInput.textContent = "";
    }
    if (customInput.textContent != "") {
      renderOption(customInput.textContent);
    } else {
      renderOption("");
    }
  });

  customInput.addEventListener("input", function (e) {
    optionCon.hidden = false;
    renderOption(e.target.textContent);
  });
  customInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  });
}
