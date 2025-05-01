import { isAxiosError } from "axios";
import { dashboardProjectsSchema, Project, ProjectFormData} from "../types";
import api from "@/lib/axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}
export async function getProjects() {
 
    try {
        const { data } = await api('/projects')
        const response = dashboardProjectsSchema.safeParse(data)
        if(response.success){
            return response.data
        }
        throw new Error('Los datos no son los esperados')
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.msg)
        }
    }
}

export async function getProjectById(id:Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`)        
        // const response = projectSchema.safeParse(data)
        // if(response.success){
        //     return response.data
        // }
        // throw new Error('Los datos no son los esperados')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.msg)
        }
    }
}
type UpdateProjectType = {
    formData:ProjectFormData,
    projectId:Project['_id']
}
export async function updateProject({formData, projectId}:UpdateProjectType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.msg)
        }
    }
}

export async function deleteProject(id:Project['_id']) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.msg)
        }
    }
}