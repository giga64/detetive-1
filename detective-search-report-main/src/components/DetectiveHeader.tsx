import { Search } from 'lucide-react';

interface DetectiveHeaderProps {
  title?: string;
  subtitle?: string;
}

export function DetectiveHeader({ 
  title = "🕵️‍♂️ Detective CPF/CNPJ", 
  subtitle = "Insira o CPF ou CNPJ para a busca." 
}: DetectiveHeaderProps) {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Search className="w-5 h-5 text-accent" />
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </div>
      {subtitle && (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}