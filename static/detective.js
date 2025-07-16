// Detetive - Sistema de Consulta CPF/CNPJ - JavaScript Functions

// Theme management
class ThemeManager {
  constructor() {
    this.themeIcon = document.getElementById('theme-icon');
    this.body = document.body;
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.body.classList.add('dark');
      this.themeIcon.textContent = '☀️';
    }
  }

  toggle() {
    if (this.body.classList.contains('dark')) {
      this.body.classList.remove('dark');
      this.themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      this.body.classList.add('dark');
      this.themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  }
}

// Document formatting and validation
class DocumentFormatter {
  static formatCpfCnpj(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      // CPF format: 000.000.000-00
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      value = value.slice(0, 14);
    } else {
      // CNPJ format: 00.000.000/0000-00
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      value = value.slice(0, 18);
    }
    
    input.value = value;
  }

  static validateDocument(value) {
    const cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.length === 11) {
      return this.validateCPF(cleanValue);
    } else if (cleanValue.length === 14) {
      return this.validateCNPJ(cleanValue);
    }
    
    return { isValid: false, message: 'Digite um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.' };
  }

  static validateCPF(cpf) {
    // Remove non-digits
    cpf = cpf.replace(/\D/g, '');
    
    // Check if it has 11 digits
    if (cpf.length !== 11) {
      return { isValid: false, message: 'CPF deve ter 11 dígitos.' };
    }
    
    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cpf)) {
      return { isValid: false, message: 'CPF inválido.' };
    }
    
    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) {
      return { isValid: false, message: 'CPF inválido.' };
    }
    
    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) {
      return { isValid: false, message: 'CPF inválido.' };
    }
    
    return { isValid: true, message: '' };
  }

  static validateCNPJ(cnpj) {
    // Remove non-digits
    cnpj = cnpj.replace(/\D/g, '');
    
    // Check if it has 14 digits
    if (cnpj.length !== 14) {
      return { isValid: false, message: 'CNPJ deve ter 14 dígitos.' };
    }
    
    // Check if all digits are the same
    if (/^(\d)\1{13}$/.test(cnpj)) {
      return { isValid: false, message: 'CNPJ inválido.' };
    }
    
    // Validate first digit
    let sum = 0;
    let weight = 2;
    for (let i = 11; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(cnpj.charAt(12))) {
      return { isValid: false, message: 'CNPJ inválido.' };
    }
    
    // Validate second digit
    sum = 0;
    weight = 2;
    for (let i = 12; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (digit2 !== parseInt(cnpj.charAt(13))) {
      return { isValid: false, message: 'CNPJ inválido.' };
    }
    
    return { isValid: true, message: '' };
  }
}

// Local History Management
class LocalHistoryManager {
  constructor() {
    this.storageKey = 'detective_search_history';
  }

  addSearch(identifier, response, isPending = false) {
    const history = this.getHistory();
    const newSearch = {
      identifier: identifier,
      response: response,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
      isPending: isPending
    };
    
    // Remove duplicates and add new search at the beginning
    const filteredHistory = history.filter(item => item.identifier !== identifier);
    filteredHistory.unshift(newSearch);
    
    // Keep only last 20 searches
    const limitedHistory = filteredHistory.slice(0, 20);
    
    localStorage.setItem(this.storageKey, JSON.stringify(limitedHistory));
  }

  updateSearch(identifier, response) {
    const history = this.getHistory();
    const updatedHistory = history.map(item => {
      if (item.identifier === identifier) {
        return {
          ...item,
          response: response,
          isPending: false,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    });
    
    localStorage.setItem(this.storageKey, JSON.stringify(updatedHistory));
  }

  getHistory() {
    try {
      const history = localStorage.getItem(this.storageKey);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Erro ao carregar histórico local:', error);
      return [];
    }
  }

  clearHistory() {
    localStorage.removeItem(this.storageKey);
  }

  getSearchByIdentifier(identifier) {
    const history = this.getHistory();
    return history.find(item => item.identifier === identifier);
  }
}

// Form handling
class InvestigationForm {
  constructor() {
    this.form = document.querySelector('.investigation-form');
    this.input = document.getElementById('identificador');
    this.button = document.querySelector('.submit-button');
    this.localHistory = new LocalHistoryManager();
    this.init();
  }

  init() {
    if (this.form) {
      this.setupEventListeners();
      this.loadReuseValue();
    }
  }

  setupEventListeners() {
    // Input formatting
    this.input.addEventListener('input', (e) => {
      DocumentFormatter.formatCpfCnpj(e.target);
    });

    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  loadReuseValue() {
    // Check if there's a reuse parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const reuseValue = urlParams.get('reuse');
    
    if (reuseValue) {
      // Try to get from local history first
      const localSearch = this.localHistory.getSearchByIdentifier(reuseValue);
      if (localSearch) {
        this.input.value = reuseValue;
        DocumentFormatter.formatCpfCnpj(this.input);
      }
    }
  }

  handleSubmit() {
    const value = this.input.value.replace(/\D/g, '');
    const validation = DocumentFormatter.validateDocument(value);
    
    if (!validation.isValid) {
      this.showError(validation.message);
      return;
    }
    
    this.showLoading();
    
    // Store in local history with pending status
    this.localHistory.addSearch(value, '🔍 Consulta em andamento...', true);
    
    this.form.submit();
  }

  showError(message) {
    let errorElement = document.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('p');
      errorElement.className = 'error-message';
      document.querySelector('.form-group').appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  showLoading() {
    this.button.disabled = true;
    this.button.innerHTML = '<span class="loading">🔍 Investigando...</span>';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme manager
  window.themeManager = new ThemeManager();
  
  // Initialize form if it exists
  if (document.querySelector('.investigation-form')) {
    window.investigationForm = new InvestigationForm();
  }
});

// Global functions for HTML onclick
function toggleTheme() {
  if (window.themeManager) {
    window.themeManager.toggle();
  }
}

function formatCpfCnpj(input) {
  DocumentFormatter.formatCpfCnpj(input);
} 