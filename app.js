
const comunicados = [
  {
    titulo: "Inadimplência de Taxa Condominial",
    tipo: "Financeiro",
    texto: `Prezado(a) condômino(a),\n\nInformamos que, até a presente data, consta em aberto o pagamento da(s) taxa(s) condominial(is)...\n\nAtenciosamente,\nCarlos Roberto de Araújo\nSíndico – Condomínio Reserva Capim Macio`
  },
  {
    titulo: "Uso Indevido da Piscina",
    tipo: "Área Comum",
    texto: `Prezado(a) condômino(a),\n\nFoi registrada infração ao regulamento da piscina no dia [Data]...\n\nAtenciosamente,\nCarlos Roberto de Araújo\nSíndico – Condomínio Reserva Capim Macio`
  },
  {
    titulo: "Confirmação de Reserva do Salão de Festas",
    tipo: "Área Comum",
    texto: `Prezado(a) condômino(a),\n\nConfirmamos a reserva do Salão de Festas:\n- Unidade: [nº do apartamento]\n- Data do evento: [dia/mês/ano]\n- Horário: [das Xh às Yh]\n- Valor: R$ 100,00 via boleto\n\nAtenciosamente,\nCarlos Roberto de Araújo\nSíndico – Condomínio Reserva Capim Macio`
  },
  {
    titulo: "Atualização Cadastral",
    tipo: "Administrativo",
    texto: `Prezado(a) condômino(a),\n\nSolicitamos a atualização cadastral da unidade [nº] até [data limite].\nEnviar para: reservacapimmacio@gmail.com\n\nAtenciosamente,\nCarlos Roberto de Araújo\nSíndico – Condomínio Reserva Capim Macio`
  },
  {
    titulo: "Manutenção Programada",
    tipo: "Serviços",
    texto: `Prezado(a) condômino(a),\n\nInformamos que será realizada manutenção preventiva nas áreas comuns em [data], das [hora início] às [hora fim].\n\nAtenciosamente,\nCarlos Roberto de Araújo\nSíndico – Condomínio Reserva Capim Macio`
  },
  {
    titulo: "Advertência por Barulho",
    tipo: "Convivência",
    texto: `Prezado(a) condômino(a),\n\nRecebemos reclamação de perturbação por barulho fora do horário permitido (22h às 08h) no dia [data].\nReforçamos a importância do respeito ao horário de silêncio.\n\nAtenciosamente,\nCarlos Roberto de Araújo\nSíndico – Condomínio Reserva Capim Macio`
  },
  {
    titulo: "Entrega de Encomenda na Portaria",
    tipo: "Administrativo",
    texto: `Prezado(a) condômino(a),\n\nSua encomenda foi recebida na portaria e encontra-se disponível para retirada:\n- Unidade: [nº do apartamento]\n- Data: [dd/mm/aaaa]\n\nSolicitamos retirada em até 24 horas.\n\nAtenciosamente,\nCarlos Roberto de Araújo\nSíndico – Condomínio Reserva Capim Macio`
  },
  {
    titulo: "Notificação por Obra sem Autorização",
    tipo: "Infraestrutura",
    texto: `Prezado(a) condômino(a),\n\nFoi identificada movimentação de obra na unidade [nº] sem comunicação à administração.\nSolicitamos regularização e envio de ART/RRT em até 3 dias úteis.\n\nAtenciosamente,\nCarlos Roberto de Araújo\nSíndico – Condomínio Reserva Capim Macio`
  }
];

function renderComunicados() {
  const painel = document.getElementById("painel");

  const input = document.createElement("input");
  input.placeholder = "Buscar comunicado...";
  input.style.padding = "6px";
  input.style.marginBottom = "10px";
  input.style.width = "100%";

  const select = document.createElement("select");
  select.style.marginBottom = "10px";
  select.style.padding = "6px";
  select.innerHTML = "<option value=''>Todos os tipos</option>";
  [...new Set(comunicados.map(c => c.tipo))].forEach(tipo => {
    const opt = document.createElement("option");
    opt.value = tipo;
    opt.textContent = tipo;
    select.appendChild(opt);
  });

  painel.appendChild(input);
  painel.appendChild(select);

  const results = document.createElement("div");
  painel.appendChild(results);

  function render() {
    results.innerHTML = "";
    const termo = input.value.toLowerCase();
    const tipo = select.value;

    comunicados.filter(c =>
      c.titulo.toLowerCase().includes(termo) &&
      (tipo ? c.tipo === tipo : true)
    ).forEach(c => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${c.titulo}</h3>
        <p><small>Tipo: ${c.tipo}</small></p>
        <textarea readonly>${c.texto}</textarea><br/>
        <button onclick="navigator.clipboard.writeText(\`${c.texto}\`)">Copiar comunicado</button>
      `;
      results.appendChild(div);
    });
  }

  input.oninput = render;
  select.onchange = render;
  render();
}

document.addEventListener("DOMContentLoaded", renderComunicados);
