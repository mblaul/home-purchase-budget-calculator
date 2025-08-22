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

  setupInputListeners();
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

  const principalElement = getCurrencyTextInput(INPUTS.HOME_SALE_PRICE);
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

function setupInputListeners() {
  const enterAmountsEl = document.getElementById("inputs");
  if (!enterAmountsEl) return;

  enterAmountsEl.addEventListener("input", (event) => {
    const target = event.currentTarget as HTMLInputElement;

    const savingsInputElement = document.getElementById(INPUTS.SAVINGS.id) as HTMLInputElement;
    const expensesInputElement = document.getElementById(INPUTS.MONTHLY_EXPENSES.id) as HTMLInputElement; 

    const homeSalePriceInputElement = document.getElementById(INPUTS.HOME_SALE_PRICE.id) as HTMLInputElement;
    const downPaymentInputElement = document.getElementById(INPUTS.DOWN_PAYMENT_AMOUNT.id) as HTMLInputElement;
    const mortgageRateInputElement = document.getElementById(INPUTS.MORTGAGE_RATE.id) as HTMLInputElement;
    
    const homeSalePrice = parseInt(homeSalePriceInputElement.value.replace(/[^0-9]/g, ""));
    const downPayment = parseInt(downPaymentInputElement.value.replace(/[^0-9]/g, ""));
    const annualRate = parseFloat(mortgageRateInputElement.value.replace(/[^0-9.]/g, ""));

    let totalMonthlyHousingCosts: number = 0;

    if (homeSalePrice && downPayment && annualRate) {
      const mortgageCostElement = document.getElementById("mortgage-cost");
      
      if (!mortgageCostElement) return;

      const monthlyMortgagePayment = calculateMonthlyMortgagePayment({
        principal: (homeSalePrice - downPayment),
        annualRate,
        termYears: 30
      });

      totalMonthlyHousingCosts += monthlyMortgagePayment;

      mortgageCostElement.innerHTML = UsDollar.format(monthlyMortgagePayment);
    }

    const taxRateInputElement = document.getElementById(INPUTS.TAX_RATE.id) as HTMLInputElement;
    const taxRate = parseFloat(taxRateInputElement.value.replace(/[^0-9.]/g, ""));

    if (homeSalePrice && downPayment && taxRate) {
      const taxRateCostElement = document.getElementById("monthly-taxes-cost");

      if (!taxRateCostElement) return;

      const monthlyTaxes = calculateMonthlyTaxes({principal: (homeSalePrice - downPayment), taxRate});
      
      totalMonthlyHousingCosts += monthlyTaxes;

      taxRateCostElement.innerHTML = UsDollar.format(monthlyTaxes);
    }

    const monthlyPMIInputElement = document.getElementById(INPUTS.MONTHLY_PMI.id) as HTMLInputElement;
    const homeownersInsuranceInputElement = document.getElementById(INPUTS.HOMEOWNERS_INSURANCE.id) as HTMLInputElement;

    const monthlyPMI = parseInt(monthlyPMIInputElement.value.replace(/[^0-9]/g, ""));
    const homeownersInsurance = parseInt(homeownersInsuranceInputElement.value.replace(/[^0-9]/g, ""));

    if (monthlyPMI || homeownersInsurance) {
      const additionalExpensesElement = document.getElementById("additional-expenses-cost");

      if (!additionalExpensesElement) return;

      const additionalExpenses = (monthlyPMI || 0) + (homeownersInsurance || 0);

      totalMonthlyHousingCosts += additionalExpenses;

      additionalExpensesElement.innerHTML = UsDollar.format(additionalExpenses);
    }

    if (totalMonthlyHousingCosts > 0) {
      const totalMonthlyHousingCostsElement = document.getElementById("total-monthly-housing-cost");
      if (!totalMonthlyHousingCostsElement) return;

      totalMonthlyHousingCostsElement.innerHTML = UsDollar.format(totalMonthlyHousingCosts);
    }

  });
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

function calculateMonthlyTaxes({principal, taxRate}: {principal: number; taxRate: number}) {
  const monthlyTax = (((principal/2) /1000) * taxRate) / 12;
  return Number(monthlyTax.toFixed(2));
}

window.onload = init;
