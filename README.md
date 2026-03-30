# Quiz Python — Paradigmas de Linguagens de Programação

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://pt.wikipedia.org/wiki/Python)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://pt.wikipedia.org/wiki/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://pt.wikipedia.org/wiki/Cascading_Style_Sheets)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://pt.wikipedia.org/wiki/JavaScript)

**Trabalho Avaliativo · Análise e Desenvolvimento de Sistemas · Estácio · 2026**

---

## 📋 Sobre o Projeto

Este projeto consiste em um **quiz interativo** sobre os conteúdos vistos nas disciplinas de **Paradigmas de Linguagens de Programação** (Temas 2, 3 e 4), com foco em Python.

> **Prof. Paulo Cruz** · Matrícula 2024 0223 5036 · Gabriel Fernandes de Lima

O trabalho foi desenvolvido com o objetivo de unir dois aprendizados:

- **Python** — lógica do quiz, estruturas de dados, controle de fluxo, funções, módulos e tratamento de entrada
- **Desenvolvimento Web** — HTML, CSS e JavaScript, com publicação via GitHub Pages

### Versões Disponíveis

| Versão | Descrição |
|--------|-----------|
| `quiz_gabriel.py` | Versão principal em Python (entregue como trabalho) |
| `quiz_gabriel.txt` | Versão em texto puro para visualização |
| [Site interativo](https://deathnition.github.io/quiz-python-paradigmas) | Versão web completa com interface moderna |

---

## ✨ Funcionalidades

### Quiz Web
- Design moderno dark com neon green e cursor glow interativo
- Identificação do aluno com pronome de tratamento personalizado (Sr. / Sra. / Sre. / sem pronome)
- Timer individual por questão com contagem em tempo real
- Feedback imediato após cada resposta, com explicação e referência ao tema da apostila
- Barra de progresso visual e placar em tempo real
- Demo interativa na Q5 — testa `int(input())` diretamente no navegador
- Resultado final com anel de pontuação animado
- Histórico detalhado de todas as respostas com tempo por questão
- Dicas de revisão para as questões erradas
- Gabarito completo com 10 questões expansíveis e explicações
- Responsivo (funciona bem em celular)

### Terminal Emulado
- Simulação completa do `quiz_gabriel.py` rodando no terminal
- Cores ANSI, digitação animada e experiência realista
- Campo de entrada interativo integrado à emulação

### Outros Destaques
- Download direto do `quiz_gabriel.py` e `quiz_gabriel.txt`
- Visualização completa do código-fonte com botão de copiar
- Seção detalhada de conceitos Python usados no código
- Integração com Google Sheets para registro de tentativas
- Seção de transparência sobre o uso de IA no desenvolvimento visual

---

## 🛠️ Tecnologias Utilizadas

### Backend / Lógica
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://pt.wikipedia.org/wiki/Python)

- Estruturas: listas, dicionários, funções
- Módulos: `time`
- Tratamento de entrada com validação via `while`
- `try / except` para captura de `ValueError`
- List comprehensions para filtrar resultados
- Cores ANSI para terminal (`\033[`)
- `if __name__ == "__main__"` para execução direta

### Frontend
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://pt.wikipedia.org/wiki/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://pt.wikipedia.org/wiki/Cascading_Style_Sheets)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://pt.wikipedia.org/wiki/JavaScript)

- CSS3 com variáveis, animações e design tokens
- Google Fonts: **Space Grotesk · JetBrains Mono · Unbounded**
- Integração com Google Sheets via Apps Script (registro de tentativas)

---

## 📚 Conteúdo do Quiz — 10 Questões

| # | Tópico | Gabarito |
|---|--------|----------|
| Q01 | Características do Python | C |
| Q02 | Paradigmas de Programação | D |
| Q03 | Indentação e Blocos | C |
| Q04 | Compilador x Interpretador | B |
| Q05 | Entrada de Dados com `input()` | B |
| Q06 | Níveis de Abstração das Linguagens | D |
| Q07 | Alto Nível vs Baixo Nível | C |
| Q08 | Escopo e Tempo de Vida das Variáveis | B |
| Q09 | Estruturas de Repetição `for` e `while` | B |
| Q10 | Importação de Módulos | A |

> Baseado nos Temas 2, 3 e 4 da disciplina de Paradigmas de LP — Estácio.

---

## 🚀 Como Usar

> O quiz pode ser executado diretamente no terminal. O código foi desenvolvido para funcionar perfeitamente em ambos os sistemas operacionais.

### [![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)](https://pt.wikipedia.org/wiki/Linux) Linux / macOS

```bash
# Clone o repositório
git clone https://github.com/DEATHNITION/quiz-python-paradigmas.git

# Acesse o diretório
cd quiz-python-paradigmas

# Execute o quiz
python3 quiz_gabriel.py
```

### [![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)](https://pt.wikipedia.org/wiki/Microsoft_Windows) Windows (PowerShell / CMD)

```bash
# Clone o repositório
git clone https://github.com/DEATHNITION/quiz-python-paradigmas.git

# Acesse o diretório
cd quiz-python-paradigmas

# Execute o quiz
python quiz_gabriel.py
```

> Também é possível rodar online sem instalar nada:
> - [replit.com](https://replit.com) — ambiente completo, salva o projeto na nuvem
> - [onecompiler.com/python](https://onecompiler.com/python) — cola o código e roda, sem cadastro

---

## 🌐 Versão Web

Acesse diretamente pelo navegador, sem instalação:

**[🔗 deathnition.github.io/quiz-python-paradigmas](https://deathnition.github.io/quiz-python-paradigmas)**

---

## 👤 Autor

Feito por **Gabriel Fernandes de Lima** ([@DEATHNITION](https://github.com/DEATHNITION)) — ADS · Estácio · 2026
