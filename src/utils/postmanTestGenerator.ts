export function generatePostmanTests(jsonData: any): string {
  const tests: string[] = [];
  
  function generateTestsForObject(obj: any, path = 'jsonData') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = `${path}.${key}`;
      
      if (value === null) {
        tests.push(`pm.test("${key} should exist", function () {
    pm.expect(${currentPath}).to.not.be.undefined;
});`);
      } else if (Array.isArray(value)) {
        tests.push(`pm.test("${key} should be an array", function () {
    pm.expect(${currentPath}).to.be.an('array');
});`);
        if (value.length > 0 && typeof value[0] === 'object') {
          generateTestsForObject(value[0], `${currentPath}[0]`);
        }
      } else if (typeof value === 'object') {
        tests.push(`pm.test("${key} should be an object", function () {
    pm.expect(${currentPath}).to.be.an('object');
});`);
        generateTestsForObject(value, currentPath);
      } else {
        const type = typeof value;
        tests.push(`pm.test("${key} should be a ${type}", function () {
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