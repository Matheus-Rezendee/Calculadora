document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const fmt = (v) => Number(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});

  /* ------------------------------ PONTO DE EQUILÍBRIO ------------------------------ */
  $('calc_pe').addEventListener('click', () => {
    const fixed = parseFloat($('pe_fixed').value);
    const price = parseFloat($('pe_price').value);
    const variable = parseFloat($('pe_variable').value);
    const out = $('pe_result');

    if (price <= variable) return out.textContent = "Erro: preço deve ser maior que o custo variável.";
    if (fixed <= 0) return out.textContent = "Erro: custos fixos devem ser maiores que 0.";

    const units = fixed / (price - variable);
    const revenue = units * price;

    out.innerHTML = `
      Ponto de Equilíbrio: <strong>${fmt(units)} unidades</strong><br>
      Receita no PE: <strong>R$ ${fmt(revenue)}</strong>
    `;
  });

  $('reset_pe').addEventListener('click', () => {
    $('pe_fixed').value = "";
    $('pe_price').value = "";
    $('pe_variable').value = "";
    $('pe_result').innerHTML = "";
  });

  /* ------------------------------ LUCRATIVIDADE ------------------------------ */
  $('calc_lucratividade').addEventListener('click', () => {
    const revenue = parseFloat($('lucre_revenue').value);
    const profit = parseFloat($('lucre_profit').value);
    const out = $('lucre_result');

    if (revenue <= 0) return out.textContent = "Erro: receita deve ser maior que 0.";

    const margin = (profit / revenue) * 100;

    out.innerHTML = `
      Lucratividade: <strong>${margin.toFixed(2)}%</strong>
    `;
  });

  $('reset_lucr').addEventListener('click', () => {
    $('lucre_revenue').value = "";
    $('lucre_profit').value = "";
    $('lucre_result').innerHTML = "";
  });

  /* ------------------------------ RENTABILIDADE (ROI) ------------------------------ */
  $('calc_rentabilidade').addEventListener('click', () => {
    const profit = parseFloat($('rent_profit').value);
    const invest = parseFloat($('rent_invest').value);
    const out = $('rent_result');

    if (invest <= 0) return out.textContent = "Erro: investimento deve ser maior que 0.";

    const roi = (profit / invest) * 100;

    out.innerHTML = `
      Rentabilidade (ROI): <strong>${roi.toFixed(2)}%</strong>
    `;
  });

  $('reset_rent').addEventListener('click', () => {
    $('rent_profit').value = "";
    $('rent_invest').value = "";
    $('rent_result').innerHTML = "";
  });

  /* ------------------------------ MARKUP ------------------------------ */
  $('calc_markup').addEventListener('click', () => {
    const cost = parseFloat($('mk_cost').value);
    const price = parseFloat($('mk_price').value);
    const mkPct = parseFloat($('mk_percent').value);
    const out = $('mk_result');

    if (!isNaN(cost) && !isNaN(price) && cost > 0) {
      const mk = ((price - cost) / cost) * 100;
      return out.innerHTML = `Markup: <strong>${mk.toFixed(2)}%</strong>`;
    }

    if (!isNaN(cost) && !isNaN(mkPct) && cost > 0) {
      const newPrice = cost * (1 + mkPct / 100);
      return out.innerHTML = `Preço sugerido: <strong>R$ ${fmt(newPrice)}</strong>`;
    }

    out.textContent = "Erro: informe Custo + Preço ou Custo + Markup.";
  });

  $('reset_mk').addEventListener('click', () => {
    $('mk_cost').value = "";
    $('mk_price').value = "";
    $('mk_percent').value = "";
    $('mk_result').innerHTML = "";
  });
});
