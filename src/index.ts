import type { DownPaymentOption } from "./types";
import { UsDollar, Percent, getCurrencyTextInput } from "./utils";

const HOUSE_PRICES = [300_000, 350_000, 400_000, 450_000, 500_000];
const DOWN_PAYMENT_PERCENTS = [0.1, 0.15, 0.2];

function init() {
  setupEnterAmountsPage();

  const seeRatesButtonEl = document.getElementById("see-rates-button");
  if (!seeRatesButtonEl) return;

  seeRatesButtonEl.addEventListener("click", () => {
    setupRatesPageInputs();
    listenToFormChanges();
    createDownPaymentsTable(calculateDownPaymentOptions());
    calculateBudget();

    const enterAmountsWrapperEl = document.getElementById(
      "enter-amounts-wrapper"
    );
    const playWithRatesEl = document.getElementById("play-with-rates");
    if (!enterAmountsWrapperEl || !playWithRatesEl) return;

    playWithRatesEl.classList.remove("hidden");
    playWithRatesEl.classList.add("visible");
    enterAmountsWrapperEl.remove();

    listenForRowClicks();
  });
}

function setupEnterAmountsPage() {
  const enterAmountsEl = document.getElementById("enter-amounts");
  const savingsInputElement = getCurrencyTextInput({
    id: "initial-savings-input",
    label: "Savings",
  });

  enterAmountsEl?.insertBefore(savingsInputElement, enterAmountsEl.firstChild);

  savingsInputElement.insertAdjacentElement(
    "afterend",
    getCurrencyTextInput({
      id: "initial-expenses-input",
      label: "Monthly Expenses",
    })
  );
}

function setupRatesPageInputs() {
  const initialSavingsInputEl = document.getElementById(
    "initial-savings-input"
  ) as HTMLInputElement;
  const initialExpensesInputEl = document.getElementById(
    "initial-expenses-input"
  ) as HTMLInputElement;

  const savingsInputEl = document.getElementById(
    "savings-input"
  ) as HTMLInputElement;
  const expensesInputEl = document.getElementById(
    "expenses-input"
  ) as HTMLInputElement;

  if (
    !initialSavingsInputEl ||
    !initialExpensesInputEl ||
    !savingsInputEl ||
    !expensesInputEl
  )
    return;

  const parsedSavingsInputValue = Number(
    initialSavingsInputEl.value.replace(/[^0-9]/g, "")
  );

  const parsedExpensesInputValue = Number(
    initialExpensesInputEl.value.replace(/[^0-9]/g, "")
  );

  savingsInputEl.max = (parsedSavingsInputValue * 2).toString();
  savingsInputEl.value = parsedSavingsInputValue.toString();

  expensesInputEl.max = (parsedExpensesInputValue * 2).toString();
  expensesInputEl.value = initialExpensesInputEl.value.replace(/[^0-9]/g, "");

  const savingsAmountEl = document.getElementById("savings-amount");
  if (!savingsAmountEl) return;
  savingsAmountEl.innerText = UsDollar.format(parsedSavingsInputValue);

  const oneMonthExpensesExpensesEl = document.getElementById(
    "one-month-expenses"
  ) as HTMLInputElement;
  const sixMonthExpensesExpensesEl = document.getElementById(
    "six-month-expenses"
  ) as HTMLInputElement;

  if (!oneMonthExpensesExpensesEl || !sixMonthExpensesExpensesEl) return;

  oneMonthExpensesExpensesEl.innerHTML = UsDollar.format(
    parsedExpensesInputValue
  );
  sixMonthExpensesExpensesEl.innerHTML = UsDollar.format(
    parsedExpensesInputValue * 6
  );
}

function listenToFormChanges() {
  const slidersEl = document.getElementById("sliders");
  if (!slidersEl) return;

  slidersEl.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    switch (target.id) {
      case "savings-input": {
        const savingsAmountEl = document.getElementById("savings-amount");
        if (!savingsAmountEl) return;
        savingsAmountEl.innerText = UsDollar.format(parseInt(target.value));
        break;
      }

      case "expenses-input": {
        const oneMonthExpensesEl =
          document.getElementById("one-month-expenses");
        const sixMonthExpensesEl =
          document.getElementById("six-month-expenses");

        if (!oneMonthExpensesEl || !sixMonthExpensesEl) return;

        oneMonthExpensesEl.innerText = UsDollar.format(parseInt(target.value));
        sixMonthExpensesEl.innerText = UsDollar.format(
          parseInt(target.value) * 6
        );
      }
    }

    calculateBudget();
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

  highlightRates(budget);
}

