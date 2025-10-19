import { prisma } from './../utilities/prisma.js';
// Render Add Term Page

export const showAddTerm = (req, res) => {
    res.render('Term/addTerm');
};

// Create New Term
export const createTerm = async (req, res) => {
    try {
        const { Name, Start_Date, End_Date } = req.body;
        const userId = req.user.user_ID; // Assuming user ID is available in req.user
        console.log(req.body);

        // Validate required fields
        if (!Name || !Start_Date || !End_Date) {
            return res.render('Term/addTerm', {
                message: 'All fields are required',
                status: 'error',
            });
        }

        await prisma.term.create({
            data: {
                Name,
                Start_Date: new Date(Start_Date),
                End_Date: new Date(End_Date),
                // User_ID: req.user.user_ID, // use logged-in user
                User_ID: userId, // temporary placeholder
            },
        });

        res.redirect('/term-list', 201, {
            message: 'Term created successfully',
            status: 'success',
        });
    } catch (error) {
        console.error(`Error creating term: ${error.message}`);
        res.render('Term/addTerm', {
            message: 'An error occurred while creating the term. Please try again.',
            status: 'error',
        });
    }
};

// Show Term List
export const showTermList = async (req, res) => {
    try {
        const terms = await prisma.term.findMany({
            orderBy: {
                Term_ID: 'desc', // newest first
            },
        });

        res.render('Term/termList', { terms });
    } catch (error) {
        console.error(`Error fetching term list: ${error.message}`);
        res.render('Term/termList', {
            message: 'An error occurred while fetching the term list. Please try again.',
            status: 'error',
        });
    }
};
