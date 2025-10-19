import { prisma } from './../utilities/prisma.js';

// Show Add Grade Form
export const showAddGrade = async (req, res) => {
    try {
        const [students, subjects, terms] = await Promise.all([
            prisma.student.findMany(),
            prisma.subject.findMany(),
            prisma.term.findMany()
        ]);

        res.render('Grade/addGrade', { 
            students, 
            subjects, 
            terms,
            message: req.query.message,
            status: req.query.status
        });
    } catch (error) {
        console.error(`Error loading add grade page: ${error.message}`);
        res.render('Grade/addGrade', {
            message: 'Failed to load data for grade entry',
            status: 'error',
            students: [],
            subjects: [],
            terms: []
        });
    }
};

// Create Grade
export const createGrade = async (req, res) => {
    try {
        const { Student_ID, Subject_ID, Term_ID, Marks, Grade } = req.body;

        // Validation
        if (!Student_ID || !Subject_ID || !Term_ID || !Marks || !Grade) {
            req.flash('error', 'All fields are required');
            return res.redirect('/add-grade');
        }

        // Check if grade already exists for this student, subject, and term
        const existingGrade = await prisma.grade.findFirst({
            where: {
                Student_ID: parseInt(Student_ID),
                Subject_ID: parseInt(Subject_ID),
                Term_ID: parseInt(Term_ID)
            }
        });

        if (existingGrade) {
            req.flash('error', 'Grade already exists for this student, subject, and term combination');
            return res.redirect('/add-grade');
        }

        await prisma.grade.create({
            data: {
                Student_ID: parseInt(Student_ID),
                Subject_ID: parseInt(Subject_ID),
                Term_ID: parseInt(Term_ID),
                Marks: Marks.trim(),
                Grade: Grade.trim().toUpperCase(),
                User_ID: req.user?.user_ID || 1,
            },
        });

        req.flash('success', 'Grade created successfully');
        res.redirect('/grade-list');
    } catch (error) {
        req.flash('error', 'An error occurred while creating the grade');
        res.redirect('/add-grade');
    }
};

// Show Grade List
export const showGradeList = async (req, res) => {
    try {
        const grades = await prisma.grade.findMany({
            orderBy: { ID: 'desc' },
        });

        res.render('Grade/gradeList', { 
            grades
            // No need to pass message/status - they come from flash
        });
    } catch (error) {
        console.error(`Error fetching grade list: ${error.message}`);
        req.flash('error', 'An error occurred while fetching the grade list');
        res.render('Grade/gradeList', {
            grades: []
        });
    }
};