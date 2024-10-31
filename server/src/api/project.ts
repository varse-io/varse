import { Request, Response, Router } from 'express'
import { ProjectService } from '../project/project'
import { AuthMiddleware } from '../auth/auth.middleware'
import { UserInfo } from '../user/types'

declare global {
  namespace Express {
    interface Request {
      user: UserInfo
    }
  }
}

export class ProjectRoutes {
  private projectService: ProjectService
  private authMiddleware: AuthMiddleware

  constructor(projectService: ProjectService, authMiddleware: AuthMiddleware) {
    this.projectService = projectService
    this.authMiddleware = authMiddleware
  }

  addRoutes = (router: Router) => {
    router.post(
      '/project',
      this.authMiddleware.authenticate,
      this.createProject
    )
    router.get('/project', this.authMiddleware.authenticate, this.getProjects)

    router.post(
      '/project/:projectId/apikeys',
      this.authMiddleware.verifyAccess,
      this.createApiKey
    )
    router.get(
      '/project/:projectId/apikeys',
      this.authMiddleware.verifyAccess,
      this.getApiKeys
    )
    router.delete(
      '/project/:projectId/apikeys/:apiKeyId',
      this.authMiddleware.verifyAccess,
      this.deleteApiKey
    )

    router.post(
      '/project/:projectId/variables',
      this.authMiddleware.verifyAccess,
      this.createVariable
    )
    router.get(
      '/project/:projectId/variables',
      this.authMiddleware.verifyAccess,
      this.getVariables
    )
    router.get(
      '/project/:projectId/variables/:variableId',
      this.authMiddleware.verifyAccess,
      this.getVariableById
    )
    router.put(
      '/project/:projectId/variables/:variableId',
      this.authMiddleware.verifyAccess,
      this.updateVariable
    )
    router.delete(
      '/project/:projectId/variables/:variableId',
      this.authMiddleware.verifyAccess,
      this.deleteVariable
    )
  }

  private createProject = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const project = await this.projectService.createProject(
        req.body,
        req.user.id
      )
      res.json(project)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const projects = await this.projectService.getProjects(req.user.id)
      res.json(projects)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private createApiKey = async (req: Request, res: Response): Promise<void> => {
    try {
      const apiKey = await this.projectService.createApiKey(
        req.params.projectId,
        req.body.name
      )
      res.json(apiKey)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getApiKeys = async (req: Request, res: Response): Promise<void> => {
    try {
      const apiKeys = await this.projectService.getApiKeys(req.params.projectId)
      res.json(apiKeys)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private deleteApiKey = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.projectService.deleteApiKey(req.params.apiKeyId)
      res.json({ message: 'Api key deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private createVariable = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await this.projectService.createVariable(
        req.params.projectId,
        req.body.key,
        req.body.value
      )
      res.json({ message: 'Variable created' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getVariables = async (req: Request, res: Response): Promise<void> => {
    try {
      const variables = await this.projectService.getVariables(
        req.params.projectId
      )
      res.json(variables)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getVariableById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const variable = await this.projectService.getVariableById(
        req.params.variableId
      )
      res.json(variable)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private updateVariable = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await this.projectService.updateVariable(
        req.params.variableId,
        req.body.value
      )
      res.json({ message: 'Variable updated' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private deleteVariable = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await this.projectService.deleteVariable(req.params.variableId)
      res.json({ message: 'Variable deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}