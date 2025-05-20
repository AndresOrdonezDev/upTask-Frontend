import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { UpdatePasswordForm, UserProfileForm } from "../types";

export async function updateProfile(formData:UserProfileForm){
    try {
        const {data} = await api.put<string>("/auth/profile", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }

}
export async function updateUserCurrentPassword(formData:UpdatePasswordForm){
    try {
        const {data} = await api.post<string>("/auth/update-password", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}
