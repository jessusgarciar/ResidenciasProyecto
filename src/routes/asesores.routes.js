import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/asesores', async (req, res) => {
    try {
        const [asesores] = await pool.query('SELECT * FROM asesores');
        res.render('asesores/asesores.hbs', { asesores: asesores });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

export default router;