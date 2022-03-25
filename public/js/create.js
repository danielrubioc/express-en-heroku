const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input_username = document.getElementById("username").value;
    const input_email = document.getElementById("email").value;
    const input_password = document.getElementById("password").value;

    fetch("/users", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: input_username,
            email: input_email,
            password: input_password,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.ok == true) {
                window.location.href = "/";
            } else {
                const div = document.getElementById("div-message");
                div.innerHTML = `<div class="notification is-danger"> 
                    ${res.data}
                    </div>`;
            }
        });
});
