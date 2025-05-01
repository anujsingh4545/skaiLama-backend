import { Router } from "express";
import { protect } from "../middleware/protect.js";
import { createFileCtrl, createProjectCtrl, deleteFileCtrl, getAllProjectsCtrl, getProjectDetailsCtrl, updateFileCtrl } from "../controller/projectCtrl.js";


const route = Router();

route.post('/createProject', protect, createProjectCtrl);
route.get("/getAllProjects", protect, getAllProjectsCtrl);
route.get("/:title", protect, getProjectDetailsCtrl);

route.post('/createFile', protect, createFileCtrl);
route.patch('/updateFile',protect, updateFileCtrl);
route.delete('/:projectId/files/:fileId', protect, deleteFileCtrl);


export default route;