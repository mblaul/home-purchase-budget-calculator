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

export const Decimal = Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Inputs
function handleNumberInput(event: Event) {
  const inputElement = event.currentTarget as HTMLInputElement;

  inputElement.value = inputElement.value.replace(/[^0-9]/g, "");

  if (inputElement.value === "") return;

  inputElement.value = Decimal.format(parseInt(inputElement.value));
}

export function getCurrencyTextInput({
  id,
  label,
}: {
  id: string;
  label: string;
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

// Table
export function createTable<T>({
  tableId,
  data,
  columnDefs,
}: {
  tableId: string;
  data: T[];
  columnDefs: {
    label: string;
    dataPropertyName: string;
    formatter: (cellValue: string) => string;
  }[];
}) {
  const tableEl = document.createElement("div");
  tableEl.dataset.sortColumnName = "";
  tableEl.dataset.sortDirection = "";
  tableEl.id = tableId;

  const headerRowEl = document.createElement("div");

  headerRowEl.classList.add("header", "row");
  tableEl?.appendChild(headerRowEl);

  for (const columnDef of columnDefs) {
    const headerCellEl = document.createElement("div");

    headerCellEl.classList.add("header", "cell");
    headerCellEl.innerHTML = `<div>${columnDef.label}</div>`;
    headerCellEl.dataset.col = columnDef.dataPropertyName;
    headerCellEl.dataset.tableId = tableId;
    headerCellEl.addEventListener("click", sortTableData);

    headerRowEl.appendChild(headerCellEl);
  }

  const tableBodyEl = document.createElement("div");
  tableBodyEl.id = "table-body";
  tableEl?.appendChild(tableBodyEl);

  data.forEach((row, index) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("body", "row");
    rowEl.dataset.rowId = index.toString();

    tableBodyEl?.appendChild(rowEl);

    for (const column in row) {
      rowEl.dataset[column] = row[column] as string;

      const cell = document.createElement("div");
      cell.classList.add("body", "cell");
      cell.dataset.col = column;
      cell.dataset.tableId = tableId;

      cell.innerHTML =
        columnDefs
          .find((colDef) => colDef.dataPropertyName === column)
          ?.formatter(row[column] as string) || "";

      rowEl.appendChild(cell);
    }
  });

  return tableEl;
}

function sortTableData(event: Event) {
  const targetElement = event.currentTarget as HTMLElement;
  const newSortColumnName = targetElement.dataset.col;
  if (!newSortColumnName) return;

  const tableEl = document.getElementById(targetElement.dataset.tableId || "");
  if (!tableEl) return;

  let newSortDirection = "";

  if (tableEl.dataset.sortColumnName === newSortColumnName) {
    if (tableEl.dataset.sortDirection === "asc") {
      newSortDirection = "desc";
    }

    if (tableEl.dataset.sortDirection === "") {
      newSortDirection = "asc";
    }
  } else {
    newSortDirection = "asc";
  }

  tableEl.dataset.sortColumnName = newSortColumnName;
  tableEl.dataset.sortDirection = newSortDirection;

  const tableRowEls = Array.from(
    document.getElementsByClassName("body row")
  ) as HTMLDivElement[];

  const sortedTableRowEls = tableRowEls.sort((a, b) => {
    if (newSortDirection === "")
      return Number(a.dataset.rowId ?? "") - Number(b.dataset.rowId ?? "");

    const sortResult =
      Number(a.dataset[newSortColumnName] ?? "") -
      Number(b.dataset[newSortColumnName] ?? "");

    return newSortDirection === "asc" ? sortResult : -sortResult;
  });

  const tableBodyEl = document.getElementById("table-body");

  if (!tableBodyEl) return;

  tableBodyEl.replaceChildren(...sortedTableRowEls);

  document.getElementById("sort-indicator")?.remove();

  const sortIndicatorEl = document.createElement("div");
  sortIndicatorEl.id = "sort-indicator";

  sortIndicatorEl.innerHTML =
    newSortDirection === "asc" ? "⬆️" : newSortDirection === "desc" ? "⬇️" : "";
  targetElement.appendChild(sortIndicatorEl);
}
