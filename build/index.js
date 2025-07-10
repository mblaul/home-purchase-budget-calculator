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
  const inputType = inputElement.dataset.type;
  inputElement.value = INPUT_TYPES_TO_STRING_FORMATTERS[inputType](parseInt(inputElement.value));
}
function handleDecimalNumberInput(event) {
  const inputElement = event.currentTarget;
  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");
  if (inputElement.value === "")
    return;
  const inputType = inputElement.dataset.type;
  inputElement.value = INPUT_TYPES_TO_STRING_FORMATTERS[inputType](parseInt(inputElement.value));
}
function handlePercentInput(event) {
  const inputElement = event.currentTarget;
  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");
  if (inputElement.value === "")
    return;
  const inputType = inputElement.dataset.type;
  inputElement.value = INPUT_TYPES_TO_STRING_FORMATTERS[inputType](parseInt(inputElement.value));
}
function getDecimalNumberInput(input) {
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
function setupHomeCosts() {
  const homeCostsEl = document.getElementById("home-costs");
  if (!homeCostsEl)
    return;
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
  homeCostsEl.appendChild(mortgageCostLabelElement);
  homeCostsEl.appendChild(mortgageCostElement);
}
function getCurrencyTextInput(input) {
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
function getPercentTextInput(input) {
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

// src/inputs.ts
var INPUT_TYPES = {
  WHOLE_NUMBER: "wholeNumber",
  DECIMAL: "decimal",
  PERCENT: "percent",
  CURRENCY: "currency"
};
var SAVINGS = {
  id: "savings",
  label: "Savings",
  type: INPUT_TYPES.CURRENCY
};
var MONTHLY_EXPENSES = {
  id: "monthly-expenses",
  label: "Monthly Expenses",
  type: INPUT_TYPES.CURRENCY
};
var PRINCIPAL = {
  id: "principal",
  label: "Principal",
  type: INPUT_TYPES.CURRENCY
};
var DOWN_PAYMENT_AMOUNT = {
  id: "down-payment-amount",
  label: "Down Payment Amount",
  type: INPUT_TYPES.CURRENCY
};
var MORTGAGE_RATE = {
  id: "mortgage-rate",
  label: "Mortgage Rate",
  type: INPUT_TYPES.PERCENT
};
var MONTHLY_PMI = {
  id: "pmi",
  label: "PMI (Private Mortgage Insurance)",
  type: INPUT_TYPES.CURRENCY
};
var HOMEOWNERS_INSURANCE = {
  id: "homeowners-insurance",
  label: "Homeowners' Insurance",
  type: INPUT_TYPES.CURRENCY
};
var TAX_RATE = {
  id: "tax-rate",
  label: "Tax Rate (in Mils)",
  type: INPUT_TYPES.DECIMAL
};
var INPUTS = {
  SAVINGS,
  MONTHLY_EXPENSES,
  PRINCIPAL,
  DOWN_PAYMENT_AMOUNT,
  MORTGAGE_RATE,
  MONTHLY_PMI,
  HOMEOWNERS_INSURANCE,
  TAX_RATE
};
var INPUT_IDS_TO_INPUTS = {
  [SAVINGS.id]: SAVINGS,
  [MONTHLY_EXPENSES.id]: MONTHLY_EXPENSES,
  [PRINCIPAL.id]: PRINCIPAL,
  [DOWN_PAYMENT_AMOUNT.id]: DOWN_PAYMENT_AMOUNT,
  [MORTGAGE_RATE.id]: MORTGAGE_RATE,
  [MONTHLY_PMI.id]: MONTHLY_PMI,
  [HOMEOWNERS_INSURANCE.id]: HOMEOWNERS_INSURANCE,
  [TAX_RATE.id]: TAX_RATE
};
var INPUT_TYPES_TO_STRING_FORMATTERS = {
  [INPUT_TYPES.WHOLE_NUMBER]: (value) => Integer.format(value),
  [INPUT_TYPES.DECIMAL]: (value) => Decimal.format(value / 100),
  [INPUT_TYPES.PERCENT]: (value) => {
    let result;
    if (value < 0) {
      result = Decimal.format(0);
    } else if (value > 1e4) {
      result = Decimal.format(100);
    } else {
      result = Decimal.format(value / 100);
    }
    return result;
  },
  [INPUT_TYPES.CURRENCY]: (value) => Decimal.format(value / 100)
};

// src/index.ts
function init() {
  setupSavingsInputs();
  setupHouseSaleInputs();
  setupMonthlyHomeExpensesInputs();
  setupHomeCosts();
}
function setupSavingsInputs() {
  const enterAmountsEl = document.getElementById("inputs");
  if (!enterAmountsEl)
    return;
  const savingsContainerElement = document.createElement("div");
  savingsContainerElement.id = "savings-container";
  enterAmountsEl.appendChild(savingsContainerElement);
  const savingsHeaderElement = document.createElement("h2");
  savingsHeaderElement.id = "header-label-savings";
  savingsHeaderElement.innerText = "Monthly Finance Landscape";
  savingsContainerElement.appendChild(savingsHeaderElement);
  const savingsInputElement = getCurrencyTextInput(INPUTS.SAVINGS);
  const monthlyExpensesElement = getCurrencyTextInput(INPUTS.MONTHLY_EXPENSES);
  savingsContainerElement.appendChild(savingsInputElement);
  savingsContainerElement.appendChild(monthlyExpensesElement);
}
function setupHouseSaleInputs() {
  const enterAmountsEl = document.getElementById("inputs");
  if (!enterAmountsEl)
    return;
  const houseSalesContainerElement = document.createElement("div");
  houseSalesContainerElement.id = "house-sales-container";
  enterAmountsEl.appendChild(houseSalesContainerElement);
  const houseExpensesHeaderElement = document.createElement("h2");
  houseExpensesHeaderElement.id = "header-label-house-expenses";
  houseExpensesHeaderElement.innerText = "Home Purchase Expenses";
  houseSalesContainerElement.appendChild(houseExpensesHeaderElement);
  const principalElement = getCurrencyTextInput(INPUTS.PRINCIPAL);
  const downPaymentAmountElement = getCurrencyTextInput(INPUTS.DOWN_PAYMENT_AMOUNT);
  const mortgageRateElement = getPercentTextInput(INPUTS.MORTGAGE_RATE);
  houseSalesContainerElement.appendChild(principalElement);
  houseSalesContainerElement.appendChild(downPaymentAmountElement);
  houseSalesContainerElement.appendChild(mortgageRateElement);
}
function setupMonthlyHomeExpensesInputs() {
  const enterAmountsEl = document.getElementById("inputs");
  if (!enterAmountsEl)
    return;
  const monthlyHomeExpensesContainerElement = document.createElement("div");
  monthlyHomeExpensesContainerElement.id = "house-sales-container";
  enterAmountsEl.appendChild(monthlyHomeExpensesContainerElement);
  const monthlyHomeExpensesHeaderElement = document.createElement("h2");
  monthlyHomeExpensesHeaderElement.id = "header-label-house-expenses";
  monthlyHomeExpensesHeaderElement.innerText = "Monthly Home Expenses";
  monthlyHomeExpensesContainerElement.appendChild(monthlyHomeExpensesHeaderElement);
  const pmiElement = getCurrencyTextInput(INPUTS.MONTHLY_PMI);
  const homeownersInsuranceElement = getCurrencyTextInput(INPUTS.HOMEOWNERS_INSURANCE);
  monthlyHomeExpensesContainerElement.appendChild(pmiElement);
  monthlyHomeExpensesContainerElement.appendChild(homeownersInsuranceElement);
  monthlyHomeExpensesContainerElement.appendChild(setupTaxRateInput());
}
function setupTaxRateInput() {
  const taxRateElement = getDecimalNumberInput(INPUTS.TAX_RATE);
  return taxRateElement;
}
window.onload = init;

//# debugId=1F87FF9CBE0FF96364756E2164756E21
//# sourceMappingURL=index.js.map
