interface ReportDisplayProps {
  data: any;
  query: string;
}

export function ReportDisplay({ data, query }: ReportDisplayProps) {
  const formatReport = (data: any) => {
    if (!data) return 'Nenhum dado encontrado.';
    
    // Simula um relatório de investigação
    const report = `
╔════════════════════════════════════════╗
║           RELATÓRIO DE INVESTIGAÇÃO    ║
╠════════════════════════════════════════╣
║ Doc: ${query}
║ Status: CONCLUÍDA
║ Data: ${new Date().toLocaleString('pt-BR')}
║ 
║ RESULTADOS:
║ • Nome: ${data.nome || 'Não informado'}
║ • Situação: ${data.situacao || 'Ativa'}
║ • Registro: ${data.dataRegistro || 'N/A'}
║ • Endereço: ${data.endereco || 'N/A'}
║ 
║ OBSERVAÇÕES:
║ ✓ Documento válido
║ ✓ Consulta realizada
║ ⚠ Fonte pública
║
╚════════════════════════════════════════╝`;

    return report.trim();
  };

  return (
    <div className="bg-detective-report border-2 border-dashed border-detective-border rounded-md p-2 sm:p-4 overflow-x-auto">
      <pre className="font-mono text-[10px] sm:text-xs text-foreground whitespace-pre leading-tight sm:leading-relaxed min-w-0">
        {formatReport(data)}
      </pre>
    </div>
  );
}