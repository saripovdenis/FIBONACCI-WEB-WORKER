const fibonacciArgs = 'n, thisFn';
const fibonacciString = `
  if (n < 2) {
    return +n;
  };
  return thisFn(n - 2, thisFn) + thisFn(n - 1, thisFn);
`;

const fibonacci = new Function(fibonacciArgs, fibonacciString);

export { fibonacciArgs, fibonacciString };
export default fibonacci;
