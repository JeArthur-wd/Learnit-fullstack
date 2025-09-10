import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from './../utilities/prisma.js';

// =====================
// Render Pages
// =====================
export const showLoginPage = (req, res) => {
    res.render('auth/login');
};

export const showRegisterPage = (req, res) => {
    res.render('auth/register');
};

// =====================
// Signup Logic
// =====================
export const signup = async (req, res) => {
    try {
        console.log("Incoming body:", req.body);

        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).render('auth/register', { error: 'All fields are required' });
        }

        const existingUser = await prisma.user.findUnique({ where: { Email: email } });
        if (existingUser) {
            return res.status(400).render('auth/register', { error: 'Email already registered' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                FName: name,
                LName: "",
                Email: email,
                Password: hashedPassword,
            },
        });

        console.log('New user created:', newUser);

        // Generate JWT token
        const token = jwt.sign(
            { user_ID: newUser.user_ID },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Token generated:', token);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(`Error signing up: ${error.message}`);
        res.status(500).render('auth/register', { error: 'Failed to sign up' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('auth/login', { error: 'Email and password are required' });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { Email: email } });
        if (!user) {
            return res.status(400).render('auth/login', { error: 'Invalid email or password' });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.Password);
        if (!validPassword) {
            return res.status(400).render('auth/login', { error: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { user_ID: user.user_ID },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(`Error logging in: ${error.message}`);
        res.status(500).render('auth/login', { error: 'Failed to log in' });
    }
};

