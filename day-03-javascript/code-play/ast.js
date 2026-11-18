const babel = require('@babel/core');
const code = `
  const add = (a, b) => 
    return a + b;
  ;
  console.log(add(2, 3));
`;

const ast = babel.parseSync(code, 
  sourceType: 'module',
);
console.log(JSON.stringify(ast, null, 2));
