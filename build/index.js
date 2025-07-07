// src/utils.ts
var UsDollar = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
var Percent = Intl.NumberFormat("en-US", {
  style: "percent"
});
var Integer = Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
var Decimal = Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
function handleNumberInput(event) {
  const inputElement = event.currentTarget;
  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");
  if (inputElement.value === "")
    return;
  inputElement.value = Integer.format(parseInt(inputElement.value));
}
function handlePercentInput(event) {
  const inputElement = event.currentTarget;
  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");
  if (inputElement.value === "")
    return;
  let intValue = parseInt(inputElement.value);
  if (intValue < 0) {
    inputElement.value = Decimal.format(0 / 100);
  } else if (intValue > 1e4) {
    inputElement.value = Decimal.format(1e4 / 100);
  } else {
    inputElement.value = Decimal.format(intValue / 100);
  }
}
function getCurrencyTextInput({
  id,
  label
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
function getPercentTextInput({
  id,
  label
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
  const percentSymbolElement = document.createElement("div");
  percentSymbolElement.classList.add("input-percent-symbol");
  percentSymbolElement.innerText = "%";
  inputWrapperElement.appendChild(percentSymbolElement);
  const inputElement = document.createElement("input");
  inputElement.id = id;
  inputElement.type = "text";
  inputElement.inputMode = "numeric";
  inputWrapperElement.appendChild(inputElement);
  inputElement.addEventListener("input", handlePercentInput);
  return containerElement;
}
function getSelectInput({
  id,
  label,
  options = []
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
  const inputElement = document.createElement("select");
  inputElement.id = id;
  inputWrapperElement.appendChild(inputElement);
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    inputElement.appendChild(optionElement);
  });
  inputElement.addEventListener("input", handleNumberInput);
  return containerElement;
}

// src/index.ts
function init() {
  setupSavingsInputs();
  setupHouseSaleInputs();
}
function setupSavingsInputs() {
  const enterAmountsEl = document.getElementById("inputs");
  if (!enterAmountsEl)
    return;
  const savingsInputElement = getCurrencyTextInput({
    id: "initial-savings-input",
    label: "Savings"
  });
  const initialExpensesElement = getCurrencyTextInput({
    id: "monthly-expenses-input",
    label: "Monthly Expenses"
  });
  enterAmountsEl?.appendChild(initialExpensesElement);
  enterAmountsEl?.appendChild(savingsInputElement);
}
function setupHouseSaleInputs() {
  const enterAmountsEl = document.getElementById("inputs");
  if (!enterAmountsEl)
    return;
  const principalElement = getCurrencyTextInput({
    id: "principal-input",
    label: "House Sale Price"
  });
  const downPaymentAmountElement = getCurrencyTextInput({
    id: "down-payment-input",
    label: "Down Payment Amount"
  });
  const mortgageRateElement = getPercentTextInput({
    id: "mortgage-rate-input",
    label: "30-Year Fixed Mortgage Rate"
  });
  const taxRateElement = getSelectInput({
    id: "tax-rate-input",
    label: "Tax Rate",
    options: [
      { value: "0.01", label: "5%" }
    ]
  });
  enterAmountsEl?.appendChild(principalElement);
  enterAmountsEl?.appendChild(downPaymentAmountElement);
  enterAmountsEl?.appendChild(mortgageRateElement);
  enterAmountsEl?.appendChild(taxRateElement);
}
window.onload = init;
