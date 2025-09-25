interface TestConfig {
  contentTypeCheck: boolean;
  statusCode: string;
}

export function generatePostmanTests(jsonData: any, config: TestConfig): string {
  const tests: string[] = [];
  
  // Add config-based tests
  if (config.contentTypeCheck) {
    tests.push(`pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});`);
  }
  
  tests.push(`pm.test("Status code is ${config.statusCode}", function () {
    pm.response.to.have.status(${config.statusCode});
});`);
  
  function generateTestsForObject(obj: any, path = 'jsonData', parentKey = '') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = `${path}.${key}`;
      
      if (value === null) {
        tests.push(`pm.test("[${key}] should exist", function () {
    pm.expect(${currentPath}).to.not.be.undefined;
});`);
      } else if (Array.isArray(value)) {
        const groupTests: string[] = [];
        groupTests.push(`pm.test("[${key}] should be an array", function () {
        pm.expect(${key}).to.be.an('array');
    });`);
        
        if (value.length > 0 && typeof value[0] === 'object') {
          const itemVar = key.slice(0, -1); // Remove 's' from plural
          groupTests.push(`\n    if (${key}.length > 0) {
        const ${itemVar} = ${key}[0];`);
          
          for (const [itemKey, itemValue] of Object.entries(value[0])) {
            const type = typeof itemValue;
            groupTests.push(`        pm.test("[${key}[0].${itemKey}] should be a ${type}", function () {
            pm.expect(${itemVar}.${itemKey}).to.be.a('${type}');
        });`);
          }
          groupTests.push(`    }`);
        }
        
        tests.push(`// 🔹 ${currentPath}\n(function test${key.charAt(0).toUpperCase() + key.slice(1)}(${key}) {\n    ${groupTests.join('\n\n    ')}\n})(${currentPath});`);
      } else if (typeof value === 'object') {
        const groupTests: string[] = [];
        groupTests.push(`pm.test("[${key}] should be an object", function () {
        pm.expect(${key}).to.be.an('object');
    });`);
        
        for (const [objKey, objValue] of Object.entries(value)) {
          if (objValue === null) {
            groupTests.push(`pm.test("[${key}.${objKey}] should exist", function () {
        pm.expect(${key}.${objKey}).to.not.be.undefined;
    });`);
          } else if (Array.isArray(objValue)) {
            groupTests.push(`pm.test("[${key}.${objKey}] should be an array", function () {
        pm.expect(${key}.${objKey}).to.be.an('array');
    });`);
            if (objValue.length > 0 && typeof objValue[0] === 'object') {
              const itemVar = objKey.slice(0, -1);
              groupTests.push(`\n    if (${key}.${objKey}.length > 0) {
        const ${itemVar} = ${key}.${objKey}[0];`);
              for (const [itemKey, itemValue] of Object.entries(objValue[0])) {
                const type = typeof itemValue;
                groupTests.push(`        pm.test("[${key}.${objKey}[0].${itemKey}] should be a ${type}", function () {
            pm.expect(${itemVar}.${itemKey}).to.be.a('${type}');
        });`);
              }
              groupTests.push(`    }`);
            }
          } else if (typeof objValue === 'object') {
            groupTests.push(`pm.test("[${key}.${objKey}] should be an object", function () {
        pm.expect(${key}.${objKey}).to.be.an('object');
    });`);
          } else {
            const type = typeof objValue;
            groupTests.push(`pm.test("[${key}.${objKey}] should be a ${type}", function () {
        pm.expect(${key}.${objKey}).to.be.a('${type}');
    });`);
          }
        }
        
        tests.push(`// 🔹 ${currentPath}\n(function test${key.charAt(0).toUpperCase() + key.slice(1)}(${key}) {\n    ${groupTests.join('\n\n    ')}\n})(${currentPath});`);
      } else {
        const type = typeof value;
        tests.push(`pm.test("[${key}] should be a ${type}", function () {
    pm.expect(${currentPath}).to.be.a('${type}');
});`);
      }
    }
  }
  
  generateTestsForObject(jsonData);
  
  return `const jsonData = pm.response.json();

${tests.join('\n\n')}`;
}

export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}