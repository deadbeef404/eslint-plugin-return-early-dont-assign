/**
 * @fileoverview Return when you know the value of the return statement, instead of assigning it.
 * @author Jason Pettett
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Return when you know the value of the return statement, instead of assigning it.",
            category: "Fill me in",
            recommended: false
        },
        fixable: "code",
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
      const sourceCode = context.getSourceCode();

      function raiseError(violatingExpression, finalReturnValueName) {
        context.report({
          node: violatingExpression.left,
          message: "Return immediately instead of assigning to variable.",
          fix: function(fixer) {
            return [
              fixer.replaceText(violatingExpression, "return " + sourceCode.getText(violatingExpression.right)),
            ];
         },
        });
      }

      const getLast = list => list[list.length -1];

      function hasSingleIdentifierReturnStatement(lastBodyNode) {
        return lastBodyNode.type === 'ReturnStatement' && lastBodyNode.argument.type === 'Identifier';
      }

      function checkLastIfStatement(functionBody, secondLastNode, finalReturnValueName) {
        const ifStatementConsequentBody = secondLastNode.consequent.body;
        if (!ifStatementConsequentBody) {
          return;
        }
        const possibleExpression = getLast(ifStatementConsequentBody);

        const ifStatementEndsWithAssignment = (
          possibleExpression.type === 'ExpressionStatement' &&
          possibleExpression.expression.type === 'AssignmentExpression' &&
          possibleExpression.expression.operator === '='
        );

        if (ifStatementEndsWithAssignment) {
          if (possibleExpression.expression.left.name === finalReturnValueName) {
            raiseError(possibleExpression.expression, finalReturnValueName);
          }
        }
      }

      function checkFunction(node) {
        const functionBody = node.body;
        if (!functionBody.body) {
            return;
        }

        const lastBodyNode = getLast(functionBody.body)

        if (!lastBodyNode) {
          // Empty function.
          return true;
        }

        if (hasSingleIdentifierReturnStatement(lastBodyNode)) {
          if (functionBody.body.length > 1) {
            // okay, there was something other than the return statement.
            const secondLastNode = functionBody.body[functionBody.body.length - 2];

            if (secondLastNode.type === "IfStatement") {
              const finalReturnValueName = lastBodyNode.argument.name;
              checkLastIfStatement(functionBody, secondLastNode, finalReturnValueName);
            }
          }
        }
      }

      return {
        FunctionDeclaration: checkFunction,
        FunctionExpression: checkFunction,
        ArrowFunctionExpression: checkFunction,
      };
    }
};
