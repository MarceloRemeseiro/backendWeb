const jwt = require('jsonwebtoken');
const users = require('../config/users.json');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_super_secret_key';

const authenticateUser = (username, password) => {
    const user = users.users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        return token;
    }
    return null;
};

const verifyToken = (req, res, next) => {
    // Verificar si es una solicitud de API
    if (req.path.startsWith('/api/')) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    // Para solicitudes web, verificar la cookie
    const token = req.cookies?.token;
    
    // Si no hay token, redirigir al login
    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // Si el token es inválido, limpiar la cookie y redirigir
        res.clearCookie('token');
        return res.redirect('/auth/login');
    }
};

module.exports = { authenticateUser, verifyToken };
