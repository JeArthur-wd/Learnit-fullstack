import { prisma } from './../utilities/prisma.js';

// =====================
// Render Add Subject Page
// =====================
export const showAddSubject = (req, res) => {
    res.render('Subject/addSubject');
};

// Create Subject
export const createSubject = async (req, res) => {
    try {
        const { Name } = req.body;
        console.log(req.body);

        // Validate required field
        if (!Name) {
            return res.render('Subject/addSubject', {
                message: 'Subject name is required',
                status: 'error',
            });
        }

        await prisma.subject.create({
            data: {
                Name,
                // User_ID: req.user.user_ID, // if you attach user from auth
                User_ID: 18, // temp hardcoded, replace with real logged-in user later
            },
        });

        res.redirect('/subject-list', 201, {
            message: 'Subject created successfully',
            status: 'success',
        });
    } catch (error) {
        console.error(`Error creating subject: ${error.message}`);
        res.render('Subject/addSubject', {
            message: 'An error occurred while creating the subject. Please try again.',
            status: 'error',
        });
    }
};

// List Subjects
export const showSubjectList = async (req, res) => {
    try {
        const subjects = await prisma.subject.findMany({
            orderBy: {
                Subject_ID: 'desc', // newest first
            },
        });

        res.render('Subject/subjectList', { subjects });
    } catch (error) {
        console.error(`Error fetching subject list: ${error.message}`);
        res.render('Subject/subjectList', {
            message: 'An error occurred while fetching the subject list. Please try again.',
            status: 'error',
        });
    }
};
