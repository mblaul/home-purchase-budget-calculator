import { UsDollar, getCurrencyTextInput, Percent, getSelectInput, getPercentTextInput, getDecimalNumberInput, setupHomeCosts } from "./utils";

function init() {
  setupSavingsInputs();
  setupHouseSaleInputs();
  setupMonthlyHomeExpensesInputs();

  setupHomeCosts();
}

function setupSavingsInputs() {
  const enterAmountsEl = document.getElementById("inputs");

  if (!enterAmountsEl) return;

  const savingsContainerElement = document.createElement("div");
  savingsContainerElement.id = "savings-container";
  enterAmountsEl.appendChild(savingsContainerElement);

  const savingsHeaderElement = document.createElement("h2");
  savingsHeaderElement.id = "header-label-savings";
  savingsHeaderElement.innerText = "Monthly Finance Landscape";
  savingsContainerElement.appendChild(savingsHeaderElement);

  const savingsInputElement = getCurrencyTextInput({
    id: "initial-savings-input",
    label: "Savings",
  });

  const initialExpensesElement =  getCurrencyTextInput({
    id: "monthly-expenses-input",
    label: "Monthly Expenses",
  });

  savingsContainerElement.appendChild(initialExpensesElement);
  savingsContainerElement.appendChild(savingsInputElement);
}

function setupHouseSaleInputs() {
  const enterAmountsEl = document.getElementById("inputs");

  if (!enterAmountsEl) return;

  const houseSalesContainerElement = document.createElement("div");
  houseSalesContainerElement.id = "house-sales-container";
  enterAmountsEl.appendChild(houseSalesContainerElement);

  const houseExpensesHeaderElement = document.createElement("h2");
  houseExpensesHeaderElement.id = "header-label-house-expenses";
  houseExpensesHeaderElement.innerText = "Home Purchase Expenses";
  houseSalesContainerElement.appendChild(houseExpensesHeaderElement);

  const principalElement = getCurrencyTextInput({
    id: "principal-input",
    label: "House Sale Price",
  });
  
  const downPaymentAmountElement = getCurrencyTextInput({
    id: "down-payment-input",
    label: "Down Payment Amount",
  });

  const mortgageRateElement = getPercentTextInput({
    id: "mortgage-rate-input",
    label: "30-Year Fixed Mortgage Rate",
  });

  houseSalesContainerElement.appendChild(principalElement);
  houseSalesContainerElement.appendChild(downPaymentAmountElement);
  houseSalesContainerElement.appendChild(mortgageRateElement);
}

function setupMonthlyHomeExpensesInputs() {
  const enterAmountsEl = document.getElementById("inputs");

  if (!enterAmountsEl) return;

  const monthlyHomeExpensesContainerElement = document.createElement("div");
  monthlyHomeExpensesContainerElement.id = "house-sales-container";
  enterAmountsEl.appendChild(monthlyHomeExpensesContainerElement);

  const monthlyHomeExpensesHeaderElement = document.createElement("h2");
  monthlyHomeExpensesHeaderElement.id = "header-label-house-expenses";
  monthlyHomeExpensesHeaderElement.innerText = "Monthly Home Expenses";
  monthlyHomeExpensesContainerElement.appendChild(monthlyHomeExpensesHeaderElement);

  const pmiElement = getCurrencyTextInput({
    id: "pmi-input",
    label: "PMI (Private Mortgage Insurance)",
  });
  
  const homeownersInsuranceElement = getCurrencyTextInput({
    id: "homeowners-insurance-input",
    label: "Homeowners' Insurance",
  });

  monthlyHomeExpensesContainerElement.appendChild(pmiElement);
  monthlyHomeExpensesContainerElement.appendChild(homeownersInsuranceElement);
  monthlyHomeExpensesContainerElement.appendChild(setupTaxRateInput());
}

function setupTaxRateInput() {
  const taxRateElement = getDecimalNumberInput({
    id: "tax-rate-input",
    label: "Tax Rate (in Mils)",
  });

  return taxRateElement;
}

function calculateBudget() {
  const savingsInputEl = document.getElementById(
    "savings-input"
  ) as HTMLInputElement;
  const expensesInputEl = document.getElementById(
    "expenses-input"
  ) as HTMLInputElement;
  const budgetValueEl = document.getElementById("budget-value");

  if (!savingsInputEl || !expensesInputEl || !budgetValueEl) return;

  const budget =
    parseInt(savingsInputEl.value) - parseInt(expensesInputEl.value) * 6;
  budgetValueEl.innerText = UsDollar.format(budget);
}

function calculateMonthlyMortgagePayment({
  principal,
  annualRate,
  termYears,
}: {
  principal: number;
  annualRate: number;
  termYears: number;
}) {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;

  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return Number(monthlyPayment.toFixed(2));
}

window.onload = init;
