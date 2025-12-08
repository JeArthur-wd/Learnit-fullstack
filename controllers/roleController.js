// controllers/rolesController.js
import { prisma } from '../utilities/prisma.js';

export const showAddRole = (req, res) => {
  const permissionsList = [
    "create_user",
    "edit_user",
    "delete_user",
    "view_users",
    "create_course",
    "edit_course",
    "delete_course",
    "view_courses"
  ];

  res.render("role/addRole", { permissionsList });
};

export const createRole = async (req, res) => {
  try {
    const { Role_Name } = req.body;
    let { Permissions } = req.body;

    if (!Role_Name) {
      req.flash("error", "Role name is required");
      return res.redirect("/add-role");
    }

    if (!Permissions) Permissions = [];
    if (!Array.isArray(Permissions)) Permissions = [Permissions];

    await prisma.roles.create({
      data: {
        Role_Name,
        Permissions
      }
    });

    req.flash("success", "Role created successfully!");
    return res.redirect("/role-list");

  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to create role");
    return res.redirect("/add-role");
  }
};

export const showRoleList = async (req, res) => {
  const roles = await prisma.roles.findMany({
    orderBy: { Role_ID: "desc" }
  });

  res.render("role/roleList", { roles });
};

export const deleteRole = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.roles.delete({ where: { Role_ID: id } });
    req.flash("success", "Role deleted successfully!");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to delete role");
  }

  res.redirect("/role-list");
};
