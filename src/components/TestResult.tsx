interface TestResultProps {
  testScript: string;
  darkMode: boolean;
}

function TestResult({ testScript, darkMode }: TestResultProps) {
  const bgColor = darkMode ? '#2d3748' : '#ffffff';
  const textColor = darkMode ? '#e2e8f0' : '#2d3748';
  const borderColor = darkMode ? '#4a5568' : '#e2e8f0';
  const codeBg = darkMode ? '#1a202c' : '#f7fafc';

  return (
    <div style={{ 
      padding: '20px', 
      height: '100%',
      backgroundColor: bgColor,
      color: textColor
    }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Test Result</h2>
      <pre
        style={{
          width: '100%',
          height: 'calc(100% - 60px)',
          backgroundColor: codeBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'JetBrains Mono, Consolas, monospace',
          fontSize: '14px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          margin: 0,
          color: textColor,
          lineHeight: '1.5'
        }}
      >
        {testScript || 'Test script will appear here...'}
      </pre>
    </div>
  );
}

export default TestResult;