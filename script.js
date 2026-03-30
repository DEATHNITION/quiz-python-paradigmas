// ============================================================
//  Quiz Python — Paradigmas de Linguagens de Programação
//  Desenvolvido por Gabriel Fernandes de Lima (Deathnition)
//  Estácio · ADS · 2026
//  github.com/DEATHNITION/quiz-python-paradigmas
// ============================================================

// ── cursor glow ──
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ── alt-btn radial on hover ──
document.addEventListener('mousemove', e => {
  const el = e.target.closest('.alt-btn');
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
  el.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
});

let _codigoVisivel = false;

const QUESTOES = [
  { numero:1, topico:"Características do Python", enunciado:"Qual das seguintes NÃO é uma característica da linguagem Python?", code:null, alternativas:{A:"Multiparadigma (suporta vários estilos de programação).",B:"Portável (roda em diferentes sistemas operacionais sem alteração).",C:"Tipagem ESTÁTICA — o tipo da variável deve ser declarado antes do uso.",D:"Extensível (permite criar e adicionar novos módulos)."}, correta:"C", explicacao:"Python tem tipagem DINÂMICA, não estática. Você não declara o tipo — ele é inferido automaticamente na execução. Exemplo: x = 10 → Python já sabe que x é inteiro. As opções A, B e D são características VERDADEIRAS do Python.", dica:"Tema 3, pp. 4-5 e 15 — Características da linguagem Python" },
  { numero:2, topico:"Paradigmas de Programação", enunciado:"O paradigma que especifica PASSO A PASSO como resolver um problema, sendo dependente da arquitetura do computador, é chamado de:", code:null, alternativas:{A:"Paradigma Declarativo.",B:"Paradigma Funcional.",C:"Paradigma Lógico.",D:"Paradigma Imperativo."}, correta:"D", explicacao:"O paradigma IMPERATIVO foca em COMO fazer, descrevendo comandos passo a passo. É dependente da arquitetura do computador e inclui os sub-paradigmas: estruturado, orientado a objetos e concorrente.", dica:"Tema 2, pp. 28-30 — Paradigma imperativo" },
  { numero:3, topico:"Indentação e Blocos", enunciado:"Se a condição 'if idade < 5' for FALSA, o segundo print será executado?", code:"idade = 7\nif idade < 5:\n    print('A criança deve ser vacinada.')\nprint('Cuide da saúde sempre.')", alternativas:{A:"Não, pois está dentro do bloco if.",B:"Não, o programa dará erro de indentação.",C:"Sim, pois está FORA do bloco if (mesmo nível do if).",D:"Não, condição falsa paralisa o programa."}, correta:"C", explicacao:"Em Python, a INDENTAÇÃO define os blocos. O segundo print está no mesmo nível do if — portanto está fora do bloco. Logo, ele roda SEMPRE, independente da condição.", dica:"Tema 4, pp. 3-5 | Tema 3, p. 9 — Indentação e blocos" },
  { numero:4, topico:"Compilador x Interpretador", enunciado:"Sobre o COMPILADOR, analise e identifique quais afirmativas estão corretas:", code:"I.   Gera código-objeto otimizado (execução rápida).\nII.  Traduz código-fonte para Assembly, depois máquina.\nIII. É mais LENTO na execução final que o interpretador.\nIV.  O processo de depuração de erros é mais demorado.", alternativas:{A:"I, II e III.",B:"I, II e IV.",C:"II, III e IV.",D:"I, III e IV."}, correta:"B", explicacao:"I. CORRETA — código otimizado, execução rápida. II. CORRETA — fluxo: fonte → Assembly → código-objeto. III. ERRADA — compilado é MAIS RÁPIDO que interpretado! IV. CORRETA — depuração é mais lenta no compilador.", dica:"Tema 2, pp. 35-38 e 41 — Compilador x Interpretador" },
  { numero:5, topico:"Entrada de Dados com input()", enunciado:"Para ler a idade do usuário e calcular idade + 10 anos, qual código está CORRETO?", code:null, demo_q5:true, alternativas:{A:"idade = input('Digite sua idade: ')",B:"idade = int(input('Digite sua idade: '))",C:"idade = float(input('Digite sua idade: '))",D:"idade = str(input('Digite sua idade: '))"}, correta:"B", explicacao:"input() SEMPRE retorna string, mesmo que o usuário digite um número. Para realizar operações matemáticas, é preciso converter com int(). A e D mantêm como texto — não dá para somar. C (float) funcionaria, mas int() é o correto para idade inteira.", dica:"Tema 3, pp. 45-48 — Entrada de dados com input() e conversão de tipos" },
  { numero:6, topico:"Níveis de Abstração das Linguagens", enunciado:"Sobre a evolução das linguagens e o conceito de abstração, analise a comparação entre Python, Assembly e linguagem de máquina. Qual afirmação está correta?", code:null, alternativas:{A:"A linguagem Assembly é a nativa do computador, escrita em binário.",B:"Um comando em Python equivale exatamente a um comando em Assembly.",C:"A linguagem de máquina é de alto nível, próxima à linguagem humana.",D:"Um programa em Python (alto nível) tem menos linhas que o equivalente em Assembly, aumentando a abstração."}, correta:"D", explicacao:"Python é uma linguagem de alto nível: um único comando pode representar dezenas de instruções em Assembly. Isso é abstração — o programador escreve menos e diz mais. A linguagem de máquina (binário) é a nativa do computador, não o Assembly.", dica:"Tema 2, pp. 5-6 — Classificação das linguagens e papel da abstração" },
  { numero:7, topico:"Alto Nível vs Baixo Nível", enunciado:"Sobre a classificação das linguagens por nível, qual das alternativas define corretamente uma linguagem de alto nível?", code:null, alternativas:{A:"É próxima da linguagem de máquina, usando binário.",B:"Não necessita de conversão, pois é a nativa do processador.",C:"É abstrata, não exige que o programador conheça detalhes do hardware, e um comando equivale a várias instruções de máquina.",D:"É utilizada exclusivamente para programação de sistemas operacionais, como o Linux."}, correta:"C", explicacao:"Linguagem de alto nível se caracteriza pela abstração: o programador não precisa conhecer registradores, endereços de memória ou arquitetura do processador. Um único comando em Python gera diversas instruções de máquina por baixo dos panos.", dica:"Tema 2, pp. 10-11 — Linguagens de alto e baixo nível" },
  { numero:8, topico:"Escopo e Tempo de Vida das Variáveis", enunciado:"Considere o código abaixo e assinale a alternativa correta sobre o escopo das variáveis:", code:"def func():\n    x = 1\n    print(x)\n\nx = 10\nfunc()\nprint(x)", alternativas:{A:"O programa imprimirá 10 e 10, pois a variável é global.",B:"O programa imprimirá 1 e 10, pois a variável x dentro da função é local e a de fora é global.",C:"O programa dará erro, pois não se pode ter duas variáveis com o mesmo nome.",D:"O programa imprimirá 1 e 1, pois a variável local altera a global."}, correta:"B", explicacao:"Em Python, variáveis criadas dentro de uma função são locais — existem apenas dentro dela. O x = 1 dentro de func() é completamente independente do x = 10 de fora. A função imprime 1 (seu x local) e depois o print externo imprime 10 (o x global).", dica:"Tema 3, pp. 19-21 — Escopo local e global de variáveis" },
  { numero:9, topico:"Estruturas de Repetição for e while", enunciado:"Analise as duas estruturas de repetição abaixo e assinale a alternativa correta:", code:"# Código 1\nfor i in range(3):\n    print(i)\n\n# Código 2\ni = 0\nwhile i < 3:\n    print(i)\n    i += 1", alternativas:{A:"O Código 1 produz (0, 1, 2) e o Código 2 produz (1, 2, 3).",B:"O Código 1 imprime de 0 a 2, e o Código 2 tem o mesmo resultado, mas depende de uma variável de controle explícita.",C:"O laço for não pode ser usado com a função range().",D:"O laço while infinito é criado com a condição while False:."}, correta:"B", explicacao:"Ambos os códigos imprimem 0, 1, 2 — mas de formas diferentes. O for com range(3) gerencia o contador automaticamente. O while exige que o programador declare i = 0, escreva a condição e incremente manualmente com i += 1.", dica:"Tema 4, pp. 8-9 e 13-14 — for com range() e while com variável de controle" },
  { numero:10, topico:"Importação de Módulos", enunciado:"Sobre a importação de módulos em Python, qual das alternativas está correta?", code:null, alternativas:{A:"Para usar a função sqrt, é necessário digitar import math e depois chamar math.sqrt().",B:"Todas as funções da biblioteca padrão são carregadas na memória ao iniciar o programa, independente do import.",C:"O módulo math permite operações com números complexos sem a necessidade de outro módulo.",D:"Após o comando import math, a função sqrt pode ser chamada diretamente como sqrt(9)."}, correta:"A", explicacao:"Em Python, módulos precisam ser importados explicitamente. Após import math, as funções são acessadas com o prefixo do módulo: math.sqrt(). Sem o prefixo (só sqrt()), o Python não encontra a função. A biblioteca padrão existe, mas só é carregada quando você a importa.", dica:"Tema 4, pp. 47-48 — Importação de módulos e biblioteca padrão" }
];

