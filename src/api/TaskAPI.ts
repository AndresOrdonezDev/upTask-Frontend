import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskType = {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    status:Task['status']
}
export const createTask = async ({ formData, projectId }: Pick<TaskType, 'formData' | 'projectId'>) => {
    try {
        const { data } = await api.post<string>(`/tasks/${projectId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
    }
}
export const getTaskById = async ({ projectId,taskId}:Pick<TaskType,'projectId' | 'taskId'>) => {
    try {
        const { data } = await api.get(`/tasks/${projectId}/task/${taskId}`)
        
      
        const response = taskSchema.safeParse(data)
        if (response.success) {
            return response.data
        } else {
           console.log("❌ Schema validation failed:", response.error.format())
        } 
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
    }
}

export const updateTask = async ({ projectId, taskId, formData  }:Pick<TaskType,'projectId'|'taskId'|'formData'>) => {
    try {
        const { data } = await api.put<string>(`/tasks/${projectId}/task/${taskId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
    }
}
export const deleteTask = async ({ projectId,taskId}:Pick<TaskType,'projectId' | 'taskId'>) => {
    try {
        const { data } = await api.delete<string>(`/tasks/${projectId}/task/${taskId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
    }
}
export const updateStatus = async ({ projectId,taskId, status }:Pick<TaskType,'projectId' | 'taskId'|'status'>) => {
    try {
        const { data } = await api.post<string>(`/tasks/${projectId}/task/${taskId}/status`, {status})
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
    }
}