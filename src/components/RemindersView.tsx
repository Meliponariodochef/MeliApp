import React, { useState } from 'react';
import { Bell, Plus, Calendar, CheckCircle2, AlertTriangle, Clock, Mail, Smartphone, Filter, Trash2, Edit3, ShieldAlert, Sparkles, Send } from 'lucide-react';
import { ReminderRecord, ReminderTaskType, ReminderPriority, ReminderFrequency, Hive, Meliponary } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface RemindersViewProps {
  reminders: ReminderRecord[];
  hives: Hive[];
  meliponaries: Meliponary[];
  onAddReminder: (r: Omit<ReminderRecord, 'id' | 'createdAt'>) => void;
  onUpdateReminder: (r: ReminderRecord) => void;
  onDeleteReminder: (id: string) => void;
  onToggleComplete: (id: string) => void;
  preselectedHiveId?: string;
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  reminders,
  hives,
  meliponaries,
  onAddReminder,
  onUpdateReminder,
  onDeleteReminder,
  onToggleComplete,
  preselectedHiveId,
}) => {
  const { currentUser, userProfile } = useAuth();
  const userEmail = userProfile?.email || currentUser?.email || '';

  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [filterHive, setFilterHive] = useState<string>(preselectedHiveId || 'todos');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<ReminderRecord | null>(null);
  const [testNotificationSent, setTestNotificationSent] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ReminderRecord, 'id' | 'createdAt'>>({
    title: '',
    taskType: 'inspection',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '09:00',
    hiveId: hives[0]?.id || '',
    hiveCode: hives[0]?.code || '',
    meliponaryId: meliponaries[0]?.id || '',
    priority: 'Média',
    status: 'Pendente',
    frequency: 'Uma vez',
    notifyInApp: true,
    notifyEmail: true,
    emailAddress: userEmail,
    notifyPush: true,
    notes: '',
  });

  const categoryLabels: Record<ReminderTaskType, { name: string; bg: string; iconBg: string }> = {
    inspection: { name: 'Inspeção de Colmeia', bg: 'bg-blue-50 text-blue-800 border-blue-200', iconBg: 'bg-blue-100 text-blue-700' },
    treatment: { name: 'Tratamento & Sanidade', bg: 'bg-rose-50 text-rose-800 border-rose-200', iconBg: 'bg-rose-100 text-rose-700' },
    feeding: { name: 'Alimentação Artificial', bg: 'bg-amber-50 text-amber-800 border-amber-200', iconBg: 'bg-amber-100 text-amber-700' },
    harvest: { name: 'Planejamento de Colheita', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', iconBg: 'bg-emerald-100 text-emerald-700' },
    queen: { name: 'Voo Nupcial & Rainha', bg: 'bg-purple-50 text-purple-800 border-purple-200', iconBg: 'bg-purple-100 text-purple-700' },
    other: { name: 'Outro Manejo', bg: 'bg-stone-50 text-stone-800 border-stone-200', iconBg: 'bg-stone-100 text-stone-700' },
  };

  const priorityBadges: Record<ReminderPriority, string> = {
    Urgente: 'bg-rose-600 text-white font-bold',
    Alta: 'bg-amber-500 text-white font-bold',
    Média: 'bg-blue-600 text-white font-medium',
    Baixa: 'bg-stone-200 text-stone-700 font-medium',
  };

  const filteredReminders = reminders.filter((r) => {
    const matchesStatus = filterStatus === 'todos' || r.status === filterStatus;
    const matchesCategory = filterCategory === 'todos' || r.taskType === filterCategory;
    const matchesHive = filterHive === 'todos' || r.hiveId === filterHive;
    return matchesStatus && matchesCategory && matchesHive;
  });

  const handleOpenAdd = () => {
    setEditingReminder(null);
    const selectedHive = hives.find(h => h.id === preselectedHiveId) || hives[0];
    setFormData({
      title: '',
      taskType: 'inspection',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '09:00',
      hiveId: selectedHive?.id || '',
      hiveCode: selectedHive?.code || '',
      meliponaryId: selectedHive?.meliponaryId || meliponaries[0]?.id || '',
      priority: 'Média',
      status: 'Pendente',
      frequency: 'Uma vez',
      notifyInApp: true,
      notifyEmail: true,
      emailAddress: userEmail,
      notifyPush: true,
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rem: ReminderRecord) => {
    setEditingReminder(rem);
    setFormData({
      title: rem.title,
      taskType: rem.taskType,
      dueDate: rem.dueDate,
      dueTime: rem.dueTime || '09:00',
      hiveId: rem.hiveId || '',
      hiveCode: rem.hiveCode || '',
      meliponaryId: rem.meliponaryId || '',
      priority: rem.priority,
      status: rem.status,
      frequency: rem.frequency,
      notifyInApp: rem.notifyInApp,
      notifyEmail: rem.notifyEmail,
      emailAddress: rem.emailAddress || userEmail,
      notifyPush: rem.notifyPush,
      notes: rem.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingReminder) {
      onUpdateReminder({
        ...editingReminder,
        ...formData,
      });
    } else {
      onAddReminder(formData);
    }
    setIsModalOpen(false);
  };

  const handleTriggerTestNotification = (rem: ReminderRecord) => {
    const channels = [];
    if (rem.notifyInApp) channels.push('In-App');
    if (rem.notifyEmail && rem.emailAddress) channels.push(`E-mail (${rem.emailAddress})`);
    if (rem.notifyPush) channels.push('Push Web');

    const msg = `🔔 Notificação enviada para "${rem.title}" via: ${channels.join(', ')}`;
    setTestNotificationSent(msg);
    setTimeout(() => setTestNotificationSent(null), 5000);
  };

  const pendingCount = reminders.filter(r => r.status === 'Pendente').length;
  const overdueCount = reminders.filter(r => r.status === 'Atrasado').length;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold font-serif text-stone-900 flex items-center space-x-2">
              <Bell className="w-6 h-6 text-amber-600" />
              <span>Sistema de Alertas & Lembretes de Manejo</span>
            </h1>
          </div>
          <p className="text-stone-500 text-sm mt-1">
            Programe inspeções, tratamentos sanitários, alimentação e colheitas com alertas In-App, e-mail e notificações push.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200 text-xs">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>
              <strong className="text-amber-950 font-bold">{pendingCount}</strong> pendentes •{' '}
              <strong className="text-rose-700 font-bold">{overdueCount}</strong> atrasados
            </span>
          </div>

          <button
            onClick={handleOpenAdd}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Novo Lembrete</span>
          </button>
        </div>
      </div>

      {/* Banner test message */}
      {testNotificationSent && (
        <div className="bg-emerald-900 text-emerald-100 p-4 rounded-2xl shadow-lg border border-emerald-700 flex items-center justify-between animate-fade-in text-xs font-semibold">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-300" />
            <span>{testNotificationSent}</span>
          </div>
          <button
            onClick={() => setTestNotificationSent(null)}
            className="text-emerald-300 hover:text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-800"
            >
              <option value="todos">Todos os Status</option>
              <option value="Pendente">Pendentes</option>
              <option value="Atrasado">Atrasados</option>
              <option value="Concluído">Concluídos</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-800"
            >
              <option value="todos">Todas Categorias de Manejo</option>
              <option value="inspection">Inspeção de Colmeia</option>
              <option value="treatment">Tratamento & Sanidade</option>
              <option value="feeding">Alimentação Artificial</option>
              <option value="harvest">Planejamento de Colheita</option>
              <option value="queen">Voo Nupcial & Rainha</option>
              <option value="other">Outro Manejo</option>
            </select>
          </div>

          {/* Hive Filter */}
          <div>
            <select
              value={filterHive}
              onChange={(e) => setFilterHive(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-800"
            >
              <option value="todos">Todas Colmeias</option>
              {hives.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.code} ({speciesListFind(h.speciesId)})
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center space-y-3">
            <Bell className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-700">Nenhum lembrete encontrado</h3>
            <p className="text-stone-400 text-xs">
              Altere os filtros acima ou crie um novo lembrete para gerenciar as tarefas do meliponário.
            </p>
          </div>
        ) : (
          filteredReminders.map((rem) => {
            const cat = categoryLabels[rem.taskType];
            const isCompleted = rem.status === 'Concluído';
            const isOverdue = rem.status === 'Atrasado';

            return (
              <div
                key={rem.id}
                className={`bg-white rounded-2xl p-5 border shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'border-stone-200 bg-stone-50/60 opacity-80'
                    : isOverdue
                    ? 'border-rose-300 bg-rose-50/20'
                    : 'border-stone-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Complete Button */}
                  <button
                    onClick={() => onToggleComplete(rem.id)}
                    className={`mt-1 p-1 rounded-full transition-colors ${
                      isCompleted ? 'text-emerald-600 hover:text-emerald-700' : 'text-stone-300 hover:text-emerald-500'
                    }`}
                    title={isCompleted ? 'Marcar como pendente' : 'Marcar como concluído'}
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </button>

                  <div className="space-y-2">
                    {/* Title and Category Badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`font-bold text-base ${isCompleted ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                        {rem.title}
                      </h3>

                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border ${cat.bg}`}>
                        {cat.name}
                      </span>

                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${priorityBadges[rem.priority]}`}>
                        {rem.priority}
                      </span>

                      {rem.hiveCode && (
                        <span className="bg-amber-100 text-amber-950 font-serif font-extrabold text-xs px-2 py-0.5 rounded border border-amber-300">
                          {rem.hiveCode}
                        </span>
                      )}
                    </div>

                    {/* Dates & Recurrence */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-medium">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>Data: <strong>{rem.dueDate}</strong> às <strong>{rem.dueTime || '09:00'}</strong></span>
                      </span>

                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>Frequência: <strong>{rem.frequency}</strong></span>
                      </span>

                      {/* Status Tag */}
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isOverdue
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {rem.status}
                      </span>
                    </div>

                    {/* Notification Channels */}
                    <div className="flex items-center space-x-3 text-[11px] text-stone-600 pt-1">
                      <span className="text-stone-400 font-medium">Canais de Alerta:</span>
                      {rem.notifyInApp && (
                        <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded flex items-center space-x-1">
                          <Bell className="w-3 h-3 text-amber-600" />
                          <span>No App</span>
                        </span>
                      )}
                      {rem.notifyEmail && (
                        <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-blue-600" />
                          <span>E-mail ({rem.emailAddress || 'Sim'})</span>
                        </span>
                      )}
                      {rem.notifyPush && (
                        <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded flex items-center space-x-1">
                          <Smartphone className="w-3 h-3 text-purple-600" />
                          <span>Push Web</span>
                        </span>
                      )}
                    </div>

                    {/* Notes */}
                    {rem.notes && (
                      <p className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                        "{rem.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center space-x-2 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                  <button
                    onClick={() => handleTriggerTestNotification(rem)}
                    className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors"
                    title="Simular e testar notificação"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Testar Notificação</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(rem)}
                    className="p-2 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors"
                    title="Editar Lembrete"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteReminder(rem.id)}
                    className="p-2 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Excluir Lembrete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Add / Edit Reminder */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-stone-200 my-8">
            <h2 className="text-lg font-bold font-serif text-stone-900 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-amber-600" />
              <span>{editingReminder ? 'Editar Lembrete de Manejo' : 'Agendar Novo Lembrete'}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Título do Lembrete *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Inspeção de discos de cria, Fornecer xarope 1:1, Tratar forídeos..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-medium text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tipo de Manejo *</label>
                  <select
                    value={formData.taskType}
                    onChange={(e: any) => setFormData({ ...formData, taskType: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-bold"
                  >
                    <option value="inspection">Inspeção de Colmeia</option>
                    <option value="treatment">Tratamento & Sanidade</option>
                    <option value="feeding">Alimentação Artificial</option>
                    <option value="harvest">Planejamento de Colheita</option>
                    <option value="queen">Voo Nupcial & Rainha</option>
                    <option value="other">Outro Manejo</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Prioridade *</label>
                  <select
                    value={formData.priority}
                    onChange={(e: any) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500 font-bold"
                  >
                    <option value="Urgente">Urgente</option>
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
              </div>

              {/* Hive selection */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Vincular à Colmeia (Opcional)</label>
                <select
                  value={formData.hiveId}
                  onChange={(e) => {
                    const selHive = hives.find(h => h.id === e.target.value);
                    setFormData({
                      ...formData,
                      hiveId: e.target.value,
                      hiveCode: selHive ? selHive.code : '',
                      meliponaryId: selHive ? selHive.meliponaryId : formData.meliponaryId,
                    });
                  }}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Nenhuma (Geral do Meliponário)</option>
                  {hives.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.code} - {speciesListFind(h.speciesId)} (Modelo {h.boxModel})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Data *</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Horário</label>
                  <input
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Recorrência</label>
                  <select
                    value={formData.frequency}
                    onChange={(e: any) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Uma vez">Uma vez</option>
                    <option value="Diário">Diário</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Quinzenal">Quinzenal</option>
                    <option value="Mensal">Mensal</option>
                  </select>
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/70 space-y-2.5">
                <span className="font-bold text-amber-950 block text-xs">Canais de Notificação & Alerta</span>

                <div className="flex flex-col space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifyInApp}
                      onChange={(e) => setFormData({ ...formData, notifyInApp: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-semibold text-stone-800">Notificação In-App (Sino no topo do aplicativo)</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifyEmail}
                      onChange={(e) => setFormData({ ...formData, notifyEmail: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-semibold text-stone-800">Notificação via E-mail</span>
                  </label>

                  {formData.notifyEmail && (
                    <div className="pl-6">
                      <input
                        type="email"
                        placeholder="Endereço de e-mail para receber o alerta..."
                        value={formData.emailAddress}
                        onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                        className="w-full border border-stone-300 rounded-xl p-2 bg-white text-stone-800 text-xs"
                      />
                    </div>
                  )}

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifyPush}
                      onChange={(e) => setFormData({ ...formData, notifyPush: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-semibold text-stone-800">Notificação Push (Navegador / Dispositivo Móvel)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Instruções / Notas do Manejo</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Utilizar xarope morno com promotor L, checar postura nos discos novos."
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
                  Salvar Lembrete
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );

  function speciesListFind(speciesId: string) {
    switch (speciesId) {
      case 'jatai': return 'Jataí';
      case 'mandaçaia': return 'Mandaçaia MQA';
      case 'uruçu_nordestina': return 'Uruçu Nordestina';
      case 'irai': return 'Iraí';
      case 'tiuba': return 'Tiúba';
      case 'tubiba': return 'Tubiba';
      default: return speciesId;
    }
  }
};
