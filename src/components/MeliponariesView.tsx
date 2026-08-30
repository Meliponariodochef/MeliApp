import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Box, Flower2, Calendar, FileText } from 'lucide-react';
import { Meliponary, Hive } from '../types';

interface MeliponariesViewProps {
  meliponaries: Meliponary[];
  hives: Hive[];
  onAddMeliponary: (m: Omit<Meliponary, 'id' | 'createdAt'>) => void;
  onUpdateMeliponary: (m: Meliponary) => void;
  onDeleteMeliponary: (id: string) => void;
  onSelectMeliponaryForHives: (meliponaryId: string) => void;
}

export const MeliponariesView: React.FC<MeliponariesViewProps> = ({
  meliponaries,
  hives,
  onAddMeliponary,
  onUpdateMeliponary,
  onDeleteMeliponary,
  onSelectMeliponaryForHives,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMel, setEditingMel] = useState<Meliponary | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    cityState: '',
    floraDescription: '',
    notes: '',
  });

  const handleOpenAddModal = () => {
    setEditingMel(null);
    setFormData({
      name: '',
      location: '',
      cityState: '',
      floraDescription: '',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (mel: Meliponary) => {
    setEditingMel(mel);
    setFormData({
      name: mel.name,
      location: mel.location,
      cityState: mel.cityState,
      floraDescription: mel.floraDescription,
      notes: mel.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingMel) {
      onUpdateMeliponary({
        ...editingMel,
        ...formData,
      });
    } else {
      onAddMeliponary(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-serif text-stone-900 flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-amber-600" />
            <span>Gerenciamento de Meliponários</span>
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Cadastre os locais físicos, pastos meliponófilos e acompanhe as colmeias instaladas em cada meliponário.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Novo Meliponário</span>
        </button>
      </div>

      {/* Meliponaries Grid or Empty State */}
      {meliponaries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-600 border border-amber-200">
            <MapPin className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-stone-900 font-serif">Nenhum meliponário cadastrado</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Cadastre o seu primeiro meliponário (local das caixas, sítio, quintal ou varanda) para começar a organizar suas colônias de abelhas.
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm inline-flex items-center space-x-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Meu Primeiro Meliponário</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meliponaries.map((mel) => {
            const melHives = hives.filter((h) => h.meliponaryId === mel.id);
            const activeCount = melHives.filter((h) => h.status === 'Ativa').length;

            return (
              <div
                key={mel.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                        <MapPin className="w-6 h-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-stone-900 font-serif">{mel.name}</h3>
                        <p className="text-xs text-stone-500">{mel.location} • {mel.cityState}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenEditModal(mel)}
                        className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteMeliponary(mel.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info Pills */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <span className="text-stone-400 block font-medium">Total de Caixas</span>
                      <span className="font-bold text-stone-800 text-sm flex items-center mt-0.5">
                        <Box className="w-4 h-4 text-amber-600 mr-1" />
                        {melHives.length} caixa(s) ({activeCount} ativas)
                      </span>
                    </div>
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <span className="text-stone-400 block font-medium">Data de Cadastro</span>
                      <span className="font-bold text-stone-800 text-sm flex items-center mt-0.5">
                        <Calendar className="w-4 h-4 text-amber-600 mr-1" />
                        {mel.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Flora Description */}
                  <div className="mt-4 bg-amber-50/60 border border-amber-200/50 p-3 rounded-xl">
                    <span className="text-xs font-bold text-amber-900 flex items-center space-x-1 mb-1">
                      <Flower2 className="w-3.5 h-3.5 text-amber-700" />
                      <span>Flora Predominante / Pasto Meliponófilo:</span>
                    </span>
                    <p className="text-xs text-amber-800 leading-relaxed">{mel.floraDescription || 'Não informada'}</p>
                  </div>

                  {mel.notes && (
                    <div className="mt-2 text-xs text-stone-500 flex items-start space-x-1">
                      <FileText className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 mt-0.5" />
                      <span>{mel.notes}</span>
                    </div>
                  )}
                </div>

                {/* Action */}
                <button
                  onClick={() => onSelectMeliponaryForHives(mel.id)}
                  className="w-full bg-stone-100 hover:bg-amber-600 hover:text-white text-stone-800 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Box className="w-4 h-4" />
                  <span>Ver Caixas deste Meliponário ({melHives.length})</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 border border-stone-200">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              {editingMel ? 'Editar Meliponário' : 'Novo Meliponário'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nome do Meliponário *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Meliponário Sol Nascente"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Localização Interna</label>
                  <input
                    type="text"
                    placeholder="Ex: Sítio Primavera / Setor Sul"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Cidade - Estado</label>
                  <input
                    type="text"
                    placeholder="Ex: Campinas - SP"
                    value={formData.cityState}
                    onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Flora / Pasto Apícola Local</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Assa-peixe, Dombéia, Manacá-da-Serra, Citros, Eucalipto"
                  value={formData.floraDescription}
                  onChange={(e) => setFormData({ ...formData, floraDescription: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Observações e Estrutura</label>
                <input
                  type="text"
                  placeholder="Ex: Bancada de alvenaria com proteção contra formigas e vento"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
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
