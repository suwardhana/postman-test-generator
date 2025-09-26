interface ConfigPanelProps {
  contentTypeCheck: boolean;
  statusCode: string;
  timeout: string;
  onContentTypeChange: (checked: boolean) => void;
  onStatusCodeChange: (code: string) => void;
  onTimeoutChange: (timeout: string) => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

function ConfigPanel({ 
  contentTypeCheck, 
  statusCode, 
  timeout,
  onContentTypeChange, 
  onStatusCodeChange,
  onTimeoutChange,
  darkMode,
  onThemeToggle 
}: ConfigPanelProps) {
  const bgColor = darkMode ? '#2d3748' : '#f7fafc';
  const textColor = darkMode ? '#e2e8f0' : '#2d3748';
  const borderColor = darkMode ? '#4a5568' : '#e2e8f0';

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: bgColor,
      borderBottom: `1px solid ${borderColor}`,
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      color: textColor
    }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={contentTypeCheck}
          onChange={(e) => onContentTypeChange(e.target.checked)}
        />
        Content-Type Check
      </label>
      
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        Status Code:
        <select
          value={statusCode}
          onChange={(e) => onStatusCodeChange(e.target.value)}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: `1px solid ${borderColor}`,
            backgroundColor: darkMode ? '#4a5568' : 'white',
            color: textColor
          }}
        >
          <option value="200">200</option>
          <option value="201">201</option>
          <option value="400">400</option>
          <option value="401">401</option>
          <option value="403">403</option>
          <option value="404">404</option>
          <option value="500">500</option>
        </select>
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        Timeout (ms):
        <input
          type="number"
          value={timeout}
          onChange={(e) => onTimeoutChange(e.target.value)}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: `1px solid ${borderColor}`,
            backgroundColor: darkMode ? '#4a5568' : 'white',
            color: textColor,
            width: '80px'
          }}
        />
      </label>

      <button
        onClick={onThemeToggle}
        style={{
          marginLeft: 'auto',
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: darkMode ? '#4299e1' : '#3182ce',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default ConfigPanel;