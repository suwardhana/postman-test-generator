import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface TestResultProps {
  testScript: string;
  darkMode: boolean;
}

function TestResult({ testScript, darkMode }: TestResultProps) {
  const bgColor = darkMode ? "#2d3748" : "#ffffff";
  const textColor = darkMode ? "#e2e8f0" : "#2d3748";
  const borderColor = darkMode ? "#4a5568" : "#e2e8f0";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(testScript);
  };

  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
          Test Result
        </h2>
        <button
          onClick={copyToClipboard}
          disabled={!testScript}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: `1px solid ${borderColor}`,
            backgroundColor: darkMode ? "#4a5568" : "white",
            color: textColor,
            cursor: testScript ? "pointer" : "not-allowed",
            fontSize: "12px",
            opacity: testScript ? 1 : 0.5,
          }}
        >
          Copy
        </button>
      </div>
      <div
        style={{
          width: "100%",
          height: "calc(100% - 60px)",
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          overflow: "auto",
        }}
      >
        <SyntaxHighlighter
          language="javascript"
          style={darkMode ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            padding: "16px",
            fontSize: "16px",
            fontFamily: "JetBrains Mono, Consolas, monospace",
            background: "transparent",
            height: "100%",
          }}
        >
          {testScript || "Test script will appear here..."}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default TestResult;
