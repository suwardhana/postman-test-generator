interface TestResultProps {
  testScript: string;
}

function TestResult({ testScript }: TestResultProps) {
  return (
    <div style={{ padding: '20px', height: '100%' }}>
      <h2>Test Result</h2>
      <pre
        style={{
          width: '100%',
          height: 'calc(100% - 60px)',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '10px',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          margin: 0
        }}
      >
        {testScript || 'Test script will appear here...'}
      </pre>
    </div>
  );
}

export default TestResult;