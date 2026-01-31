const register = document.getElementById("register_submit")

register.addEventListener("click", register_user)

function register_user() {
    const username = document.getElementById("register_user").value;
    const password = document.getElementById("register_pass").value;

    const login = {
    username: username,
    password: password,
    };

    fetch("http://127.0.0.1:5000/register_user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login),
    });

    if (data.status === "ok") {
        // let user in
        window.setTimeout(() => {
        window.location.replace("/");
        }, 100); // wait 100ms then redirect to root
    } else {
        // reject login
        console.log("Login failed");
    }
}