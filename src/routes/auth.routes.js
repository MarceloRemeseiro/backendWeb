const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../utils/auth');

// Ruta para mostrar la página de login
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Ruta para procesar el login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const token = authenticateUser(username, password);
    if (token) {
        // Establecer el token como cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });
        
        // También enviar el token en la respuesta para el localStorage
        res.json({ token, success: true });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas', success: false });
    }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login?logout=true');
});

module.exports = router; 