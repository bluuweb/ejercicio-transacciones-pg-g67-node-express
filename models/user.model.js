import { pool } from "../database/connection.js"

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM users")
    return rows
}

const findOneById = async (uid) => {
    const query = {
        text: "SELECT * FROM users WHERE uid = $1",
        values: [uid]
    }
    const { rows } = await pool.query(query)
    return rows
}

const create = async (uid, email) => {
    const query = {
        text: "INSERT INTO USERS (uid, email) VALUES ($1, $2) RETURNING *",
        values: [uid, email]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const remove = async (uid) => {
    const query = {
        text: "DELETE FROM users WHERE uid = $1 RETURNING *",
        values: [uid]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const updateSaldo = async (uid, valor) => {
    const query = {
        text: "UPDATE users SET saldo = saldo + $1 WHERE uid = $2 RETURNING *",
        values: [valor, uid]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

export const User = {
    findAll,
    create,
    findOneById,
    remove,
    updateSaldo
}