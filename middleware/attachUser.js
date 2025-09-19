import jwt from "jsonwebtoken";
import { prisma } from "../utilities/prisma.js";

export const attachUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.locals.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { user_ID: decoded.user_ID },
        });

        res.locals.user = user || null;
        req.user = user || null;

        next();
    } catch (err) {
        console.error("Error attaaching user:", err.message);
        res.locals.user = null;
        req.user = null;
        next();
    }
};