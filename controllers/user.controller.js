import { nanoid } from "nanoid"
import { User } from "../models/user.model.js"

export const getAllUsers = async (req, res) => {
    console.log(req.query)
    const users = await User.findAll()
    res.json(users)
}

export const getUser = async (req, res) => {
    const { uid } = req.params
    const user = await User.findOneById(uid)
    res.json(user)
}

export const createUser = async (req, res) => {
    const { email } = req.body
    const uid = nanoid()
    const newUser = await User.create(uid, email)
    res.json(newUser)
}

export const removeUser = async (req, res) => {
    const { uid } = req.params
    const user = await User.remove(uid)
    res.json(user)
}

export const updateUser = async (req, res) => {
    const { uid } = req.params
    const { valor } = req.body
    const user = await User.updateSaldo(uid, valor)
    res.json(user)
}