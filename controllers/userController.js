import { prisma } from '../utilities/prisma.js';
import bcrypt from 'bcrypt';

export const showAddUser = (req, res) => {
    res.render('User/addUser');
}

export const CreateUser = async (req, res) => {
  try {
    const { FName, LName, email, password, confirmPassword } = req.body;

    // Simple validation
    if (!FName || !LName || !email || !password || !confirmPassword) {
      req.flash('error', 'All fields are required');
      return res.redirect('/add-user');
    }

    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/add-user');
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ 
      where: { Email: email } 
    });
    
    if (existingUser) {
      req.flash('error', 'Email already exists');
      return res.redirect('/add-user');
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { 
        FName: FName, 
        LName: LName, 
        Email: email, 
        Password: hashedPassword 
      },
    });

    req.flash('success', 'User created successfully!');
    res.redirect('/user-list');
    
  } catch (err) {
    console.error('Error creating user:', err);
    req.flash('error', 'Something went wrong');
    res.redirect('/add-user');
  }
};

export const showUserList = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { user_ID: 'desc' },
    });
    
    res.render('user/userList', { users });
  } catch (err) {
    console.error('Error fetching users:', err);
    req.flash('error', 'Failed to load users');
    res.redirect('/');
  }
};