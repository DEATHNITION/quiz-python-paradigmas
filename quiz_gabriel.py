# =====================================================================
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
#  \033[ inicia o codigo, o numero define a cor, e \033[0m reseta tudo.
# =====================================================================
RESET   = "\033[0m"
BOLD    = "\033[1m"
AZUL    = "\033[34m"
AMARELO = "\033[33m"
CIANO   = "\033[36m"
VERDE   = "\033[32m"
VERM    = "\033[31m"
MAGENTA = "\033[35m"

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
            "Python tem tipagem DINAMICA, nao estatica.\n"
            "  A, B e D sao caracteristicas VERDADEIRAS do Python."
        ),
        "dica": "Tema 3, pp. 4-5 e 15 -- Caracteristicas do Python",
    },
    {
        "numero": 2,
        "enunciado": (
            "Qual paradigma especifica PASSO A PASSO como resolver\n"
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
            "O IMPERATIVO foca em COMO fazer, passo a passo.\n"
            "  Depende da arquitetura. Inclui: estruturado, OO, concorrente."
        ),
        "dica": "Tema 2, pp. 28-30 -- Paradigma imperativo",
    },
    {
        "numero": 3,
        "enunciado": (
            "Se 'if idade < 5' for FALSA, o segundo print roda?\n\n"
            "  idade = 7\n"
            "  if idade < 5:\n"
            "      print('A crianca deve ser vacinada.')\n"
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
            "Em Python, INDENTACAO define o bloco.\n"
            "  O segundo print esta fora do bloco -- roda SEMPRE."
        ),
        "dica": "Tema 4, pp. 3-5 | Tema 3, p. 9 -- Indentacao e blocos",
    },
    {
        "numero": 4,
        "enunciado": (
            "Sobre o COMPILADOR, quais afirmativas estao corretas?\n\n"
            "  I.   Gera codigo-objeto otimizado (execucao rapida).\n"
            "  II.  Traduz codigo-fonte para Assembly, depois maquina.\n"
            "  III. E mais LENTO na execucao final que o interpretador.\n"
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
            "I. CORRETA  II. CORRETA  III. ERRADA (compilado e mais RAPIDO!)\n"
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
            "input() SEMPRE retorna string.\n"
            "  Para calcular, converta com int()."
        ),
        "dica": "Tema 3, pp. 45-48 -- input() e conversao de tipos",
    },
    {
        "numero": 6,
        "enunciado": (
            "Sobre abstarcao em linguagens de programacao,\n"
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
            "Python e alto nivel: um comando representa dezenas de instrucoes\n"
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
            "Alto nivel = abstracao. O programador nao precisa conhecer\n"
            "  registradores ou enderecos de memoria."
        ),
        "dica": "Tema 2, pp. 10-11 -- Linguagens de alto e baixo nivel",
    },
    {
        "numero": 8,
        "enunciado": (
            "O que o codigo abaixo imprime?\n\n"
            "  def func():\n"
            "      x = 1\n"
            "      print(x)\n\n"
            "  x = 10\n"
            "  func()\n"
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
            "Variaveis dentro de funcoes sao locais.\n"
            "  func() imprime 1 (local) e o print externo imprime 10 (global)."
        ),
        "dica": "Tema 3, pp. 19-21 -- Escopo local e global de variaveis",
    },
    {
        "numero": 9,
        "enunciado": (
            "Analise as duas estruturas de repeticao:\n\n"
            "  # Codigo 1\n"
            "  for i in range(3):\n"
            "      print(i)\n\n"
            "  # Codigo 2\n"
            "  i = 0\n"
            "  while i < 3:\n"
            "      print(i)\n"
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
            "Ambos imprimem 0, 1, 2.\n"
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
            "Apos import math, use o prefixo: math.sqrt().\n"
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
