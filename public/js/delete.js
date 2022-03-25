const id = document.getElementById("id").value;
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    fetch("/users/" + id, { method: "DELETE" })
        .then((res) => res.json())
        .then((res) => {
            if (res.ok == true) {
                window.location.href = "/";
            }
        });
});
