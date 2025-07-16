# 🕵️‍♂️ Detetive - Sistema de Consulta CPF/CNPJ

## ✨ Novidades Implementadas

O programa agora possui um visual moderno inspirado no design do `detective-search-report-main`, com as seguintes melhorias:

### 🎨 Design System
- **Tema Detetive**: Cores inspiradas em tons de bege/khaki para um visual profissional
- **Modo Escuro/Claro**: Alternância automática com persistência no localStorage
- **Tipografia Moderna**: Fonte Inter para melhor legibilidade
- **Animações Suaves**: Transições e efeitos visuais elegantes

### 🔧 Funcionalidades Aprimoradas
- **Formatação Automática**: CPF e CNPJ são formatados automaticamente durante a digitação
- **Validação Avançada**: Validação em tempo real com mensagens de erro claras
- **Estado de Carregamento**: Indicador visual durante a consulta
- **Responsividade**: Interface adaptável para diferentes tamanhos de tela

### 📱 Interface Moderna
- **Layout Centralizado**: Card flutuante com sombras elegantes
- **Botão de Tema**: Alternância fácil entre modo claro e escuro
- **Histórico Visual**: Exibição organizada das buscas anteriores
- **Navegação Intuitiva**: Links e botões com feedback visual

## 🚀 Como Usar

### Arquivos Principais
- `app.py` - Backend Python (atualizado para usar os novos templates)
- `templates/modern-form.html` - Formulário principal com design moderno
- `templates/modern-result.html` - Página de resultado com design moderno
- `static/modern-style.css` - Estilos CSS modernos
- `static/detective.js` - Funcionalidades JavaScript

### Executar o Programa
```bash
python app.py
```

Acesse `http://localhost:8000` para ver o novo visual.

## 🎯 Características do Design

### Cores do Tema
- **Primária**: Khaki escuro (#2e2b25)
- **Secundária**: Bege claro (#e7e2d9)
- **Acento**: Âmbar (#f4d03f)
- **Fundo**: Bege muito claro (#faf9f7)

### Modo Escuro
- **Fundo**: Cinza muito escuro (#1a1a1a)
- **Texto**: Bege claro (#f5f5f5)
- **Card**: Cinza escuro (#2a2a2a)

### Componentes
- **Container**: Card flutuante com bordas arredondadas
- **Input**: Campo com foco destacado e formatação automática
- **Botão**: Efeitos hover e loading state
- **Histórico**: Lista organizada com timestamps

## 🔄 Migração

O programa mantém toda a funcionalidade original:
- ✅ Consulta CPF/CNPJ via Telegram
- ✅ Histórico de buscas no SQLite
- ✅ Validação de documentos
- ✅ Interface responsiva

Apenas o visual foi modernizado para uma experiência mais profissional e agradável.

## 📝 Notas Técnicas

### Dependências
- FastAPI (backend)
- Jinja2 (templates)
- SQLite (banco de dados)
- Telethon (Telegram)

### Compatibilidade
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis e desktop
- Modo escuro/claro automático

### Performance
- CSS otimizado com variáveis CSS
- JavaScript modular e eficiente
- Carregamento rápido das páginas 