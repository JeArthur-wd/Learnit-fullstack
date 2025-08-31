import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const signup = async (req, res) => {
    try {
        const { FName, LName, Email, Password } = req.body;

        if (!FName || !LName || !Email || !Password) {
            return res.status(400).render('signup', { error: 'All fields are required' });
        }

        const existingUser = await prisma.user.findUnique({ where: { Email } });
        if (existingUser) {
            return res.status(400).render('signup', { error: 'Email already registered' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                FName,
                LName,
                Email,
                Password: hashedPassword,
            },
        });

        // Generate JWT token
        const token = jwt.sign({ user_ID: newUser.user_ID }, process.env.JWT_SECRET, { expiresIn: '24h' });

        console.log('Token generated:', token);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(`Error signing up: ${error.message}`);
        res.status(500).render('signup', { error: 'Failed to sign up' });
    }
};

export { register, login, showAddStudent };