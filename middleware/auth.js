// import jwt from 'jsonwebtoken';

// export const checkAuth = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) {
//     return res.status(401).json({ error: 'Unauthorized - No token provided' });
//   }

//   // Expecting "Bearer <token>"
//   const token = authHeader.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded payload (contains user_ID)
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Unauthorized - Invalid token' });
//   }
// };


import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = req.cookies.token; // <-- read cookie instead of header
  if (!token) {
    return res.redirect('/login'); // redirect instead of JSON
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.redirect('/login');
  }
};
