import { prisma } from './../utilities/prisma.js';
// Render Add Term Page

export const showAddTerm = (req, res) => {
    res.render('Term/addTerm');
};

// Create New Term
export const createTerm = async (req, res) => {
    try {
        const { Name, Start_Date, End_Date } = req.body;
        const userId = req.user.user_ID; 
        console.log(req.body);

        // Validate required fields
        if (!Name || !Start_Date || !End_Date) {
            req.flash('error', 'All fields are required');
            return res.redirect('/add-term');
        }

        await prisma.term.create({
            data: {
                Name,
                Start_Date: new Date(Start_Date),
                End_Date: new Date(End_Date),
                User_ID: userId, 
            },
        });

        req.flash('success', 'Term created successfully!');
        return res.redirect('/term-list');
    } catch (error) {
        console.error(`Error creating term: ${error.message}`);
        req.flash('error', 'An error occurred while creating the term. Please try again.');
        return res.redirect('/add-term');
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

export const showEditTerm = async (req, res) => {
  try {
    const termId = parseInt(req.params.id);

    const term = await prisma.term.findUnique({
      where: { Term_ID: termId },
    });

    if (!term) {
      req.flash('error', 'Term not found.');
      return res.redirect('/term-list');
    }

    // Make sure term data is properly passed to the template
    res.render('Term/editTerm', { 
      term,
      message: req.flash(),
      status: '' 
    });
  } catch (error) {
    console.error(`Error loading term edit form: ${error.message}`);
    req.flash('error', 'Failed to load edit term form.');
    res.redirect('/term-list');
  }
};

// form submission for update term
export const updateTerm = async (req, res) => {
    try {
        const termId = parseInt(req.params.id);
        const { Name, Start_Date, End_Date } = req.body;

        console.log("Update term data:", { Name, Start_Date, End_Date });

        if (!Name || !Start_Date || !End_Date) {
            req.flash('error', 'All fields are required.');
            return res.redirect(`/edit-term/${termId}`);
        }

        // Convert dates to proper Date objects
        await prisma.term.update({
            where: { Term_ID: termId },
            data: { 
                Name, 
                Start_Date: new Date(Start_Date),
                End_Date: new Date(End_Date)
            },
        });
        
        req.flash('success', 'Term updated successfully!');
        return res.redirect('/term-list'); // This should work now

    } catch (error) {
        console.log(`Error updating term: ${error.message}`);
        req.flash('error', 'An error occurred while updating the term.');
        return res.redirect(`/edit-term/${termId}`);
    }
};

export const deleteTerm = async (req, res) => {
    try {
        const termId = parseInt(req.params.id);

        await prisma.term.delete({
            where: { Term_ID: termId },
        });

        req.flash("success", "Term deleted successfully.");
        return res.redirect("/term-list");

    } catch (error) {
        console.error("Error deleting term:", error.message);
        req.flash("error", "Failed to delete term.");
        return res.redirect("/term-list");
    }
};

