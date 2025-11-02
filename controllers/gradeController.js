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

// Show Edit Grade Form
export const showEditGrade = async (req, res) => {
  try {
    const gradeId = parseInt(req.params.id);

    // Fetch the grade and the lists needed for dropdowns
    const [grade, students, subjects, terms] = await Promise.all([
      prisma.grade.findUnique({ where: { ID: gradeId } }),
      prisma.student.findMany(),
      prisma.subject.findMany(),
      prisma.term.findMany(),
    ]);

    console.log("Grade:", grade);
    console.log("Students:", students.length);
    console.log("Subjects:", subjects.length);
    console.log("Terms:", terms.length);


    if (!grade) {
      req.flash('error', 'Grade not found');
      return res.redirect('/grade-list');
    }

    res.render('Grade/editGrade', { grade, students, subjects, terms });
  } catch (error) {
    console.error(`Error loading grade edit form: ${error.message}`);
    req.flash('error', 'Failed to load edit grade form');
    res.redirect('/grade-list');
  }
};


// Update Grade
export const updateGrade = async (req, res) => {
    try {
        const gradeId = parseInt(req.params.id);
        const { Student_ID, Subject_ID, Term_ID, Marks, Grade } = req.body;

        if (!Student_ID || !Subject_ID || !Term_ID || !Marks || !Grade) {
            req.flash('error', 'All fields are required.');
            return res.redirect(`/edit-grade/${gradeId}`);
        }

        await prisma.grade.update({
            where: { ID: gradeId },
            data: {
                Student_ID: parseInt(Student_ID),
                Subject_ID: parseInt(Subject_ID),
                Term_ID: parseInt(Term_ID),
                Marks: Marks.trim(),
                Grade: Grade.trim().toUpperCase(),
            },
        });

        req.flash('success', 'Grade updated successfully!');
        res.redirect('/grade-list');
    } catch (error) {
        console.error(`Error updating grade: ${error.message}`);
        req.flash('error', 'An error occurred while updating the grade.');
        res.redirect(`/edit-grade/${req.params.id}`);
    }
};

// Delete Grade
export const deleteGrade = async (req, res) => {
    try {
        const gradeId = parseInt(req.params.id);

        await prisma.grade.delete({
            where: { ID: gradeId },
        });

        req.flash('success', 'Grade deleted successfully.');
        return res.redirect('/grade-list');

    } catch (error) {
        console.error('Error deleting grade:', error.message);
        req.flash('error', 'Failed to delete grade.');
        return res.redirect('/grade-list');
    }
};
