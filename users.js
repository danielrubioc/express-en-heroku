require("dotenv").config();
const { Client } = require("pg");

module.exports.getUsers = async () => {
    const client = new Client();
    await client.connect();
    const res = await client.query("SELECT * from users");
    await client.end();
    return res.rows;
};

module.exports.getUserById = async (id) => {
    const client = new Client();
    await client.connect();
    const query = {
        text: "SELECT * from users where id = $1;",
        values: [id],
    };
    const res = await client.query(query);
    await client.end();
    return res.rows;
};

module.exports.deleteUser = async (id) => {
    const client = new Client();
    await client.connect();

    try {
        const query = {
            text: "DELETE FROM users WHERE id=$1 RETURNING*",
            values: [id],
        };
        const res = await client.query(query);
        await client.end();
        return { data: res.rows, ok: true };
    } catch (error) {
        await client.end();
        const { detail } = error;
        return { data: detail, ok: false };
    }
};

module.exports.createUser = async (data) => {
    const client = new Client();
    await client.connect();

    try {
        const { username, email, password } = data;
        const query = {
            text: "INSERT INTO users (username, email, password)  values ($1, $2, $3) RETURNING*",
            values: [username, email, password],
        };
        const res = await client.query(query);
        await client.end();
        return { data: res.rows, ok: true };
    } catch (error) {
        await client.end();
        const { detail } = error;
        return { data: detail, ok: false };
    }
};
