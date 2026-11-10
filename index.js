const express = require('express');
const db = require('./db');
const app = express()
const ConverterTemp = require('./temp')
const port = 3000
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/medicoes', async (req, res) => {
  try {
    const [rows] = await db.execute('select * from medicoes');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
})
app.get('/medicoes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('select * from medicoes where id=?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        mensagem: "Medição não encontrada",
      });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
})

app.post('/medicoes', async (req, res) => {
  const { descricao, tipo, temperatura, unidade } = req.body;
 if (!descricao ||!tipo ||temperatura === undefined ||temperatura === null ||!Number.isFinite(Number(temperatura)) ||
    !["C", "F"].includes(unidade)){
    return res.status(400).json({
        mensagem: "Verifique os campos e informe uma temperatura válida e unidade C ou F"
    });
}
  const { valor_convertido, unidade_convertida, classificacao } =
    ConverterTemp(Number(temperatura), unidade);
  try {
    const [rows] = await db.execute(
      'INSERT INTO medicoes (descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [descricao, tipo, temperatura, unidade, valor_convertido, unidade_convertida, classificacao]
    );
    res.status(201).json({
      id: rows.insertId,
      descricao,
      tipo,
      valor_original: temperatura,
      unidade_original: unidade,
      valor_convertido,
      unidade_convertida,
      classificacao
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
});
app.put('/medicoes/:id', async (req, res) => {
  const { id } = req.params;
  const { descricao, tipo, temperatura, unidade } = req.body;
  if (!descricao ||!tipo ||temperatura === undefined ||temperatura === null ||!Number.isFinite(Number(temperatura)) ||!["C", "F"].includes(unidade)) {
    return res.status(400).json({
      mensagem: "Verifique os campos e informe uma temperatura válida e unidade C ou F"
    });
  }
  const { valor_convertido, unidade_convertida, classificacao } =
    ConverterTemp(Number(temperatura), unidade);
  try {
    const [rows] = await db.execute(
      'UPDATE medicoes SET descricao = ?, tipo = ?, valor_original = ?, unidade_original = ?, valor_convertido = ?, unidade_convertida = ?, classificacao = ? WHERE id = ?',
      [descricao, tipo, temperatura, unidade, valor_convertido, unidade_convertida, classificacao, id]
    );
    if (rows.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Medição não encontrada"
      });
    }
    res.status(200).json({
      mensagem: "Medição atualizada com sucesso"
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
    });
  }
});
app.delete('/medicoes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('delete from medicoes where id=?', [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "medicao não encontrado",
      });
    }
    res.status(200).json({mensagem:"medicao apagada com sucesso"});
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
    });
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})