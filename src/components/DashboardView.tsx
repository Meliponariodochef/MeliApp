import React from 'react';
import { 
  Box, 
  MapPin, 
  Droplets, 
  AlertTriangle, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ShieldAlert, 
  Calendar,
  Flower,
  Flame,
  ChevronRight,
  Bell,
  Clock,
  BookOpen
} from 'lucide-react';
import { Hive, Meliponary, HarvestRecord, InspectionRecord, BeeSpecies, ReminderRecord } from '../types';

interface DashboardViewProps {
  hives: Hive[];
  meliponaries: Meliponary[];
  harvests: HarvestRecord[];
  inspections: InspectionRecord[];
  speciesList: BeeSpecies[];
  reminders?: ReminderRecord[];
  setActiveTab: (tab: string) => void;
  onNewHarvest: () => void;
  onNewHive: () => void;
  onNewInspection: () => void;
  onOpenAiAdvisor: () => void;
  onToggleReminderComplete?: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  hives,
  meliponaries,
  harvests,
  inspections,
  speciesList,
  reminders = [],
  setActiveTab,
  onNewHarvest,
  onNewHive,
  onNewInspection,
  onOpenAiAdvisor,
  onToggleReminderComplete,
}) => {
  // Calculations
  const activeHives = hives.filter(h => h.status === 'Ativa' || h.status === 'Fortalecimento');
  
  // Total honey in Liters
  const honeyHarvests = harvests.filter(h => h.type === 'mel');
  const totalHoneyLiters = honeyHarvests.reduce((acc, curr) => {
    return acc + (curr.unit === 'L' ? curr.amount : curr.amount / 1000);
  }, 0);

  // Total propolis in grams
  const propolisHarvests = harvests.filter(h => h.type === 'propolis' || h.type === 'geopropolis');
  const totalPropolisGrams = propolisHarvests.reduce((acc, curr) => {
    return acc + (curr.unit === 'kg' ? curr.amount * 1000 : curr.amount);
  }, 0);

  // Estimated total value
  const totalValueBrl = harvests.reduce((acc, curr) => acc + (curr.estimatedValueBrl || 0), 0);

  // Urgent alerts (pests detected, weak hives, feeding due)
  const weakHives = hives.filter(h => h.strength <= 2 || h.queenStatus.includes('Sem Rainha'));
  const recentInspectionsWithPests = inspections.filter(i => i.pestsDetected && i.pestsDetected.length > 0);

  // Species distribution map
  const speciesCountMap = speciesList.map(s => {
    const count = hives.filter(h => h.speciesId === s.id).length;
    return { ...s, count };
  }).filter(s => s.count > 0);

  return (
    <div className="space-y-6">
      
      {/* Banner Welcome & AI Shortcut */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-emerald-800/60">
        <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none flex items-center pr-8">
          <Droplets className="w-72 h-72 text-amber-300" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/80 text-amber-300 text-xs px-3.5 py-1 rounded-full border border-amber-400/30 font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>MeliApp v2.0 • Meliponicultura & Preservação Florestal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif mb-2 text-amber-100">
            Resumo do Seu Meliponário
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
            Gerencie colmeias de Abelhas Sem Ferrão (ASF), controle extrações de mel com teor de umidade, registre manejos, monitore flora meliponófila e conserve o enxame nativo.
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            <button
              onClick={onNewHarvest}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-extrabold px-2.5 sm:px-4.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center sm:justify-start space-x-1.5 sm:space-x-2 shadow-xs transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span className="truncate">Colheita</span>
            </button>
            <button
              onClick={onNewHive}
              className="bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 font-bold px-2.5 sm:px-4.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center sm:justify-start space-x-1.5 sm:space-x-2 border border-emerald-700/60 transition-all cursor-pointer"
            >
              <Box className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">+ Nova Caixa</span>
            </button>
            <button
              onClick={() => setActiveTab('species')}
              className="bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 font-bold px-2.5 sm:px-4.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center sm:justify-start space-x-1.5 sm:space-x-2 border border-emerald-700/60 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate">Guia ASF</span>
            </button>
            <button
              onClick={onOpenAiAdvisor}
              className="bg-emerald-950/80 hover:bg-emerald-900 text-amber-300 font-bold px-2.5 sm:px-4.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center sm:justify-start space-x-1.5 sm:space-x-2 border border-amber-400/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">MeliBot IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Hives */}
        <div 
          onClick={() => setActiveTab('hives')}
          className="bg-white dark:bg-stone-900 p-5 rounded-2xl shadow-xs border border-stone-200/80 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Colmeias Ativas</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Box className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-stone-900 dark:text-stone-100 font-serif">{activeHives.length}</span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              {hives.length} registradas
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
            {meliponaries.length} meliponário(s) cadastrado(s)
          </p>
        </div>

        {/* Card 2: Honey Harvest */}
        <div 
          onClick={() => setActiveTab('production')}
          className="bg-white dark:bg-stone-900 p-5 rounded-2xl shadow-xs border border-stone-200/80 dark:border-stone-800 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Mel Produzido</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Droplets className="w-5 h-5 fill-amber-400 stroke-amber-800 dark:stroke-amber-300" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-stone-900 dark:text-stone-100 font-serif">{totalHoneyLiters.toFixed(1)}</span>
            <span className="text-sm font-semibold text-stone-600 dark:text-stone-400">Litros</span>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-400 font-semibold mt-2 flex items-center">
            Valor est. R$ {totalValueBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Card 3: Propolis & Subproducts */}
        <div 
          onClick={() => setActiveTab('production')}
          className="bg-white dark:bg-stone-900 p-5 rounded-2xl shadow-xs border border-stone-200/80 dark:border-stone-800 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Própolis & Subprodutos</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-stone-900 dark:text-stone-100 font-serif">{totalPropolisGrams}</span>
            <span className="text-sm font-semibold text-stone-600 dark:text-stone-400">gramas</span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
            Própolis verde, geoprópolis e cera
          </p>
        </div>

        {/* Card 4: Alerts */}
        <div 
          onClick={() => setActiveTab('inspections')}
          className="bg-white dark:bg-stone-900 p-5 rounded-2xl shadow-xs border border-stone-200/80 dark:border-stone-800 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Atenção & Manejos</span>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${
              weakHives.length > 0 ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800' : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-stone-900 dark:text-stone-100 font-serif">{weakHives.length + recentInspectionsWithPests.length}</span>
            <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">alertas</span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
            {weakHives.length} colméia(s) necessitam reforço
          </p>
        </div>

      </div>

      {/* Main Content Grid: Alerts & Species Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Urgent Attention Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">Atenção aos Manejos e Saúde</h2>
            </div>
            <button
              onClick={onNewInspection}
              className="text-xs font-bold text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 flex items-center space-x-1 cursor-pointer"
            >
              <span>+ Nova Revisão</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {weakHives.length === 0 && recentInspectionsWithPests.length === 0 ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-xl p-4 text-emerald-900 dark:text-emerald-200 flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Todas as colmeias em excelente estado!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300/80">Sem relatórios de pragas (forídeos/formigas) e sem colmeias com baixa população.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {weakHives.map(hive => (
                <div key={hive.id} className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl p-3.5 flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-bold flex items-center justify-center text-xs">
                      {hive.code}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{hive.code} - Caixa {hive.boxModel}</span>
                        <span className="bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          Saúde: {hive.strength}/5 ⭐
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                        Status Rainha: <strong className="text-stone-800 dark:text-stone-200">{hive.queenStatus}</strong> • {hive.notes}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onNewInspection}
                    className="text-xs bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-1 rounded-lg shadow-sm cursor-pointer"
                  >
                    Manejar
                  </button>
                </div>
              ))}

              {recentInspectionsWithPests.map(insp => (
                <div key={insp.id} className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl p-3.5 flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200 font-bold flex items-center justify-center text-xs">
                      ⚠️
                    </div>
                    <div>
                      <span className="font-bold text-sm text-rose-900 dark:text-rose-200">Alerta de Praga: {insp.hiveCode}</span>
                      <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5">
                        Detectado: {insp.pestsDetected.join(', ')} em {insp.date}. Ação: {insp.actionTaken || 'Inspeção pendente'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenAiAdvisor}
                    className="text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1 rounded-lg cursor-pointer"
                  >
                    Solução IA
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Reminders & Alerts Section */}
          <div className="mt-6 border-t border-stone-100 dark:border-stone-800 pt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center space-x-1.5">
                <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Próximos Lembretes & Alertas de Manejo</span>
              </h3>
              <button
                onClick={() => setActiveTab('reminders')}
                className="text-xs text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-bold flex items-center cursor-pointer"
              >
                <span>Ver Todos ({reminders.length})</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

            {reminders.filter(r => r.status !== 'Concluído').length === 0 ? (
              <div className="bg-stone-50 dark:bg-stone-800/60 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 text-center">
                Nenhum lembrete pendente para os próximos dias.
              </div>
            ) : (
              <div className="space-y-2">
                {reminders.filter(r => r.status !== 'Concluído').slice(0, 4).map(rem => (
                  <div
                    key={rem.id}
                    className="p-3 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-500 rounded-xl flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {onToggleReminderComplete && (
                        <button
                          onClick={() => onToggleReminderComplete(rem.id)}
                          className="text-stone-300 dark:text-stone-600 hover:text-emerald-600 dark:hover:text-emerald-400 p-0.5 cursor-pointer"
                          title="Concluir Lembrete"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-stone-900 dark:text-stone-100">{rem.title}</span>
                          {rem.hiveCode && (
                            <span className="bg-amber-100 dark:bg-amber-900/80 text-amber-950 dark:text-amber-200 font-bold px-1.5 py-0.2 rounded text-[10px]">
                              {rem.hiveCode}
                            </span>
                          )}
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            rem.priority === 'Urgente' || rem.priority === 'Alta' 
                              ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300' 
                              : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                          }`}>
                            {rem.priority}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center space-x-2 mt-0.5">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 text-stone-400 mr-1" />
                            {rem.dueDate} às {rem.dueTime || '09:00'}
                          </span>
                          <span>•</span>
                          <span>Frequência: {rem.frequency}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('reminders')}
                      className="text-[11px] text-amber-700 dark:text-amber-400 font-bold hover:underline cursor-pointer"
                    >
                      Detalhes
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Species Distribution & Quick Stats */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-200 dark:border-stone-800 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">Colmeias por Espécie</h3>
              <button
                onClick={() => setActiveTab('species')}
                className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center space-x-1 cursor-pointer"
                title="Abrir Guia de Espécies ASF"
              >
                <BookOpen className="w-3.5 h-3.5 mr-0.5" />
                <span>Ver Guia ASF</span>
              </button>
            </div>
            <div className="space-y-3">
              {speciesCountMap.map(s => {
                const percentage = Math.round((s.count / hives.length) * 100);
                return (
                  <div key={s.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-stone-800 dark:text-stone-200 font-bold">{s.popularName}</span>
                      <span className="text-stone-500 dark:text-stone-400">{s.count} caixa(s) ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meliponaries Summary */}
          <div className="border-t border-stone-100 dark:border-stone-800 pt-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-serif mb-3 flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Meliponários Registrados</span>
            </h3>
            <div className="space-y-2">
              {meliponaries.map(mel => {
                const melHives = hives.filter(h => h.meliponaryId === mel.id);
                return (
                  <div key={mel.id} className="p-2.5 bg-amber-50/50 dark:bg-stone-800/80 rounded-xl border border-amber-200/60 dark:border-stone-700 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">{mel.name}</h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">{mel.cityState}</p>
                    </div>
                    <span className="bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {melHives.length} caixas
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
