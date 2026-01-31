const login = document.getElementById("login_submit")
login.addEventListener("click", login_user)

async function login_user() {
    const username = document.getElementById("login_user").value;
    const password = document.getElementById("login_pass").value;

    const login = {
        username: username,
        password: password,
    };

    // send our login info to the backend and await a response
    const response = await fetch("http://127.0.0.1:5000/login_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
    });

    // data is what will be returned from the backend
    const data = await response.json();

    console.log(data);

    if (data.status === "ok") {
        // set cookie and let them in
        document.cookie = `current_user=${username}`
        window.location.replace("/");
    } else {
        // reject login
        console.log("Login failed");
    }
}