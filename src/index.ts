import { INPUTS } from "./inputs";
import { UsDollar, getCurrencyTextInput, getPercentTextInput, getDecimalNumberInput, setupHomeCosts } from "./utils";

type Input<T> = {
  id: string;
  label: string;
  formatter: (value: T) => string;
}

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

  const savingsInputElement = getCurrencyTextInput(INPUTS.SAVINGS);
  const monthlyExpensesElement = getCurrencyTextInput(INPUTS.MONTHLY_EXPENSES);

  savingsContainerElement.appendChild(savingsInputElement);
  savingsContainerElement.appendChild(monthlyExpensesElement);
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

  const principalElement = getCurrencyTextInput(INPUTS.PRINCIPAL);
  const downPaymentAmountElement = getCurrencyTextInput(INPUTS.DOWN_PAYMENT_AMOUNT);
  const mortgageRateElement = getPercentTextInput(INPUTS.MORTGAGE_RATE);

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
