import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
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
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.log("ERROR IN FETCHING THE USERS",error);
        throw error.response?.data || {message:"something went wrong"};
    }
}

const getUserById = async(id) =>{
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.log("ERROR IN FETCHING THE USER BY ID teriiii",error);
        throw error.response?.data || {message:"something went wrong"}; 
    }
}

const UpdateUserById = async (id, updatedData) => {
  try {
    const response = await api.put (`/users/${id}/edit`, updatedData);
    return response.data;
  } catch (error) {
    console.log("ERROR IN UPDATING THE USER BY ID", error);

    // Return detailed API error if it exists
    if (error.response) {
      throw error.response.data;
    }

    // Otherwise return generic error
    throw { message: error.message || "Something went wrong" };
  }
};

const DeleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log("ERROR IN DELETING THE USER", error);
    if (error.response) {
      throw error.response.data;
    }
    throw { message: error.message || "Something went wrong" };
  }
};

export {registerUser,getAllUsers,getUserById, UpdateUserById,DeleteUser}