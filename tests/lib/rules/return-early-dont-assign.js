/**
 * @fileoverview Return when you know the value of the return statement, instead of assigning it.
 * @author Jason Pettett
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/return-early-dont-assign"),

RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("return-early-dont-assign", rule, {

    valid: [
      "function something() { }",
      "function something(x) { if (true) { console.log('irrelevant'); } return x; }",
      "function something(x) { if (true) { console.log('irrelevant'); return 1; } return x; }",
      "function something() { var x = []; if (true) { return x[1]; } return x; }",
      "function something() { var y = {a: 1}; if (true) { return y.a; } return y; }",
      "function something() { var y = {a: 1}; if (true) { return 'somethingelse'; } return y; }",
      "(x) => { var y = {a: 1}; if (true) { return 'something'; } return y; }",
    ],

    invalid: [
      {
          code: "function something() { var x = []; if (true) { x = x[1]; } return x; }",
          output: "function something() { var x = []; if (true) { return x[1]; } return x; }",
          errors: [{ messageId: "expected" }]
      },
      {
          code: "function something() { var y = {a: 1}; if (true) { y = y.a; } return y; }",
          output: "function something() { var y = {a: 1}; if (true) { return y.a; } return y; }",
          errors: [{ messageId: "expected" }]
      },
      {
          code: "function something() { var y = {a: 1}; if (true) { y = 'somethingelse'; } return y; }",
          output: "function something() { var y = {a: 1}; if (true) { return 'somethingelse'; } return y; }",
          errors: [{ messageId: "expected" }]
      },
      {
          code: "function something() { var x = 3; if (true) { console.log('irrelevant'); x = 1; } return x; }",
          output: "function something() { var x = 3; if (true) { console.log('irrelevant'); return 1; } return x; }",
          errors: [{ messageId: "expected" }]
      },
      {
          code: "(x) => { var y = {a: 1}; if (true) { y = 'something'; } return y; }",
          output: "(x) => { var y = {a: 1}; if (true) { return 'something'; } return y; }",
          errors: [{ messageId: "expected" }]
      },
    ]
});
