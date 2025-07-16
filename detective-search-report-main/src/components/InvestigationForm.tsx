import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InvestigationFormProps {
  onSubmit: (value: string) => void;
  error?: string;
  isLoading?: boolean;
}

export function InvestigationForm({ onSubmit, error, isLoading }: InvestigationFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  const formatCpfCnpj = (input: string) => {
    // Remove tudo que não é número
    const numbers = input.replace(/\D/g, '');
    
    if (numbers.length <= 11) {
      // Formato CPF: 000.000.000-00
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
    } else {
      // Formato CNPJ: 00.000.000/0000-00
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpfCnpj(e.target.value);
    setValue(formatted);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Ex: 01234567890 ou 12.345.678/0001-90"
          value={value}
          onChange={handleInputChange}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent transition-all duration-200"
          disabled={isLoading}
        />
        {error && (
          <p className="text-destructive text-sm font-medium">{error}</p>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-md transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
        disabled={isLoading || !value.trim()}
      >
        <span className={isLoading ? 'animate-pulse-subtle' : ''}>
          {isLoading ? '🔍 Investigando...' : '🔍 Iniciar investigação'}
        </span>
      </Button>
    </form>
  );
}