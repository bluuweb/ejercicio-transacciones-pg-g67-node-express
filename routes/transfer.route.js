import { Router } from "express";
import { transferAll, transferMont } from "../controllers/transfer.controller.js";

const router = Router()

router.get('/', transferAll)
router.post('/', transferMont)

export default router