import { UsDollar, getCurrencyTextInput, Percent, getSelectInput, getPercentTextInput } from "./utils";

function init() {
  setupSavingsInputs();
  setupHouseSaleInputs();
}

function setupSavingsInputs() {
  const enterAmountsEl = document.getElementById("inputs");

  if (!enterAmountsEl) return;

  const savingsInputElement = getCurrencyTextInput({
    id: "initial-savings-input",
    label: "Savings",
  });

  const initialExpensesElement =  getCurrencyTextInput({
    id: "monthly-expenses-input",
    label: "Monthly Expenses",
  });

  enterAmountsEl?.appendChild(initialExpensesElement);
  enterAmountsEl?.appendChild(savingsInputElement);
}

function setupHouseSaleInputs() {
  const enterAmountsEl = document.getElementById("inputs");

  if (!enterAmountsEl) return;

  const principalElement = getCurrencyTextInput({
    id: "principal-input",
    label: "House Sale Price",
  });
  
  const downPaymentAmountElement = getCurrencyTextInput({
    id: "down-payment-input",
    label: "Down Payment Amount",
  });

  // TODO: Change to percentage input
  const mortgageRateElement = getPercentTextInput({
    id: "mortgage-rate-input",
    label: "30-Year Fixed Mortgage Rate",
  });
  
  const taxRateElement = getSelectInput({
    id: "tax-rate-input",
    label: "Tax Rate",
    options: [
      { value: "0.01", label: "5%" },
    ]
  });
  


  enterAmountsEl?.appendChild(principalElement);
  enterAmountsEl?.appendChild(downPaymentAmountElement);
  enterAmountsEl?.appendChild(mortgageRateElement);
  enterAmountsEl?.appendChild(taxRateElement);
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
