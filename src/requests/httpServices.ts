import axios from "axios";
import Cookies from "js-cookie";

export const postData = async (url:string, params?:any) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/${url}`, params, {
            headers: {
                Authorization: Cookies.get("token") || "",
            }
        });
        return response;
    } catch(err:any){
        return err.response;
    }
};

export const getAllData = async (url:string, params?:any) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${url}`, {
            params,
            headers: {
                Authorization: Cookies.get("token") || "",
            }
        });
        return response;
    } catch(err:any){
        return err.response;
    }
};

export const getDetails = async (url:string, id?:number|string) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${url}/${id}`, {
            headers: {
                Authorization: Cookies.get("token") || "",
            }
        });
        return response;
    } catch(err:any){
        return err.response;
    }
};

export const updateData = async (url:string, id: number, params:any) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/${url}/${id}`, params, {
            headers: {
                Authorization: Cookies.get("token") || "",
            }
        });
        return response;
    } catch(err:any){
        return err.response;
    }
}

export const deleteData = async (url:string, id: number|string) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${url}/${id}`, {
            headers: {
                Authorization: Cookies.get("token") || "",
            }
        });
        return response;
    } catch(err:any){
        return err.response;
    }
}
