# Calculadora ANTLR4

Este projeto é uma calculadora interativa em **Node.js** baseada em **ANTLR4** com tratamento de entradas inválidas, inspirada no projeto : 
https://github.com/keyi6/calculANTLR-python3# 
---

## Como instalar

Instale o Antlr4

````
cd /usr/local/lib
sudo curl -O https://www.antlr.org/download/antlr-4.8-complete.jar

export CLASSPATH=".:/usr/local/lib/antlr-4.8-complete.jar:$CLASSPATH"
alias antlr4='java -jar /usr/local/lib/antlr-4.8-complete.jar'
alias grun='java org.antlr.v4.gui.TestRig'
```
Instale as bibliotecas do projeto

```
npm install
```

## Gere os arquivos parser, lexer e visitor :

```
antlr4 -Dlanguage=JavaScript Calculantlr.g4 -visitor -o dist 
```

## Rode o projeto 

```
node index.js
```

## Para rodar os testes

```
npx mocha calc.test.js
```
