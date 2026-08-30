import React, { useState } from 'react';
import { Droplets, Plus, Filter, Flame, DollarSign, Tag, Calendar, Download, Trash2, Award } from 'lucide-react';
import { HarvestRecord, Hive, Meliponary, SubproductType } from '../types';

interface ProductionViewProps {
  harvests: HarvestRecord[];
  hives: Hive[];
  meliponaries: Meliponary[];
  onAddHarvest: (h: Omit<HarvestRecord, 'id'>) => void;
  onDeleteHarvest: (id: string) => void;
}

export const ProductionView: React.FC<ProductionViewProps> = ({
  harvests,
  hives,
  meliponaries,
  onAddHarvest,
  onDeleteHarvest,
}) => {
  const [filterType, setFilterType] = useState<string>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BLANK_HARVEST = {
    hiveId: hives[0]?.id || '',
    hiveCode: hives[0]?.code || '',
    meliponaryId: hives[0]?.meliponaryId || meliponaries[0]?.id || '',
    type: 'mel' as HarvestRecord['type'],
    amount: '' as unknown as number,
    unit: 'L' as HarvestRecord['unit'],
    moisturePercent: '' as unknown as number,
    brixDegrees: '' as unknown as number,
    harvestMethod: 'Sugador Elétrico' as HarvestRecord['harvestMethod'],
    harvestDate: new Date().toISOString().split('T')[0],
    lotNumber: '',
    notes: '',
    estimatedValueBrl: '' as unknown as number,
  };

  const [formData, setFormData] = useState<Omit<HarvestRecord, 'id'>>(BLANK_HARVEST);

  const handleOpenAddModal = () => {
    const defaultHive = hives[0];
    setFormData({
      ...BLANK_HARVEST,
      hiveId: defaultHive?.id || '',
      hiveCode: defaultHive?.code || '',
      meliponaryId: defaultHive?.meliponaryId || meliponaries[0]?.id || '',
    });
    setIsModalOpen(true);
  };

  const filteredHarvests = harvests.filter((h) => {
    if (filterType === 'todos') return true;
    return h.type === filterType;
  });

  const handleHiveSelectChange = (hiveId: string) => {
    const selectedHive = hives.find((h) => h.id === hiveId);
    if (selectedHive) {
      setFormData({
        ...formData,
        hiveId: selectedHive.id,
        hiveCode: selectedHive.code,
        meliponaryId: selectedHive.meliponaryId,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddHarvest({
      ...formData,
      amount: Number(formData.amount) || 0,
      moisturePercent: formData.moisturePercent ? Number(formData.moisturePercent) : undefined,
      brixDegrees: formData.brixDegrees ? Number(formData.brixDegrees) : undefined,
      estimatedValueBrl: formData.estimatedValueBrl ? Number(formData.estimatedValueBrl) : undefined,
    });
    setIsModalOpen(false);
    setFormData({ ...BLANK_HARVEST });
  };

  // Subproduct Stats Summary
  const honeyCountL = harvests
    .filter((h) => h.type === 'mel')
    .reduce((acc, h) => acc + (h.unit === 'L' ? h.amount : h.amount / 1000), 0);

  const propolisGrams = harvests
    .filter((h) => h.type === 'propolis' || h.type === 'geopropolis')
    .reduce((acc, h) => acc + (h.unit === 'kg' ? h.amount * 1000 : h.amount), 0);

  const polenGrams = harvests
    .filter((h) => h.type === 'polen')
    .reduce((acc, h) => acc + (h.unit === 'kg' ? h.amount * 1000 : h.amount), 0);

  const totalValue = harvests.reduce((acc, h) => acc + (h.estimatedValueBrl || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-serif text-stone-900 flex items-center space-x-2">
            <Droplets className="w-6 h-6 text-amber-600 fill-amber-500" />
            <span>Controle de Produção & Extrações</span>
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Registro detalhado de colheitas de Mel de ASF, Própolis, Geoprópolis, Pólen e Cera com parâmetro de umidade e rastreabilidade de lote.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Registrar Colheita</span>
        </button>
      </div>

      {/* Production Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-amber-950 p-4 rounded-2xl shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider opacity-80 block">Mel de ASF</span>
          <span className="text-2xl font-extrabold font-serif">{honeyCountL.toFixed(1)} L</span>
          <span className="text-xs font-medium block mt-1 opacity-90">Total colhido</span>
        </div>

        <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">Própolis / Geoprópolis</span>
          <span className="text-2xl font-extrabold font-serif">{propolisGrams} g</span>
          <span className="text-xs font-medium text-stone-300 block mt-1">Resina colhida</span>
        </div>

        <div className="bg-emerald-800 text-white p-4 rounded-2xl shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200 block">Pólen / Pão de Abelha</span>
          <span className="text-2xl font-extrabold font-serif">{polenGrams} g</span>
          <span className="text-xs font-medium text-emerald-100 block mt-1">Proteico puro</span>
        </div>

        <div className="bg-amber-100 border border-amber-300 text-amber-950 p-4 rounded-2xl shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 block">Valor Est. Total</span>
          <span className="text-2xl font-extrabold font-serif text-amber-900">
            R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-medium text-amber-800 block mt-1">Estimativa comercial</span>
        </div>

      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-4 h-4 text-stone-400 mr-1" />
          <span className="font-semibold text-stone-600 mr-2">Filtrar:</span>
          {[
            { id: 'todos', label: 'Todos Subprodutos' },
            { id: 'mel', label: '🍯 Mel' },
            { id: 'propolis', label: '🌱 Própolis / Geoprópolis' },
            { id: 'polen', label: '🌼 Pólen / Pão' },
            { id: 'cera', label: '🐝 Cera & Cerume' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                filterType === tab.id
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Harvests List */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-sm font-serif">Histórico de Extrações ({filteredHarvests.length})</h3>
        </div>

        <div className="divide-y divide-stone-100 text-xs">
          {filteredHarvests.length === 0 ? (
            <div className="p-8 text-center text-stone-400">
              Nenhuma extração registrada para este filtro.
            </div>
          ) : (
            filteredHarvests.map((harvest) => {
              const meliponary = meliponaries.find((m) => m.id === harvest.meliponaryId);

              return (
                <div key={harvest.id} className="p-4 hover:bg-amber-50/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left Info */}
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      harvest.type === 'mel' ? 'bg-amber-100 text-amber-800' :
                      harvest.type === 'propolis' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-stone-100 text-stone-800'
                    }`}>
                      {harvest.type === 'mel' ? '🍯' : harvest.type === 'propolis' ? '🌱' : '🐝'}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-stone-900 text-sm">{harvest.hiveCode}</span>
                        <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px]">
                          {harvest.amount} {harvest.unit}
                        </span>
                        <span className="text-stone-400 text-[11px] font-mono">
                          Lote: {harvest.lotNumber}
                        </span>
                      </div>

                      <p className="text-stone-500 mt-0.5">
                        Meliponário: <strong className="text-stone-700">{meliponary?.name || 'N/A'}</strong> • Método: {harvest.harvestMethod}
                      </p>

                      {harvest.notes && (
                        <p className="text-stone-600 italic mt-1 bg-stone-50 p-1.5 rounded border border-stone-200/60">
                          "{harvest.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quality Badges Right */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
                    {harvest.type === 'mel' && (
                      <div className="flex items-center space-x-2 text-[11px]">
                        {harvest.moisturePercent && (
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            harvest.moisturePercent > 28 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-900'
                          }`}>
                            Umidade: {harvest.moisturePercent}%
                          </span>
                        )}
                        {harvest.brixDegrees && (
                          <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                            {harvest.brixDegrees}° Brix
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center space-x-3 text-stone-500 text-[11px]">
                      <span>📅 {harvest.harvestDate}</span>
                      {harvest.estimatedValueBrl && (
                        <span className="font-bold text-emerald-700">R$ {harvest.estimatedValueBrl}</span>
                      )}
                      <button
                        onClick={() => onDeleteHarvest(harvest.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal Add Harvest */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 border border-stone-200">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              Registrar Nova Extração / Colheita
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Caixa / Colmeia *</label>
                  <select
                    value={formData.hiveId}
                    onChange={(e) => handleHiveSelectChange(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-bold"
                  >
                    {hives.map((h) => (
                      <option key={h.id} value={h.id}>{h.code} - ({h.boxModel})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Subproduto *</label>
                  <select
                    value={formData.type}
                    onChange={(e: any) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="mel">🍯 Mel de ASF</option>
                    <option value="propolis">🌱 Própolis Verde / Marrom</option>
                    <option value="geopropolis">🏺 Geoprópolis</option>
                    <option value="polen">🌼 Pólen / Pão de Abelha</option>
                    <option value="cera">🐝 Cera & Cerume</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Quantidade *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Unidade</label>
                  <select
                    value={formData.unit}
                    onChange={(e: any) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="L">Litros (L)</option>
                    <option value="ml">Mililitros (ml)</option>
                    <option value="g">Gramas (g)</option>
                    <option value="kg">Quilos (kg)</option>
                  </select>
                </div>
              </div>

              {formData.type === 'mel' && (
                <div className="grid grid-cols-2 gap-3 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <div>
                    <label className="block font-semibold text-amber-900 mb-1">Umidade do Mel (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 24.5%"
                      value={formData.moisturePercent || ''}
                      onChange={(e) => setFormData({ ...formData, moisturePercent: Number(e.target.value) })}
                      className="w-full border border-amber-300 rounded-xl p-2 text-amber-950 font-bold bg-white"
                    />
                    <span className="text-[10px] text-amber-700 mt-0.5 block">Meles de ASF têm 22-30% de umidade</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-amber-900 mb-1">Brix Refratômetro (°Brix)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 74"
                      value={formData.brixDegrees || ''}
                      onChange={(e) => setFormData({ ...formData, brixDegrees: Number(e.target.value) })}
                      className="w-full border border-amber-300 rounded-xl p-2 text-amber-950 font-bold bg-white"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Método de Extração</label>
                  <select
                    value={formData.harvestMethod}
                    onChange={(e: any) => setFormData({ ...formData, harvestMethod: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800"
                  >
                    <option value="Sugador Elétrico">Sugador Elétrico Vacuômetro</option>
                    <option value="Seringa Manual">Seringa Manual Estéril</option>
                    <option value="Prensagem">Prensagem Racional</option>
                    <option value="Raspagem">Raspagem de Cera/Própolis</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Número de Lote</label>
                  <input
                    type="text"
                    value={formData.lotNumber}
                    onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Data da Colheita</label>
                  <input
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Valor Estimado (R$)</label>
                  <input
                    type="number"
                    value={formData.estimatedValueBrl || ''}
                    onChange={(e) => setFormData({ ...formData, estimatedValueBrl: Number(e.target.value) })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Observações da Extração</label>
                <input
                  type="text"
                  placeholder="Ex: Mel aromático, cor clara, armazenado a frio."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 font-semibold hover:bg-stone-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-sm"
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
