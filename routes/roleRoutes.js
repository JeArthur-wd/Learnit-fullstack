import express from "express";
import {
  showAddRole,
  createRole,
  showRoleList,
  deleteRole
} from "../controllers/roleController.js";

const router = express.Router();

router.get("/add-role", showAddRole);
router.post("/add-role", createRole);

router.get("/role-list", showRoleList);

// Delete role
router.post("/delete-role/:id", deleteRole);

export default router;
