
function ConverterTemp(temperatura, unidade) {
    let valor_convertido;
    let unidade_convertida;
    let temperaturaCelsius;

    if (unidade === "C") {
        temperaturaCelsius = temperatura;
        valor_convertido = (temperatura * 9 / 5) + 32;
        unidade_convertida = "F";
    } else if (unidade === "F") {
        temperaturaCelsius = (temperatura - 32) * 5 / 9;
        valor_convertido = temperaturaCelsius;
        unidade_convertida = "C";
    } else {
        return {
            erro: "Unidade inválida"
        };
    }

    valor_convertido = parseFloat(valor_convertido.toFixed(2));

    let classificacao;

    if (temperaturaCelsius < 15) {
        classificacao = "Frio";
    } else if (temperaturaCelsius < 30) {
        classificacao = "Ameno";
    } else {
        classificacao = "Quente";
    }

    return {
        valor_convertido,
        unidade_convertida,
        classificacao
    };
}

module.exports = ConverterTemp;
