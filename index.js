const express = require("express");
const { engine } = require("express-handlebars");
const { getUsers, getUserById, deleteUser, createUser } = require("./users");
const app = express();
const PORT = process.env.DATABASE_URL || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.engine(".handlebars", engine());
app.set("view engine", ".handlebars");
app.set("views", "./views");

app.get("/", async (req, res) => {
    const { data } = await getUsers();
    res.render("index", { users: data });
});

app.get("/user-create", async (req, res) => {
    res.render("create");
});

app.post("/users", async (req, res) => {
    const { username, email, password } = req.body;
    const response = await createUser({ username, email, password });
    return res.json(response);
});

app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { data } = await getUserById(id);
    const user = await data[0];
    if (user) {
        res.render("delete", { user });
    } else {
        res.redirect("/");
    }
});

app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const response = await deleteUser(id);
    return res.json(response);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
