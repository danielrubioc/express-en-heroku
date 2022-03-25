const { Pool } = require("pg");
const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres:root@localhost:5432/users_db";

const pool = process.env.DATABASE_URL
    ? new Pool({
          connectionString: connectionString,
          ssl: { rejectUnauthorized: false },
      })
    : new Pool({
          connectionString: connectionString,
      });

module.exports.getUsers = async () => {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM users");
        return {
            ok: true,
            data: res.rows,
        };
    } catch (error) {
        return {
            ok: false,
            data: "error en la conexión",
        };
    } finally {
        client.release();
    }
};

module.exports.getUserById = async (id) => {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM users");
        return {
            ok: true,
            data: res.rows,
        };
    } catch (error) {
        return {
            ok: false,
            data: "error en la conexión",
        };
    } finally {
        client.release();
    }
};

module.exports.deleteUser = async (id) => {
    const client = await pool.connect();
    try {
        const query = {
            text: "DELETE FROM users WHERE id=$1 RETURNING*",
            values: [id],
        };
        const res = await client.query(query);
        return {
            ok: true,
            data: res.rows,
        };
    } catch (error) {
        const { detail } = error;
        return { data: detail, ok: false };
    } finally {
        client.release();
    }
};

module.exports.createUser = async (data) => {
    const client = await pool.connect();
    try {
        const { username, email, password } = data;
        const query = {
            text: "INSERT INTO users (username, email, password)  values ($1, $2, $3) RETURNING*",
            values: [username, email, password],
        };
        const res = await client.query(query);
        return {
            ok: true,
            data: res.rows,
        };
    } catch (error) {
        const { detail } = error;
        return { data: detail, ok: false };
    } finally {
        client.release();
    }
};
