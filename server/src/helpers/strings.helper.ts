const parens = /\(([0-9+\-*/\^ .]+)\)/; // Regex for identifying parenthetical expressions
const mul = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/; // Regex for identifying multiplication (x * y)
const div = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; // Regex for identifying division (x / y)
const add = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/; // Regex for identifying addition (x + y)
const sub = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/; // Regex for identifying subtraction (x - y)

/**
 * Evaluates a numerical expression as a string and returns a Number
 * @param {String} expr Numerical expression input
 * @returns {Number} Result of expression
 */
export function evaluate(expr: string): number {
  if (isNaN(Number(expr))) {
    if (parens.test(expr)) {
      let newExpr = expr.replace(parens, (match: string, subExpr: string) => {
        return evaluate(subExpr).toString();
      });
      return evaluate(newExpr);
    } else if (mul.test(expr)) {
      let newExpr = expr.replace(mul, (match: string, a: string, b: string) => {
        return (Number(a) * Number(b)).toString();
      });
      return evaluate(newExpr);
    } else if (div.test(expr)) {
      let newExpr = expr.replace(div, (match: string, a: string, b: string) => {
        if (b != "0") return (Number(a) / Number(b)).toString();
        else throw new Error("Division by zero");
      });
      return evaluate(newExpr);
    } else if (add.test(expr)) {
      let newExpr = expr.replace(add, (match: string, a: string, b: string) => {
        return (Number(a) + Number(b)).toString();
      });
      return evaluate(newExpr);
    } else if (sub.test(expr)) {
      let newExpr = expr.replace(sub, (match: string, a: string, b: string) => {
        return (Number(a) - Number(b)).toString();
      });
      return evaluate(newExpr);
    } else {
      return Number(expr);
    }
  }
  return Number(expr);
}
