import baseApi from "./baseInstance"

export const getCurrentUser = async() =>{
    const response=await baseApi.get("api/profile/");
    return response.data;
}