function highlightRates(budget: number) {
  const houseRatesEl = document.getElementById("house-rates");
  if (!houseRatesEl) return;

  const houseRatesRowEls = houseRatesEl.getElementsByClassName("row");
  if (houseRatesRowEls.length === 0) return;

  for (let i = 0; i < houseRatesRowEls.length; i++) {
    const element = houseRatesRowEls?.item(i) as HTMLElement;
    if (parseInt(element.dataset.downPaymentAmount ?? "") < budget) {
      element.style.backgroundColor = "#9adc9a";
    } else {
      element.style.backgroundColor = "unset";
    }
  }
}

function calculateDownPaymentOptions(): DownPaymentOption[] {
  let downPaymentOptions: DownPaymentOption[] = [];

  HOUSE_PRICES.forEach((fullPrice) => {
    DOWN_PAYMENT_PERCENTS.forEach((percentOfFullPrice) => {
      downPaymentOptions.push({
        fullPrice,
        percentOfFullPrice,
        downPaymentAmount: fullPrice * percentOfFullPrice,
      });
    });
  });

  return downPaymentOptions;
}

function createDownPaymentsTable(downPaymentOptions: DownPaymentOption[]) {
  const houseRatesEl = document.getElementById("house-rates");
  const headerRowEl = document.createElement("div");

  headerRowEl.classList.add("row");
  houseRatesEl?.appendChild(headerRowEl);

  const downPaymentColumns = ["Total Price", "Percent Down", "Down Payment"];

  for (const column of downPaymentColumns) {
    const headerCellEl = document.createElement("div");

    headerCellEl.classList.add("cell");
    headerCellEl.innerText = column;

    headerRowEl.appendChild(headerCellEl);
  }

  downPaymentOptions.forEach((downPaymentOption) => {
    const downPaymentRowEl = document.createElement("div");

    downPaymentRowEl.classList.add("row");

    downPaymentRowEl.dataset.fullPrice = downPaymentOption.fullPrice.toString();
    downPaymentRowEl.dataset.percentOfFullPrice =
      downPaymentOption.percentOfFullPrice.toString();
    downPaymentRowEl.dataset.downPaymentAmount =
      downPaymentOption.downPaymentAmount.toString();

    houseRatesEl?.appendChild(downPaymentRowEl);

    Object.keys(downPaymentOption).forEach((key) => {
      const downPaymentCellEl = document.createElement("div");

      downPaymentCellEl.classList.add("cell");
      downPaymentCellEl.dataset.col = key;

      const rawValue = downPaymentRowEl.dataset[key] || "";
      downPaymentCellEl.innerHTML =
        key === "percentOfFullPrice"
          ? Percent.format(parseFloat(rawValue))
          : UsDollar.format(parseInt(rawValue));

      downPaymentRowEl.appendChild(downPaymentCellEl);
    });
  });
}

function listenForRowClicks() {
  const houseRatesEl = document.getElementById("house-rates");
  const expensesInputEl = document.getElementById(
    "expenses-input"
  ) as HTMLInputElement;

  if (!houseRatesEl || !expensesInputEl) return;
  const monthlyExpensesAmount = parseInt(expensesInputEl.value);

  houseRatesEl.addEventListener("click", (event) => {
    const clickedRow = (event.target as HTMLElement)?.parentElement;
    if (!clickedRow || !clickedRow.dataset.fullPrice) return;

    let expandedRowInfo = document.getElementById("expanded-row-info");

    if (clickedRow === expandedRowInfo?.previousSibling) {
      expandedRowInfo.remove();
      return;
    }

    expandedRowInfo = document.createElement("div");
    expandedRowInfo.id = "expanded-row-info";

    const rowTotalHousePrice = parseInt(clickedRow.dataset.fullPrice ?? "");
    const rowDownPaymentAmount = parseInt(
      clickedRow.dataset.downPaymentAmount ?? ""
    );
    const principalAmount = rowTotalHousePrice - rowDownPaymentAmount;
    const averageMonthlyPropertyTaxes = (rowTotalHousePrice * 0.00137) / 2;
    const averageMonthlyHomeowners = 689.24 / 12;

    const monthlyPaymentAmount = calculateMonthlyMortgagePayment({
      principal: principalAmount,
      termYears: 30,
      annualRate: 8.0,
    });

    const expandedRowDetails = document.createElement("div");
    expandedRowDetails.id = "expanded-row-details";
    expandedRowDetails.innerHTML = `
     30-Year Monthly Payment:<br>
      ${UsDollar.format(monthlyPaymentAmount)}<br>
      Additional Monthly Expenses:<br>
      ${UsDollar.format(
        averageMonthlyPropertyTaxes + averageMonthlyHomeowners
      )}<br>
      New Monthly Expenses:<br>
      ${UsDollar.format(
        monthlyExpensesAmount +
          monthlyPaymentAmount +
          averageMonthlyPropertyTaxes +
          averageMonthlyHomeowners
      )}
      </div>
    `;

    expandedRowInfo.innerHTML = "";
    expandedRowInfo.appendChild(expandedRowDetails);

    clickedRow.insertAdjacentElement("afterend", expandedRowInfo);
  });
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
