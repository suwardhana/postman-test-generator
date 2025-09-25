interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
}

function JsonInput({ value, onChange, darkMode }: JsonInputProps) {
  const bgColor = darkMode ? '#2d3748' : '#ffffff';
  const textColor = darkMode ? '#e2e8f0' : '#2d3748';
  const borderColor = darkMode ? '#4a5568' : '#e2e8f0';
  const inputBg = darkMode ? '#4a5568' : '#ffffff';

  return (
    <div style={{ 
      padding: '20px', 
      height: '100%',
      backgroundColor: bgColor,
      color: textColor
    }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>JSON Input</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your JSON here..."
        style={{
          width: '100%',
          height: 'calc(100% - 60px)',
          resize: 'none',
          fontFamily: 'JetBrains Mono, Consolas, monospace',
          fontSize: '14px',
          padding: '16px',
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          backgroundColor: inputBg,
          color: textColor,
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
      />
    </div>
  );
}

export default JsonInput;