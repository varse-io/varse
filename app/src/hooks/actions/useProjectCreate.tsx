import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import { activeProjectAtom } from '../../state/state'
import useLoadProjectList from '../data/useLoadProjectList'

export default function useProjectCreate() {
  const navigate = useNav()
  const { createProject, createVariable } = useProject()
  const loadProjectList = useLoadProjectList()

  const setActiveProject = useSetRecoilState(activeProjectAtom)

  return useCallback(
    async (name: string) => {
      try {
        const newProject = await createProject(name)

        await createVariable(newProject.id, 'new_variable', 'true')

        setActiveProject(newProject)

        await loadProjectList()

        navigate('variable-list')
      } catch (e) {}
    },
    [
      createProject,
      createVariable,
      setActiveProject,
      loadProjectList,
      navigate,
    ],
  )
}
