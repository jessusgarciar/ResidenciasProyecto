import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/forms', async (req, res) => {
    try {
        // Consulta las carreras y las empresas
        const [carreras] = await pool.query('SELECT id, nombre FROM carreras');
        const [empresas] = await pool.query('SELECT id, nombre FROM empresas');

        // Pasa ambas listas a la vista
        res.render('form/form.hbs', { carreras, empresas });
    } catch (error) {
        console.error('Error al cargar las carreras o empresas:', error);
        res.status(500).send('Error al cargar las carreras o empresas');
    }
});

router.get('/empresa/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM empresas WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]); // Devuelve los datos de la empresa como JSON
        } else {
            res.status(404).json({ error: 'Empresa no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos de la empresa' });
    }
});

router.get('/carreras/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM carreras WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]); // Devuelve los datos de la empresa como JSON
        } else {
            res.status(404).json({ error: 'Empresa no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos de la empresa' });
    }
});



export default router;