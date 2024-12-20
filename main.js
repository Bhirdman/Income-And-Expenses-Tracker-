let currencyUnit = localStorage.getItem('currencyUnit') || '₵';
let income = JSON.parse(localStorage.getItem('income')) || 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


function setCurrency() {
    currencyUnit = document.getElementById('currency-unit').value;
    localStorage.setItem('currencyUnit', currencyUnit);
    updateUI();
}


function setIncome() {
    const incomeInput = document.getElementById('income');
    const enteredIncome = parseFloat(incomeInput.value);

    if (isNaN(enteredIncome) || enteredIncome <= 0) {
        alert("Please enter a valid income amount.");
        return;
    }

    income = enteredIncome;
    localStorage.setItem('income', JSON.stringify(income));
    incomeInput.value = '';
    updateUI();
}


function addExpense() {
    const expenseName = document.getElementById('expense-name').value.trim();
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

    if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    expenses.push({ id: Date.now(), name: expenseName, amount: expenseAmount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    updateUI();
}


function updateUI() {
    const expensesList = document.getElementById('expenses-list');
    const balanceElement = document.getElementById('balance');
    const totalExpensesElement = document.getElementById('total-expenses');

    expensesList.innerHTML = '';
    let totalExpenses = 0;

    expenses.forEach(expense => {
        totalExpenses += expense.amount;

        const li = document.createElement('li');
        li.className = 'expense';
        li.innerHTML = `
            <span>${expense.name}: ${currencyUnit}${expense.amount.toFixed(2)}</span>
            <button onclick="deleteExpense(${expense.id})">&times;</button>
        `;
        expensesList.appendChild(li);
    });

    const balance = income - totalExpenses;
    balanceElement.textContent = `${currencyUnit}${balance.toFixed(2)}`;
    totalExpensesElement.textContent = `${currencyUnit}${totalExpenses.toFixed(2)}`;
}


function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateUI();
}


updateUI();
