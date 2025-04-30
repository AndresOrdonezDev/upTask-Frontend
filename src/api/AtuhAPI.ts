import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { ConfirmToken, ForgotPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

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
export async function requestConfirmationCode(email:RequestConfirmationCodeForm){
    try {
        const {data} = await api.post<string>("/auth/request-code", email);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}
export async function authenticateUser(formData:UserLoginForm){
    try {
        const {data} = await api.post<string>("/auth/login", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}
export async function requestResetPassword(email:ForgotPasswordForm){
    try {
        const {data} = await api.post<string>("/auth/forgot-password", email);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}