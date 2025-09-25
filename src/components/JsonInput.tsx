interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
}

function JsonInput({ value, onChange }: JsonInputProps) {
  return (
    <div style={{ padding: '20px', height: '100%' }}>
      <h2>JSON Input</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your JSON here..."
        style={{
          width: '100%',
          height: 'calc(100% - 60px)',
          resize: 'none',
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />
    </div>
  );
}

export default JsonInput;