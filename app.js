
const comunicados = [
  {
    titulo: "Inadimplência de Taxa Condominial",
    tipo: "Financeiro",
    texto: "Prezado(a) condômino(a),\n\nInformamos que, até a presente data, consta em aberto o pagamento da(s) taxa(s) condominial(is)...\n\nAtenciosamente,\nAdministração\nCondomínio Reserva Capim Macio"
  },
  {
    titulo: "Uso Indevido da Piscina",
    tipo: "Área Comum",
    texto: "Prezado(a) condômino(a),\n\nFoi registrada infração ao regulamento da piscina no dia [Data]...\n\nAtenciosamente,\nAdministração\nCondomínio Reserva Capim Macio"
  },
  {
    titulo: "Confirmação de Reserva do Salão de Festas",
    tipo: "Área Comum",
    texto: "Prezado(a) condômino(a),\n\nConfirmamos a reserva do Salão de Festas:\n- Unidade: [nº do apartamento]\n- Data do evento: [dia/mês/ano]\n- Horário: [das Xh às Yh]\n- Valor: R$ 100,00 via boleto\n\nAtenciosamente,\nAdministração\nCondomínio Reserva Capim Macio"
  },
  {
    titulo: "Atualização Cadastral",
    tipo: "Administrativo",
    texto: "Prezado(a) condômino(a),\n\nSolicitamos a atualização cadastral da unidade [nº] até [data limite].\nEnviar para: reservacapimmacio@gmail.com\n\nAtenciosamente,\nAdministração\nCondomínio Reserva Capim Macio"
  },
  {
    titulo: "Manutenção Programada",
    tipo: "Serviços",
    texto: "Prezado(a) condômino(a),\n\nInformamos que será realizada manutenção preventiva nas áreas comuns em [data], das [hora início] às [hora fim].\n\nAtenciosamente,\nAdministração\nCondomínio Reserva Capim Macio"
  }
];

const app = document.getElementById("app");

const search = document.createElement("input");
search.placeholder = "Buscar comunicado...";
search.oninput = render;

const select = document.createElement("select");
const optionAll = document.createElement("option");
optionAll.value = "";
optionAll.textContent = "Todos os tipos";
select.appendChild(optionAll);

[...new Set(comunicados.map(c => c.tipo))].forEach(tipo => {
  const opt = document.createElement("option");
  opt.value = tipo;
  opt.textContent = tipo;
  select.appendChild(opt);
});
select.onchange = render;

app.appendChild(search);
app.appendChild(select);

const results = document.createElement("div");
app.appendChild(results);

const voltarBtn = document.createElement("button");
voltarBtn.textContent = "Voltar ao topo";
voltarBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
app.appendChild(voltarBtn);

function render() {
  results.innerHTML = "";
  const termo = search.value.toLowerCase();
  const tipo = select.value;

  comunicados
    .filter(c => c.titulo.toLowerCase().includes(termo) && (tipo ? c.tipo === tipo : true))
    .forEach(c => {
      const card = document.createElement("div");
      card.style.background = "#fff";
      card.style.padding = "16px";
      card.style.margin = "10px 0";
      card.style.borderRadius = "8px";
      card.innerHTML = `
        <h3>${c.titulo}</h3>
        <small>Tipo: ${c.tipo}</small><br/>
        <textarea readonly>${c.texto}</textarea><br/>
        <button onclick="navigator.clipboard.writeText(\`${c.texto}\`)">Copiar comunicado</button>
      `;
      results.appendChild(card);
    });
}

render();
