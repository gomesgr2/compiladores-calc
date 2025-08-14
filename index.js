// index.js
const antlr4 = require('antlr4');
const CalculantlrLexer = require('./dist/CalculantlrLexer').CalculantlrLexer;
const CalculantlrParser = require('./dist/CalculantlrParser').CalculantlrParser;
const CalculantlrVisitor = require('./dist/CalculantlrVisitor').CalculantlrVisitor;

class CalcVisitor extends CalculantlrVisitor {
  visitAtomExpr(ctx) {
    return parseInt(ctx.getText(), 10);
  }

  visitParenExpr(ctx) {
    return this.visit(ctx.expr());
  }

  visitOpExpr(ctx) {
    const left = this.visit(ctx.left);
    const right = this.visit(ctx.right);
    const op = ctx.op.text;

    if (op === '+') {
      return left + right;
    } else if (op === '-') {
      return left - right;
    } else if (op === '*') {
      return left * right;
    } else if (op === '/') {
      if (right === 0) {
        console.error('divide by zero!');
        return 0;
      }
      return left / right;
    }
  }
}

function calc(line) {
  const chars = new antlr4.InputStream(line);
  const lexer = new CalculantlrLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new CalculantlrParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.expr();

  const visitor = new CalcVisitor();
  return visitor.visit(tree);
}

// Loop para ler a entrada do usuário
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>>> '
});

rl.prompt();

rl.on('line', (line) => {
  try {
    const result = calc(line);
    console.log(result);
  } catch (e) {
    console.error('Erro:', e.message);
  }
  rl.prompt();
}).on('close', () => {
  console.log('Saindo...');
  process.exit(0);
});