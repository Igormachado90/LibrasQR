interface Props {
  label: string;
  name?: string | undefined;
  type?: string;
  value?: string | number;
  max?: string;
  min?: string;
  placeholder?: string;
  onFocus?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export default function Input({ label, name, type = "text", value, placeholder = '', onFocus, onChange, required = false }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "14px", color: "#555" }}>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        onFocus={onFocus}
        readOnly={!onChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          color: "#333",
          background: "#f9f9f9"
        }}
      />
    </div>
  );
}
