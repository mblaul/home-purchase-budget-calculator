import { Decimal, Integer } from "./utils";

const INPUT_TYPES = {
  WHOLE_NUMBER: "wholeNumber",
  DECIMAL: "decimal",
  PERCENT: "percent",
  CURRENCY: "currency",
} as const;
export type InputType = typeof INPUT_TYPES[keyof typeof INPUT_TYPES];

export type Input = {
  id: string;
  label: string;
  type: InputType;
}

const SAVINGS: Input = {
  id: "savings",
  label: "Savings",
  type: INPUT_TYPES.CURRENCY,
}

const MONTHLY_EXPENSES: Input = {
  id: "monthly-expenses",
  label: "Monthly Expenses",
  type: INPUT_TYPES.CURRENCY,
}

const PRINCIPAL: Input = {
  id: "principal",
  label: "Principal",
  type: INPUT_TYPES.CURRENCY,
}

const DOWN_PAYMENT_AMOUNT: Input = {
  id: "down-payment-amount",
  label: "Down Payment Amount",
  type: INPUT_TYPES.CURRENCY,
}

const MORTGAGE_RATE: Input = {
  id: "mortgage-rate",
  label: "Mortgage Rate",
  type: INPUT_TYPES.PERCENT,
}

const MONTHLY_PMI: Input = {
  id: "pmi",
  label: "PMI (Private Mortgage Insurance)",
  type: INPUT_TYPES.CURRENCY,
}

const HOMEOWNERS_INSURANCE: Input = {
  id: "homeowners-insurance",
  label: "Homeowners' Insurance",
  type: INPUT_TYPES.CURRENCY,
};

const TAX_RATE: Input = {
  id: "tax-rate",
  label: "Tax Rate (in Mils)",
  type: INPUT_TYPES.DECIMAL,
};

export const INPUTS = {
  SAVINGS,
  MONTHLY_EXPENSES,
  PRINCIPAL,
  DOWN_PAYMENT_AMOUNT,
  MORTGAGE_RATE,
  MONTHLY_PMI,
  HOMEOWNERS_INSURANCE,
  TAX_RATE,
}

export const INPUT_IDS_TO_INPUTS = {
  [SAVINGS.id]: SAVINGS,
  [MONTHLY_EXPENSES.id]: MONTHLY_EXPENSES,
  [PRINCIPAL.id]: PRINCIPAL,
  [DOWN_PAYMENT_AMOUNT.id]: DOWN_PAYMENT_AMOUNT,
  [MORTGAGE_RATE.id]: MORTGAGE_RATE,
  [MONTHLY_PMI.id]: MONTHLY_PMI,
  [HOMEOWNERS_INSURANCE.id]: HOMEOWNERS_INSURANCE,
  [TAX_RATE.id]: TAX_RATE,
}

export const INPUT_TYPES_TO_STRING_FORMATTERS = {
  [INPUT_TYPES.WHOLE_NUMBER]: (value: number) => Integer.format(value),
  [INPUT_TYPES.DECIMAL]: (value: number) => Decimal.format(value / 100),
  [INPUT_TYPES.PERCENT]: (value: number) => {
    let result;
    
    if (value < 0) {
      result = Decimal.format(0);
    } else  if (value > 10_000) {
      result = Decimal.format(100);
    } else {
      result = Decimal.format(value / 100);
    }

    return result;
  },
  [INPUT_TYPES.CURRENCY]: (value: number) => Decimal.format(value / 100),
} as const;
type INPUT_TYPES_TO_STRING_FORMATTERS = typeof INPUT_TYPES_TO_STRING_FORMATTERS[keyof typeof INPUT_TYPES_TO_STRING_FORMATTERS];