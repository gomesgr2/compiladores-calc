import { expect } from 'chai';
import 'mocha';
import { calc } from './index.js';

describe('Calculadora ANTLR', () => {

    // 1. Casos básicos
    describe('Casos básicos', () => {
        it('Deve retornar 3 para "3"', () => expect(calc('3')).to.equal(3));
        it('Deve retornar 10 para "10"', () => expect(calc('10')).to.equal(10));
        it('Deve somar 3+4 = 7', () => expect(calc('3+4')).to.equal(7));
        it('Deve subtrair 8-5 = 3', () => expect(calc('8-5')).to.equal(3));
        it('Deve multiplicar 6*7 = 42', () => expect(calc('6*7')).to.equal(42));
        it('Deve dividir 8/2 = 4', () => expect(calc('8/2')).to.equal(4));
    });

    // 2. Precedência de operadores
    describe('Precedência de operadores', () => {
        it('2+3*4 = 14', () => expect(calc('2+3*4')).to.equal(14));
        it('10-6/2 = 7', () => expect(calc('10-6/2')).to.equal(7));
        it('2*3+4*5 = 26', () => expect(calc('2*3+4*5')).to.equal(26));
    });

    // 3. Uso de parênteses
    describe('Parênteses', () => {
        it('(2+3)*4 = 20', () => expect(calc('(2+3)*4')).to.equal(20));
        it('10/(5-3) = 5', () => expect(calc('10/(5-3)')).to.equal(5));
        it('(8-2)*(3+1) = 24', () => expect(calc('(8-2)*(3+1)')).to.equal(24));
        it('((2+2)) = 4', () => expect(calc('((2+2))')).to.equal(4));
    });

    // 4. Erros léxicos
    describe('Erros léxicos', () => {
        it('1H + 2 deve lançar erro', () => expect(() => calc('1H+2')).to.throw('Entrada inválida.'));
        it('abc deve lançar erro', () => expect(() => calc('abc')).to.throw('Entrada inválida.'));
        it('7$3 deve lançar erro', () => expect(() => calc('7$3')).to.throw('Entrada inválida.'));
    });

    // 5. Erros sintáticos
    describe('Erros sintáticos', () => {
        it('1+ deve lançar erro', () => expect(() => calc('1+')).to.throw('Entrada inválida.'));
        it('*3 deve lançar erro', () => expect(() => calc('*3')).to.throw('Entrada inválida.'));
        it('(2+3 deve lançar erro', () => expect(() => calc('(2+3')).to.throw('Entrada inválida.'));
        it('4/ deve lançar erro', () => expect(() => calc('4/')).to.throw('Entrada inválida.'));
    });

    // 6. Divisão por zero
    describe('Divisão por zero', () => {
        it('5/0 deve lançar erro "divide by zero!"', () => expect(() => calc('5/0')).to.throw('divide by zero!'));
        it('(10-10)/(3-3) deve lançar erro "divide by zero!"', () => expect(() => calc('(10-10)/(3-3)')).to.throw('divide by zero!'));
    });

    // 7. Espaços e formatação
    describe('Espaços e formatação', () => {
        it('3 + 4 = 7', () => expect(calc('3 + 4')).to.equal(7));
        it('( 2 * ( 3 + 1 ) ) = 8', () => expect(calc('( 2 * ( 3 + 1 ) )')).to.equal(8));
    });

    // 8. Expressões mais longas
    describe('Expressões longas', () => {
        it('1+2+3+4+5 = 15', () => expect(calc('1+2+3+4+5')).to.equal(15));
        it('100/5+2*3-1 = 25', () => expect(calc('100/5+2*3-1')).to.equal(25));
        it('(2+3)*(4+5)*(6-2) = 180', () => expect(calc('(2+3)*(4+5)*(6-2)')).to.equal(180));
    });

});
