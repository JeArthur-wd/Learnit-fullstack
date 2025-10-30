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

export const showEditUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { user_ID: userId },
    });

    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/user-list');
    }

    res.render('User/editUser', { user });
  } catch (error) {
    console.error(`Error loading user edit form: ${error.message}`);
    req.flash('error', 'Failed to load user edit form');
    res.redirect('/user-list');
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { FName, LName, Email } = req.body;

    if (!FName || !LName || !Email) {
      req.flash('error', 'All fields are required');
      return res.redirect(`/edit-user/${userId}`);
    }

    await prisma.user.update({
      where: { user_ID: userId },
      data: { FName, LName, Email },
    });

    req.flash('success', 'User updated successfully!');
    res.redirect('/user-list');
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    req.flash('error', 'An error occurred while updating the user.');
    res.redirect(`/edit-user/${req.params.id}`);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    await prisma.user.delete({
      where: { user_ID: userId },
    });

    req.flash('success', 'User deleted successfully!');
    return res.redirect('/user-list');

  } catch (error) {
    console.error('Error deleting user:', error.message);
    req.flash('error_msg', "Failed to delete user.");
    return res.redirect("/user-list");
  }
};
 