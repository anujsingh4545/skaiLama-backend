import { createFileService, createProjectService, deleteFileService, getAllProjectsService, getProjectDetailsService, updateFileService } from "../services/projectServices.js";
import { AppError } from "../utils/AppError.js";


export const createProjectCtrl = async(req,res, next)=>{

    try {
        const {title} = req.body;

        if(!title) throw new AppError("Project title not found!", 401);

        const data = await createProjectService(title, req.user);

        return res.status(201).json({
            success: true,
            data:data,
            message:"Project created Successfully!"
        })
        
    } catch (error) {
        next(error);
    }
}

export const getAllProjectsCtrl = async(req,res, next)=>{

    try {
        const data = await getAllProjectsService(req.user);

        return res.status(201).json({
            success: true,
            data:data,
            message:"Fetched details successfully!"
        })
        
    } catch (error) {
        next(error);
    }
}

export const getProjectDetailsCtrl = async(req,res, next)=>{

    try {
        const {title} = req.params;

        if(!title) throw new AppError("Project title not found!", 401);

        const data = await getProjectDetailsService(title, req.user);

        return res.status(201).json({
            success: true,
            data:data,
            message:"Fetched details successfully!"
        })
        
    } catch (error) {
        next(error);
    }
}

export const createFileCtrl = async(req,res, next)=>{

    try {
        const {name, transcript, projectId} = req.body;

        if(!name) throw new AppError("File name not found!", 401);
        if(!projectId) throw new AppError("Project Id not found!", 401);

        const data = await createFileService(name, transcript, projectId, req.user);

        return res.status(201).json({
            success: true,
            data:data,
            message:"File Created successfully!"
        })
        
    } catch (error) {
        next(error);
    }
}

export const updateFileCtrl = async(req,res, next)=>{

    try {
        const {transcript, projectId, fileId} = req.body;

        if(!fileId) throw new AppError("File Id not found!", 401);
        if(!projectId) throw new AppError("Project Id not found!", 401);

        const data = await updateFileService(transcript, projectId, fileId, req.user);

        return res.status(201).json({
            success: true,
            data:data,
            message:"File Updated successfully!"
        })
        
    } catch (error) {
        next(error);
    }
}

export const deleteFileCtrl = async(req,res, next)=>{

    try {
        const {projectId, fileId} = req.params;

        if(!fileId) throw new AppError("File Id not found!", 401);
        if(!projectId) throw new AppError("Project Id not found!", 401);

        const data = await deleteFileService(projectId, fileId, req.user);

        return res.status(201).json({
            success: true,
            data:data,
            message:"File deleted successfully!"
        })
        
    } catch (error) {
        next(error);
    }
}