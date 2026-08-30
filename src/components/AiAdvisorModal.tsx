import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ShieldAlert, BookOpen, RefreshCw } from 'lucide-react';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: any;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  initialContext,
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: 'Olá, meliponicultor! Sou o **MeliBot**, seu assistente especialista em Abelhas Sem Ferrão (ASF).\n\nComo posso te ajudar hoje? Posso orientar sobre combate a forídeos, receitas de alimentação, técnicas de divisão, modelos de caixa INPA e manejo do mel com alta umidade.',
    },
  ]);

  const [lastUserPrompt, setLastUserPrompt] = useState<string>('');

  if (!isOpen) return null;

  const quickPrompts = [
    '🪰 Como combater forídeos urgente na caixa?',
    '🍯 Como maturamento do mel de ASF com alta umidade?',
    '🌱 Qual a receita do xarope 1:1 e bife proteico?',
    '✂️ Como fazer divisão 1 para 1 com discos maduros?',
  ];

  const handleSend = async (userPromptText?: string) => {
    const textToSend = userPromptText || prompt;
    if (!textToSend.trim() || loading) return;

    setLastUserPrompt(textToSend);
    const newHistory = [...chatHistory, { sender: 'user' as const, text: textToSend }];
    setChatHistory(newHistory);
    if (!userPromptText) setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          hiveContext: initialContext,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setChatHistory([...newHistory, { sender: 'bot', text: data.text }]);
      } else if (data.error) {
        setChatHistory([
          ...newHistory,
          { sender: 'bot', text: `⚠️ ${data.error}` },
        ]);
      }
    } catch (err: any) {
      setChatHistory([
        ...newHistory,
        { sender: 'bot', text: '⚠️ O serviço de IA está temporariamente com alta demanda. Por favor, clique abaixo para tentar novamente.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-amber-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 p-4 px-6 text-white flex items-center justify-between border-b border-amber-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-400/40">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-amber-100 flex items-center space-x-2 tracking-tight">
                <span>MeliBot IA</span>
                <span className="bg-amber-500/30 text-amber-200 text-[10px] px-2 py-0.5 rounded-full border border-amber-400/30 font-sans font-medium">
                  Especialista ASF
                </span>
              </h2>
              <p className="text-xs text-amber-300">Consultoria técnica em Meliponicultura</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-amber-300 hover:text-white hover:bg-amber-800/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/60 text-xs">
          
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white font-medium shadow-sm'
                    : msg.text.startsWith('⚠️')
                    ? 'bg-rose-50 border border-rose-200 text-rose-900 shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-800 shadow-sm whitespace-pre-wrap'
                }`}
              >
                <div>{msg.text}</div>
                {msg.text.startsWith('⚠️') && lastUserPrompt && (
                  <div className="mt-2.5 pt-2 border-t border-rose-200/80 flex items-center justify-between">
                    <span className="text-[10px] text-rose-600">Alta demanda temporária nos servidores</span>
                    <button
                      onClick={() => handleSend(lastUserPrompt)}
                      disabled={loading}
                      className="bg-rose-700 hover:bg-rose-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-2xs cursor-pointer transition-colors"
                    >
                      <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                      <span>Tentar Novamente</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-stone-800 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-stone-400 p-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span>MeliBot está analisando seu meliponário...</span>
            </div>
          )}

        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-stone-100/80 border-t border-stone-200 overflow-x-auto no-scrollbar flex space-x-2">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 text-[11px] px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Digite sua dúvida sobre ASF, forídeos, divisão ou mel..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 border border-stone-300 rounded-2xl p-3 text-xs text-stone-800 focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white p-3 rounded-2xl font-bold shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
