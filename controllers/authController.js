const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.loginPage = (req, res) => {
    res.render('login', { error: null });
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Simple validation
        if (!username || !password) {
            return res.render('login', { error: 'Please provide username and password' });
        }

        // Find user (in real app, this would be from database)
        const user = await User.findByUsername(username);
        if (!user) {
            return res.render('login', { error: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.render('login', { error: 'Invalid credentials' });
        }

        // Set session
        req.session.user = {
            id: user.id,
            username: user.username
        };

        res.redirect('/chat');
    } catch (error) {
        console.error(error);
        res.render('login', { error: 'Login failed' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
};
