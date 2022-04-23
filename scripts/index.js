const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const inputBill = document.querySelector(".form__input_type_bill");
const People = document.querySelector(".form__input_type_people");
const percent = document.querySelectorAll(".form__percent-option");
const totalTip = document.querySelector(".output__number_type_total-tip");
const totalBill = document.querySelector(".output__number_type_total-bill");
const costumTip = document.querySelector(".form__percent-costum");
const resetButton = document.querySelector(".output__reset-btn");
const form = document.querySelector(".form");
const reset = document.querySelector(".output__reset-btn");

let billValue = 0;

function enterBillValue() {
  billValue = parseFloat(inputBill.value);
  calcTip();
}

let tipPercent = 0;
function tipClick(event) {
  //resetting active state
  percent.forEach((btn) => {
    btn.classList.remove("form__percent-option_active");
    //add active state to clicked btn
    if (event.target.textContent === btn.textContent) {
      btn.classList.add("form__percent-option_active");
      //get value of current tip clicked on
      tipPercent = parseFloat(btn.textContent) / 100;
    }
  });
  calcTip();
}

let numPeople = 1;
function handlePeopleInput() {
  numPeople = parseInt(People.value);
  numPeople < 1 ? (numPeople = 1) : (numPeople = numPeople);
  calcTip();
}

function handleCostumTip() {
  tipPercent = parseFloat(costumTip.value) / 100;
  percent.forEach((btn) => {
    btn.classlist.remove("form__percent-option_active");
  });
}

function calcTip() {
  //number of people more then one
  if (numPeople >= 1) {
    //number inserted into bill input
    if (!isNaN(billValue) && billValue > 0) {
      activateResetButton();
      totalTip.textContent = `$${((billValue * tipPercent) / numPeople).toFixed(
        2
      )}`;
      totalBill.textContent = `$${(
        (billValue + billValue * tipPercent) /
        numPeople
      ).toFixed(2)}`;
    }
  }
}
function resetCalculator() {
  billValue = "0.0";
  percent.forEach((btn) => {
    btn.classList.remove("form__percent-option_active");
  });
  tipPercent = "0.0";
  numPeople = 1;
  form.reset();
  totalBill.textContent = "$0.00";
  totalTip.textContent = "$0.00";
  deactivateResetButton();
}

function activateResetButton() {
  reset.classList.add("output__reset-btn_active");
  reset.disabled = false;
}
function deactivateResetButton() {
  reset.classList.remove("output__reset-btn_active");
  reset.disabled = true;
}

/////////////////////////EVENTLISTENERS////////////////////////

inputBill.addEventListener("input", enterBillValue);
percent.forEach((btn) => btn.addEventListener("click", tipClick));
People.addEventListener("input", handlePeopleInput);
costumTip.addEventListener("input", handleCostumTip);
reset.addEventListener("click", resetCalculator);
