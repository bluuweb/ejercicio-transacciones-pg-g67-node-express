import { pool } from "../database/connection.js"
import { User } from "./user.model.js"

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM TRANSFER")
    return rows
}

const create = async (origen, destino, valor) => {
    try {

        await pool.query("BEGIN")

        const user1 = await User.updateSaldo(origen, -valor)
        if (!user1) throw new Error("Falló")

        const user2 = await User.updateSaldo(destino, valor)
        if (!user2) throw new Error("Falló")

        const query = {
            text: "INSERT INTO TRANSFER (ORIGEN, DESTINO, VALOR) VALUES ($1, $2, $3) RETURNING *",
            values: [origen, destino, valor]
        }

        const { rows } = await pool.query(query)

        await pool.query("COMMIT")
        return {
            ok: true,
            data: rows[0]
        }
    } catch (error) {
        console.log(error)
        await pool.query("ROLLBACK")
        return {
            ok: false,
            data: "Error en la transferencia"
        }
    }
}

export const Transfer = {
    create,
    findAll
}