import React from 'react';
import { Download, Upload, FileSpreadsheet, X, FileText, CheckCircle2 } from 'lucide-react';
import { Meliponary, Hive, HarvestRecord, InspectionRecord, FeedingRecord } from '../types';

interface ExportBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  hives: Hive[];
  meliponaries: Meliponary[];
  harvests: HarvestRecord[];
  inspections: InspectionRecord[];
  feedings: FeedingRecord[];
  onImportData: (data: any) => void;
}

export const ExportBackupModal: React.FC<ExportBackupModalProps> = ({
  isOpen,
  onClose,
  hives,
  meliponaries,
  harvests,
  inspections,
  feedings,
  onImportData,
}) => {
  if (!isOpen) return null;

  const handleExportJson = () => {
    const backupData = {
      meliponaries,
      hives,
      harvests,
      inspections,
      feedings,
      exportedAt: new Date().toISOString(),
      app: 'MeliApp Meliponicultura v2.0',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `meliapp_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.hives || parsed.meliponaries) {
            onImportData(parsed);
            alert('Dados importados com sucesso!');
            onClose();
          } else {
            alert('Arquivo inválido.');
          }
        } catch (err) {
          alert('Erro ao ler arquivo JSON.');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-lg font-serif text-stone-900">
              Relatórios & Backup de Dados
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          
          {/* Backup Summary Stats */}
          <div className="bg-amber-50/60 border border-amber-200/60 p-4 rounded-2xl space-y-1 text-stone-800">
            <h4 className="font-bold text-sm text-amber-950 font-serif mb-2">Resumo dos Dados Atuais:</h4>
            <p>• {meliponaries.length} Meliponário(s) cadastrado(s)</p>
            <p>• {hives.length} Colmeias / Caixas Racionais</p>
            <p>• {harvests.length} Registros de Extração de Mel / Subprodutos</p>
            <p>• {inspections.length} Revisões e Inspeções de Saúde</p>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportJson}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center space-x-2 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Backup Completo (JSON)</span>
          </button>

          {/* Import Button */}
          <div className="relative">
            <label className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-3 rounded-2xl flex items-center justify-center space-x-2 border border-stone-300 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-stone-600" />
              <span>Importar Backup (JSON)</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>
          </div>

          <p className="text-[11px] text-stone-400 text-center leading-relaxed">
            Seus dados ficam armazenados com segurança no seu navegador com persistência total e podem ser exportados a qualquer momento.
          </p>

        </div>

      </div>
    </div>
  );
};
