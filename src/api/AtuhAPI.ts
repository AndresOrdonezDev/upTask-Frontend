import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { checkUserPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";

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
        //save data on localStorage
        localStorage.setItem('token_upTask',data)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}
export async function forgotPassword(email:ForgotPasswordForm){
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

export async function validateToken(token:ConfirmToken){
    try {
        const {data} = await api.post<string>("/auth/validate-token", token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}

type UpdatePasswordType = {
    token: ConfirmToken['token'],
    password: NewPasswordForm
}

export async function updatePassword(formData:UpdatePasswordType){
    const {token, password} = formData
    try {
        const {data} = await api.post<string>(`/auth/update-password/${token}`, password);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}

export async function getUser() {
    try {
        const {data} = await api.get('/auth/user')
        const response = userSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}

export async function checkUserPassword(formData:checkUserPasswordForm){
    try {
        const {data} = await api.post<string>("/auth/check-password", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}