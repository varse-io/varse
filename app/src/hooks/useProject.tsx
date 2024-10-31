import { useCallback } from 'react'
import useBackend from './useBackend'

const useProject = () => {
  const backendService = useBackend()

  const createProject = useCallback(
    async (projectName: string) => {
      return backendService.createProject(projectName)
    },
    [backendService],
  )

  const getProjects = useCallback(async () => {
    return backendService.getProjects()
  }, [backendService])

  const createApiKey = useCallback(
    async (projectId: string, name: string) => {
      return backendService.createApiKey(projectId, name)
    },
    [backendService],
  )

  const getApiKeys = useCallback(
    async (projectId: string) => {
      return backendService.getApiKeys(projectId)
    },
    [backendService],
  )

  const deleteApiKey = useCallback(
    async (projectId: string, apiKeyId: string) => {
      return backendService.deleteApiKey(projectId, apiKeyId)
    },
    [backendService],
  )

  const createVariable = useCallback(
    async (projectId: string, key: string, value: string) => {
      return backendService.createVariable(projectId, key, value)
    },
    [backendService],
  )

  const getVariables = useCallback(
    async (projectId: string) => {
      return backendService.getVariables(projectId)
    },
    [backendService],
  )

  const getVariableById = useCallback(
    async (projectId: string, variableId: string) => {
      return backendService.getVariableById(projectId, variableId)
    },
    [backendService],
  )

  const updateVariable = useCallback(
    async (projectId: string, variableId: string, value: string) => {
      return backendService.updateVariable(projectId, variableId, value)
    },
    [backendService],
  )

  const deleteVariable = useCallback(
    async (projectId: string, variableId: string) => {
      return backendService.deleteVariable(projectId, variableId)
    },
    [backendService],
  )

  return {
    createProject,
    getProjects,
    createApiKey,
    getApiKeys,
    deleteApiKey,
    createVariable,
    getVariables,
    getVariableById,
    updateVariable,
    deleteVariable,
  }
}

export default useProject