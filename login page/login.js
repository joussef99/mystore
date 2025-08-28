document.addEventListener("DOMContentLoaded", () => {
  // ===== Helpers =====
  const $ = (sel) => document.querySelector(sel);
  const getVal = (sel) => $(sel).value.trim();
  const clearErrors = (ids) => ids.forEach(id => $(`#${id}`).textContent = "");
  const isEmail = (email) => /^[^\s@]+@[^\s@]+\.com$/i.test(email);
  const showSection = (showSel, hideSel) => {
    $(showSel).style.display = "block";
    $(hideSel).style.display = "none";
  };

  // ===== Section Toggle =====
  $(".register").style.display = "none";
  $(".login a[href='#register']").addEventListener("click", e => {
    e.preventDefault();
    showSection(".register", ".login");
  });
  $(".register a[href='#login']").addEventListener("click", e => {
    e.preventDefault();
    showSection(".login", ".register");
  });

  // ===== Registration =====
  $("#registerBtn").addEventListener("click", (e) => {
    e.preventDefault();

    const username = getVal("#regNameId");
    const email = getVal("#regEmailId");
    const password = getVal("#regPassId");
    const confirmPassword = getVal("#confirmPassId");
    const terms = $("#terms").checked;

    let valid = true;
    clearErrors(["regNameError", "regEmailError", "regPassError", "confirmPassError", "termsError", "formMessage"]);

    if (username.length < 3) {
      $("#regNameError").textContent = "Username must be at least 3 characters.";
      valid = false;
    }
    if (!isEmail(email)) {
      $("#regEmailError").textContent = "Enter a valid email.";
      valid = false;
    }
    if (password.length < 6) {
      $("#regPassError").textContent = "Password must be at least 6 characters.";
      valid = false;
    }
    if (confirmPassword !== password) {
      $("#confirmPassError").textContent = "Passwords do not match.";
      valid = false;
    }
    if (!terms) {
      $("#termsError").textContent = "You must agree to the terms.";
      valid = false;
    }

    if (valid) {
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      $("#formMessage").textContent = "Registration successful! Please log in.";
      $("#formMessage").style.color = "green";
      showSection(".login", ".register");
    }
  });

  // ===== Login =====
  $("#loginBtn").addEventListener("click", (e) => {
    e.preventDefault();

    const enteredUsername = getVal("#logNameId");
    const enteredPassword = getVal("#logPassID");

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    clearErrors(["loginError"]);

    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
      window.location.href = "../homepage/home.html";
    } else {
      $("#loginError").textContent = "Invalid username or password.";
    }
  });
});
