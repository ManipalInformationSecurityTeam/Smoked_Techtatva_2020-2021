function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    }
    return (false);
}

function recaptchaCallback(token) {
    document.getElementById("tokenVal").value = token;
    document.getElementById("registerForm").submit();
}
function submitForm(event) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var c_password = document.getElementById("c_password").value;
    var name = document.getElementById("name").value;
    var regno = document.getElementById("regno").value;
    var phone = document.getElementById("phone").value;
    var username = document.getElementById("username").value;
    var college = document.getElementById("college").value;
    var error = document.getElementById("error");
    console.log(email);
    if (!ValidateEmail(email)) {
        error.innerHTML = "Invalid Email";
    }
    else if (password.length < 5) {
        error.innerHTML = "Password should be atleast 5 characters";
    }
    else if (password.valueOf() != c_password.valueOf()) {
        error.innerHTML = "Passwords not matching";
    }
    else if (!regno.length == 9) {
        error.innerHTML = "Enter the registration number";
    }
    else if (phone.length != 10) {
        error.innerHTML = "Phone number not valid";
    }
    else if (username.length < 5) {
        error.innerHTML = "Minimum username length is 5";
    }
    else if (/[^a-zA-Z0-9]/.test(username)) {
        error.innerHTML = "Username should be alphanumeric";
    }
    else if (!(name.length > 2)) {
        error.innerHTML = "Please enter your name";
    }
    else if (!(college.length > 1)) {
        error.innerHTML = "Please enter valid college name";
    }
    else {
        event.preventDefault();
        // grecaptcha.reset();
        grecaptcha.execute();
    }
}