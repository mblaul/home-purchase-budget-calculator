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
var HOME_SALE_PRICE = {
  id: "sale-price",
  label: "Sale Price",
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
  HOME_SALE_PRICE,
  DOWN_PAYMENT_AMOUNT,
  MORTGAGE_RATE,
  MONTHLY_PMI,
  HOMEOWNERS_INSURANCE,
  TAX_RATE
};
var INPUT_IDS_TO_INPUTS = {
  [SAVINGS.id]: SAVINGS,
  [MONTHLY_EXPENSES.id]: MONTHLY_EXPENSES,
  [HOME_SALE_PRICE.id]: HOME_SALE_PRICE,
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
  [INPUT_TYPES.CURRENCY]: (value) => Integer.format(value)
};
var INPUT_TYPES_TO_NUMBER_FORMATTERS = {
  [INPUT_TYPES.WHOLE_NUMBER]: parseInt,
  [INPUT_TYPES.DECIMAL]: (value) => parseInt(value) / 100,
  [INPUT_TYPES.PERCENT]: (value) => {
    let result;
    let intValue = parseInt(value);
    if (intValue < 0) {
      result = Decimal.format(0);
    } else if (intValue > 1e4) {
      result = Decimal.format(100);
    } else {
      result = Decimal.format(intValue / 100);
    }
    return result;
  },
  [INPUT_TYPES.CURRENCY]: (value) => parseInt(value) / 100
};

// src/index.ts
function init() {
  setupSavingsInputs();
  setupHouseSaleInputs();
  setupMonthlyHomeExpensesInputs();
  setupInputListeners();
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
  const principalElement = getCurrencyTextInput(INPUTS.HOME_SALE_PRICE);
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
function setupInputListeners() {
  const enterAmountsEl = document.getElementById("inputs");
  if (!enterAmountsEl)
    return;
  enterAmountsEl.addEventListener("input", (event) => {
    const target = event.currentTarget;
    const savingsInputElement = document.getElementById(INPUTS.SAVINGS.id);
    const expensesInputElement = document.getElementById(INPUTS.MONTHLY_EXPENSES.id);
    const homeSalePriceInputElement = document.getElementById(INPUTS.HOME_SALE_PRICE.id);
    const downPaymentInputElement = document.getElementById(INPUTS.DOWN_PAYMENT_AMOUNT.id);
    const mortgageRateInputElement = document.getElementById(INPUTS.MORTGAGE_RATE.id);
    const homeSalePrice = parseInt(homeSalePriceInputElement.value.replace(/[^0-9]/g, ""));
    const downPayment = parseInt(downPaymentInputElement.value.replace(/[^0-9]/g, ""));
    const annualRate = parseFloat(mortgageRateInputElement.value.replace(/[^0-9.]/g, ""));
    let totalMonthlyHousingCosts = 0;
    if (homeSalePrice && downPayment && annualRate) {
      const mortgageCostElement = document.getElementById("mortgage-cost");
      if (!mortgageCostElement)
        return;
      const monthlyMortgagePayment = calculateMonthlyMortgagePayment({
        principal: homeSalePrice - downPayment,
        annualRate,
        termYears: 30
      });
      totalMonthlyHousingCosts += monthlyMortgagePayment;
      mortgageCostElement.innerHTML = UsDollar.format(monthlyMortgagePayment);
    }
    const taxRateInputElement = document.getElementById(INPUTS.TAX_RATE.id);
    const taxRate = parseFloat(taxRateInputElement.value.replace(/[^0-9.]/g, ""));
    if (homeSalePrice && downPayment && taxRate) {
      const taxRateCostElement = document.getElementById("monthly-taxes-cost");
      if (!taxRateCostElement)
        return;
      const monthlyTaxes = calculateMonthlyTaxes({ principal: homeSalePrice - downPayment, taxRate });
      totalMonthlyHousingCosts += monthlyTaxes;
      taxRateCostElement.innerHTML = UsDollar.format(monthlyTaxes);
    }
    const monthlyPMIInputElement = document.getElementById(INPUTS.MONTHLY_PMI.id);
    const homeownersInsuranceInputElement = document.getElementById(INPUTS.HOMEOWNERS_INSURANCE.id);
    const monthlyPMI = parseInt(monthlyPMIInputElement.value.replace(/[^0-9]/g, ""));
    const homeownersInsurance = parseInt(homeownersInsuranceInputElement.value.replace(/[^0-9]/g, ""));
    if (monthlyPMI || homeownersInsurance) {
      const additionalExpensesElement = document.getElementById("additional-expenses-cost");
      if (!additionalExpensesElement)
        return;
      const additionalExpenses = (monthlyPMI || 0) + (homeownersInsurance || 0);
      totalMonthlyHousingCosts += additionalExpenses;
      additionalExpensesElement.innerHTML = UsDollar.format(additionalExpenses);
    }
    if (totalMonthlyHousingCosts > 0) {
      const totalMonthlyHousingCostsElement = document.getElementById("total-monthly-housing-cost");
      if (!totalMonthlyHousingCostsElement)
        return;
      totalMonthlyHousingCostsElement.innerHTML = UsDollar.format(totalMonthlyHousingCosts);
    }
  });
}
function calculateMonthlyMortgagePayment({
  principal,
  annualRate,
  termYears
}) {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  return Number(monthlyPayment.toFixed(2));
}
function calculateMonthlyTaxes({ principal, taxRate }) {
  const monthlyTax = principal / 2 / 1000 * taxRate / 12;
  return Number(monthlyTax.toFixed(2));
}
window.onload = init;

//# debugId=82C91D1056B1A28964756E2164756E21
//# sourceMappingURL=index.js.map
