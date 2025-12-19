// ===== AUTH =====
// ===== DOM ELEMENTS =====
const categorySelect = document.getElementById("categorySelect");
const otherPurpose = document.getElementById("otherPurpose");
const amountInput = document.getElementById("amountInput");
const expenseDate = document.getElementById("expenseDate");
const historyTable = document.getElementById("historyTable");
// ===== DOM ELEMENTS =====
const pname = document.getElementById("pname");
const pemail = document.getElementById("pemail");
const psalary = document.getElementById("psalary");
const income = document.getElementById("income");
const profilePic = document.getElementById("profilePic");

const email = localStorage.getItem("loggedInUser");
if (!email) location.href = "index.html";

const users = JSON.parse(localStorage.getItem("users")) || [];
const user = users.find(u => u.email === email);

if (!user) {
    localStorage.clear();
    location.href = "index.html";
}

// ===== PROFILE =====
pname.innerText = user.name;
pemail.innerText = user.email;
psalary.innerText = user.income;
income.innerText = user.income;
profilePic.src = user.photo || "https://via.placeholder.com/120";

// ===== EXPENSE STORAGE =====
const EXP_KEY = "expenses_" + email;
let expenses = JSON.parse(localStorage.getItem(EXP_KEY)) || [];

// ===== PROFILE TOGGLE =====
function toggleProfile() {
    profile.style.display = profile.style.display === "block" ? "none" : "block";
}

// ===== CATEGORY OTHER =====
function checkOther() {
    otherPurpose.style.display =
        categorySelect.value === "Other" ? "block" : "none";
}

// ===== ADD EXPENSE =====
function addExpense() {
    console.log("Before push:", expenses);
    const category = categorySelect.value;
    const purpose = category === "Other" ? otherPurpose.value.trim() : category;
    const amount = Number(amountInput.value);
    const date = expenseDate.value;

    if (!purpose || !amount || !date) return;

    expenses.push({ purpose, amount, date });
    console.log("After push:", expenses);

    localStorage.setItem(EXP_KEY, JSON.stringify(expenses));

    categorySelect.value = "";
    otherPurpose.value = "";
    otherPurpose.style.display = "none";
    amountInput.value = "";
    expenseDate.value = "";

    renderExpenses();
}

// ===== DELETE =====
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem(EXP_KEY, JSON.stringify(expenses));
    renderExpenses();
}

// ===== UPDATE =====
function updateExpense(index) {
    const amt = prompt("New amount", expenses[index].amount);
    const date = prompt("New date (YYYY-MM-DD)", expenses[index].date);

    if (amt && date) {
        expenses[index].amount = Number(amt);
        expenses[index].date = date;
        localStorage.setItem(EXP_KEY, JSON.stringify(expenses));
        renderExpenses();
    }
}

// ===== RENDER TABLE & STATS =====
function renderExpenses() {
    historyTable.innerHTML = "";
    let total = 0;

    expenses.forEach((e, i) => {
        total += Number(e.amount);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${e.purpose}</td>
            <td>₹${e.amount}</td>
            <td>${e.date}</td>
            <td>
                <button onclick="updateExpense(${i})">✏️</button>
                <button onclick="deleteExpense(${i})">🗑️</button>
            </td>
        `;

        historyTable.appendChild(row);
    });

    expense.innerText = total;
    balance.innerText = user.income - total;

    drawProfileGraph(total);
}


// ===== GRAPH =====
let chart;
function drawProfileGraph(total) {
    const ctx = document.getElementById("profileGraph").getContext("2d");
    const remain = Math.max(user.income - total, 0);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Spent", "Remaining"],
            datasets: [{
                data: [total, remain],
                backgroundColor: ["#ff8a80", "#80d8ff"]
            }]
        }
    });
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("loggedInUser");
    location.href = "index.html";
}

// INIT
renderExpenses();
