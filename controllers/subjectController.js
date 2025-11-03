import { prisma } from './../utilities/prisma.js';

// Render Add Subject Page
export const showAddSubject = (req, res) => {
    res.render('Subject/addSubject');
};

// Create Subject
export const createSubject = async (req, res) => {
    try {
        const { subjectName } = req.body; // CHANGED: Now expecting subjectName
        const userId = req.user.user_ID; // Assuming user ID is available in req.user

        // Validate required field
        if (!subjectName) {
            req.flash('error', 'Subject name is required');
            return res.redirect('/add-subject');
        }

        // Create the subject
        const newSubject = await prisma.subject.create({
            data: {
                Name: subjectName, // CHANGED: Use subjectName from form
                User_ID: userId, // temp hardcoded
            },
        });

        console.log('Subject created successfully:', newSubject);
        
        req.flash('success', 'Subject created successfully');
        res.redirect('/subject-list');
        
    } catch (error) {
        console.error('Error creating subject:', error);
        req.flash('error', 'An error occurred while creating the subject. Please try again.');
        res.redirect('/add-subject');
    }
};

// List Subjects (keep this the same)
export const showSubjectList = async (req, res) => {
    try {
        const subjects = await prisma.subject.findMany({
            orderBy: {
                Subject_ID: 'desc',
            },
        });

        res.render('Subject/subjectList', { 
            subjects,
            messages: req.flash() 
        });
    } catch (error) {
        console.error('Error fetching subject list:', error);
        req.flash('error', 'An error occurred while fetching the subject list.');
        res.redirect('/subject-list');
    }
};

export const showEditSubject = async (req, res) => {
  try {
    const subjectId = parseInt(req.params.id);

    const subject = await prisma.subject.findUnique({
      where: { Subject_ID: subjectId },
    });

    if (!subject) {
      req.flash('error', 'Subject not found');
      return res.redirect('/subject-list');
    }

    res.render('Subject/editSubject', { subject });
  } catch (error) {
    console.error(`Error loading subject edit form: ${error.message}`);
    req.flash('error', 'Failed to load subject edit form');
    res.redirect('/subject-list');
  }
};

// Update subject
export const updateSubject = async (req, res) => {
  try {
    const subjectId = parseInt(req.params.id);
    const { Name } = req.body;

    if (!Name) {
      req.flash('error', 'Subject name is required');
      return res.redirect(`/edit-subject/${subjectId}`);
    }

    await prisma.subject.update({
      where: { Subject_ID: subjectId },
      data: { Name },
    });

    req.flash('success', 'Subject updated successfully!');
    return res.redirect('/subject-list');
  } catch (error) {
    console.error(`Error updating subject: ${error.message}`);
    req.flash('error', 'An error occurred while updating the subject.');
    return res.redirect(`/edit-subject/${req.params.id}`);
  }
};

// Delete subject
export const deleteSubject = async (req, res) => {
  try {
    const subjectId = parseInt(req.params.id);

    await prisma.subject.delete({
      where: { Subject_ID: subjectId },
    });

    req.flash("success", "Subject deleted successfully.");
    return res.redirect("/subject-list");
  } catch (error) {
    console.error("Error deleting subject:", error.message);
    req.flash("error", "Failed to delete subject.");
    return res.redirect("/subject-list");
  }
};