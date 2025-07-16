const calculateCommission = (req, res) => {
  try {
    const { valor_plano, valor_entrada, percentual_comissao, numero_parcelas } =
      req.body;
    if (
      !valor_plano ||
      !valor_entrada ||
      !percentual_comissao ||
      !numero_parcelas
    ) {
      return res
        .status(400)
        .json({ error: "todos os campos são obrigatórios" });
    }

    // Começa a lógica da calculadora

    const comissaoTotal = valor_plano * (percentual_comissao / 100);

    let entrada_vendedor = 0;

    if (percentual_comissao >= 40) {
      // Primeiro Cenario
      if (valor_entrada <= 600) {
        entrada_vendedor = valor_entrada;
      } else {
        entrada_vendedor = 600 + (valor_entrada - 600) / 2;
      }
    } else {
      //Segundo cenário
      if (valor_entrada <= 600) {
        entrada_vendedor = valor_entrada / 2;
      } else {
        entrada_vendedor =
          300 + (valor_entrada - 600) * (percentual_comissao / 100);
      }
    }

    //Calcular o saldo de Comissão

    const saldoComissão = comissaoTotal - entrada_vendedor;
    const comissaoEmpresa = valor_plano - comissaoTotal;

    const comissaoPorParcela =
      saldoComissão > 0 ? saldoComissão / numero_parcelas : 0;

    //Resposta da API

    res.status(200).json({
      comissao_total: parseFloat(comissaoTotal.toFixed(2)),
      entrada_vendedor: parseFloat(entrada_vendedor.toFixed(2)),
      saldo_comissao_a_receber: parseFloat(saldoComissão.toFixed(2)),
      comissao_por_parcela: parseFloat(comissaoPorParcela.toFixed(2)),
      comissao_empresa: parseFloat(comissaoEmpresa.toFixed(2)),
    });
  } catch (error) {
    console.error("erro no calculo", error);
    res.status(500).json({ error: "Ocorreu erro interno no servidor" });
  }
};

module.exports = {
  calculateCommission,
};
