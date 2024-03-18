import mongoose from "mongoose";

const url = "mongodb+srv://abhisheklodha:backend@cluster0.zzdudol.mongodb.net/"

const connectDB = async () => {
    try {
        await mongoose.connect(url)
        console.log("databse connected");
    } catch (error) {
        console.log("connection failed");
    }
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {})

export const User = mongoose.model("User", userSchema)

export default connectDB