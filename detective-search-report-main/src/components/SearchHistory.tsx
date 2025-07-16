import { useState } from 'react';

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  result: any;
}

interface SearchHistoryProps {
  history: SearchHistoryItem[];
}

export function SearchHistory({ history }: SearchHistoryProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  if (history.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-base font-semibold text-foreground mb-3">🔍 Suas últimas buscas</h3>
        <p className="text-sm text-muted-foreground italic">Nenhuma busca realizada ainda.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-base font-semibold text-foreground mb-3">🔍 Suas últimas buscas</h3>
      <div className="space-y-2">
        {history.slice(-5).reverse().map((item) => (
          <details key={item.id} className="border border-border rounded-md">
            <summary 
              className="p-3 cursor-pointer hover:bg-secondary/50 transition-colors duration-200 text-sm font-medium"
              onClick={(e) => {
                e.preventDefault();
                toggleItem(item.id);
              }}
            >
              <span className="text-muted-foreground">
                {item.timestamp.toLocaleString('pt-BR')}
              </span>{' '}
              • <span className="text-foreground">{item.query}</span>
            </summary>
            {openItems.has(item.id) && (
              <div className="px-3 pb-3 border-t border-border bg-detective-report overflow-x-auto">
                <pre className="font-mono text-[10px] sm:text-xs text-foreground whitespace-pre leading-tight sm:leading-relaxed mt-2 min-w-0">
                  {typeof item.result === 'string' 
                    ? item.result 
                    : JSON.stringify(item.result, null, 2)}
                </pre>
              </div>
            )}
          </details>
        ))}
      </div>
    </div>
  );
}