const clearAllBtn = document.querySelector("#clear-btn");
const amountInput = document.querySelector("#amount");
const termInput = document.querySelector("#term");
const interestInput = document.querySelector("#interest");

const form = document.querySelector("#form");
const contentRight = document.querySelector("#content-right");
const checkboxs = document.querySelector("#checkboxs");
const noResultsInfo = document.querySelector("#no-results-info");
const resultsInfo = document.querySelector("#results-container");
const monthlyPaymentsResult = document.querySelector("#monthly");
const totalPaymentsResult = document.querySelector("#total");
const checkboxesType = document.querySelectorAll(".box");
const fillDots = document.querySelectorAll("#fill");
let usersData = {
	amount: 0,
	term: 0,
	interest: 0,
	type: null,
};

let checkedMortgageType = false;
let error = true;

function getAmount(e) {
	usersData.amount = e.target.valueAsNumber;
	console.log(usersData);
}

// function getValue(e, key) {
// 	usersData[key] = e.target.valueAsNumber;
// 	console.log(usersData);
// }

function getTerm(e) {
	if (e.target.valueAsNumber > 50) {
		//  e.target.valueAsNumber;
		e.target.valueAsNumber = 50;
		usersData.term = e.target.valueAsNumber;
	} else {
		usersData.term = e.target.valueAsNumber;
	}
	console.log(usersData);
}

function getInterest(e) {
	if (e.target.valueAsNumber > 100) {
		e.target.valueAsNumber = 100;
		usersData.interest = e.target.valueAsNumber;
	} else {
		usersData.interest = e.target.valueAsNumber;
	}
}

function displayErrors() {
	if (amountInput.value === "") {
		error = true;
		amountInput.classList.add("input-error");
		console.log(amountInput.previousElementSibling);
		amountInput.parentElement.nextElementSibling.classList.add(
			"error-text-active"
		);
		amountInput.previousElementSibling.classList.add("icon-error");
	} else {
		error = false;
		amountInput.classList.add("input-active");
		amountInput.parentElement.nextElementSibling.classList.remove(
			"error-text-active"
		);
		amountInput.previousElementSibling.classList.remove("icon-error");
		amountInput.classList.remove("input-error");
	}
	if (termInput.value === "") {
		error = true;
		termInput.classList.add("input-error");
		termInput.parentElement.nextElementSibling.classList.add(
			"error-text-active"
		);
		termInput.nextElementSibling.classList.add("icon-error");
	} else {
		error = false;
		termInput.classList.remove("input-error");
		termInput.parentElement.nextElementSibling.classList.remove(
			"error-text-active"
		);
		termInput.nextElementSibling.classList.remove("icon-error");
	}
	if (interestInput.value === "") {
		error = true;
		interestInput.classList.add("input-error");
		interestInput.parentElement.nextElementSibling.classList.add(
			"error-text-active"
		);
		interestInput.nextElementSibling.classList.add("icon-error");
	} else {
		error = false;
		interestInput.classList.remove("input-error");
		interestInput.parentElement.nextElementSibling.classList.remove(
			"error-text-active"
		);
		interestInput.nextElementSibling.classList.remove("icon-error");
	}

	if (!checkedMortgageType) {
		error = true;
		checkboxs
			.getElementsByClassName("error-text")[0]
			.classList.add("error-text-active");
	} else {
		error = false;
		checkboxs
			.getElementsByClassName("error-text")[0]
			.classList.remove("error-text-active");
	}
}

function removeErrors() {
	checkboxs
		.getElementsByClassName("error-text")[0]
		.classList.remove("error-text-active");

	interestInput.classList.remove("input-error");
	interestInput.parentElement.nextElementSibling.classList.remove(
		"error-text-active"
	);
	interestInput.nextElementSibling.classList.remove("icon-error");
	termInput.classList.remove("input-error");
	termInput.parentElement.nextElementSibling.classList.remove(
		"error-text-active"
	);
	termInput.nextElementSibling.classList.remove("icon-error");
	amountInput.parentElement.nextElementSibling.classList.remove(
		"error-text-active"
	);
	amountInput.previousElementSibling.classList.remove("icon-error");
	amountInput.classList.remove("input-error");
}

function calculatePayments(e) {
	e.preventDefault();
	displayErrors();
	if (!error) {
		resultsInfo.classList.remove("hidden");
		noResultsInfo.classList.add("hidden");
	}
	const interest =
		usersData.amount * ((usersData.interest / 100) * usersData.term);
	const totalSum = usersData.amount + interest;
	const monthlySum = totalSum / (usersData.term * 12);
	const interestMonthly = interest / (usersData.term * 12);

	if (checkedMortgageType === "repayment") {
		totalPaymentsResult.textContent = `£${totalSum.toFixed(2)}`;
		monthlyPaymentsResult.textContent = `£${monthlySum.toFixed(2)}`;
		displayPayments(totalSum, monthlySum);
		console.log("dupa");
		console.log(interest, totalSum);
	} else if (checkedMortgageType === "interest") {
		displayPayments(interest, interestMonthly);
	}
	clearFields();
}

