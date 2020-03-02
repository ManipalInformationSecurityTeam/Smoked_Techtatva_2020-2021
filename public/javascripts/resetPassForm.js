function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    }
    return (false);
}
function recaptchaCallback(token) {
    document.getElementById("tokenVal").value = token;
    document.getElementById("loginForm").submit();
}
function submitForm(event) {
    var email = document.getElementById("email").value;
    if (!ValidateEmail(email)) {
        error.innerHTML = "Invalid Email";
    }
    else {
        event.preventDefault();
        // grecaptcha.reset();
        grecaptcha.execute();
    }
}