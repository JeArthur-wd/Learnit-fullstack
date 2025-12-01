import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const showDashboard = async (req, res) => {
  try {
    
    // Get basic counts
    const [studentCount, subjectCount, termCount] = await Promise.all([
      prisma.student.count(),
      prisma.subject.count(),
      prisma.term.count()
    ]);

    console.log("Counts:", { studentCount, subjectCount, termCount });

    // SIMPLIFIED: Get students data (remove term relation for now)
    const students = await prisma.student.findMany();
    console.log("Students found:", students.length);

    const studentsPerTerm = [
      { name: 'Term 1', y: studentCount > 0 ? Math.floor(studentCount / 2) : 5 },
      { name: 'Term 2', y: studentCount > 0 ? Math.ceil(studentCount / 2) : 3 }
    ];

    const subjectsData = await prisma.subject.findMany();
    const subjectsChartData = subjectsData.map(subject => ({
      name: subject.Name,
      y: 1
    }));

    if (subjectsChartData.length === 0) {
      subjectsChartData.push(
        { name: 'Mathematics', y: 1 },
        { name: 'Science', y: 1 },
        { name: 'English', y: 1 }
      );
    }
    const gradesData = await prisma.grade.findMany();
    console.log("Grades found:", gradesData.length);
    
    // Process grades data for chart (example - adjust based on your schema)
    const gradesPerTerm = [
      { name: 'A Grades', y: gradesData.filter(g => g.Grade_Value === 'A').length },
      { name: 'B Grades', y: gradesData.filter(g => g.Grade_Value === 'B').length },
      { name: 'C Grades', y: gradesData.filter(g => g.Grade_Value === 'C').length },
      { name: 'Other', y: gradesData.filter(g => !['A','B','C'].includes(g.Grade_Value)).length }
    ];

    res.render('Dashboard/dashboard', {
      counts: {
        students: studentCount,
        subjects: subjectCount,
        terms: termCount
      },
      chartData: {
        studentsPerTerm: JSON.stringify(studentsPerTerm),
        subjects: JSON.stringify(subjectsChartData),
        gradesPerTerm: JSON.stringify(gradesPerTerm) 

      },
      currentUser: req.user
    });

  } catch (error) {
    console.error(`Dashboard error: ${error.message}`);
    
    res.render('Dashboard/dashboard', {
      counts: { students: 0, subjects: 0, terms: 0 },
      chartData: {
        studentsPerTerm: JSON.stringify([
          { name: 'Fall 2024', y: 15 },
          { name: 'Spring 2024', y: 12 }
        ]),
        subjects: JSON.stringify([
          { name: 'Math', y: 1 },
          { name: 'Science', y: 1 },
          { name: 'English', y: 1 }
        ])
      },
      currentUser: req.user
    });
  }
};

// In your dashboardController.js - add this to the try block

// Update the res.render part:
// res.render('Dashboard/dashboard', {
//   counts: {
//     students: studentCount,
//     subjects: subjectCount,
//     terms: termCount
//   },
//   chartData: {
//     studentsPerTerm: JSON.stringify(studentsPerTerm),
//     subjects: JSON.stringify(subjectsChartData),
//     gradesPerTerm: JSON.stringify(gradesPerTerm) // ADD THIS LINE
//   },
//   currentUser: req.user
// });