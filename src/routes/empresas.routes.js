import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/empresas/insertar' , (req, res) => {
    try {
        res.render('empresas/addempresa.hbs');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
});

router.post('/empresas/insertar', async (req, res) => {
    try {
        const { nombre, atencion_a, giro_sector, domicilio, colonia, ciudad, mision, codigo_postal, titular_nombre, titular_puesto, firmante_nombre, firmante_puesto } = req.body;
        await pool.query('INSERT INTO empresas (nombre, atencion_a, giro_sector, domicilio, colonia, ciudad, mision, codigo_postal, titular_nombre, titular_puesto, firmante_nombre, firmante_puesto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, atencion_a, giro_sector, domicilio, colonia, ciudad, mision, codigo_postal, titular_nombre, titular_puesto, firmante_nombre, firmante_puesto]);
        res.redirect('/empresas');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/empresas' , async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM empresas');
        res.render('empresas/empresas.hbs', { empresas: rows });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/empresas/edit/:id' , async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM empresas WHERE id = ?', [id]);
        const empresaEditar = rows[0];
        res.render('empresas/editempresa.hbs', { rows: empresaEditar });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.post('/empresas/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, atencion_a, giro_sector, domicilio, colonia, ciudad, mision, codigo_postal, titular_nombre, titular_puesto, firmante_nombre, firmante_puesto } = req.body;
        await pool.query('UPDATE empresas SET nombre = ?, atencion_a = ?, giro_sector = ?, domicilio = ?, colonia = ?, ciudad = ?, mision = ?, codigo_postal = ?, titular_nombre = ?, titular_puesto = ?, firmante_nombre = ?, firmante_puesto = ? WHERE id = ?', [nombre, atencion_a, giro_sector, domicilio, colonia, ciudad, mision, codigo_postal, titular_nombre, titular_puesto, firmante_nombre, firmante_puesto, id]);
        res.redirect('/empresas');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/empresas/delete/:id' , async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM empresas WHERE id = ?', [id]);
        res.redirect('/empresas');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});



export default router;