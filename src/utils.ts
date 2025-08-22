import { INPUT_TYPES_TO_STRING_FORMATTERS, type Input, type InputType } from "./inputs";

// Formatting
export const UsDollar = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const Percent = Intl.NumberFormat("en-US", {
  style: "percent",
});

export const Integer = Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const Decimal = Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Inputs
function handleNumberInput(event: Event) {
  const inputElement = event.currentTarget as HTMLInputElement;

  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");

  if (inputElement.value === "") return;

  const inputType = inputElement.dataset.type as InputType;
  inputElement.value = INPUT_TYPES_TO_STRING_FORMATTERS[inputType](parseInt(inputElement.value));
}

function handleDecimalNumberInput(event: Event) {
  const inputElement = event.currentTarget as HTMLInputElement;

  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");

  if (inputElement.value === "") return;

  const inputType = inputElement.dataset.type as InputType;
  inputElement.value = INPUT_TYPES_TO_STRING_FORMATTERS[inputType](parseInt(inputElement.value));
}

function handlePercentInput(event: Event) {
  const inputElement = event.currentTarget as HTMLInputElement;

  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");

  if (inputElement.value === "") return;

  const inputType = inputElement.dataset.type as InputType;
  inputElement.value = INPUT_TYPES_TO_STRING_FORMATTERS[inputType](parseInt(inputElement.value));
}

export function getDecimalNumberInput(input: Input) {
  const containerElement = document.createElement("div");
  containerElement.classList.add("input-field-container");

  const labelElement = document.createElement("label");
  labelElement.htmlFor = input.id;
  labelElement.innerText = input.label;
  containerElement.insertBefore(labelElement, containerElement.firstChild);

  const inputWrapperElement = document.createElement("div");
  inputWrapperElement.classList.add("input-wrapper");
  containerElement.appendChild(inputWrapperElement);

  const inputElement = document.createElement("input");
  inputElement.id = input.id;
  inputElement.dataset.type = input.type;
  inputElement.type = "text";
  inputElement.inputMode = "numeric";
  inputWrapperElement.appendChild(inputElement);

  inputElement.addEventListener("input", handleDecimalNumberInput);

  return containerElement;
}

export function setupHomeCosts() {
  const homeCostsEl = document.getElementById("home-costs");
  if (!homeCostsEl) return;

  const costContainerElement = document.createElement("div");
  costContainerElement.classList.add("cost-value-container");
  
  homeCostsEl.appendChild(costContainerElement);

  const mortgageCostLabelElement = document.createElement("div");
  mortgageCostLabelElement.id = "label-mortgage-cost";
  mortgageCostLabelElement.classList.add("label-cost-value");
  mortgageCostLabelElement.innerText = "Mortgage Cost";

  const mortgageCostElement = document.createElement("div");
  mortgageCostElement.id = "mortgage-cost";
  mortgageCostElement.classList.add("cost-value");

  const monthlyTaxesLabelElement = document.createElement("div");
  monthlyTaxesLabelElement.id = "label-monthly-taxes-cost";
  monthlyTaxesLabelElement.classList.add("label-cost-value");
  monthlyTaxesLabelElement.innerText = "Tax Amount";

  const monthlyTaxesElement = document.createElement("div");
  monthlyTaxesElement.id = "monthly-taxes-cost";
  monthlyTaxesElement.classList.add("cost-value");

  const additionalExpensesLabelElement = document.createElement("div");
  additionalExpensesLabelElement.id = "label-additional-expenses-cost";
  additionalExpensesLabelElement.classList.add("label-cost-value");
  additionalExpensesLabelElement.innerText = "Additional Expenses";

  const additionalExpensesElement = document.createElement("div");
  additionalExpensesElement.id = "additional-expenses-cost";
  additionalExpensesElement.classList.add("cost-value");

  const totalMonthlyHousingCostsLabelElement = document.createElement("div");
  totalMonthlyHousingCostsLabelElement.id = "label-total-monthly-housing-cost";
  totalMonthlyHousingCostsLabelElement.classList.add("label-cost-value");
  totalMonthlyHousingCostsLabelElement.innerText = "Total";

  const totalMonthlyHousingCostsElement = document.createElement("div");
  totalMonthlyHousingCostsElement.id = "total-monthly-housing-cost";
  totalMonthlyHousingCostsElement.classList.add("cost-value");

  homeCostsEl.appendChild(mortgageCostLabelElement);
  homeCostsEl.appendChild(mortgageCostElement);
  homeCostsEl.appendChild(monthlyTaxesLabelElement);
  homeCostsEl.appendChild(monthlyTaxesElement);
  homeCostsEl.appendChild(additionalExpensesLabelElement);
  homeCostsEl.appendChild(additionalExpensesElement);
  homeCostsEl.appendChild(totalMonthlyHousingCostsLabelElement);
  homeCostsEl.appendChild(totalMonthlyHousingCostsElement);
}

export function getCurrencyTextInput(input: Input) {
  const containerElement = document.createElement("div");
  containerElement.classList.add("input-field-container");

  const labelElement = document.createElement("label");
  labelElement.htmlFor = input.id;
  labelElement.innerText = input.label;
  containerElement.insertBefore(labelElement, containerElement.firstChild);

  const inputWrapperElement = document.createElement("div");
  inputWrapperElement.classList.add("input-wrapper");
  containerElement.appendChild(inputWrapperElement);

  const currencySymbolElement = document.createElement("div");
  currencySymbolElement.classList.add("input-currency-symbol");
  currencySymbolElement.innerText = "$";
  inputWrapperElement.appendChild(currencySymbolElement);

  const inputElement = document.createElement("input");
  inputElement.id = input.id;
  inputElement.dataset.type = input.type;
  inputElement.type = "text";
  inputElement.inputMode = "numeric";
  inputWrapperElement.appendChild(inputElement);

  inputElement.addEventListener("input", handleNumberInput);

  return containerElement;
}

export function getPercentTextInput(input: Input) {
  const containerElement = document.createElement("div");
  containerElement.classList.add("input-field-container");

  const labelElement = document.createElement("label");
  labelElement.htmlFor = input.id;
  labelElement.innerText = input.label;
  containerElement.insertBefore(labelElement, containerElement.firstChild);

  const inputWrapperElement = document.createElement("div");
  inputWrapperElement.classList.add("input-wrapper");
  containerElement.appendChild(inputWrapperElement);

  const percentSymbolElement = document.createElement("div");
  percentSymbolElement.classList.add("input-percent-symbol");
  percentSymbolElement.innerText = "%";
  inputWrapperElement.appendChild(percentSymbolElement);

  const inputElement = document.createElement("input");
  inputElement.id = input.id;
  inputElement.dataset.type = input.type;
  inputElement.type = "text";
  inputElement.inputMode = "numeric";
  inputWrapperElement.appendChild(inputElement);

  inputElement.addEventListener("input", handlePercentInput);

  return containerElement;
}

export function getSelectInput({
  id,
  label,
  options = []
}: {
  id: string;
  label: string;
  options?: { value: string; label: string }[];
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