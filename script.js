document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const fmt = (v) => Number(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});

  /* ---------------- PONTO DE EQUILÍBRIO ---------------- */
  $('calc_pe').addEventListener('click', () => {
    const fixed = parseFloat($('pe_fixed').value);
    const price = parseFloat($('pe_price').value);
    const variable = parseFloat($('pe_variable').value);
    const out = $('pe_result');

    if (price <= variable) return out.textContent = "Erro: o preço deve ser maior que o custo variável.";

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


  /* ---------------- LUCRATIVIDADE ---------------- */
  $('calc_lucratividade').addEventListener('click', () => {
    const revenue = parseFloat($('lucre_revenue').value);
    const profit = parseFloat($('lucre_profit').value);
    const out = $('lucre_result');

    if (revenue <= 0) return out.textContent = "Erro: receita inválida.";

    const margin = (profit / revenue) * 100;
    out.innerHTML = `Lucratividade: <strong>${margin.toFixed(2)}%</strong>`;
  });

  $('reset_lucr').addEventListener('click', () => {
    $('lucre_revenue').value = "";
    $('lucre_profit').value = "";
    $('lucre_result').innerHTML = "";
  });


  /* ---------------- RENTABILIDADE ---------------- */
  $('calc_rentabilidade').addEventListener('click', () => {
    const profit = parseFloat($('rent_profit').value);
    const invest = parseFloat($('rent_invest').value);
    const out = $('rent_result');

    if (invest <= 0) return out.textContent = "Erro: investimento inválido.";

    const roi = (profit / invest) * 100;
    out.innerHTML = `Rentabilidade (ROI): <strong>${roi.toFixed(2)}%</strong>`;
  });

  $('reset_rent').addEventListener('click', () => {
    $('rent_profit').value = "";
    $('rent_invest').value = "";
    $('rent_result').innerHTML = "";
  });


  /* ---------------- MARKUP MULTIPLICADOR ---------------- */
  $('calc_mk_mult').addEventListener('click', () => {
    const dv = parseFloat($('mk_mult_dv').value) || 0;
    const cf = parseFloat($('mk_mult_cf').value) || 0;
    const df = parseFloat($('mk_mult_df').value) || 0;
    const ml = parseFloat($('mk_mult_ml').value) || 0;
    const imp = parseFloat($('mk_mult_imp').value) || 0;

    const out = $('mk_mult_result');

    const soma = dv + cf + df + ml + imp;

    if (soma >= 100) return out.textContent = "Erro: soma dos percentuais não pode ser ≥ 100%.";

    const multiplicador = 100 / (100 - soma);

    out.innerHTML = `Markup Multiplicador: <strong>${multiplicador.toFixed(3)}</strong>`;
  });

  $('reset_mk_mult').addEventListener('click', () => {
    $('mk_mult_dv').value = "";
    $('mk_mult_cf').value = "";
    $('mk_mult_df').value = "";
    $('mk_mult_ml').value = "";
    $('mk_mult_imp').value = "";
    $('mk_mult_result').innerHTML = "";
  });


  /* ---------------- MARKUP DIVISOR ---------------- */
  $('calc_mk_div').addEventListener('click', () => {
    const dv = parseFloat($('mk_div_dv').value) || 0;
    const cf = parseFloat($('mk_div_cf').value) || 0;
    const df = parseFloat($('mk_div_df').value) || 0;
    const ml = parseFloat($('mk_div_ml').value) || 0;
    const imp = parseFloat($('mk_div_imp').value) || 0;

    const out = $('mk_div_result');

    const soma = dv + cf + df + ml + imp;
    const divisor = 1 - (soma / 100);

    if (divisor <= 0) return out.textContent = "Erro: divisor inválido (resultado ≤ 0).";

    out.innerHTML = `Markup Divisor: <strong>${divisor.toFixed(3)}</strong>`;
  });

  $('reset_mk_div').addEventListener('click', () => {
    $('mk_div_dv').value = "";
    $('mk_div_cf').value = "";
    $('mk_div_df').value = "";
    $('mk_div_ml').value = "";
    $('mk_div_imp').value = "";
    $('mk_div_result').innerHTML = "";
  });

});
