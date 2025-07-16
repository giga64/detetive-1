import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DetectiveContainer } from '@/components/DetectiveContainer';
import { DetectiveHeader } from '@/components/DetectiveHeader';
import { InvestigationForm } from '@/components/InvestigationForm';
import { validateDocument } from '@/utils/documentValidation';

export default function Investigation() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateDocumentInput = (doc: string): { isValid: boolean; message: string } => {
    const validation = validateDocument(doc);
    
    if (!validation.isValid) {
      if (validation.type === null) {
        return { 
          isValid: false, 
          message: 'Digite um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.' 
        };
      } else if (validation.type === 'cpf') {
        return { 
          isValid: false, 
          message: 'CPF inválido. Verifique os dígitos e tente novamente.' 
        };
      } else {
        return { 
          isValid: false, 
          message: 'CNPJ inválido. Verifique os dígitos e tente novamente.' 
        };
      }
    }
    
    return { isValid: true, message: '' };
  };

  const handleSubmit = async (value: string) => {
    setError('');
    
    const validation = validateDocumentInput(value);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simula uma consulta à API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simula dados de resposta
      const mockData = {
        nome: value.replace(/\D/g, '').length === 11 
          ? 'João Silva Santos' 
          : 'Empresa Exemplo LTDA',
        situacao: 'Ativa',
        dataRegistro: '15/03/2010',
        endereco: 'Rua das Flores, 123 - Centro - São Paulo/SP'
      };

      // Salva no localStorage para histórico
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const newSearch = {
        id: Date.now().toString(),
        query: value,
        timestamp: new Date(),
        result: mockData
      };
      searchHistory.push(newSearch);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      
      // Navega para a página de resultado
      navigate('/result', { 
        state: { 
          data: mockData, 
          query: value 
        } 
      });
    } catch (err) {
      setError('Erro ao realizar a consulta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DetectiveContainer>
      <DetectiveHeader />
      <InvestigationForm 
        onSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </DetectiveContainer>
  );
}