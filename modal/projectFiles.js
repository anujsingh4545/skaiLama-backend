import mongoose from "mongoose";

const filesSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        transcript:{
            type: String,
        },
        projectId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("ProjectFile", filesSchema);