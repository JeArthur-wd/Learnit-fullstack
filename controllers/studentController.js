import { prisma } from './../utilities/prisma.js';

export const showAddStudent = (req, res) => {
    res.render('Student/addStudent');
}

export const CreateStudent = async (req, res) => {
    try {
        const { F_name, L_name, Class } = req.body;
        const userId = req.user.user_ID;
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
                User_ID: userId,
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
};

export const showEditStudent = async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        const student = await prisma.student.findUnique({
            where: { Student_ID: studentId },
        });

        if (!student) {
            return res.status(404).render('Student/studentList', {
                message: 'Student not Found.',
                status: 'error',
            });
        }

        res.render('Student/editStudent', { student });
    } catch (error) {
        console.error('Error loading student edit form: ${error.message}');
        res.render('Student/studentList', {
            message: 'An error occurred while loading the edit form. Please try again.',
            status: 'error',
        });
    }
};

// form submission for update student
export const updateStudent = async (req, res) => {
    try {
        console.log("we are here")
        const studentId = parseInt(req.params.id);
        const { F_name, L_name, Class } = req.body;

        if (!F_name || !L_name || !Class) {
            req.flash('error', 'All fields are required.');
            return res.render('Student/editStudent', {
                message: 'All fields are required.',
                status: 'error',
                student: { Student_ID: studentId, F_name, L_name, Class },
            });
        }

        await prisma.student.update({
            where: { Student_ID: studentId },
            data: { F_name, L_name, Class },
        });
        req.flash('success', 'Student updated successfully!');
        res.redirect('/student-list');
    } catch (error) {
        console.log(`error updating student: ${error.message}`);
        req.flash('error', 'An error occurred while updating the student.');
        res.render('Student/editStudent', {
            message: 'An error occurred while updating the student.',
            status: 'error',
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);

        await prisma.student.delete({
            where: { Student_ID: studentId },
        });

        req.flash("success_msg", "Student deleted successfully.");
        return res.redirect("/student-list");

    } catch (error) {
        console.error("Error deleting student:", error.message);
        req.flash("error_msg", "Failed to delete student.");
        return res.redirect("/student-list");
    }
};

