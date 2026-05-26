const {
  factorial,
  isPrime,
  clamp
} = require('../src/numberUtils');

describe('numberUtils', () => {

  describe('factorial()', () => {

    test('factorial de 5 es 120', () => {
      expect(factorial(5)).toBe(120);
    });

    test('factorial de 0 es 1', () => {
      expect(factorial(0)).toBe(1);
    });

    test('lanza error con negativos', () => {
      expect(() => factorial(-1)).toThrow(RangeError);
    });

    test('lanza error con decimales', () => {
      expect(() => factorial(2.5)).toThrow(TypeError);
    });

  });

  describe('isPrime()', () => {

    test('2 es primo', () => {
      expect(isPrime(2)).toBe(true);
    });

    test('4 no es primo', () => {
      expect(isPrime(4)).toBe(false);
    });

    test('0 no es primo', () => {
      expect(isPrime(0)).toBe(false);
    });

    test('1 no es primo', () => {
      expect(isPrime(1)).toBe(false);
    });

  });

  describe('clamp()', () => {

    test('valor dentro del rango', () => {
      expect(clamp(5, 1, 10)).toBe(5);
    });

    test('valor menor al mínimo', () => {
      expect(clamp(0, 1, 10)).toBe(1);
    });

    test('valor mayor al máximo', () => {
      expect(clamp(20, 1, 10)).toBe(10);
    });

    test('lanza error si min > max', () => {
      expect(() => clamp(5, 10, 1)).toThrow(RangeError);
    });

  });

});