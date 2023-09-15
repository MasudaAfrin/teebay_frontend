import axios from "axios";
import Cookies from "js-cookie";

export const postData = async (url:string, data?:any) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/${url}`, data, {
            headers: {
                Authorization: Cookies.get("token") || "",
            }
        });
        return response;
    } catch(err:any){
        return err.response;
    }
};

export const getAllData = async (url:string) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${url}`, {
            headers: {
                Authorization: Cookies.get("token") || "",
            }
        });
        return response;
    } catch(err:any){
        return err.response;
    }
};

export const updateData = async (url:string, data:any) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/${url}`, data, {
            headers: {
                Authorization: Cookies.get("token") || "",
            }
        });
        return response;
    } catch(err:any){
        return err.response;
    }
}
