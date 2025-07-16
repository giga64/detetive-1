import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DetectiveContainer } from '@/components/DetectiveContainer';
import { DetectiveHeader } from '@/components/DetectiveHeader';
import { ReportDisplay } from '@/components/ReportDisplay';
import { SearchHistory } from '@/components/SearchHistory';
import { useEffect, useState } from 'react';

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  result: any;
}

export default function Result() {
  const location = useLocation();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const { data, query } = location.state || {};

  useEffect(() => {
    // Carrega histórico do localStorage
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    // Converte strings de data de volta para objetos Date
    const parsedHistory = savedHistory.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
    setHistory(parsedHistory);
  }, []);

  if (!data || !query) {
    return (
      <DetectiveContainer>
        <DetectiveHeader 
          title="🚫 Erro" 
          subtitle="Dados não encontrados" 
        />
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            🔙 Nova busca
          </Link>
        </div>
      </DetectiveContainer>
    );
  }

  return (
    <DetectiveContainer>
      <DetectiveHeader 
        title="🕵️‍♂️ Detective CPF/CNPJ" 
        subtitle="Relatório da busca" 
      />
      
      <ReportDisplay data={data} query={query} />
      
      <SearchHistory history={history} />
      
      <div className="mt-6 text-center">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          🔙 Nova busca
        </Link>
      </div>
    </DetectiveContainer>
  );
}