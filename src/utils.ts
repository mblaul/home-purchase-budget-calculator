export const UsDollar = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const Percent = Intl.NumberFormat("en-US", {
  style: "percent",
});

export const Decimal = Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function handleNumberInput(event: Event) {
  const inputElement = event.currentTarget as HTMLInputElement;

  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");

  if (inputElement.value === "") return;

  inputElement.value = Decimal.format(parseInt(inputElement.value));
}

export function getCurrencyTextInput({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const containerElement = document.createElement("div");
  containerElement.classList.add("input-field-container");

  const labelElement = document.createElement("label");
  labelElement.htmlFor = id;
  labelElement.innerText = label;
  containerElement.insertBefore(labelElement, containerElement.firstChild);

  const inputWrapperElement = document.createElement("div");
  inputWrapperElement.classList.add("input-wrapper");
  containerElement.appendChild(inputWrapperElement);

  const currencySymbolElement = document.createElement("div");
  currencySymbolElement.classList.add("input-currency-symbol");
  currencySymbolElement.innerText = "$";
  inputWrapperElement.appendChild(currencySymbolElement);

  const inputElement = document.createElement("input");
  inputElement.id = id;
  inputElement.type = "text";
  inputElement.inputMode = "numeric";
  inputWrapperElement.appendChild(inputElement);

  inputElement.addEventListener("input", handleNumberInput);

  return containerElement;
}
