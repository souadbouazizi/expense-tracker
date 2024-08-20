// Add style to title (class)
let title = document.querySelector('.title');
title.style.color = 'white';
title.style.background = 'grey';
title.style.padding = '15px 10px';
title.style.textAlign = 'center';

// Add style to button (ID)
let addExpense = document.getElementById('add-expense');
addExpense.style.color = 'white';
addExpense.style.background = 'grey';
addExpense.style.padding = '15px 10px';
addExpense.style.borderRadius = '6px';
addExpense.style.textAlign = 'center';
addExpense.style.boxShadow = '2px 2px 3px rgba(0,0,0,0.5)';
addExpense.style.outline = 'none';

// Style for total expenses
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

        expenseList.innerHTML = filteredExpenses.map((expense, index) => `
            <tr data-index="${index}">
                <td>${expense.description}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td><button class="btn remove" title="Remove Expense">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>
                </button></td>
            </tr>
        `).join('');

        // Add event listeners to the remove buttons
        document.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', function () {
                const row = this.closest('tr');
                const index = row.dataset.index;
                const confirmation = confirm('Are you sure you want to remove this expense?');
                if (confirmation) {
                    expenses.splice(index, 1); // Remove the expense from the array
                    renderExpenses(); // Re-render the list of expenses
                    alert('This expense has been removed.');
                }
            });
        });

        // Calculate and display the total expenses
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