function displayPayments(value, monthlyValue) {
	totalPaymentsResult.textContent = `£${value.toFixed(2)}`;
	monthlyPaymentsResult.textContent = `£${monthlyValue.toFixed(2)}`;
}

function clearForm() {
	usersData = {
		amount: 0,
		term: 0,
		interest: 0,
		type: null,
	};
	resultsInfo.classList.add("hidden");
	noResultsInfo.classList.remove("hidden");
	clearFields();
	removeErrors();
}

function clearFields() {
	amountInput.value = "";
	termInput.value = "";
	interestInput.value = "";
	checkedMortgageType = false;
	checkboxesType.forEach((el) => el.classList.remove("checked"));
	error = true;

	fillDots.forEach((dot) => dot.classList.remove("active"));
}

// checkboxs.addEventListener("click", (e) => {
// 	const clickedTypeEl = e.target.closest(".box").getAttribute("id");
// 	console.log(e.target.closest(".box"));
// 	checkboxesType.forEach((el) => el.classList.remove("checked"));
// 	checkedMortgageType = false;

// 	fillDots.forEach((dot) => dot.classList.remove("active"));

// 	if (clickedTypeEl === "repayment") {
// 		e.target.closest(".box").classList.add("checked");
// 		// e.target.getElementsByClassName("fill")[0].classList.add("active");
// 		usersData.type = clickedTypeEl;
// 		checkedMortgageType = "repayment";
// 	} else if (clickedTypeEl === "interest") {
// 		e.target.closest(".box").classList.add("checked");
// 		e.target.getElementsByClassName("fill")[0].classList.add("active");
// 		console.log(e.target.getElementsByClassName("fill")[0]);
// 		usersData.type = clickedTypeEl;
// 		checkedMortgageType = "interest";
// 	}
// });

function checkboxActive(el) {
	checkedMortgageType = false;
	checkboxesType.forEach((type) => type.classList.remove("checked"));
	fillDots.forEach((dot) => dot.classList.remove("active"));
	el.closest(".box").classList.add("checked");
	el.getElementsByClassName("fill")[0].classList.add("active");
}

checkboxesType.forEach((el) => {
	const clickedTypeEl = el.closest(".box").getAttribute("id");
	if (clickedTypeEl === "repayment") {
		el.addEventListener("click", () => {
			// checkboxesType.forEach((el) => el.classList.remove("checked"));
			// fillDots.forEach((dot) => dot.classList.remove("active"));
			// el.closest(".box").classList.add("checked");
			// el.getElementsByClassName("fill")[0].classList.add("active");
			// usersData.type = clickedTypeEl;
			checkboxActive(el);
			usersData.type = clickedTypeEl;
			checkedMortgageType = "repayment";
		});
	} else if (clickedTypeEl === "interest") {
		el.addEventListener("click", () => {
			// checkboxesType.forEach((el) => el.classList.remove("checked"));
			// fillDots.forEach((dot) => dot.classList.remove("active"));
			// el.closest(".box").classList.add("checked");
			// el.getElementsByClassName("fill")[0].classList.add("active");
			// usersData.type = clickedTypeEl;
			checkboxActive(el);
			usersData.type = clickedTypeEl;
			checkedMortgageType = "interest";
		});
	}
});

clearAllBtn.addEventListener("click", clearForm);
form.addEventListener("submit", calculatePayments);
amountInput.addEventListener("input", getAmount);
termInput.addEventListener("input", getTerm);
interestInput.addEventListener("input", getInterest);

amountInput.addEventListener("focus", () => {
	amountInput.classList.add("active");
	amountInput.previousElementSibling.classList.add("active");
});
termInput.addEventListener("focus", () => {
	termInput.classList.add("active");
	termInput.nextElementSibling.classList.add("active");
});
interestInput.addEventListener("focus", () => {
	interestInput.classList.add("active");
	interestInput.nextElementSibling.classList.add("active");
});
amountInput.addEventListener("blur", () => {
	amountInput.classList.remove("active");
	amountInput.previousElementSibling.classList.remove("active");
});
termInput.addEventListener("blur", () => {
	termInput.classList.remove("active");
	termInput.nextElementSibling.classList.remove("active");
});
interestInput.addEventListener("blur", () => {
	interestInput.classList.remove("active");
	interestInput.nextElementSibling.classList.remove("active");
});
