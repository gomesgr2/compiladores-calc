import antlr4 from 'antlr4';
import CalculantlrLexer from './dist/CalculantlrLexer.js';
import CalculantlrParser from './dist/CalculantlrParser.js';
import CalculantlrVisitor from './dist/CalculantlrVisitor.js';
import readline from 'readline';

class ThrowingErrorListener extends antlr4.error.ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        throw new Error("Entrada inválida.");
    }
}

class CalcVisitor extends CalculantlrVisitor {
    visitAddExpr(ctx) {
        let value = this.visit(ctx.mulExpr(0));
        for (let i = 1; i < ctx.mulExpr().length; i++) {
            const op = ctx.getChild(2 * i - 1).getText();
            const right = this.visit(ctx.mulExpr(i));
            if (op === '+') value += right;
            else value -= right;
        }
        return value;
    }

    visitMulExpr(ctx) {
        let value = this.visit(ctx.atom(0));
        for (let i = 1; i < ctx.atom().length; i++) {
            const op = ctx.getChild(2 * i - 1).getText();
            const right = this.visit(ctx.atom(i));
            if (op === '*') value *= right;
            else {
                if (right === 0) {
                    throw new Error('divide by zero!');
                }
                value /= right;
            }
        }
        return value;
    }

    visitOpExpr(ctx) {
        const left = this.visit(ctx.expr(0));
        const right = this.visit(ctx.expr(1));
        const op = ctx.op.text;

        switch (op) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/':
                if (right === 0) {
                    throw new Error('divide by zero!');
                }
                return left / right;
            default:
                throw new Error('Invalid operator');
        }
    }

    visitAtomExpr(ctx) {
        return parseInt(ctx.INT().getText(), 10);
    }

    visitParenExpr(ctx) {
        return this.visit(ctx.expr());
    }
}

export function calc(line) {
    const chars = new antlr4.InputStream(line);
    const lexer = new CalculantlrLexer(chars);

    lexer.removeErrorListeners();
    lexer.addErrorListener(new ThrowingErrorListener());

    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new CalculantlrParser(tokens);

    parser.removeErrorListeners();
    parser.addErrorListener(new ThrowingErrorListener());

    parser.buildParseTrees = true;
    const tree = parser.expr();

    const visitor = new CalcVisitor();
    return visitor.visit(tree);
}

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
        console.error(e.message);
    }
    rl.prompt();
}).on('close', () => {
    console.log('Exiting...');
    process.exit(0);
});