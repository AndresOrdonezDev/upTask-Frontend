import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TaskFormData } from "../types";

type TaskType = {
    formData: TaskFormData
    projectId: Project['_id']
}
export const createTask = async ({ formData, projectId }: Pick<TaskType, 'formData' | 'projectId'>) => {
    try {
        const { data } = await api.post<string>(`/tasks/${projectId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

