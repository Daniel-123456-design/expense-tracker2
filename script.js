const form = document.getElementById("transactionForm")
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const transactionList = document.getElementById("transactionList");
const clearButton = document.getElementById("clearButton");
 
let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function money(amount) {
}
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const description =
        descriptionInput.value.trim();
    const amount =
        Number(amountInput.value);
    const type =
        typeInput.value;
    const category =
        categoryInput.value;
    // if (description === "" || amount <= 0) {
    //     alert("Please enter a valid description and amount.");
    //     return;
    // }
    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };
    transactions.push(transaction);
    saveTransactions();
    displayTransactions();
    form.reset();
});

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}
 return "₦" + Number(amount).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

function displayTransactions() {
    transactionList.innerHTML = "";
    if (transactions.length === 0) {
        transactionList.innerHTML =
            '<p class="empty">No transactions yet.</p>';
        updateSummary();
        return;
    }
    transactions.slice().reverse().forEach(function(transaction) {
        const div =
            document.createElement("div");
        div.className = "transaction";
        let sign;
        let textClass;
        let icon;
         if (transaction.type === "income") {
            sign = "+";
            textClass = "income-text";
            icon = "💰";
        } else {
            sign = "-";
            textClass = "expense-text";
            icon = getIcon(transaction.category);
        }
        div.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-icon">
                    ${icon}
                </div>
                <div>
                    <strong>
                        ${transaction.description}
                    </strong>
                    <br>
                    <small>
                        ${transaction.category}
                    </small>
                </div>
            </div>
            <div>
                <strong class="${textClass}">
                    ${sign}${money(transaction.amount)}
                </strong>
                <button
                    class="delete-button"
                    onclick="deleteTransaction(${transaction.id})"
                >
                    ✕
                </button>
            </div>
        `;
        transactionList.appendChild(div);
    });
    updateSummary();
}

function updateSummary() {
    let income = 0;
    let expenses = 0;
        let feeding = 0;
let accommodation = 0;
    let amenities = 0;
    let necessities = 0;
    let transport = 0;
    let education = 0;

    transactions.forEach(function(transaction) {

     if (transaction.type === "income") {

            income += transaction.amount;
        }
        else {
            expenses += transaction.amount;
            if (transaction.category === "Feeding") {
                feeding += transaction.amount;
            }
            if (transaction.category === "Accommodation") {
                accommodation += transaction.amount;
            }
if (transaction.category === "Amenities") {
                amenities += transaction.amount;
            }
            if (transaction.category === "Necessities") {
                necessities += transaction.amount;
            }
            if (transaction.category === "Transport") {
                transport += transaction.amount;
            }
            if (transaction.category === "Education") {
                education += transaction.amount;
            }
        }

    });

    document.getElementById("totalIncome").textContent =
        money(income);
    document.getElementById("totalExpenses").textContent =
        money(expenses);
    document.getElementById("balance").textContent =
        money(income - expenses);
    document.getElementById("feeding").textContent =
        money(feeding);
    document.getElementById("accommodation").textContent =
        money(accommodation);
    document.getElementById("amenities").textContent =
        money(amenities);
    document.getElementById("necessities").textContent =
        money(necessities);
    document.getElementById("transport").textContent =
        money(transport);
    document.getElementById("education").textContent =
        money(education);
}
function deleteTransaction(id) {
    transactions =
        transactions.filter(function(transaction) {
            return transaction.id !== id;
        });
    saveTransactions();
    displayTransactions();

}
clearButton.addEventListener("click", function() {
    if (transactions.length === 0) {
        alert("There are no transactions to clear.");
        return;
    }
    const answer =
        confirm("Delete all transactions?");
    if (answer) {
        transactions = [];
        saveTransactions();
        displayTransactions();
    }
});
displayTransactions();
