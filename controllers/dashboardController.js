export const showDashboard = (req, res) => {
    res.render("dashboard", { user: req.user });
};