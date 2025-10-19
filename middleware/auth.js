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
