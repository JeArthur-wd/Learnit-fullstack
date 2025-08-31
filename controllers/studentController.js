import { prisma } from './../utilities/prisma.js';

export const showAddStudent = (req, res) => {
    res.render('Student/addStudent');
}

export const CreateStudent = async (req, res) => {
    try {
        const { F_name, L_name, Class } = req.body;
        console.log(req.body)

        // Validate required fields
        if (!F_name || !L_name || !Class) {
            res.render('Student/addStudent', {
                message: 'All fields are required',
                status: 'error',
            });
            return;
        }

        await prisma.student.create({
            data: {
                F_name,
                L_name,
                Class,
                // User_ID: req.user.user_ID, // Set User_ID to the authenticated user's ID
                User_ID: 18,
            },
        });

        res.redirect('/student-list', 201, {
            message: 'Student created successfully',
            status: 'success',
        });
    } catch (error) {
        console.error(`Error creating student: ${error.message}`);
        res.render('Student/addStudent', {
            message: 'An error occurred while creating the student. Please try again.',
            status: 'error',
        });
    }
};

export const showStudentList = async (req, res) => {
    try {
        const students = await prisma.student.findMany({
            orderBy: {
                Student_ID: 'desc', // Order by creation date, most recent first
            },
        });
        res.render('Student/studentList', { students });
    } catch (error) {
        console.error(`Error fetching student list: ${error.message}`);
        res.render('Student/studentList', {
            message: 'An error occurred while fetching the student list. Please try again.',
            status: 'error',
        });
    }
}
