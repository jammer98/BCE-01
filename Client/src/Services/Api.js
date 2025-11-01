import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:3000/api/v1/",
    headers:{
        "Content-Type":"application/json",
    }
})

// register new user
const registerUser = async(userData) =>{
    try {
        const response = await api.post("/register",userData);
        return response.data; 
    } catch (error) {
        console.log("ERROR REGISTERING USER!!",error);
        throw error.response?.data || {message:"Something went wrong"};
    }
}

const getAllUsers = async() =>{
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        console.log("ERROR IN FETCHING THE USERS",error);
        throw error.response?.data || {message:"something went wrong"};
    }
}

export {registerUser,getAllUsers}