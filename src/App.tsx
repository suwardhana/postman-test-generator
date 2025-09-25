// this app for allowing users to upload json snippet, and create test script (post response) for postman
// consist of 2 column, left is for json, right is the test result

import { useState } from 'react';
import JsonInput from "./components/JsonInput";
import TestResult from "./components/TestResult";
import { generatePostmanTests, isValidJson } from './utils/postmanTestGenerator';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [testScript, setTestScript] = useState('');

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    
    if (value.trim() && isValidJson(value)) {
      const parsedJson = JSON.parse(value);
      const generatedTests = generatePostmanTests(parsedJson);
      setTestScript(generatedTests);
    } else {
      setTestScript('');
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, borderRight: "1px solid #ccc" }}>
        <JsonInput value={jsonInput} onChange={handleJsonChange} />
      </div>
      <div style={{ flex: 1 }}>
        <TestResult testScript={testScript} />
      </div>
    </div>
  );
}

export default App;
