import Project from "../modal/projectModal.js";
import Files from "../modal/projectFiles.js";
import "dotenv/config";
import { AppError } from "../utils/AppError.js";
import mongoose from "mongoose";


export const createProjectService = async(title, user)=>{

    try {
        const prevProject = await Project.findOne({title:title});

        if(prevProject) throw new AppError("Dupicate project name not allowed!", 401);

        const newProject = await  Project.create({title, userId: user?._id});
        return newProject;
        
    } catch (error) {
        throw error;
    }
}

export const getProjectDetailsService = async(title, user)=>{
    try {
        const project = await Project.aggregate([
            {
              $match: {
                title: title,
                userId: new mongoose.Types.ObjectId(user._id),
              },
            },
            {
                $lookup:{
                    from: "users",
                    localField:"userId",
                    foreignField:"_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "projectfiles",
                    localField: "_id",    
                    foreignField: "projectId", 
                    as: "files",
                },
            },
            { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                "user.password": 0,
                },
            },
            {
                $set: {
                  files: { $sortArray: { input: "$files", sortBy: { updatedAt: -1 } } }
                }
            },
            {
              $limit: 1, 
            },
        ]);
      
        if (!project || project.length === 0) {
        throw new AppError("Project not found", 401);
        }
      
        return project[0];
        
    } catch (error) {
        throw error;
    }
}

export const getAllProjectsService = async(user)=>{
    try {

        const projects = await Project.aggregate([
            {
              $match: { userId: new mongoose.Types.ObjectId(user?._id) }, 
            },
            {
                $lookup:{
                    from: "users",
                    localField:"userId",
                    foreignField:"_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "projectfiles",
                    localField: "_id",    
                    foreignField: "projectId", 
                    as: "files",
                },
            },
            { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                "user.password": 0,
                },
            },
            
            {
              $sort: { createdAt: -1 },
            },
        ]);

        return projects;

    } catch (error) {
        throw error;
    }
}

export const createFileService = async(name, transcript, projectId, user)=>{
    try {

        const findProject = await Project.findById(projectId);

        if(!findProject) throw new AppError("Project not found!", 401);

        const data = await Files.create({name, transcript, projectId});

        return data;
        
    } catch (error) {
        throw error;
    }
}

export const updateFileService = async(transcript, projectId, fileId,  user)=>{
    try {

        const findProject = await Project.findById(projectId);

        if(!findProject) throw new AppError("Project not found!", 401);

        const file = await Files.findOne({_id: fileId, projectId: projectId});
        if(!file) throw new AppError("File not found!", 401);
        file.transcript = transcript;
        file.save();

        return file;
        
    } catch (error) {
        throw error;
    }
}

export const deleteFileService = async(projectId, fileId,  user)=>{
    try {

        const findProject = await Project.findById(projectId);

        if(!findProject) throw new AppError("Project not found!", 401);

        const file = await Files.findOne({_id: fileId, projectId: projectId});
        if(!file) throw new AppError("File not found!", 401);

        await Files.findByIdAndDelete(fileId);

        return true;
        
    } catch (error) {
        throw error;
    }
}