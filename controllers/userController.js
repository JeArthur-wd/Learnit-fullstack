import { prisma } from '../utilities/prisma.js';
import bcrypt from 'bcrypt';

export const showAddUser = async (req, res) => {
  const roles = await prisma.roles.findMany();
  res.render('User/addUser', { roles });
};

export const CreateUser = async (req, res) => {
  try {
    const { FName, LName, email, password, confirmPassword, Role_ID } = req.body;

    if (!FName || !LName || !email || !password || !confirmPassword || !Role_ID) {
      req.flash('error', 'All fields including Role are required');
      return res.redirect('/add-user');
    }

    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/add-user');
    }

    const existingUser = await prisma.user.findUnique({
      where: { Email: email }
    });

    if (existingUser) {
      req.flash('error', 'Email already exists');
      return res.redirect('/add-user');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        FName,
        LName,
        Email: email,
        Password: hashedPassword,
        Role_ID: parseInt(Role_ID)
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
const roles = await prisma.roles.findMany();

res.render('User/editUser', { user, roles });
  } catch (error) {
    console.error(`Error loading user edit form: ${error.message}`);
    req.flash('error', 'Failed to load user edit form');
    res.redirect('/user-list');
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { FName, LName, Email, Role_ID } = req.body;

    await prisma.user.update({
  where: { user_ID: id },
  data: {
    FName,
    LName,
    Email,
    Role_ID: parseInt(Role_ID)
  }
});

    req.flash("success", "User updated successfully!");
    res.redirect("/user-list");
  } catch (err) {
    req.flash("error", "Failed to update user.");
    res.redirect("/user-list");
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
 