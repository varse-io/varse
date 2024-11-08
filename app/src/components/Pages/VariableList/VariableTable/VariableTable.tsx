import { Copy } from 'lucide-react'
import useNav from '../../../../hooks/utils/useNav'
import { Variable } from '../../../../backend/types'
import { useMemo } from 'react'

interface VariableTableProps {
  variableList: Variable[]
  search: string
  onSelect: (key: string) => void
}

const VariableTable: React.FC<VariableTableProps> = ({
  variableList: variables,
  search,
  onSelect,
}) => {
  const navigate = useNav()

  const filteredVariables = useMemo(() => {
    return variables.filter((variable) =>
      variable.key.toLowerCase().includes(search.toLowerCase()),
    )
  }, [variables, search])

  return (
    <div className="w-full max-w-[600px] h-full border border-panel-border rounded-[6px] flex-shrink overflow-auto">
      <div className="sticky top-0 bg-background w-full p-3 flex items-center justify-between border-b border-panel-border">
        <div className="flex-1 flex items-center justify-end gap-3">
          <p className="w-[140px] text-[14px] text-text-2">Key</p>
          <p className="flex-1 text-[14px] text-text-2">Value</p>
          <div className="w-4 h-4" />
        </div>
      </div>
      {variables.length > 0 && (
        <div className="w-full flex flex-col overflow-y-auto">
          {filteredVariables.map((variable) => (
            <div
              key={variable.id}
              className="w-full p-3 flex items-center justify-between border-b border-panel-border hover:bg-input-active cursor-pointer"
              onClick={() => onSelect(variable.id)}
            >
              <div className="flex-1 flex items-center justify-end gap-3">
                <p className="w-[140px] text-[14px] text-text-1">
                  {variable.key}
                </p>
                <p className="flex-1 text-[14px] text-text-1">
                  {variable.value}
                </p>
                <div
                  className="w-4 h-4 text-text-2 hover:text-text-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(variable.key)
                  }}
                >
                  <Copy size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {variables.length > 0 && filteredVariables.length === 0 && (
        <div className="w-full flex items-center justify-start p-3">
          <p className="text-[14px] text-text-2">No variables found.</p>
        </div>
      )}
      {variables.length === 0 && (
        <div className="w-full flex items-center justify-between p-3">
          <p className="text-[14px] text-text-2">
            You don't have any variables yet.
          </p>
          <button
            className="text-[14px] text-cta-base cursor-pointer underline"
            onClick={() => navigate('docs')}
          >
            Quick Start
          </button>
        </div>
      )}
    </div>
  )
}

export default VariableTable
