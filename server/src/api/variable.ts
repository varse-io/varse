import { Request, Response, Router } from 'express'
import { ProjectService } from '../project/project'
import { AuthMiddleware } from '../auth/auth.middleware'

export class VariableRoutes {
  private projectService: ProjectService
  private authMiddleware: AuthMiddleware

  constructor(projectService: ProjectService, authMiddleware: AuthMiddleware) {
    this.projectService = projectService
    this.authMiddleware = authMiddleware
  }

  addRoutes = (router: Router) => {
    router.get(
      '/variable/:key',
      this.authMiddleware.authenticateProject,
      this.getVariable
    )
  }

  getVariable = async (req: Request, res: Response): Promise<void> => {
    if (!req.projectId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    try {
      const variable = await this.projectService.getVariableByKey(
        req.projectId,
        req.params.key
      )
      res.json(variable)
    } catch (error) {
      res.status(404).json({ message: 'Variable not found' })
    }
  }
}
