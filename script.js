$(document).ready(function() {
    function isEmail(email){
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return pattern.test(password);
}

function togglePasswordVisibility(inputId, svgId) {
    const input = document.getElementById(inputId);
    const svg = document.getElementById(svgId);
    const isPassword = input.type === 'password';

    input.type = isPassword ? 'text' : 'password';

    // Add or remove a class for consistent styling
    if (isPassword) {
        input.classList.add('password-input');
    } else {
        input.classList.remove('password-input');
    }

    const closedPaths = svg.querySelectorAll('.eye-closed');
    const openPaths = svg.querySelectorAll('.eye-open');
    openPaths.forEach(p => p.style.display = isPassword ? 'none':'block');
    closedPaths.forEach(p => p.style.display = isPassword ? 'block' : 'none');
}

document.getElementById("toggle-password").addEventListener("click", function () {
    togglePasswordVisibility("password", "toggle-password");
});

document.getElementById("toggle-confirm-password").addEventListener("click", function () {
    togglePasswordVisibility("confirm-password", "toggle-confirm-password");
});

$("#submit").click(function() {
    let errormsg = ""; 
    let email = $('#Email').val().trim();
    let phone = $('#phone').val().trim();
    let password = $('#password').val();
    let confirmPassword = $('#confirm-password').val();

    if(email === "") {
        errormsg += "*Email is required.<br>";
    } else if(!isEmail(email)) {
        errormsg += "*Invalid email format.<br>";
    }

    if(phone === "") {
        errormsg += "*Phone number is required.<br>";
    } else if(!$.isNumeric(phone) || phone.length !== 10) {
        errormsg += "*Phone number must be numeric and 10 digits long.<br>";
    }
    if(password === "") {
        errormsg += "*Password is required.<br>";
    } else if(!isValidPassword(password)) {
        errormsg += "*Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.<br>";
    }

    if(confirmPassword === "") {
        errormsg += "*Confirm Password is required.<br>";
    } else if(password !== confirmPassword) {
        errormsg += "*Passwords do not match.<br>";
    }

    if(errormsg === "") {
        $("#p").html("Form submitted successfully!").css("color", "green").css("border", "3px solid green");
    } else {
        $("#p").html(errormsg).css("border", "3px solid red").css("color", "red");
    }
});
});
