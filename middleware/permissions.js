import { prisma } from '../utilities/prisma.js';

export const requirePermission = (perm) => {
  return async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_ID: req.session.userId },
        include: { role: true }
      });

      if (!user || !user.role) {
        req.flash('error', 'Unauthorized access');
        return res.redirect('/');
      }

      const perms = user.role.Permissions || [];

      if (!perms.includes(perm)) {
        req.flash('error', 'You do not have permission to access this section');
        return res.redirect('/');
      }

      next();

    } catch (err) {
      console.error('Permission error:', err);
      req.flash('error', 'Access denied');
      return res.redirect('/');
    }
  };
};
