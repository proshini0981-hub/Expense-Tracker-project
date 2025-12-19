function signup(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const income = Number(document.getElementById("income").value);
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Gender
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? genderInput.value : "";

    if (!name || !email || !password || !confirmPassword || income <= 0 || !gender) {
        alert("Please fill all fields correctly");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === email)) {
        alert("Account already exists");
        return;
    }

    users.push({
        name,
        email,
        password,
        income,
        gender,
        photo: ""
    });

    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "index.html";
}
