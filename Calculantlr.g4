grammar Calculantlr;

prog: (statement ';')* EOF;

statement
    : assignment
    | print_statement
    | expr
    ;

assignment
    : ID '=' expr
    ;

print_statement
    : 'print' expr
    | 'read' ID
    ;

expr: multExpr ((PLUS | MINUS) multExpr)*;

multExpr: atomExpr ((MULT | DIV) atomExpr)*;

atomExpr
    : INT
    | ID
    | '(' expr ')'
    ;

ID: [a-zA-Z]+;
INT: [0-9]+;
PLUS: '+';
MINUS: '-';
MULT: '*';
DIV: '/';
WS: [ \t\r\n] -> skip;