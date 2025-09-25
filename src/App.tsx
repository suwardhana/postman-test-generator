// this app for allowing users to upload json snippet, and create test script (post response) for postman
// consist of 2 column, left is for json, right is the test result

import { useState, useEffect } from 'react';
import JsonInput from "./components/JsonInput";
import TestResult from "./components/TestResult";
import ConfigPanel from "./components/ConfigPanel";
import { generatePostmanTests, isValidJson } from './utils/postmanTestGenerator';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [testScript, setTestScript] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [contentTypeCheck, setContentTypeCheck] = useState(true);
  const [statusCode, setStatusCode] = useState('200');

  const updateTestScript = (jsonValue: string) => {
    if (jsonValue.trim() && isValidJson(jsonValue)) {
      const parsedJson = JSON.parse(jsonValue);
      const generatedTests = generatePostmanTests(parsedJson, {
        contentTypeCheck,
        statusCode
      });
      setTestScript(generatedTests);
    } else {
      setTestScript('');
    }
  };

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    updateTestScript(value);
  };

  useEffect(() => {
    updateTestScript(jsonInput);
  }, [contentTypeCheck, statusCode]);

  const bgColor = darkMode ? '#1a202c' : '#ffffff';
  const borderColor = darkMode ? '#4a5568' : '#e2e8f0';

  return (
    <div style={{ 
      height: "100vh", 
      backgroundColor: bgColor,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <ConfigPanel
        contentTypeCheck={contentTypeCheck}
        statusCode={statusCode}
        onContentTypeChange={setContentTypeCheck}
        onStatusCodeChange={setStatusCode}
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(!darkMode)}
      />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, borderRight: `1px solid ${borderColor}` }}>
          <JsonInput value={jsonInput} onChange={handleJsonChange} darkMode={darkMode} />
        </div>
        <div style={{ flex: 1 }}>
          <TestResult testScript={testScript} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;
