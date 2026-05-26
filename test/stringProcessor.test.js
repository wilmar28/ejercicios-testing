const {
  maskEmail,
  reverseWords,
  extractHashtags
} = require('../src/stringProcessor');

describe('stringProcessor', () => {

  describe('maskEmail()', () => {

    test('oculta correctamente el email', () => {
      expect(maskEmail('sergio@gmail.com'))
        .toBe('s****o@gmail.com');
    });

    test('usuario de un solo carácter', () => {
      expect(maskEmail('a@gmail.com'))
        .toBe('a@gmail.com');
    });

    test('email inválido', () => {
      expect(() => maskEmail('correo'))
        .toThrow(Error);
    });

  });

  describe('reverseWords()', () => {

    test('invierte palabras', () => {
      expect(reverseWords('hola mundo node'))
        .toBe('node mundo hola');
    });

    test('maneja múltiples espacios', () => {
      expect(reverseWords('hola    mundo'))
        .toBe('mundo hola');
    });

    test('texto vacío', () => {
      expect(reverseWords('   '))
        .toBe('');
    });

  });

  describe('extractHashtags()', () => {

    test('extrae hashtags', () => {
      expect(extractHashtags('Me gusta #node y #testing'))
        .toEqual(['#node', '#testing']);
    });

    test('sin hashtags', () => {
      expect(extractHashtags('Hola mundo'))
        .toEqual([]);
    });

    test('# solo no cuenta', () => {
      expect(extractHashtags('#'))
        .toEqual([]);
    });

  });

});