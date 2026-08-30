import React, { useState } from 'react';
import { GitFork, Plus, Calendar, CheckCircle2, Clock, Box, Trash2 } from 'lucide-react';
import { DivisionRecord, BaitTrapRecord, Hive, BeeSpecies } from '../types';

interface DivisionsTrapsViewProps {
  divisions: DivisionRecord[];
  traps: BaitTrapRecord[];
  hives: Hive[];
  speciesList: BeeSpecies[];
  onAddDivision: (div: Omit<DivisionRecord, 'id'>) => void;
  onAddTrap: (trap: Omit<BaitTrapRecord, 'id'>) => void;
  onDeleteDivision: (id: string) => void;
  onDeleteTrap: (id: string) => void;
}

export const DivisionsTrapsView: React.FC<DivisionsTrapsViewProps> = ({
  divisions,
  traps,
  hives,
  speciesList,
  onAddDivision,
  onAddTrap,
  onDeleteDivision,
  onDeleteTrap,
}) => {
  const [activeTab, setActiveTab] = useState<'divisoes' | 'iscas'>('divisoes');
  const [isDivModalOpen, setIsDivModalOpen] = useState(false);
  const [isTrapModalOpen, setIsTrapModalOpen] = useState(false);

  // Form Division
  const [divForm, setDivForm] = useState<Omit<DivisionRecord, 'id'>>({
    motherHiveId: hives[0]?.id || '',
    motherHiveCode: hives[0]?.code || '',
    daughterHiveCode: '',
    speciesId: hives[0]?.speciesId || 'jatai',
    divisionDate: new Date().toISOString().split('T')[0],
    method: '1 para 1',
    status: 'Em Observação',
    queenFlightExpectedDate: new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0],
    notes: '',
  });

  // Form Trap
  const [trapForm, setTrapForm] = useState<Omit<BaitTrapRecord, 'id'>>({
    meliponaryId: hives[0]?.meliponaryId || '',
    trapCode: '',
    locationName: '',
    dateSet: new Date().toISOString().split('T')[0],
    status: 'Instalada',
    notes: '',
  });

  const handleMotherHiveSelect = (hiveId: string) => {
    const hive = hives.find(h => h.id === hiveId);
    if (hive) {
      setDivForm({
        ...divForm,
        motherHiveId: hive.id,
        motherHiveCode: hive.code,
        speciesId: hive.speciesId,
      });
    }
  };

  const handleOpenDivModal = () => {
    const firstHive = hives[0];
    setDivForm({
      motherHiveId: firstHive?.id || '',
      motherHiveCode: firstHive?.code || '',
      daughterHiveCode: '',
      speciesId: firstHive?.speciesId || 'jatai',
      divisionDate: new Date().toISOString().split('T')[0],
      method: '1 para 1',
      status: 'Em Observação',
      queenFlightExpectedDate: new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0],
      notes: '',
    });
    setIsDivModalOpen(true);
  };

  const handleOpenTrapModal = () => {
    setTrapForm({
      meliponaryId: hives[0]?.meliponaryId || '',
      trapCode: '',
      locationName: '',
      dateSet: new Date().toISOString().split('T')[0],
      status: 'Instalada',
      notes: '',
    });
    setIsTrapModalOpen(true);
  };

  const handleDivSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDivision(divForm);
    setIsDivModalOpen(false);
  };

  const handleTrapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTrap(trapForm);
    setIsTrapModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-serif text-stone-900 flex items-center space-x-2">
            <GitFork className="w-6 h-6 text-amber-600" />
            <span>Multiplicações & Capturas (Iscas PET)</span>
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Acompanhamento de divisões de colônias (mãe → filha), estimativa de voo nupcial da rainha e gestão de iscas atrativas PET.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleOpenDivModal}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nova Divisão</span>
          </button>
          <button
            onClick={handleOpenTrapModal}
            className="bg-stone-800 hover:bg-stone-900 text-amber-300 font-bold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Box className="w-4 h-4 text-amber-400" />
            <span>+ Armar Isca PET</span>
          </button>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex space-x-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('divisoes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'divisoes'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          🌱 Divisões de Colmeias ({divisions.length})
        </button>
        <button
          onClick={() => setActiveTab('iscas')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'iscas'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          🥤 Iscas PET & Enxames Capturados ({traps.length})
        </button>
      </div>

      {/* Tab 1: Divisions */}
      {activeTab === 'divisoes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {divisions.map((div) => {
            const species = speciesList.find(s => s.id === div.speciesId);

            return (
              <div key={div.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-xs text-amber-950 font-serif bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                      Mãe: {div.motherHiveCode}
                    </span>
                    <span className="text-stone-400 font-bold">➔</span>
                    <span className="font-extrabold text-xs text-emerald-950 font-serif bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                      Filha: {div.daughterHiveCode}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteDivision(div.id)}
                    className="text-stone-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Espécie:</span>
                    <strong className="text-stone-800">{species?.popularName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Método de Divisão:</span>
                    <strong className="text-stone-800">{div.method}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Estimativa Voo Rainha:</span>
                    <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px]">
                      📅 {div.queenFlightExpectedDate}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 italic bg-amber-50/50 p-2 rounded-lg">
                  "{div.notes}"
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Traps */}
      {activeTab === 'iscas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {traps.map((trap) => (
            <div key={trap.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 font-mono bg-stone-100 px-2.5 py-1 rounded-lg">
                  {trap.trapCode}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  trap.status === 'Capturada' ? 'bg-emerald-100 text-emerald-800' :
                  trap.status === 'Transferida para Caixa' ? 'bg-amber-100 text-amber-900' :
                  'bg-stone-100 text-stone-700'
                }`}>
                  {trap.status}
                </span>
              </div>

              <div className="text-xs space-y-1 text-stone-600">
                <p>📍 Local: <strong className="text-stone-800">{trap.locationName}</strong></p>
                <p>📅 Instalada em: {trap.dateSet}</p>
                {trap.dateCaptured && (
                  <p className="text-emerald-700 font-bold">🎉 Capturada em: {trap.dateCaptured}</p>
                )}
              </div>

              {trap.notes && (
                <p className="text-xs text-stone-500 bg-stone-50 p-2 rounded-lg">
                  "{trap.notes}"
                </p>
              )}

              <div className="pt-2 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => onDeleteTrap(trap.id)}
                  className="text-stone-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Division */}
      {isDivModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 border border-stone-200">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              Registrar Divisão / Multiplicação
            </h2>

            <form onSubmit={handleDivSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Colméia Mãe (Doadora) *</label>
                <select
                  value={divForm.motherHiveId}
                  onChange={(e) => handleMotherHiveSelect(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl p-2.5 font-bold"
                >
                  {hives.map(h => (
                    <option key={h.id} value={h.id}>{h.code} - ({h.boxModel})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Código da Nova Caixa Filha *</label>
                <input
                  type="text"
                  required
                  value={divForm.daughterHiveCode}
                  onChange={(e) => setDivForm({ ...divForm, daughterHiveCode: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Método</label>
                  <select
                    value={divForm.method}
                    onChange={(e: any) => setDivForm({ ...divForm, method: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5"
                  >
                    <option value="1 para 1">1 para 1 (Mãe e Filha)</option>
                    <option value="Disco de Cria">Discos de Cria Maduros</option>
                    <option value="Mista (Várias Colônias)">Mista (Múltiplas doadoras)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Data da Divisão</label>
                  <input
                    type="date"
                    value={divForm.divisionDate}
                    onChange={(e) => setDivForm({ ...divForm, divisionDate: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Observações do Processo</label>
                <textarea
                  rows={2}
                  value={divForm.notes}
                  onChange={(e) => setDivForm({ ...divForm, notes: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsDivModalOpen(false)}
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

      {/* Modal Add Trap */}
      {isTrapModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 border border-stone-200">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              Cadastrar Nova Isca PET
            </h2>

            <form onSubmit={handleTrapSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Código da Isca *</label>
                <input
                  type="text"
                  required
                  value={trapForm.trapCode}
                  onChange={(e) => setTrapForm({ ...trapForm, trapCode: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 uppercase font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Local de Armação</label>
                <input
                  type="text"
                  placeholder="Ex: Tronco de Mangueira no Setor Leste"
                  value={trapForm.locationName}
                  onChange={(e) => setTrapForm({ ...trapForm, locationName: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Data de Instalação</label>
                <input
                  type="date"
                  value={trapForm.dateSet}
                  onChange={(e) => setTrapForm({ ...trapForm, dateSet: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Observações / Atrativo Usado</label>
                <input
                  type="text"
                  placeholder="Ex: Borrada com extrato alcoólico de própolis de Jataí"
                  value={trapForm.notes}
                  onChange={(e) => setTrapForm({ ...trapForm, notes: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsTrapModalOpen(false)}
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
