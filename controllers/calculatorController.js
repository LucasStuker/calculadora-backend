const calculateCommission = (req, res) => {
  try {
    const { valor_plano, valor_entrada, percentual_comissao, numero_parcelas } =
      req.body;

    const data_inicio_pagamento = req.body.data_inicio_pagamento || new Date();

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
    const TAXA_IMPOSTO = 0.08;
    const TAXA_ADM = 0.03;
    const comissaoEmpresa = valor_plano - comissaoTotal;

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

    const comissaoBrutaPorParcela =
      saldoComissão > 0 ? saldoComissão / numero_parcelas : 0;

    const valorParcelaCliente = (valor_plano - valor_entrada) / numero_parcelas;

    const detalharParcelas = [];
    let totalImpostosVendedor = 0;

    const taxaAdmTotal = valor_plano * TAXA_ADM;
    const taxaAdmPorParcela = taxaAdmTotal / numero_parcelas;

    for (let i = 1; i <= numero_parcelas; i++) {
      const dataVencimento = new Date(data_inicio_pagamento);

      dataVencimento.setMonth(
        new Date(data_inicio_pagamento + "T00:00:00").getMonth() + (i - 1)
      );

      const dataVencimentoFormatada = dataVencimento
        .toISOString()
        .split("T")[0];

      const impostoDaParcela = comissaoBrutaPorParcela * TAXA_IMPOSTO;
      const comissaoLiquidaPorParcela =
        comissaoBrutaPorParcela - impostoDaParcela;

      // A empresa recebe:

      const recebimentoEmpresaParcela =
        valorParcelaCliente - comissaoBrutaPorParcela;

      totalImpostosVendedor += impostoDaParcela;

      detalharParcelas.push({
        parcela: i,
        data_vencimento: dataVencimentoFormatada,
        comissao_bruta_vendedor: parseFloat(comissaoBrutaPorParcela.toFixed(2)),
        impostos_vendedor: parseFloat(impostoDaParcela.toFixed(2)),
        comissao_liquida_vendedor: parseFloat(
          comissaoLiquidaPorParcela.toFixed(2)
        ),
        recebimento_empresa_parcela: parseFloat(
          recebimentoEmpresaParcela.toFixed(2)
        ),
        taxa_adm_empresa: parseFloat(taxaAdmPorParcela.toFixed(2)),
      });
    }

    const valorLiquidoEmpresa = comissaoEmpresa - taxaAdmTotal;
    //Resposta da API
    res.status(200).json({
      resumo: {
        comissao_total_vendedor: parseFloat(comissaoTotal.toFixed(2)),
        total_impostos_vendedor: parseFloat(totalImpostosVendedor.toFixed(2)),
        entrada_vendedor: parseFloat(entrada_vendedor.toFixed(2)),
        valor_bruto_empresa: parseFloat(comissaoEmpresa.toFixed(2)),
        valor_taxa_adm_empresa: parseFloat(taxaAdmTotal.toFixed(2)),
        valor_liquido_empresa: parseFloat(valorLiquidoEmpresa.toFixed(2)),
        valor_parcela_cliente: parseFloat(valorParcelaCliente.toFixed(2)),
      },
      detalhamento_parcelas: detalharParcelas,
    });
  } catch (error) {
    console.error("erro no calculo", error);
    res.status(500).json({ error: "Ocorreu erro interno no servidor" });
  }
};

module.exports = {
  calculateCommission,
};
