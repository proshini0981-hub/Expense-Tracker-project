const email = localStorage.getItem("loggedInUser");
const users = JSON.parse(localStorage.getItem("users")) || [];
const user = users.find(u => u.email === email);

function save() {
    user.name = document.getElementById("name").value.trim();
    user.income = Number(document.getElementById("salary").value);

    const file = document.getElementById("photo").files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            user.photo = reader.result;
            localStorage.setItem("users", JSON.stringify(users));
            location.href = "dashboard.html";
        };
        reader.readAsDataURL(file);
    } else {
        localStorage.setItem("users", JSON.stringify(users));
        location.href = "dashboard.html";
    }
}
