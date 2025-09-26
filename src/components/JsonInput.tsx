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

  const formatJson = () => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
    } catch {
      // Invalid JSON, do nothing
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      height: '100%',
      backgroundColor: bgColor,
      color: textColor
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>JSON Input</h2>
        <button
          onClick={formatJson}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: `1px solid ${borderColor}`,
            backgroundColor: darkMode ? '#4a5568' : 'white',
            color: textColor,
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Format
        </button>
      </div>
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