let estado = { nome:"", pronome:null, tratamento:"", atual:0, acertos:0, registro:[], inicio:0, timerInterval:null, tentativa:1 };

// INTRO
document.getElementById('input-nome').addEventListener('input', verificarBotaoIniciar);
function selectPronome(btn) {
  document.querySelectorAll('.pronome-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  estado.pronome = btn.dataset.pronome;
  verificarBotaoIniciar();
}
function verificarBotaoIniciar() {
  const temNome    = document.getElementById('input-nome').value.trim().length > 0;
  const temPronome = estado.pronome !== null;
  document.getElementById('btn-iniciar').disabled = !(temNome && temPronome);
}

function iniciarQuiz() {
  const nomeVal = document.getElementById('input-nome').value.trim();
  estado.nome = nomeVal === "" ? "Visitante" : nomeVal;
  const p = estado.pronome;
  estado.tratamento = p ? p + " " + estado.nome : estado.nome;
  estado.atual = 0; estado.acertos = 0; estado.registro = [];
  mostrarTela('screen-questao');
  carregarQuestao();
}

// QUESTÃO
function carregarQuestao() {
  const q = QUESTOES[estado.atual];
  const total = QUESTOES.length;
  const pct = Math.round((estado.atual / total) * 100);

  document.getElementById('prog-label').textContent = `Pergunta ${estado.atual + 1} de ${total}`;
  document.getElementById('prog-pct').textContent = pct + '%';
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('placar-chip').textContent = `⚡ ${estado.acertos} acerto(s)`;
  document.getElementById('q-num-n').textContent = String(q.numero).padStart(2,'0');
  document.getElementById('q-label-topico').textContent = q.topico;
  document.getElementById('q-text').textContent = q.enunciado;

  const codeEl = document.getElementById('q-code');
  if (q.code) { codeEl.textContent = q.code; codeEl.style.display = 'block'; }
  else { codeEl.style.display = 'none'; }

  const demoPost = document.getElementById('q-demo-post');
  demoPost.style.display = 'none'; demoPost.innerHTML = '';

  const demoPre = document.getElementById('q-demo-pre');
  if (q.demo_q5) {
    demoPre.style.display = 'block';
    demoPre.innerHTML = `<div style="background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:18px 22px;margin-bottom:20px;"><div style="font-family:var(--ff-mono);font-size:9px;color:var(--text3);margin-bottom:12px;letter-spacing:.2em;text-transform:uppercase;">// qual linha está correta para fazer isso?</div><div style="font-family:var(--ff-mono);font-size:13px;line-height:2;color:#94a9be;"><span style="color:#7dd3fc">idade</span> = <span style="color:#f9e2af">___?___</span>&nbsp;&nbsp;<span style="color:var(--text3)"># ← qual das alternativas?</span><br><span style="color:#a6e3a1">print</span>(<span style="color:#f9e2af">"Daqui a 10 anos você terá:"</span>, idade + <span style="color:var(--blue)">10</span>)</div></div>`;
  } else {
    demoPre.style.display = 'none'; demoPre.innerHTML = '';
  }

  const altsEl = document.getElementById('q-alts');
  altsEl.innerHTML = '';
  for (const letra of ['A','B','C','D']) {
    const btn = document.createElement('button');
    btn.className = 'alt-btn';
    btn.innerHTML = `<span class="alt-letter">${letra}</span><span>${q.alternativas[letra]}</span>`;
    btn.onclick = () => responder(letra, btn);
    altsEl.appendChild(btn);
  }

  const fb = document.getElementById('feedback-box');
  fb.className = 'feedback-box';
  document.getElementById('btn-proxima').style.display = 'none';

  estado.inicio = Date.now();
  iniciarTimer();
}

function iniciarTimer() {
  clearInterval(estado.timerInterval);
  document.getElementById('timer-display').textContent = '00s';
  estado.timerInterval = setInterval(() => {
    const seg = Math.floor((Date.now() - estado.inicio) / 1000);
    document.getElementById('timer-display').textContent = String(seg).padStart(2,'0') + 's';
  }, 500);
}

function responder(letra, btnClicado) {
  clearInterval(estado.timerInterval);
  const q = QUESTOES[estado.atual];
  const tempo = (Date.now() - estado.inicio) / 1000;
  const acertou = letra === q.correta;
  if (acertou) estado.acertos++;

  estado.registro.push({ numero: q.numero, topico: q.topico, dada: letra, correta: q.correta, tempo });

  document.querySelectorAll('.alt-btn').forEach(b => {
    b.disabled = true;
    const l = b.querySelector('.alt-letter').textContent;
    if (l === q.correta) b.classList.add('correct');
    if (l === letra && !acertou) b.classList.add('wrong');
  });

  const fb = document.getElementById('feedback-box');
  const tempoStr = tempo.toFixed(1) + 's';
  if (acertou) {
    fb.className = 'feedback-box show acertou';
    document.getElementById('feedback-title').textContent = `✓ Correto! Muito bem, ${estado.tratamento}! (${tempoStr})`;
  } else {
    fb.className = 'feedback-box show errou';
    document.getElementById('feedback-title').textContent = `✗ Errou! A correta era a alternativa ${q.correta}. (${tempoStr})`;
  }
  document.getElementById('feedback-text').textContent = q.explicacao;
  document.getElementById('feedback-dica').textContent = acertou ? '' : '📚 ' + q.dica;

  const demoPost = document.getElementById('q-demo-post');
  if (q.demo_q5) {
    demoPost.style.display = 'block';
    demoPost.innerHTML = `<div style="margin-top:20px;padding:22px 24px;background:rgba(0,255,136,.04);border:1px solid rgba(0,255,136,.2);border-radius:12px;animation:slideUp .4s var(--ease) both;"><div style="font-family:var(--ff-mono);font-size:9px;color:var(--correct);letter-spacing:.2em;text-transform:uppercase;margin-bottom:14px;">// experimente agora — int(input()) na prática</div><div style="font-family:var(--ff-mono);font-size:13px;color:#94a9be;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:14px 18px;margin-bottom:14px;line-height:2;"><span style="color:#7dd3fc">idade</span> = <span style="color:#a6e3a1">int</span>(<span style="color:#a6e3a1">input</span>(<span style="color:#f9e2af">"Digite sua idade: "</span>))<br><span style="color:#a6e3a1">print</span>(<span style="color:#f9e2af">"Daqui a 10 anos:"</span>, idade + <span style="color:var(--blue)">10</span>)</div><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;"><input id="demo-idade-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" placeholder="Ex: 20" style="flex:1;min-width:140px;max-width:180px;background:var(--bg);border:1px solid var(--border);border-radius:9px;padding:12px 16px;color:var(--text);font-family:var(--ff-mono);font-size:14px;outline:none;transition:border-color .2s;" oninput="rodarDemoQ5(this.value)" onkeydown="filtrarApenasNumeros(event)" onpaste="filtrarPaste(event)" onfocus="this.style.borderColor='rgba(0,255,136,.4)'" onblur="this.style.borderColor='var(--border)'"><div id="demo-idade-resultado" style="font-family:var(--ff-mono);font-size:14px;color:var(--text3);min-width:200px;">aguardando entrada...</div></div><div id="demo-idade-erro" style="display:none;margin-top:8px;font-family:var(--ff-mono);font-size:11px;color:var(--warn)">⚠ Apenas dígitos (0–120)</div></div>`;
  } else {
    demoPost.style.display = 'none'; demoPost.innerHTML = '';
  }

  const btnProx = document.getElementById('btn-proxima');
  btnProx.style.display = 'flex';
  btnProx.textContent = estado.atual < QUESTOES.length - 1 ? 'Próxima →' : 'Ver resultado →';
}

function proximaQuestao() {
  estado.atual++;
  if (estado.atual < QUESTOES.length) {
    carregarQuestao();
    // Scroll para o topo do card da questão, com offset para a topbar não cobrir
    setTimeout(() => {
      const anchor = document.getElementById('questao-anchor');
      if (anchor) {
        const y = anchor.getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 40);
  } else {
    mostrarResultado();
  }
}

function filtrarApenasNumeros(e) {
  // Permite: backspace, delete, tab, arrows, home, end
  const teclasFuncionais = [8, 9, 35, 36, 37, 38, 39, 40, 46];
  if (teclasFuncionais.includes(e.keyCode)) return;
  // Permite Ctrl/Cmd + A, C, V, X
  if ((e.ctrlKey || e.metaKey) && [65,67,86,88].includes(e.keyCode)) return;
  // Bloqueia qualquer coisa que não seja dígito 0-9
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
    const errEl = document.getElementById('demo-idade-erro');
    if (errEl) {
      errEl.style.display = 'block';
      clearTimeout(errEl._hide);
      errEl._hide = setTimeout(() => { errEl.style.display = 'none'; }, 1800);
    }
  }
}
function filtrarPaste(e) {
  const txt = (e.clipboardData || window.clipboardData).getData('text');
  if (!/^\d+$/.test(txt)) {
    e.preventDefault();
    const errEl = document.getElementById('demo-idade-erro');
    if (errEl) { errEl.style.display = 'block'; setTimeout(() => { errEl.style.display = 'none'; }, 1800); }
  }
}
function rodarDemoQ5(valor) {
  const res = document.getElementById('demo-idade-resultado');
  const erro = document.getElementById('demo-idade-erro');
  if (!res) return;
  const v = valor.trim();
  if (v === '') { res.style.color = 'var(--text3)'; res.textContent = 'aguardando entrada...'; erro.style.display = 'none'; return; }
  const num = parseInt(v, 10);
  if (isNaN(num) || v.includes('.') || num < 0 || num > 120) {
    res.style.color = 'var(--wrong)'; res.textContent = '❌ ValueError!';
    erro.style.display = 'block'; erro.textContent = `int("${v}") → não é um número inteiro válido!`;
  } else {
    res.style.color = 'var(--correct)'; res.textContent = `✓ Daqui a 10 anos: ${num + 10} anos!`;
    erro.style.display = 'none';
  }
}

// RESULTADO
const REACOES = [
  { min:10, text:"PERFEITO! Você zerou o quiz!",         cor:"var(--correct)" },
  { min:8,  text:"QUASE PERFEITO! Só uns errinhos...",    cor:"var(--correct)" },
  { min:6,  text:"NA MÉDIA! Continue assim!",             cor:"var(--warn)" },
  { min:4,  text:"ABAIXO DA MÉDIA. Precisa estudar mais.",cor:"var(--warn)" },
  { min:1,  text:"FOI MAL... mas não desista!",           cor:"var(--wrong)"   },
  { min:0,  text:"ZEROU PRA BAIXO! Mas não desista!",     cor:"var(--wrong)"   },
];

function mostrarResultado() {
  mostrarTela('screen-resultado');
  const acertos = estado.acertos;
  const total   = QUESTOES.length;
  const pct     = Math.round((acertos / total) * 100);

  // Determina cor baseada na pontuação
  let corVar, corRGB, corNome;
  if (pct >= 80) {
    corVar = 'var(--correct)'; corRGB = '122,170,125'; corNome = 'green';
  } else if (pct >= 50) {
    corVar = 'var(--warn)'; corRGB = '201,168,92'; corNome = 'amber';
  } else {
    corVar = 'var(--wrong)'; corRGB = '192,96,85'; corNome = 'red';
  }

  document.getElementById('res-num').textContent = acertos;
  // Colore o número dentro do anel com a cor certa
  document.getElementById('res-num').style.color = corVar;
  document.getElementById('res-num').style.filter = `drop-shadow(0 0 20px rgba(${corRGB},.5))`;

  const r = REACOES.find(x => acertos >= x.min);
  const reacEl = document.getElementById('res-reaction');
  reacEl.textContent = r.text; reacEl.style.color = r.cor;
  document.getElementById('res-pct').textContent = `Aproveitamento: ${pct}%`;

  // Ring: cor + brilho coerentes
  const circ = 2 * Math.PI * 82;
  const offset = circ * (1 - acertos / total);
  const ring = document.getElementById('ring-fill');
  ring.style.strokeDasharray = circ;
  ring.style.strokeDashoffset = circ;
  ring.style.stroke = corVar;
  ring.style.filter = `drop-shadow(0 0 12px rgba(${corRGB},.7))`;

  // Pulso do halo atrás do ring também muda de cor
  const wrap = document.querySelector('.score-ring-wrap');
  if (wrap) {
    wrap.style.setProperty('--ring-glow', `rgba(${corRGB},.06)`);
    // Sobrescreve o before com a cor dinâmica via style tag inline
    const old = document.getElementById('ring-glow-style');
    if (old) old.remove();
    const st = document.createElement('style');
    st.id = 'ring-glow-style';
    st.textContent = `.score-ring-wrap::before { background: radial-gradient(circle, rgba(${corRGB},.06), transparent 70%) !important; }`;
    document.head.appendChild(st);
    // Também atualiza a linha decorativa no result-hero
    const heroStyle = document.getElementById('hero-line-style');
    if (heroStyle) heroStyle.remove();
    const hs = document.createElement('style');
    hs.id = 'hero-line-style';
    hs.textContent = `.result-hero::before { background: linear-gradient(90deg, transparent, rgba(${corRGB},.25), transparent) !important; }`;
    document.head.appendChild(hs);
  }

  requestAnimationFrame(() => {
    setTimeout(() => { ring.style.strokeDashoffset = offset; }, 100);
  });

  // histórico
  const lista = document.getElementById('historico-lista');
  lista.innerHTML = '';
  estado.registro.forEach((item, i) => {
    const certo = item.dada === item.correta;
    const row = document.createElement('div');
    row.className = 'hist-row ' + (certo ? 'certo' : 'errou');
    row.style.animationDelay = (i * 0.06) + 's';
    let det = certo
      ? `<strong>${item.dada}</strong>`
      : `<span style="color:var(--wrong)">${item.dada}</span> → <strong style="color:var(--correct)">${item.correta}</strong>`;
    row.innerHTML = `<span class="hist-q">Q${item.numero}</span><span style="font-size:12px;color:var(--text2)">${item.topico}</span><span class="hist-status">${certo?'✓ Certo':'✗ Errou'}</span><span class="hist-detail">${det}</span><span class="hist-time">${item.tempo.toFixed(1)}s</span>`;
    lista.appendChild(row);
  });

  const erros = estado.registro.filter(i => i.dada !== i.correta);
  const cardDicas = document.getElementById('card-dicas');
  if (erros.length > 0) {
    cardDicas.style.display = 'block';
    const dl = document.getElementById('dicas-lista');
    dl.innerHTML = '';
    erros.forEach(item => {
      const q = QUESTOES.find(x => x.numero === item.numero);
      const d = document.createElement('div');
      d.className = 'dica-item';
      d.innerHTML = `<span class="dica-q">Q${item.numero}</span><span>${q.dica}</span>`;
      dl.appendChild(d);
    });
  } else { cardDicas.style.display = 'none'; }

  // Mostra gabarito
  const gabSec = document.getElementById('section-gabarito');
  if (gabSec) gabSec.classList.add('visible');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // ── Google Sheets integration ──────────────────────────────────────
  const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzbZQfdA32AFD9UBFWydTpP__Be2aWYdsLMO4To2Wvd8VK1M6w988twZfBk9i80xwOu/exec';

  const payload = {
    schema_version: '2.1',
    timestamp_client: new Date().toISOString(),
    identificacao: {
      nome:      estado.nome,
      pronome:   estado.pronome ?? 'Sem pronome',
      tentativa: estado.tentativa
    },
    resultado: {
      pontuacao:  estado.acertos,
      total:      QUESTOES.length,
      percentual: Math.round((estado.acertos / QUESTOES.length) * 100)
    },
    respostas: estado.registro.map(i => ({
      questao: i.numero,
      topico:  i.topico,
      dada:    i.dada,
      correta: i.correta,
      acertou: i.dada === i.correta,
      tempo_s: parseFloat(i.tempo.toFixed(2))
    })),
    tempos: {
      total_s: parseFloat(estado.registro.reduce((a,b) => a + b.tempo, 0).toFixed(2)),
      media_s: parseFloat((estado.registro.reduce((a,b) => a + b.tempo, 0) / QUESTOES.length).toFixed(2))
    }
  };

(async function enviarComRetry(maxTentativas = 3, delayMs = 800) {

  const form = new FormData();
  form.append("data", JSON.stringify(payload));

  for (let i = 0; i < maxTentativas; i++) {

    try {

      const res = await fetch(SHEETS_URL, {
        method: "POST",
        body: form
      });

      if (res.ok) return;

      throw new Error(`HTTP ${res.status}`);

    }

    catch (_) {

      if (i < maxTentativas - 1) {
        await new Promise(r => setTimeout(r, delayMs * Math.pow(2, i)));
      }

    }

  }

})();
  // ────────────────────────────────────────────────────────────────────
}

// ══════════════════════════════════════════
//  TERMINAL EMULATOR — quiz_gabriel.py
// ══════════════════════════════════════════
let _termVisivel = false;

const _icoTermSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`;

function toggleTerminal() {
  const sec = document.getElementById('section-terminal');
  const btn = document.getElementById('btn-toggle-terminal');
  _termVisivel = !_termVisivel;
  if (_termVisivel) {
    sec.classList.add('visible');
    btn.innerHTML = _icoTermSVG + ' FECHAR TERMINAL';
    sec.scrollIntoView({ behavior:'smooth', block:'start' });
    _termReset();
    _termIniciar();
  } else {
    sec.classList.remove('visible');
    btn.innerHTML = _icoTermSVG + ' VER EM TERMINAL';
    _termReset();
  }
}

// ── ANSI helpers ──
const _A = {
  R:'\x1b[0m', B:'\x1b[1m',
  AZ:'\x1b[34m', AM:'\x1b[33m', CI:'\x1b[36m',
  VD:'\x1b[32m', VR:'\x1b[31m', MG:'\x1b[35m',
};
function _ln(c,n,cor){ return (cor||_A.AZ)+(c||'=').repeat(n||60)+_A.R; }

function _ansi(txt) {
  const m={'0':'ac-reset','1':'ac-bold','31':'ac-red','32':'ac-green',
    '33':'ac-yellow','34':'ac-blue','35':'ac-magenta','36':'ac-cyan','37':'ac-white'};
  let o='',s=[];
  const p=txt.split(/\x1b\[([0-9;]*)m/);
  for(let i=0;i<p.length;i++){
    if(i%2===0){o+=p[i].replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
    else{
      const c=p[i];
      if(c===''||c==='0'){o+='</span>'.repeat(s.length);s=[];}
      else{const cl=m[c];if(cl){o+=`<span class="${cl}">`;s.push(cl);}}
    }
  }
  return o+'</span>'.repeat(s.length);
}

// ── State ──
let _tQ=[],_tBusy=false,_tCb=null,_tIds=[];
let _tOut,_tIn,_tPr;

function _termReset(){
  _tIds.forEach(clearTimeout); _tIds=[];
  _tQ=[]; _tBusy=false; _tCb=null;
  _tOut=document.getElementById('term-output');
  _tIn =document.getElementById('term-input');
  _tPr =document.getElementById('term-prompt');
  if(_tOut) _tOut.innerHTML='';
  if(_tIn){_tIn.disabled=true;_tIn.value='';_tIn.placeholder='inicializando...';}
  if(_tPr) _tPr.textContent='$';
}

function _tid(fn,ms){ const id=setTimeout(fn,ms??0);_tIds.push(id);return id; }

// ── Queue primitives ──
function _tPrint(txt,d){  _tQ.push({k:'line',txt,d:d??0}); if(!_tBusy)_tRun(); }
function _tType(txt,cd,d){ _tQ.push({k:'type',txt,cd:cd??16,d:d??0}); if(!_tBusy)_tRun(); }
function _tWait(ms){       _tQ.push({k:'wait',d:ms}); if(!_tBusy)_tRun(); }
function _tDots(pre,cor,ms){ _tQ.push({k:'dots',pre,cor,ms:ms??850}); if(!_tBusy)_tRun(); }
function _tCall(fn){       _tQ.push({k:'call',fn}); if(!_tBusy)_tRun(); }

function _tRun(){
  if(!_tQ.length){_tBusy=false;return;}
  _tBusy=true;
  const it=_tQ.shift();

  if(it.k==='wait'){
    _tid(()=>_tRun(), it.d);
    return;
  }
  if(it.k==='call'){
    _tid(()=>{ it.fn(); _tRun(); }, 60);
    return;
  }
  if(it.k==='dots'){
    const ln=document.createElement('div');
    ln.innerHTML=_ansi((it.cor||_A.CI)+it.pre+_A.R);
    _tOut.appendChild(ln); _tOut.scrollTop=_tOut.scrollHeight;
    let d=0; const fr=['.  ','.. ','...','   '];
    const iv=setInterval(()=>{ d++; ln.innerHTML=_ansi((it.cor||_A.CI)+it.pre+fr[d%4]+_A.R); _tOut.scrollTop=_tOut.scrollHeight; },180);
    _tid(()=>{ clearInterval(iv); ln.innerHTML=_ansi((it.cor||_A.CI)+it.pre+'...'+_A.R); _tRun(); }, it.ms);
    return;
  }
  _tid(()=>{
    if(it.k==='line'){
      const ln=document.createElement('div');
      ln.innerHTML=_ansi(it.txt);
      _tOut.appendChild(ln); _tOut.scrollTop=_tOut.scrollHeight;
      _tRun();
    } else if(it.k==='type'){
      _typewriter(it.txt, it.cd, _tRun);
    }
  }, it.d);
}

// Typewriter letra a letra com variação natural
function _typewriter(raw, cd, done){
  const ln=document.createElement('div');
  _tOut.appendChild(ln); _tOut.scrollTop=_tOut.scrollHeight;

  // Flattens ANSI para lista de {ch, cls}
  const classMap={'0':'ac-reset','1':'ac-bold','31':'ac-red','32':'ac-green',
    '33':'ac-yellow','34':'ac-blue','35':'ac-magenta','36':'ac-cyan','37':'ac-white'};
  const chars=[]; let curCls='ac-reset';
  const parts=raw.split(/(\x1b\[[0-9;]*m)/);
  for(const p of parts){
    if(/^\x1b\[/.test(p)){
      const code=p.replace(/\x1b\[([0-9;]*)m/,'$1');
      curCls=(code===''||code==='0')?'ac-reset':(classMap[code]||curCls);
    } else { for(const ch of p) chars.push({ch,cls:curCls}); }
  }

  const cur=document.createElement('span');
  cur.className='tw-cursor'; ln.appendChild(cur);

  let i=0;
  function tick(){
    if(i>=chars.length){ cur.remove(); _tid(done,50); return; }
    const {ch,cls}=chars[i++];
    const sp=document.createElement('span');
    sp.className=cls; sp.textContent=ch;
    ln.insertBefore(sp,cur);
    _tOut.scrollTop=_tOut.scrollHeight;
    const isPunct='.!?:,—'.includes(ch);
    const isSpace=ch===' ';
    const delay=isSpace?cd*0.35:isPunct?cd*2.8:cd*(0.6+Math.random()*0.8);
    _tid(tick, delay);
  }
  tick();
}

// Aguarda fila esvaziar e pede input
function _tInput(prompt, cb){
  const poll=()=>{
    if(_tBusy||_tQ.length){ _tid(poll,80); return; }
    _tPr.textContent=prompt+' ';
    _tIn.disabled=false; _tIn.value=''; _tIn.placeholder='';
    _tid(()=>_tIn.focus(),30);
    _tCb=cb;
  };
  poll();
}

document.getElementById('term-input').addEventListener('keydown', e=>{
  if(e.key!=='Enter'||!_tCb) return;
  const val=document.getElementById('term-input').value;
  const echo=document.createElement('div');
  echo.innerHTML=`<span class="ac-cyan">${document.getElementById('term-prompt').textContent} </span><span class="ac-reset">${val.replace(/</g,'&lt;')}</span>`;
  document.getElementById('term-output').appendChild(echo);
  document.getElementById('term-output').scrollTop=document.getElementById('term-output').scrollHeight;
  document.getElementById('term-input').disabled=true;
  document.getElementById('term-input').placeholder='processando...';
  document.getElementById('term-prompt').textContent='$';
  const cb=_tCb; _tCb=null;
  _tid(()=>cb(val), 120);
});

// ── QUIZ LOGIC ──
const {R:_R,B:_B,AZ:_AZ,AM:_AM,CI:_CI,VD:_VD,VR:_VR,MG:_MG}=_A;

function _termIniciar(){
  _tWait(180);
  // boot sequence
  _tType(_CI+'  Iniciando Python 3.12.0'+_R,             20, 0);
  _tWait(80);
  _tType(_CI+'  Importando módulos: time, os, sys'+_R,   16, 0);
  _tDots(_CI+'  Compilando quiz_gabriel.py', _CI,       700);
  _tWait(60);
  _tType(_VD+_B+'  [OK] Pronto para execução.'+_R,      18, 0);
  _tWait(260);
  _tPrint('', 0);
  // capa
  _tPrint(_MG+_B+'*'.repeat(60)+_R,                    35);
  _tPrint(_MG+_B+'  TRABALHO ESCOLAR — QUIZ PYTHON'+_R, 25);
  _tPrint(_MG+_B+'*'.repeat(60)+_R,                    25);
  _tType(_B+'  Aluno      : '+_R+'Gabriel Fernandes de Lima', 15, 20);
  _tType(_B+'  Matrícula  : '+_R+'2024 0223 5036',            13, 14);
  _tType(_B+'  Faculdade  : '+_R+'Estácio',                   13, 14);
  _tType(_B+'  Professor  : '+_R+'Paulo Cruz',                13, 14);
  _tType(_B+'  Disciplina : '+_R+'Paradigmas de LP em Python',13, 14);
  _tPrint(_MG+_B+'*'.repeat(60)+_R,                    35);
  _tPrint('',                                          70);
  // personalização
  _tPrint(_ln('-',60,_CI),                             0);
  _tType(_CI+_B+'  Antes de começar, me diga:'+_R,     18, 35);
  _tPrint('',                                          35);
  _tCall(()=>{
    _tInput(_AM+'  Seu nome:'+_R, nome=>{
      const nr=nome.trim()||'Visitante';
      _tPrint('',0);
      _tPrint(_ln('-',60,_CI),25);
      _tType(_CI+_B+'  Pronome de tratamento:'+_R, 18, 25);
      _tType('  '+_B+'[1]'+_R+' Sr.   — masculino',  13, 18);
      _tType('  '+_B+'[2]'+_R+' Sra.  — feminino',   13, 14);
      _tType('  '+_B+'[3]'+_R+' Sre.  — neutro',     13, 14);
      _tType('  '+_B+'[4]'+_R+' Sem pronome',         13, 14);
      _tPrint('', 25);
      _tCall(()=>{
        _tInput(_AM+'  Escolha (1-4):'+_R, op=>{
          const mapa={'1':'Sr.','2':'Sra.','3':'Sre.','4':''};
          const p=mapa[op.trim()]??'';
          const trat=p?p+' '+nr:nr;
          _tPrint('',0);
          _tPrint(_ln('=',60,_AZ), 25);
          _tType(_AZ+_B+'  Olá, '+trat+'! Bem-vindo ao Quiz Python.'+_R, 15, 25);
          _tType(_AZ+_B+'  10 questões. 4 alternativas cada.'+_R,         15, 18);
          _tType(_AZ+_B+'  Boa sorte.'+_R,                                15, 18);
          _tPrint(_ln('=',60,_AZ), 25);
          _tPrint('', 50);
          _tWait(250);
          _tCall(()=>_termQuestao(0,trat,[]));
        });
      });
    });
  });
}

function _termQuestao(idx, trat, reg){
  if(idx>=QUESTOES.length){ _termResultado(reg,trat); return; }
  const q=QUESTOES[idx];

  _tPrint(_ln('─',60,_AZ),  0);
  _tType(_AM+_B+`  Q${String(q.numero).padStart(2,'0')} / ${QUESTOES.length}  ·  ${q.topico}`+_R, 13, 25);
  _tPrint(_ln('─',60,_AZ), 20);
  _tPrint('', 15);

  // enunciado com wrap
  const ww=q.enunciado.split(' ');
  let acc='  ';const eLines=[];
  for(const w of ww){if((acc+w).length>68){eLines.push(acc.trimEnd());acc='  '+w+' ';}else acc+=w+' ';}
  if(acc.trim()) eLines.push(acc.trimEnd());
  eLines.forEach(l=>_tType(_B+l+_R, 12, 14));

  // code block
  if(q.code){
    _tPrint('', 20);
    _tPrint('  '+_CI+'┌'+'─'.repeat(52)+'┐'+_R, 25);
    q.code.split('\n').forEach(l=>_tPrint('  '+_CI+'│'+_R+' '+_VD+l.padEnd(51)+_R+_CI+'│'+_R, 18));
    _tPrint('  '+_CI+'└'+'─'.repeat(52)+'┘'+_R, 18);
  }

  _tPrint('', 28);
  ['A','B','C','D'].forEach(l=>_tType(`  ${_AM}[${l}]${_R} ${q.alternativas[l]}`, 10, 22));
  _tPrint('', 28);

  _tCall(()=>{
    _tInput(_AM+'  Resposta (A/B/C/D):'+_R, resp=>{
      const dada=resp.trim().toUpperCase();
      const acertou=dada===q.correta;
      _tPrint('', 20);
      if(acertou){
        _tDots(_VD+_B+'  verificando', _VD, 350);
        _tType(_VD+_B+`  ✓  CORRETO! Muito bem, ${trat}!`+_R,           15, 0);
        _tPrint(_ln('─',60,_VD), 20);
      } else {
        _tDots(_VR+_B+'  verificando', _VR, 350);
        _tType(_VR+_B+`  ✗  ERROU. A correta era: [${q.correta}]`+_R,   15, 0);
        _tPrint(_ln('─',60,_VR), 20);
      }
      _tPrint('', 15);
      _tType('  '+_AM+'Explicação:'+_R, 13, 0);
      const ew=q.explicacao.split(' ');let el='  ';const eL=[];
      for(const w of ew){if((el+w).length>68){eL.push(el.trimEnd());el='  '+w+' ';}else el+=w+' ';}
      if(el.trim())eL.push(el.trimEnd());
      eL.forEach(l=>_tType(l, 10, 10));
      if(!acertou){
        _tPrint('', 15);
        _tType('  '+_AM+'Ref: '+_R+q.dica, 10, 0);
      }
      reg.push({numero:q.numero,topico:q.topico,dada,correta:q.correta});
      _tPrint('', 40);
      _tWait(160);
      _tCall(()=>_termQuestao(idx+1,trat,reg));
    });
  });
}

function _termResultado(reg, trat){
  const ac=reg.filter(i=>i.dada===i.correta).length;
  const tot=reg.length, pct=Math.round((ac/tot)*100);
  _tPrint('', 40);
  _tDots(_MG+_B+'  Calculando resultado', _MG, 1100);
  _tPrint('', 25);
  _tPrint(_MG+_B+'═'.repeat(60)+_R, 25);
  _tType(_MG+_B+'  RESULTADO FINAL'+_R,  18, 20);
  _tPrint(_MG+_B+'═'.repeat(60)+_R, 20);
  _tPrint('', 15);
  const corR=pct>=80?_VD:pct>=50?_AM:_VR;
  const rx=[{min:10,t:'NOTA MÁXIMA. Zerou o quiz.'},{min:8,t:'QUASE PERFEITO. Poucos erros.'},{min:6,t:'NA MÉDIA. Continue assim.'},{min:4,t:'ABAIXO DA MÉDIA. Falta estudar.'},{min:0,t:'FOI MAL. Mas não desista.'}];
  const rea=rx.find(r=>ac>=r.min);
  _tType(corR+_B+'  > '+rea.t+_R,                                             18, 25);
  _tPrint('', 20);
  _tType(`  ${_B}Pontuação    :${_R} ${corR}${_B}${ac} / ${tot}${_R}  (${pct}%)`, 12, 25);
  _tPrint('', 25);
  // tabela
  _tPrint('  '+_AZ+'─'.repeat(54)+_R, 20);
  _tType(`  ${_AM+_B}  #    Tópico${' '.repeat(20)}Resp    Gabarito${_R}`, 9, 16);
  _tPrint('  '+_AZ+'─'.repeat(54)+_R, 14);
  reg.forEach((item,i)=>{
    const ok=item.dada===item.correta;
    const st=ok?_VD+'✓'+_R:_VR+'✗'+_R;
    const rs=ok?_VD+item.dada+_R:_VR+item.dada+_R;
    const tp=item.topico.substring(0,24).padEnd(24);
    _tType(`  ${st}  Q${String(item.numero).padStart(2,'0')}  ${ok?_VD:_VR}${tp}${_R}  ${rs}       ${_VD}${item.correta}${_R}`, 7, i*16+12);
  });
  _tPrint('  '+_AZ+'─'.repeat(54)+_R, reg.length*16+16);
  const erros=reg.filter(i=>i.dada!==i.correta);
  if(erros.length>0){
    _tPrint('', 25);
    _tType('  '+_AM+_B+'Revisar:'+_R, 14, 18);
    erros.forEach((item,i)=>{
      const q=QUESTOES.find(x=>x.numero===item.numero);
      _tType(`  ${_VR}Q${item.numero}${_R} ${q.dica}`, 9, i*16+14);
    });
  }
  _tPrint('', 40);
  _tPrint(_MG+_B+'═'.repeat(60)+_R, 25);
  _tType(_MG+_B+`  Obrigado, ${trat}. Até a próxima.`+_R, 16, 20);
  _tPrint(_MG+_B+'═'.repeat(60)+_R, 20);
  _tPrint('', 20);
  _tType(_CI+'  O arquivo .py está disponível para download no site.'+_R, 11, 25);
  _tType(_CI+'  Referência: onecompiler.com/python'+_R, 11, 18);
  _tPrint('', 25);
  _tCall(()=>{
    const ti=document.getElementById('term-input');
    const tp=document.getElementById('term-prompt');
    if(ti){ti.disabled=true;ti.placeholder='processo encerrado — feche e reabra para reiniciar';}
    if(tp) tp.textContent='$';
  });
}
// ══════════════════════════════════════════

function baixarArquivo(nome, tipo) {
  const blob = new Blob([CODIGO_PYTHON], { type: tipo });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = nome; a.click();
  URL.revokeObjectURL(url);
}
function baixarPy()  { baixarArquivo('quiz_gabriel.py',  'text/plain'); }
function baixarTxt() { baixarArquivo('quiz_gabriel.txt', 'text/plain'); }

function toggleCodigo() {
  const sec = document.getElementById('section-codigo');
  const btn = document.getElementById('btn-toggle-codigo');
  _codigoVisivel = !_codigoVisivel;
  if (_codigoVisivel) {
    sec.classList.add('visible');
    const b = document.getElementById('codigo-block');
    if (!b.textContent) b.textContent = CODIGO_PYTHON;
    sec.scrollIntoView({ behavior:'smooth', block:'start' });
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg> OCULTAR CÓDIGO';
  } else {
    sec.classList.remove('visible');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> VER CÓDIGO';
  }
}

function copiarCodigo() {
  navigator.clipboard.writeText(CODIGO_PYTHON).then(() => {
    const btn = document.getElementById('copy-btn');
    const lbl = document.getElementById('copy-label');
    btn.classList.add('copied');
    lbl.textContent = 'Copiado!';
    setTimeout(() => {
      btn.classList.remove('copied');
      lbl.textContent = 'Copiar';
    }, 2200);
  });
}

function toggleGab(item) { item.classList.toggle('open'); }

function mostrarTela(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function reiniciar() {
  estado.tentativa++;
  estado.pronome = null;
  document.querySelectorAll('.pronome-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('input-nome').value = '';
  document.getElementById('btn-iniciar').disabled = true;
  document.getElementById('section-codigo').classList.remove('visible');
  const gabSec = document.getElementById('section-gabarito');
  if (gabSec) gabSec.classList.remove('visible');
  _codigoVisivel = false;
  mostrarTela('screen-intro');
  window.scrollTo({ top:0, behavior:'smooth' });
}

const CODIGO_PYTHON = `# =====================================================================
#  Trabalho Escolar -- Quiz Python
#  Aluno      : Gabriel Fernandes de Lima
#  Matricula  : 2024 0223 5036
#  Faculdade  : Estacio
#  Professor  : Paulo Cruz
#  Disciplina : Paradigmas de Linguagens de Programacao em Python
# =====================================================================

# Importo o modulo 'time' para medir o tempo de resposta de cada questao
import time

# =====================================================================
#  CORES ANSI
#  Esses codigos especiais colorem o texto no terminal.
#  \\033[ inicia o codigo, o numero define a cor, e \\033[0m reseta tudo.
# =====================================================================
RESET   = "\\033[0m"
BOLD    = "\\033[1m"
AZUL    = "\\033[34m"
AMARELO = "\\033[33m"
CIANO   = "\\033[36m"
VERDE   = "\\033[32m"
VERM    = "\\033[31m"
MAGENTA = "\\033[35m"

# =====================================================================
#  FUNCOES AUXILIARES
# =====================================================================

def linha(char="=", n=60, cor=AZUL):
    print(cor + char * n + RESET)

def titulo(texto, cor=AMARELO):
    linha()
    print(cor + BOLD + texto.center(60) + RESET)
    linha()

# =====================================================================
#  CAPA DO TRABALHO
# =====================================================================

def capa():
    print()
    linha("*", 60, MAGENTA)
    print(MAGENTA + BOLD + "  TRABALHO ESCOLAR -- QUIZ PYTHON".center(60) + RESET)
    linha("*", 60, MAGENTA)
    print(BOLD + "  Aluno      : " + RESET + "Gabriel Fernandes de Lima")
    print(BOLD + "  Matricula  : " + RESET + "2024 0223 5036")
    print(BOLD + "  Faculdade  : " + RESET + "Estacio")
    print(BOLD + "  Professor  : " + RESET + "Paulo Cruz")
    print(BOLD + "  Disciplina : " + RESET + "Paradigmas de Linguagens de Programacao em Python")
    linha("*", 60, MAGENTA)
    print()

# =====================================================================
#  PERSONALIZACAO
# =====================================================================

def personalizar():
    linha("-", 60, CIANO)
    print(CIANO + BOLD + "  Antes de comecar, me diga:" + RESET)
    print()
    print(AMARELO + "  Seu nome: " + RESET, end="")
    nome = input().strip()
    if nome == "":
        nome = "Visitante"
    print()
    print(AMARELO + "  Como quer ser chamado(a/e)?" + RESET)
    print(CIANO + "  A) " + RESET + "Sr.  (masculino)  " +
          CIANO + "B) " + RESET + "Sra. (feminino)")
    print(CIANO + "  C) " + RESET + "Sre. (neutro)     " +
          CIANO + "D) " + RESET + "Sem pronome")
    print()
    print(AMARELO + "  Opcao [A/B/C/D]: " + RESET, end="")
    while True:
        opcao = input().strip().upper()
        if opcao in ("A", "B", "C", "D"):
            break
        print(VERM + "  Invalido! Digite A, B, C ou D: " + RESET, end="")
    pronomes = {"A": "Sr.", "B": "Sra.", "C": "Sre.", "D": ""}
    pronome  = pronomes[opcao]
    tratamento = (pronome + " " + nome).strip() if pronome else nome
    print()
    print(VERDE + BOLD + "  Ola, " + tratamento + "! Vamos comecar!" + RESET)
    print()
    return tratamento

# =====================================================================
#  BANCO DE QUESTOES
# =====================================================================

QUESTOES = [
    {
        "numero": 1,
        "enunciado": "Qual das seguintes NAO e uma caracteristica do Python?",
        "alternativas": {
            "A": "Multiparadigma.",
            "B": "Portavel (roda em diferentes sistemas sem alteracao).",
            "C": "Tipagem ESTATICA (tipo declarado antes do uso).",
            "D": "Extensivel (permite adicionar novos modulos).",
        },
        "correta": "C",
        "explicacao": (
            "Python tem tipagem DINAMICA, nao estatica.\\n"
            "  A, B e D sao caracteristicas VERDADEIRAS do Python."
        ),
        "dica": "Tema 3, pp. 4-5 e 15 -- Caracteristicas do Python",
    },
    {
        "numero": 2,
        "enunciado": (
            "Qual paradigma especifica PASSO A PASSO como resolver\\n"
            "  um problema, sendo dependente da arquitetura do computador?"
        ),
        "alternativas": {
            "A": "Declarativo.",
            "B": "Funcional.",
            "C": "Logico.",
            "D": "Imperativo.",
        },
        "correta": "D",
        "explicacao": (
            "O IMPERATIVO foca em COMO fazer, passo a passo.\\n"
            "  Depende da arquitetura. Inclui: estruturado, OO, concorrente."
        ),
        "dica": "Tema 2, pp. 28-30 -- Paradigma imperativo",
    },
    {
        "numero": 3,
        "enunciado": (
            "Se 'if idade < 5' for FALSA, o segundo print roda?\\n\\n"
            "  idade = 7\\n"
            "  if idade < 5:\\n"
            "      print('A crianca deve ser vacinada.')\\n"
            "  print('Cuide da saude sempre.')"
        ),
        "alternativas": {
            "A": "Nao, pois esta dentro do bloco if.",
            "B": "Nao, o programa da erro de indentacao.",
            "C": "Sim, pois esta FORA do bloco if (mesmo nivel do if).",
            "D": "Nao, condicao falsa paralisa o programa.",
        },
        "correta": "C",
        "explicacao": (
            "Em Python, INDENTACAO define o bloco.\\n"
            "  O segundo print esta fora do bloco -- roda SEMPRE."
        ),
        "dica": "Tema 4, pp. 3-5 | Tema 3, p. 9 -- Indentacao e blocos",
    },
    {
        "numero": 4,
        "enunciado": (
            "Sobre o COMPILADOR, quais afirmativas estao corretas?\\n\\n"
            "  I.   Gera codigo-objeto otimizado (execucao rapida).\\n"
            "  II.  Traduz codigo-fonte para Assembly, depois maquina.\\n"
            "  III. E mais LENTO na execucao final que o interpretador.\\n"
            "  IV.  Depuracao de erros e mais demorada."
        ),
        "alternativas": {
            "A": "I, II e III.",
            "B": "I, II e IV.",
            "C": "II, III e IV.",
            "D": "I, III e IV.",
        },
        "correta": "B",
        "explicacao": (
            "I. CORRETA  II. CORRETA  III. ERRADA (compilado e mais RAPIDO!)\\n"
            "  IV. CORRETA -- depuracao mais lenta no compilador."
        ),
        "dica": "Tema 2, pp. 35-38 e 41 -- Compilador x Interpretador",
    },
    {
        "numero": 5,
        "enunciado": "Para ler a idade e calcular idade + 10, qual esta CORRETO?",
        "alternativas": {
            "A": "idade = input('Digite sua idade: ')",
            "B": "idade = int(input('Digite sua idade: '))",
            "C": "idade = float(input('Digite sua idade: '))",
            "D": "idade = str(input('Digite sua idade: '))",
        },
        "correta": "B",
        "explicacao": (
            "input() SEMPRE retorna string.\\n"
            "  Para calcular, converta com int()."
        ),
        "dica": "Tema 3, pp. 45-48 -- input() e conversao de tipos",
    },
    {
        "numero": 6,
        "enunciado": (
            "Sobre abstarcao em linguagens de programacao,\\n"
            "  qual afirmacao esta correta?"
        ),
        "alternativas": {
            "A": "A linguagem Assembly e a nativa do computador, escrita em binario.",
            "B": "Um comando em Python equivale exatamente a um comando em Assembly.",
            "C": "A linguagem de maquina e de alto nivel, proxima a linguagem humana.",
            "D": "Um programa em Python tem menos linhas que o equivalente em Assembly.",
        },
        "correta": "D",
        "explicacao": (
            "Python e alto nivel: um comando representa dezenas de instrucoes\\n"
            "  em Assembly. Isso e abstracao."
        ),
        "dica": "Tema 2, pp. 5-6 -- Classificacao das linguagens e abstracao",
    },
    {
        "numero": 7,
        "enunciado": "Qual define corretamente uma linguagem de alto nivel?",
        "alternativas": {
            "A": "E proxima da linguagem de maquina, usando binario.",
            "B": "Nao necessita de conversao, pois e a nativa do processador.",
            "C": "E abstrata, nao exige conhecer o hardware.",
            "D": "E usada exclusivamente para programacao de sistemas operacionais.",
        },
        "correta": "C",
        "explicacao": (
            "Alto nivel = abstracao. O programador nao precisa conhecer\\n"
            "  registradores ou enderecos de memoria."
        ),
        "dica": "Tema 2, pp. 10-11 -- Linguagens de alto e baixo nivel",
    },
    {
        "numero": 8,
        "enunciado": (
            "O que o codigo abaixo imprime?\\n\\n"
            "  def func():\\n"
            "      x = 1\\n"
            "      print(x)\\n\\n"
            "  x = 10\\n"
            "  func()\\n"
            "  print(x)"
        ),
        "alternativas": {
            "A": "Imprimira 10 e 10, pois a variavel e global.",
            "B": "Imprimira 1 e 10, pois x dentro da funcao e local.",
            "C": "Dara erro, pois nao se pode ter duas variaveis com o mesmo nome.",
            "D": "Imprimira 1 e 1, pois a variavel local altera a global.",
        },
        "correta": "B",
        "explicacao": (
            "Variaveis dentro de funcoes sao locais.\\n"
            "  func() imprime 1 (local) e o print externo imprime 10 (global)."
        ),
        "dica": "Tema 3, pp. 19-21 -- Escopo local e global de variaveis",
    },
    {
        "numero": 9,
        "enunciado": (
            "Analise as duas estruturas de repeticao:\\n\\n"
            "  # Codigo 1\\n"
            "  for i in range(3):\\n"
            "      print(i)\\n\\n"
            "  # Codigo 2\\n"
            "  i = 0\\n"
            "  while i < 3:\\n"
            "      print(i)\\n"
            "      i += 1"
        ),
        "alternativas": {
            "A": "O Codigo 1 produz (0,1,2) e o Codigo 2 produz (1,2,3).",
            "B": "Ambos imprimem 0, 1, 2, mas o while depende de variavel de controle explícita.",
            "C": "O laco for nao pode ser usado com a funcao range().",
            "D": "O laco while infinito e criado com a condicao while False:.",
        },
        "correta": "B",
        "explicacao": (
            "Ambos imprimem 0, 1, 2.\\n"
            "  O for gerencia automaticamente; o while precisa de i=0, condicao e i+=1."
        ),
        "dica": "Tema 4, pp. 8-9 e 13-14 -- for com range() e while com controle",
    },
    {
        "numero": 10,
        "enunciado": "Sobre importacao de modulos em Python, qual esta correta?",
        "alternativas": {
            "A": "Para usar sqrt, e necessario import math e depois chamar math.sqrt().",
            "B": "Todas as funcoes da biblioteca padrao sao carregadas automaticamente.",
            "C": "O modulo math permite operacoes com numeros complexos sem outro modulo.",
            "D": "Apos import math, sqrt pode ser chamada diretamente como sqrt(9).",
        },
        "correta": "A",
        "explicacao": (
            "Apos import math, use o prefixo: math.sqrt().\\n"
            "  Chamar so sqrt() gera NameError."
        ),
        "dica": "Tema 4, pp. 47-48 -- Importacao de modulos e biblioteca padrao",
    },
]

# =====================================================================
#  BARRA DE PROGRESSO
# =====================================================================

def barra_progresso(atual, total):
    cheios = atual
    vazios = total - atual
    barra  = VERDE + "=" * cheios + RESET + AZUL + "-" * vazios + RESET
    print(AZUL + "  [" + barra + AZUL + "]" + RESET +
          MAGENTA + "  Pergunta " + str(atual) + " de " + str(total) + RESET)

# =====================================================================
#  EXIBIR QUESTAO
# =====================================================================

def exibir_questao(q, acertos_ate_agora):
    linha("-", 60, AZUL)
    barra_progresso(q["numero"], len(QUESTOES))
    print(CIANO + "  Placar: " + VERDE + BOLD +
          str(acertos_ate_agora) + " acerto(s)" + RESET)
    print()
    print(AMARELO + BOLD + "  " + q["enunciado"] + RESET)
    print()
    for letra in ("A", "B", "C", "D"):
        print(CIANO + "  " + letra + ") " + RESET + q["alternativas"][letra])
    print()
    return time.time()

# =====================================================================
#  CAPTURAR RESPOSTA
# =====================================================================

def capturar_resposta():
    print(AMARELO + BOLD + "  Sua resposta [A/B/C/D]: " + RESET, end="")
    while True:
        resposta = input().strip().upper()
        if resposta in ("A", "B", "C", "D"):
            return resposta
        print(VERM + "  Invalido! Digite A, B, C ou D: " + RESET, end="")

# =====================================================================
#  FEEDBACK IMEDIATO
# =====================================================================

def feedback(q, resposta, tempo_segundos, tratamento):
    tempo_str = str(round(tempo_segundos, 1)) + "s"
    print()
    if resposta == q["correta"]:
        print(VERDE + BOLD + "  Correto! Otimo, " + tratamento +
              "! (" + tempo_str + ")" + RESET)
    else:
        print(VERM + BOLD + "  Errou! Correta: alternativa " +
              q["correta"] + "  (" + tempo_str + ")" + RESET)
        print()
        print(BOLD + "  Por que? " + RESET + q["explicacao"])
        print()
        print(CIANO + "  Estudo: " + q["dica"] + RESET)
    print()

# =====================================================================
#  HISTORICO DE RESPOSTAS
# =====================================================================

def historico_respostas(registro):
    linha("-", 60, AZUL)
    print(BOLD + "  Historico das suas respostas:" + RESET)
    print()
    for item in registro:
        num     = str(item["numero"])
        dada    = item["dada"]
        correta = item["correta"]
        tempo   = str(round(item["tempo"], 1)) + "s"
        if dada == correta:
            status  = VERDE + BOLD + "Certo " + RESET
            detalhe = VERDE + "Voce: " + dada + RESET
        else:
            status  = VERM + BOLD + "Errou " + RESET
            detalhe = (VERM + "Voce: " + dada + RESET +
                       "  |  " + VERDE + "Correta: " + correta + RESET)
        print("  Q" + num + "  " + status + "  " + detalhe +
              MAGENTA + "  (" + tempo + ")" + RESET)
    print()

# =====================================================================
#  RESULTADO FINAL
# =====================================================================

def resultado_final(acertos, registro, tratamento):
    total      = len(QUESTOES)
    percentual = (acertos / total) * 100
    print()
    titulo("  RESULTADO FINAL  ", MAGENTA)
    print()
    print(BOLD + "  " + tratamento + RESET)
    print(MAGENTA + BOLD + "  Voce acertou " + str(acertos) +
          " de " + str(total) + " perguntas!" + RESET)
    print(MAGENTA + "  Aproveitamento: " + str(int(percentual)) + "%" + RESET)
    print()
    if acertos == 10:
        print(VERDE + BOLD + "  NOTA MAXIMA! Voce zerou!" + RESET)
    elif acertos >= 8:
        print(VERDE + BOLD + "  QUASE PERFEITO! So uns errinhos..." + RESET)
    elif acertos >= 6:
        print(AMARELO + BOLD + "  NA MEDIA! Continue assim!" + RESET)
    elif acertos >= 4:
        print(AMARELO + BOLD + "  ABAIXO DA MEDIA. Precisa estudar mais." + RESET)
    elif acertos >= 1:
        print(VERM + BOLD + "  FOI MAL... mas nao desista!" + RESET)
    else:
        print(VERM + BOLD + "  ZEROU PRA BAIXO! Mas nao desista!" + RESET)
    historico_respostas(registro)
    erros = [item for item in registro if item["dada"] != item["correta"]]
    linha("-", 60, CIANO)
    if acertos == 10:
        print(VERDE + "  Parabens! Voce dominou os Temas 2, 3 e 4!" + RESET)
    else:
        print(CIANO + BOLD + "  Para melhorar, revise:" + RESET)
        print()
        for item in erros:
            q = next(x for x in QUESTOES if x["numero"] == item["numero"])
            print(VERM + "  Q" + str(item["numero"]) + ": " + RESET +
                  CIANO + q["dica"] + RESET)
        print()
        print(AMARELO + "  Estude e volte para tentar de novo!" + RESET)
    print()
    linha("*", 60, MAGENTA)
    print(MAGENTA + BOLD + "  Obrigado por testar meu codigo!".center(60) + RESET)
    linha("*", 60, MAGENTA)
    print()

# =====================================================================
#  FONTES DAS QUESTOES
# =====================================================================

def mostrar_fontes():
    linha("-", 60, CIANO)
    print(CIANO + BOLD + "  FONTES (Estacio -- Temas 2, 3 e 4)" + RESET)
    linha("-", 60, CIANO)
    fontes = [
        ("Q1",  "Caracteristicas do Python / Tipagem dinamica",   "Tema 3, pp. 4-5 e 15"),
        ("Q2",  "Paradigma Imperativo vs Declarativo",             "Tema 2, pp. 28-30"),
        ("Q3",  "Estruturas de decisao (if) e Indentacao",         "Tema 4, pp. 3-5 | Tema 3, p. 9"),
        ("Q4",  "Compilador: fases e comparacao",                  "Tema 2, pp. 35-38 e 41"),
        ("Q5",  "Entrada de dados com input() e conversao",        "Tema 3, pp. 45-48"),
        ("Q6",  "Niveis de abstracao das linguagens",              "Tema 2, pp. 5-6"),
        ("Q7",  "Alto nivel vs Baixo nivel",                       "Tema 2, pp. 10-11"),
        ("Q8",  "Escopo local e global de variaveis",              "Tema 3, pp. 19-21"),
        ("Q9",  "Estruturas de repeticao for e while",             "Tema 4, pp. 8-9 e 13-14"),
        ("Q10", "Importacao de modulos",                           "Tema 4, pp. 47-48"),
    ]
    for q, assunto, ref in fontes:
        print(CIANO + "  " + q + ": " + RESET + assunto)
        print("       -> " + ref)
    linha("-", 60, CIANO)
    print()

# =====================================================================
#  FUNCAO PRINCIPAL
# =====================================================================

def main():
    capa()
    tratamento = personalizar()
    acertos  = 0
    registro = []
    for q in QUESTOES:
        inicio = exibir_questao(q, acertos)
        resposta = capturar_resposta()
        tempo_gasto = time.time() - inicio
        if resposta == q["correta"]:
            acertos += 1
        registro.append({
            "numero":  q["numero"],
            "dada":    resposta,
            "correta": q["correta"],
            "tempo":   tempo_gasto,
        })
        feedback(q, resposta, tempo_gasto, tratamento)
    resultado_final(acertos, registro, tratamento)
    mostrar_fontes()

if __name__ == "__main__":
    main()
`;