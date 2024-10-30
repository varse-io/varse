interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void

  type?: string
  placeholder?: string
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
}) => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <label className="text-text-2 text-[14px]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[36px] px-3 rounded-md border border-panel-border text-text-1 text-[14px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Input
