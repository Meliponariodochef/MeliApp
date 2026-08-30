import React, { useState } from 'react';
import { Box, Plus, Search, Filter, QrCode, Calendar, AlertCircle, Edit2, Trash2, MapPin, Navigation, ShieldCheck, Crown, Bell, ExternalLink, Info, Camera, Image as ImageIcon, Upload, X, Sparkles } from 'lucide-react';
import { Hive, Meliponary, BeeSpecies } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface HivesViewProps {
  hives: Hive[];
  meliponaries: Meliponary[];
  speciesList: BeeSpecies[];
  selectedMeliponaryId?: string;
  onAddHive: (h: Omit<Hive, 'id' | 'qrCodeId'>) => void;
  onUpdateHive: (h: Hive) => void;
  onDeleteHive: (id: string) => void;
  onSelectHiveForQrTag: (hive: Hive) => void;
  onScheduleReminderForHive?: (hive: Hive) => void;
}

const PRESET_HIVE_IMAGES = [
  { label: 'Caixa Racional INPA', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80' },
  { label: 'Caixa AF Madeira', url: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80' },
  { label: 'Entrada de Cera', url: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80' },
  { label: 'Melgueira Cheia', url: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=800&q=80' },
];

export const HivesView: React.FC<HivesViewProps> = ({
  hives,
  meliponaries,
  speciesList,
  selectedMeliponaryId,
  onAddHive,
  onUpdateHive,
  onDeleteHive,
  onSelectHiveForQrTag,
  onScheduleReminderForHive,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('todos');
  const [filterMeliponary, setFilterMeliponary] = useState(selectedMeliponaryId || 'todos');
  const [filterStatus, setFilterStatus] = useState('todos');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHive, setEditingHive] = useState<Hive | null>(null);
  const [viewingHive, setViewingHive] = useState<Hive | null>(null);
  const [gettingGps, setGettingGps] = useState(false);

  const [formData, setFormData] = useState<Omit<Hive, 'id' | 'qrCodeId'>>({
    code: '',
    meliponaryId: meliponaries[0]?.id || '',
    speciesId: speciesList[0]?.id || 'jatai',
    boxModel: 'INPA',
    acquisitionType: 'Divisão',
    installationDate: new Date().toISOString().split('T')[0],
    locationDetails: '',
    gpsCoordinates: undefined,
    queenStatus: 'Fecundada',
    treatmentNotes: '',
    strength: 4,
    status: 'Ativa',
    lastInspectionDate: '',
    nextFeedingDate: '',
    notes: '',
    imageUrl: '',
  });

  const filteredHives = hives.filter((hive) => {
    const matchesSearch = hive.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hive.notes && hive.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (hive.locationDetails && hive.locationDetails.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (hive.treatmentNotes && hive.treatmentNotes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecies = filterSpecies === 'todos' || hive.speciesId === filterSpecies;
    const matchesMeliponary = filterMeliponary === 'todos' || hive.meliponaryId === filterMeliponary;
    const matchesStatus = filterStatus === 'todos' || hive.status === filterStatus;

    return matchesSearch && matchesSpecies && matchesMeliponary && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingHive(null);
    setFormData({
      code: '',
      meliponaryId: meliponaries[0]?.id || '',
      speciesId: speciesList[0]?.id || 'jatai',
      boxModel: 'INPA',
      acquisitionType: 'Divisão',
      installationDate: new Date().toISOString().split('T')[0],
      locationDetails: '',
      gpsCoordinates: undefined,
      queenStatus: 'Fecundada',
      treatmentNotes: '',
      strength: 4,
      status: 'Ativa',
      lastInspectionDate: '',
      nextFeedingDate: '',
      notes: '',
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (hive: Hive) => {
    setEditingHive(hive);
    setFormData({
      code: hive.code,
      meliponaryId: hive.meliponaryId,
      speciesId: hive.speciesId,
      boxModel: hive.boxModel,
      acquisitionType: hive.acquisitionType,
      installationDate: hive.installationDate,
      locationDetails: hive.locationDetails || '',
      gpsCoordinates: hive.gpsCoordinates,
      queenStatus: hive.queenStatus,
      treatmentNotes: hive.treatmentNotes || '',
      strength: hive.strength,
      status: hive.status,
      lastInspectionDate: hive.lastInspectionDate || '',
      nextFeedingDate: hive.nextFeedingDate || '',
      notes: hive.notes || '',
      imageUrl: hive.imageUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFetchGps = () => {
    if ('geolocation' in navigator) {
      setGettingGps(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            gpsCoordinates: {
              lat: Number(position.coords.latitude.toFixed(6)),
              lng: Number(position.coords.longitude.toFixed(6)),
            },
          });
          setGettingGps(false);
        },
        (error) => {
          alert(`Não foi possível obter a localização via GPS: ${error.message}`);
          setGettingGps(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert('Geolocalização não é suportada por este navegador.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code) return;

    if (editingHive) {
      onUpdateHive({
        ...editingHive,
        ...formData,
      });
    } else {
      onAddHive(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-serif text-stone-900 flex items-center space-x-2">
            <Box className="w-6 h-6 text-amber-600" />
            <span>Registro de Colmeias Individuais</span>
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Cadastro completo por ID de caixa, raça/espécie de abelha, localização GPS/manual, data de fundação, histórico de tratamentos e status da rainha.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Cadastrar Nova Colmeia</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          
          {/* Search Code */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar ID, raça, tratamento, local..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-800"
            />
          </div>

          {/* Filter Meliponary */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <select
              value={filterMeliponary}
              onChange={(e) => setFilterMeliponary(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-800"
            >
              <option value="todos">Todos Meliponários</option>
              {meliponaries.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* Filter Species */}
          <div>
            <select
              value={filterSpecies}
              onChange={(e) => setFilterSpecies(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-800"
            >
              <option value="todos">Todas Raças / Espécies</option>
              {speciesList.map((s) => (
                <option key={s.id} value={s.id}>{s.popularName} ({s.scientificName})</option>
              ))}
            </select>
          </div>

          {/* Filter Status */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-800"
            >
              <option value="todos">Todos Status</option>
              <option value="Ativa">Ativa</option>
              <option value="Fortalecimento">Em Fortalecimento</option>
              <option value="Órfã">Sem Rainha (Órfã)</option>
              <option value="Dividida">Dividida Recente</option>
            </select>
          </div>

        </div>
      </div>

      {/* Hives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHives.map((hive) => {
          const species = speciesList.find((s) => s.id === hive.speciesId);
          const meliponary = meliponaries.find((m) => m.id === hive.meliponaryId);

          return (
            <div
              key={hive.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Photo Banner / Thumbnail */}
              <div className="relative h-44 bg-stone-100 overflow-hidden border-b border-stone-100">
                {hive.imageUrl ? (
                  <img
                    src={hive.imageUrl}
                    alt={`Foto da colmeia ${hive.code}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-50/80 via-emerald-50/40 to-stone-100 flex flex-col items-center justify-center text-stone-400 p-4 text-center">
                    <Camera className="w-8 h-8 text-amber-600/60 mb-1" />
                    <span className="text-xs font-bold text-stone-600">Sem Foto Registrada</span>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(hive)}
                      className="mt-1 text-[11px] text-amber-700 hover:text-amber-900 font-bold underline"
                    >
                      + Adicionar Foto
                    </button>
                  </div>
                )}

                {/* Overlaid Badges on Image (Top Left) */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="font-extrabold text-sm text-emerald-950 font-mono bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs border border-amber-300">
                    {hive.code}
                  </span>
                  <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-xs border border-amber-400/30">
                    {hive.boxModel}
                  </span>
                </div>

                {/* Action Buttons (Top Right Overlay) */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs rounded-xl p-1 flex items-center space-x-0.5 shadow-xs border border-stone-200/80">
                  <button
                    onClick={() => setViewingHive(hive)}
                    className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Ver Detalhes / Ficha Técnica"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  {onScheduleReminderForHive && (
                    <button
                      onClick={() => onScheduleReminderForHive(hive)}
                      className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Agendar Lembrete"
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onSelectHiveForQrTag(hive)}
                    className="p-1.5 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Imprimir Tag QR"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(hive)}
                    className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Editar Foto & Dados"
                  >
                    <Camera className="w-4 h-4 text-amber-700" />
                  </button>
                  <button
                    onClick={() => onDeleteHive(hive.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Overlaid Status Badge (Bottom Left) */}
                <div className="absolute bottom-2 left-3">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-xs ${
                    hive.status === 'Ativa' ? 'bg-emerald-700 text-white' : 'bg-amber-700 text-white'
                  }`}>
                    {hive.status}
                  </span>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  
                  {/* Species / Bee Breed Title */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Raça / Espécie:</span>
                    <h3 className="font-bold text-stone-900 text-base leading-tight">{species?.popularName}</h3>
                    <p className="text-xs text-stone-400 italic">{species?.scientificName}</p>
                  </div>

                  {/* Location Entry (Manual + GPS) */}
                  <div className="mt-2 text-xs text-stone-600 space-y-1 bg-stone-50/80 p-2.5 rounded-xl border border-stone-100">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-medium">📍 Meliponário:</span>
                      <strong className="text-stone-800">{meliponary?.name || 'Não atribuído'}</strong>
                    </div>
                    {hive.locationDetails && (
                      <div className="text-[11px] text-stone-600">
                        <span>Posição: </span>
                        <strong className="text-stone-800">{hive.locationDetails}</strong>
                      </div>
                    )}
                    {hive.gpsCoordinates && (
                      <div className="flex items-center justify-between text-[11px] text-amber-800 pt-1 border-t border-stone-200/60">
                        <span className="flex items-center font-mono">
                          <MapPin className="w-3 h-3 text-amber-600 mr-1" />
                          {hive.gpsCoordinates.lat}, {hive.gpsCoordinates.lng}
                        </span>
                        <a
                          href={`https://maps.google.com/?q=${hive.gpsCoordinates.lat},${hive.gpsCoordinates.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-700 hover:underline font-bold flex items-center"
                        >
                          Ver Mapa <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Queen Status & Strength */}
                  <div className="mt-2.5 bg-amber-50/30 p-2.5 rounded-xl border border-amber-200/60 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 flex items-center">
                        <Crown className="w-3.5 h-3.5 text-amber-600 mr-1" />
                        Status da Rainha:
                      </span>
                      <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                        hive.queenStatus.includes('Órfã') 
                          ? 'bg-rose-100 text-rose-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {hive.queenStatus}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Força do Enxame:</span>
                      <span className="font-bold text-amber-700">
                        {'⭐'.repeat(hive.strength)} ({hive.strength}/5)
                      </span>
                    </div>
                  </div>

                  {/* Treatment Notes */}
                  {hive.treatmentNotes && (
                    <div className="mt-2 bg-rose-50/50 p-2 rounded-xl border border-rose-100 text-xs">
                      <span className="font-bold text-rose-900 flex items-center space-x-1 mb-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-600 mr-1" />
                        Notas de Sanidade:
                      </span>
                      <p className="text-stone-700 text-[11px] leading-snug line-clamp-2">{hive.treatmentNotes}</p>
                    </div>
                  )}
                </div>

                {/* Footer Founding Date */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center font-medium">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-amber-600" />
                    Fundação: {hive.installationDate}
                  </span>
                  <button
                    onClick={() => setViewingHive(hive)}
                    className="text-amber-700 hover:text-amber-900 font-bold"
                  >
                    Ficha Detalhada ➔
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Modal Hive Details / Full Card */}
      {viewingHive && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 border border-stone-200 my-8">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 font-serif font-black flex items-center justify-center text-xl border border-amber-300">
                  {viewingHive.code}
                </div>
                <div>
                  <h2 className="font-bold text-lg font-serif text-stone-900">
                    Ficha Técnica da Colmeia
                  </h2>
                  <p className="text-xs text-stone-500">
                    ID: {viewingHive.code} • Caixa Modelo {viewingHive.boxModel}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingHive(null)}
                className="px-3 py-1.5 text-stone-500 hover:bg-stone-100 rounded-xl text-xs font-bold"
              >
                Fechar
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Photo Display Banner in Modal */}
              <div className="relative h-52 bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-inner group">
                {viewingHive.imageUrl ? (
                  <img
                    src={viewingHive.imageUrl}
                    alt={`Foto da caixa ${viewingHive.code}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-50 to-emerald-50 flex flex-col items-center justify-center text-stone-400 p-4">
                    <Camera className="w-10 h-10 text-amber-600/50 mb-2" />
                    <span className="font-bold text-stone-600 text-xs">Sem foto cadastrada</span>
                  </div>
                )}
                
                <button
                  onClick={() => {
                    const h = viewingHive;
                    setViewingHive(null);
                    handleOpenEdit(h);
                  }}
                  className="absolute bottom-3 right-3 bg-emerald-900/90 hover:bg-emerald-950 text-white font-bold text-xs px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center space-x-1.5 border border-amber-400/40 shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-300" />
                  <span>{viewingHive.imageUrl ? 'Alterar Foto' : '+ Adicionar Foto'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div>
                  <span className="text-stone-400 block font-medium">Raça / Espécie:</span>
                  <strong className="text-stone-900 text-sm">
                    {speciesList.find(s => s.id === viewingHive.speciesId)?.popularName}
                  </strong>
                  <p className="text-[11px] text-stone-500 italic">
                    {speciesList.find(s => s.id === viewingHive.speciesId)?.scientificName}
                  </p>
                </div>

                <div>
                  <span className="text-stone-400 block font-medium">Data de Fundação:</span>
                  <strong className="text-stone-900 text-sm">{viewingHive.installationDate}</strong>
                  <p className="text-[11px] text-stone-500">Origem: {viewingHive.acquisitionType}</p>
                </div>

                <div>
                  <span className="text-stone-400 block font-medium">Meliponário:</span>
                  <strong className="text-stone-900">
                    {meliponaries.find(m => m.id === viewingHive.meliponaryId)?.name}
                  </strong>
                </div>

                <div>
                  <span className="text-stone-400 block font-medium">Status da Rainha:</span>
                  <strong className={`px-2 py-0.5 rounded text-[11px] inline-block mt-0.5 ${
                    viewingHive.queenStatus.includes('Órfã') ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {viewingHive.queenStatus}
                  </strong>
                </div>
              </div>

              {/* Location Box */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/70 space-y-2">
                <h4 className="font-bold text-amber-950 flex items-center space-x-1 text-sm">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Localização da Caixa</span>
                </h4>
                <p className="text-stone-800">
                  <strong className="text-stone-900">Entrada / Posição: </strong>
                  {viewingHive.locationDetails || 'Não informada'}
                </p>
                {viewingHive.gpsCoordinates ? (
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-amber-200/60">
                    <span className="font-mono text-stone-700">
                      GPS Lat/Lng: {viewingHive.gpsCoordinates.lat}, {viewingHive.gpsCoordinates.lng}
                    </span>
                    <a
                      href={`https://maps.google.com/?q=${viewingHive.gpsCoordinates.lat},${viewingHive.gpsCoordinates.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-amber-700 text-white font-bold px-3 py-1 rounded-xl flex items-center space-x-1"
                    >
                      <span>Abrir no Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <p className="text-stone-400 italic">Coordenadas GPS não registradas.</p>
                )}
              </div>

              {/* Treatments Box */}
              <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200/70 space-y-1.5">
                <h4 className="font-bold text-rose-950 flex items-center space-x-1 text-sm">
                  <ShieldCheck className="w-4 h-4 text-rose-700" />
                  <span>Histórico de Tratamentos & Sanidade</span>
                </h4>
                <p className="text-stone-800 leading-relaxed">
                  {viewingHive.treatmentNotes || 'Nenhum tratamento específico registrado até o momento.'}
                </p>
              </div>

              {/* Notes Box */}
              {viewingHive.notes && (
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  <span className="font-bold text-stone-700 block mb-1">Observações Gerais:</span>
                  <p className="text-stone-600 italic">"{viewingHive.notes}"</p>
                </div>
              )}

              {/* Bottom Quick Action */}
              <div className="flex space-x-2 pt-2">
                {onScheduleReminderForHive && (
                  <button
                    onClick={() => {
                      const hiveToRemind = viewingHive;
                      setViewingHive(null);
                      onScheduleReminderForHive(hiveToRemind);
                    }}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-2xl flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <Bell className="w-4 h-4" />
                    <span>+ Agendar Lembrete para {viewingHive.code}</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    const hiveToTag = viewingHive;
                    setViewingHive(null);
                    onSelectHiveForQrTag(hiveToTag);
                  }}
                  className="bg-stone-800 hover:bg-stone-900 text-amber-300 font-bold px-4 py-2.5 rounded-2xl flex items-center space-x-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Etiqueta QR</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Modal Add/Edit Hive */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-stone-200 my-8">
            <h2 className="text-lg font-bold font-serif text-stone-900">
              {editingHive ? 'Editar Caixa / Colmeia' : 'Cadastrar Nova Colmeia Individual'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Photo Upload Section */}
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-stone-800 flex items-center space-x-1.5">
                    <Camera className="w-4 h-4 text-amber-600" />
                    <span>Foto da Caixa / Enxame</span>
                  </label>
                  {formData.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: '' })}
                      className="text-[11px] text-rose-600 hover:underline font-bold flex items-center space-x-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Remover Foto</span>
                    </button>
                  )}
                </div>

                {formData.imageUrl ? (
                  <div className="relative h-36 rounded-xl overflow-hidden border-2 border-amber-400 group shadow-xs">
                    <img
                      src={formData.imageUrl}
                      alt="Preview da foto da caixa"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: '' })}
                        className="bg-rose-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-md"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remover Foto</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* File Upload / Camera Trigger */}
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-300 border-dashed rounded-xl cursor-pointer bg-white hover:bg-amber-50/50 hover:border-amber-400 transition-all">
                      <div className="flex flex-col items-center justify-center pt-2 pb-2 text-center">
                        <Upload className="w-5 h-5 text-amber-600 mb-1" />
                        <p className="text-[11px] text-stone-700 font-bold">
                          Clique para tirar foto ou carregar da galeria
                        </p>
                        <p className="text-[9px] text-stone-400">Suporta JPG, PNG ou câmera do celular</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>

                    {/* Image URL fallback */}
                    <div>
                      <span className="text-[10px] text-stone-500 font-medium block mb-1">Ou informe o link da foto (URL):</span>
                      <input
                        type="url"
                        placeholder="https://servidor.com/foto-caixa.jpg"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full border border-stone-300 rounded-xl p-2 text-[11px] text-stone-800 focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>

                    {/* Quick Preset Choice */}
                    <div>
                      <span className="text-[10px] text-stone-500 font-medium block mb-1">Ou selecione uma imagem de modelo:</span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {PRESET_HIVE_IMAGES.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                            className="relative h-12 rounded-lg overflow-hidden border border-stone-300 hover:border-amber-500 focus:ring-2 focus:ring-amber-500 transition-all group"
                            title={preset.label}
                          >
                            <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={handleImageError} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">ID da Colmeia (Código) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: JAT-01"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 uppercase font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Raça / Espécie de Abelha *</label>
                  <select
                    value={formData.speciesId}
                    onChange={(e) => setFormData({ ...formData, speciesId: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-bold"
                  >
                    {speciesList.map((s) => (
                      <option key={s.id} value={s.id}>{s.popularName} ({s.scientificName})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Meliponário *</label>
                  <select
                    value={formData.meliponaryId}
                    onChange={(e) => setFormData({ ...formData, meliponaryId: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  >
                    {meliponaries.length === 0 ? (
                      <option value="">Nenhum meliponário cadastrado (Geral)</option>
                    ) : (
                      meliponaries.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Modelo de Caixa Racional</label>
                  <select
                    value={formData.boxModel}
                    onChange={(e: any) => setFormData({ ...formData, boxModel: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="INPA">INPA</option>
                    <option value="AF">AF (Afonso Francoy)</option>
                    <option value="Capixaba">Capixaba</option>
                    <option value="Uberlândia">Uberlândia</option>
                    <option value="Racional">Racional Vertical</option>
                    <option value="Outro">Outro Cortiço / Tronco</option>
                  </select>
                </div>
              </div>

              {/* Location Entry (Manual + GPS Button) */}
              <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60 space-y-2">
                <label className="block font-bold text-amber-950 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Localização da Caixa</span>
                </label>
                
                <div>
                  <input
                    type="text"
                    placeholder="Descrição do local (Ex: Bancada A - Posição 01, Varanda Leste)"
                    value={formData.locationDetails}
                    onChange={(e) => setFormData({ ...formData, locationDetails: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleFetchGps}
                    disabled={gettingGps}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] flex items-center space-x-1 shadow-2xs disabled:opacity-50"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{gettingGps ? 'Obtendo GPS...' : ' Capturar Coordenadas GPS Atuais'}</span>
                  </button>

                  {formData.gpsCoordinates && (
                    <span className="font-mono text-[11px] text-amber-900 font-bold">
                      GPS: {formData.gpsCoordinates.lat}, {formData.gpsCoordinates.lng}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Data de Fundação / Instalação *</label>
                  <input
                    type="date"
                    required
                    value={formData.installationDate}
                    onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status da Rainha *</label>
                  <select
                    value={formData.queenStatus}
                    onChange={(e: any) => setFormData({ ...formData, queenStatus: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-bold"
                  >
                    <option value="Fecundada">Fecundada (Postura Ativa)</option>
                    <option value="Virgem">Virgem (Aguardando Voo)</option>
                    <option value="Realeza Presente">Realeza / Célula Real</option>
                    <option value="Sem Rainha (Órfã)">Sem Rainha (Órfã)</option>
                    <option value="Marcada com Cor do Ano">Marcada com Cor do Ano</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Notas de Tratamentos & Sanidade</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Aplicação de armadilha contra forídeos, sanitização de fundo, fitas de fresta..."
                  value={formData.treatmentNotes}
                  onChange={(e) => setFormData({ ...formData, treatmentNotes: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Origem do Enxame</label>
                  <select
                    value={formData.acquisitionType}
                    onChange={(e: any) => setFormData({ ...formData, acquisitionType: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Divisão">Divisão / Multiplicação</option>
                    <option value="Isca PET">Isca PET</option>
                    <option value="Resgate">Resgate Urbano/Muro</option>
                    <option value="Compra">Compra</option>
                    <option value="Enxame Natural">Enxame Natural</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Força da Colmeia (1 a 5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.strength}
                    onChange={(e) => setFormData({ ...formData, strength: Number(e.target.value) as any })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Observações Gerais</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Potes de mel cheios no ninho, campeiras muito ativas."
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
                  Salvar Colmeia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
