import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/login' , (req, res) => {
    try {
        res.render('login.hbs');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password]);
        
        if (rows.length > 0) {
            req.session.num_control = rows[0].num_control; // Guarda el num_control en la sesión
            req.session.usuario = rows[0].username;
            req.session.rol = rows[0].rol;
            res.redirect('/');
        } else {
            res.render('login.hbs', { error: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/');
    });
});


export default router;