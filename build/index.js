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
function handleDecimalNumberInput(event) {
  const inputElement = event.currentTarget;
  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");
  if (inputElement.value === "")
    return;
  inputElement.value = Decimal.format(parseInt(inputElement.value) / 100);
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
function getDecimalNumberInput({
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
  const inputElement = document.createElement("input");
  inputElement.id = id;
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
  const savingsInputElement = getCurrencyTextInput({
    id: "initial-savings-input",
    label: "Savings"
  });
  const initialExpensesElement = getCurrencyTextInput({
    id: "monthly-expenses-input",
    label: "Monthly Expenses"
  });
  savingsContainerElement.appendChild(initialExpensesElement);
  savingsContainerElement.appendChild(savingsInputElement);
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
  const pmiElement = getCurrencyTextInput({
    id: "pmi-input",
    label: "PMI (Private Mortgage Insurance)"
  });
  const homeownersInsuranceElement = getCurrencyTextInput({
    id: "homeowners-insurance-input",
    label: "Homeowners' Insurance"
  });
  monthlyHomeExpensesContainerElement.appendChild(pmiElement);
  monthlyHomeExpensesContainerElement.appendChild(homeownersInsuranceElement);
  monthlyHomeExpensesContainerElement.appendChild(setupTaxRateInput());
}
function setupTaxRateInput() {
  const taxRateElement = getDecimalNumberInput({
    id: "tax-rate-input",
    label: "Tax Rate (in Mils)"
  });
  return taxRateElement;
}
window.onload = init;
