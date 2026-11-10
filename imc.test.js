const calcularIMC = require('./imc');

describe('Validador de IMC', () => {
    test('Teste de abaixo do peso', () => {
        const resultado = calcularIMC(52.0, 1.75);
        expect(resultado).toEqual({
            imc: 16.98,
            status: 'Abaixo do peso normal'
        });
    });

    test('Teste de peso normal', () => {
        const resultado = calcularIMC(58.0, 1.60); 
        expect(resultado).toEqual({
            imc: 22.66,
            status: 'Peso normal'
        });
    });

    test('Teste de excesso do peso', () => {
        const resultado = calcularIMC(72.0, 1.80);
        expect(resultado).toEqual({
            imc: 22.22,
            status: 'Peso normal' 
        });
    });

    test('Teste de obesidade', () => {
        const resultado = calcularIMC(65.0, 1.68);
        expect(resultado).toEqual({
            imc: 23.03,
            status: 'Peso normal'
        });
    });
});