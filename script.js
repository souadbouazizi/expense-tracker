// add style to title (class)
let title = document.querySelector('.title');
title.style.color = 'white';
title.style.background = 'grey';
title.style.padding = '15px 10px';
title.style.textAlign = 'center';

// add style to button (ID)
let addExpense = document.getElementById('add-expense');
addExpense.style.color = 'white';
addExpense.style.background = 'grey';
addExpense.style.padding = '15px 10px';
addExpense.style.borderRadius = '6px';
addExpense.style.textAlign = 'center';
addExpense.style.boxShadow = '2px 2px 3px rgba(0,0,0,0.5)';
addExpense.style.outline = 'none';

// style for total expenses
let totalExpenses = document.querySelector('#total-expenses');
totalExpenses.style.color = 'red';
totalExpenses.style.fontWeight = 'bold';

document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpenses = document.getElementById('total-expenses');
    const filterCategory = document.getElementById('filter-category');

    let expenses = [];

    // Function to add a new expense
    function addExpense(description, amount, category) {
        const expense = {
            description,
            amount: parseFloat(amount),
            category
        };
        expenses.push(expense);
        renderExpenses();
    }

    // Function to render the list of expenses
    function renderExpenses() {
        const filteredExpenses = expenses.filter(expense =>
            filterCategory.value === 'All' || expense.category === filterCategory.value
        );

        expenseList.innerHTML = filteredExpenses.map(expense => `
            <tr>
                <td>${expense.description}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
            </tr>
        `).join('');

        const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpenses.textContent = total.toFixed(2);
    }

    // Handle form submission
    expenseForm.addEventListener('submit', event => {
        event.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('expense-category').value;

        addExpense(description, amount, category);

        expenseForm.reset();
    });

    // Handle category filter change
    filterCategory.addEventListener('change', renderExpenses);

    renderExpenses();
});
