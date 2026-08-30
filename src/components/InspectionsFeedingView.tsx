import React, { useState } from 'react';
import { ClipboardCheck, Plus, Calendar, AlertTriangle, ShieldCheck, CheckSquare, Trash2, Zap } from 'lucide-react';
import { InspectionRecord, FeedingRecord, Hive } from '../types';

interface InspectionsFeedingViewProps {
  inspections: InspectionRecord[];
  feedings: FeedingRecord[];
  hives: Hive[];
  onAddInspection: (insp: Omit<InspectionRecord, 'id'>) => void;
  onAddFeeding: (feed: Omit<FeedingRecord, 'id'>) => void;
  onDeleteInspection: (id: string) => void;
  onDeleteFeeding: (id: string) => void;
  onOpenAiAdvisorWithContext: (hiveContext: any) => void;
}

export const InspectionsFeedingView: React.FC<InspectionsFeedingViewProps> = ({
  inspections,
  feedings,
  hives,
  onAddInspection,
  onAddFeeding,
  onDeleteInspection,
  onDeleteFeeding,
  onOpenAiAdvisorWithContext,
}) => {
  const [activeTab, setActiveTab] = useState<'revisoes' | 'alimentacao'>('revisoes');
  const [isInspModalOpen, setIsInspModalOpen] = useState(false);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);

  // Form Inspection
  const [inspForm, setInspForm] = useState<Omit<InspectionRecord, 'id'>>({
    hiveId: hives[0]?.id || '',
    hiveCode: hives[0]?.code || '',
    date: new Date().toISOString().split('T')[0],
    broodDisks: 'Excelente',
    foodStores: 'Suficiente',
    queenStatus: 'Fecundada',
    pestsDetected: [],
    boxHumidity: 'Normal',
    actionTaken: '',
    notes: '',
  });

  // Form Feeding
  const [feedForm, setFeedForm] = useState<Omit<FeedingRecord, 'id'>>({
    hiveId: hives[0]?.id || '',
    hiveCode: hives[0]?.code || '',
    date: new Date().toISOString().split('T')[0],
    feedType: 'Xarope de Açúcar 1:1',
    amount: '' as unknown as number,
    unit: 'ml',
    notes: '',
  });

  const pestOptions = [
    { id: 'forideos', label: '🪰 Forídeo (Pseudohypocera kerteszi)' },
    { id: 'formigas', label: '🐜 Formigas / Invasores' },
    { id: 'acaros', label: '🕷️ Ácaros no Ninho' },
    { id: 'umidade_alta', label: '💧 Umidade Excessiva / Mofo' },
  ];

  const handleInspHiveSelect = (hiveId: string) => {
    const hive = hives.find(h => h.id === hiveId);
    if (hive) {
      setInspForm({ ...inspForm, hiveId: hive.id, hiveCode: hive.code });
    }
  };

  const handleFeedHiveSelect = (hiveId: string) => {
    const hive = hives.find(h => h.id === hiveId);
    if (hive) {
      setFeedForm({ ...feedForm, hiveId: hive.id, hiveCode: hive.code });
    }
  };

  const togglePest = (pestId: string) => {
    const current = [...inspForm.pestsDetected];
    if (current.includes(pestId)) {
      setInspForm({ ...inspForm, pestsDetected: current.filter(p => p !== pestId) });
    } else {
      setInspForm({ ...inspForm, pestsDetected: [...current, pestId] });
    }
  };

  const handleOpenInspModal = () => {
    setInspForm({
      hiveId: hives[0]?.id || '',
      hiveCode: hives[0]?.code || '',
      date: new Date().toISOString().split('T')[0],
      broodDisks: 'Excelente',
      foodStores: 'Suficiente',
      queenStatus: 'Fecundada',
      pestsDetected: [],
      boxHumidity: 'Normal',
      actionTaken: '',
      notes: '',
    });
    setIsInspModalOpen(true);
  };

  const handleOpenFeedModal = () => {
    setFeedForm({
      hiveId: hives[0]?.id || '',
      hiveCode: hives[0]?.code || '',
      date: new Date().toISOString().split('T')[0],
      feedType: 'Xarope de Açúcar 1:1',
      amount: '' as unknown as number,
      unit: 'ml',
      notes: '',
    });
    setIsFeedModalOpen(true);
  };

  const handleInspSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddInspection(inspForm);
    setIsInspModalOpen(false);
  };

  const handleFeedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFeeding(feedForm);
    setIsFeedModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-serif text-stone-900 flex items-center space-x-2">
            <ClipboardCheck className="w-6 h-6 text-amber-600" />
            <span>Manejos, Inspeções & Alimentação</span>
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Checklist de saúde da colméia, inspeção dos discos de cria, monitoramento de forídeos e agenda de alimentação artificial.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleOpenInspModal}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nova Revisão</span>
          </button>
          <button
            onClick={handleOpenFeedModal}
            className="bg-stone-800 hover:bg-stone-900 text-amber-300 font-bold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>+ Alimentar</span>
          </button>
        </div>
      </div>

      {/* Mode Sub-tabs */}
      <div className="flex space-x-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('revisoes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'revisoes'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          🔍 Inspeções & Diagnósticos ({inspections.length})
        </button>
        <button
          onClick={() => setActiveTab('alimentacao')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'alimentacao'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          🍯 Registros de Alimentação ({feedings.length})
        </button>
      </div>

      {/* Tab 1: Inspections */}
      {activeTab === 'revisoes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inspections.map((insp) => (
              <div
                key={insp.id}
                className={`bg-white rounded-2xl border p-5 shadow-sm transition-all space-y-3 ${
                  insp.pestsDetected && insp.pestsDetected.length > 0
                    ? 'border-rose-300 bg-rose-50/20'
                    : 'border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-base text-amber-950 font-serif bg-amber-100 px-3 py-0.5 rounded-lg border border-amber-300">
                      {insp.hiveCode}
                    </span>
                    <span className="text-xs text-stone-400">📅 {insp.date}</span>
                  </div>
                  <button
                    onClick={() => onDeleteInspection(insp.id)}
                    className="text-stone-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Metrics Pill */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div>
                    <span className="text-stone-400 block">Discos de Cria:</span>
                    <strong className="text-stone-800">{insp.broodDisks}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Potes de Alimento:</span>
                    <strong className="text-stone-800">{insp.foodStores}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Rainha:</span>
                    <strong className="text-stone-800">{insp.queenStatus}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Umidade Interna:</span>
                    <strong className="text-stone-800">{insp.boxHumidity}</strong>
                  </div>
                </div>

                {/* Pests Alert if present */}
                {insp.pestsDetected && insp.pestsDetected.length > 0 && (
                  <div className="bg-rose-100/80 border border-rose-300 rounded-xl p-3 text-xs text-rose-900 flex items-start justify-between">
                    <div>
                      <span className="font-bold flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-700 mr-1" />
                        Pragas Detectadas: {insp.pestsDetected.join(', ')}
                      </span>
                      {insp.actionTaken && (
                        <p className="mt-1 text-[11px] text-rose-800">Ação realizada: {insp.actionTaken}</p>
                      )}
                    </div>
                    <button
                      onClick={() => onOpenAiAdvisorWithContext({ species: insp.hiveCode, pests: insp.pestsDetected })}
                      className="bg-rose-700 hover:bg-rose-800 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]"
                    >
                      Diagnóstico IA
                    </button>
                  </div>
                )}

                {insp.notes && (
                  <p className="text-xs text-stone-600 bg-stone-50 p-2 rounded-lg italic">
                    "{insp.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Feedings */}
      {activeTab === 'alimentacao' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-stone-100 text-xs">
            {feedings.map((feed) => (
              <div key={feed.id} className="p-4 hover:bg-amber-50/30 transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm">
                    🍯
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-stone-900 text-sm">{feed.hiveCode}</span>
                      <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px]">
                        {feed.feedType}
                      </span>
                      <span className="font-bold text-emerald-700">
                        {feed.amount} {feed.unit}
                      </span>
                    </div>
                    {feed.notes && (
                      <p className="text-stone-500 mt-0.5">{feed.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-stone-400">
                  <span>📅 {feed.date}</span>
                  <button
                    onClick={() => onDeleteFeeding(feed.id)}
                    className="hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add Inspection */}
      {isInspModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 border border-stone-200">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              Nova Revisão / Inspeção da Caixa
            </h2>

            <form onSubmit={handleInspSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Caixa *</label>
                  <select
                    value={inspForm.hiveId}
                    onChange={(e) => handleInspHiveSelect(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl p-2.5 font-bold"
                  >
                    {hives.map(h => (
                      <option key={h.id} value={h.id}>{h.code} - ({h.boxModel})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Data da Inspeção</label>
                  <input
                    type="date"
                    value={inspForm.date}
                    onChange={(e) => setInspForm({ ...inspForm, date: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Discos de Cria</label>
                  <select
                    value={inspForm.broodDisks}
                    onChange={(e: any) => setInspForm({ ...inspForm, broodDisks: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5"
                  >
                    <option value="Excelente">Excelente (Vários discos maduros)</option>
                    <option value="Bom">Bom (Ninho ativo)</option>
                    <option value="Regular">Regular (Poucos discos)</option>
                    <option value="Fraco">Fraco (Postura paralisada)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Potes de Alimento</label>
                  <select
                    value={inspForm.foodStores}
                    onChange={(e: any) => setInspForm({ ...inspForm, foodStores: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5"
                  >
                    <option value="Abundante">Abundante (Cheio)</option>
                    <option value="Suficiente">Suficiente</option>
                    <option value="Baixo">Baixo (Necessita xarope)</option>
                    <option value="Crítico">Crítico (Urgente! Fome)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Presença de Pragas / Invasores</label>
                <div className="grid grid-cols-2 gap-2">
                  {pestOptions.map(pest => (
                    <button
                      type="button"
                      key={pest.id}
                      onClick={() => togglePest(pest.id)}
                      className={`p-2 rounded-xl text-left font-medium border transition-all ${
                        inspForm.pestsDetected.includes(pest.id)
                          ? 'bg-rose-100 text-rose-900 border-rose-300 font-bold'
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {pest.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Ação Preventiva Tomada</label>
                <input
                  type="text"
                  placeholder="Ex: Colocada armadilha de vinagre para forídeos, limpo fundo da caixa."
                  value={inspForm.actionTaken}
                  onChange={(e) => setInspForm({ ...inspForm, actionTaken: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsInspModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Feeding */}
      {isFeedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 border border-stone-200">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              Registrar Alimentação Artificial
            </h2>

            <form onSubmit={handleFeedSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Caixa *</label>
                <select
                  value={feedForm.hiveId}
                  onChange={(e) => handleFeedHiveSelect(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl p-2.5 font-bold"
                >
                  {hives.map(h => (
                    <option key={h.id} value={h.id}>{h.code} - ({h.boxModel})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Tipo de Alimento</label>
                <select
                  value={feedForm.feedType}
                  onChange={(e: any) => setFeedForm({ ...feedForm, feedType: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5"
                >
                  <option value="Xarope de Açúcar 1:1">Xarope de Açúcar Cristal/VHP 1:1</option>
                  <option value="Xarope 2:1">Xarope Concentrado 2:1</option>
                  <option value="Bife Proteico">Bife Proteico (Pólen/Soja)</option>
                  <option value="Pasta de Pólen">Pasta de Pólen Maturado</option>
                  <option value="Água Potável">Água Limpa (Bebedouro)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Dose / Quantidade</label>
                  <input
                    type="number"
                    value={feedForm.amount}
                    onChange={(e) => setFeedForm({ ...feedForm, amount: Number(e.target.value) })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Unidade</label>
                  <select
                    value={feedForm.unit}
                    onChange={(e: any) => setFeedForm({ ...feedForm, unit: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5"
                  >
                    <option value="ml">Mililitros (ml)</option>
                    <option value="g">Gramas (g)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Data</label>
                <input
                  type="date"
                  value={feedForm.date}
                  onChange={(e) => setFeedForm({ ...feedForm, date: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsFeedModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
