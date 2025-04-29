import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { ConfirmToken, UserRegistrationForm } from "../types";

export async function createAccount(formData:UserRegistrationForm){
    try {
        const {data} = await api.post<string>("/auth/create-account", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}
export async function confirmAccount(token:ConfirmToken){
    try {
        const {data} = await api.post<string>("/auth/confirm-account", token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}