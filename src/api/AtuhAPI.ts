import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { UserRegistrationForm } from "../types";

export async function createAcount(formData:UserRegistrationForm){
    try {
        const {data} = await api.post<string>("/auth/register", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}