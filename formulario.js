document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var age = document.getElementById("age").value;

    document.cookie = "username=" + username + ";";
    document.cookie = "age=" + age + ";";

    window.location.href = "index.html";
});