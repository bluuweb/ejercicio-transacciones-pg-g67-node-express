import { Transfer } from "../models/transfer.model.js"

export const transferAll = async (req, res) => {
    const transfers = await Transfer.findAll()
    return res.json(transfers)
}

export const transferMont = async (req, res) => {
    const { origen, destino, valor } = req.body
    const response = await Transfer.create(origen, destino, valor)
    if (!response.ok) {
        return res.status(500).json(response)
    }
    return res.json(response)
}