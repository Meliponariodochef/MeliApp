import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Phone,
  User, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  LogIn, 
  UserPlus, 
  KeyRound,
  Eye,
  EyeOff,
  TreePine,
  Droplets,
  Flower2,
  Box,
  QrCode,
  Shield,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AccessGateView: React.FC = () => {
  const { login, register, loginWithGoogle, loginAsDemoUser, resetPassword, loading } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Helper to detect if identifier is a phone number or email or username
  const isPhoneInput = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return false;
    if (trimmed.includes('@')) return false;
    const digits = trimmed.replace(/\D/g, '');
    return digits.length >= 8;
  };

  const resolveAuthIdentifier = (val: string): { authEmail: string; isPhone: boolean; type: 'email' | 'phone' | 'user' } => {
    const trimmed = val.trim();
    if (trimmed.includes('@')) {
      return { authEmail: trimmed.toLowerCase(), isPhone: false, type: 'email' };
    }
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length >= 8) {
      return { authEmail: `phone_${digits}@auth.meliapp.org`, isPhone: true, type: 'phone' };
    }
    // Alphanumeric username fallback (e.g. "carlos", "joao_silva")
    const cleanUser = trimmed.toLowerCase().replace(/[^a-z0-9_.-]/g, '');
    if (cleanUser.length >= 2) {
      return { authEmail: `user_${cleanUser}@auth.meliapp.org`, isPhone: false, type: 'user' };
    }
    return { authEmail: trimmed.toLowerCase(), isPhone: false, type: 'email' };
  };

  const resetFormState = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleModeChange = (newMode: 'login' | 'register' | 'forgot') => {
    resetFormState();
    setMode(newMode);
  };

  const parseFirebaseError = (err: any): string => {
    const msg = (err?.code || err?.message || '').toLowerCase();
    if (msg.includes('auth/operation-not-allowed')) {
      return 'O cadastro por e-mail/senha precisa estar habilitado no Firebase Auth. Utilize a opção "Entrar com Google" acima para acesso imediato.';
    }
    if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password') || msg.includes('auth/user-not-found') || msg.includes('invalid-login-credentials')) {
      return 'E-mail/telefone ou senha incorretos. Verifique suas credenciais e tente novamente.';
    }
    if (msg.includes('auth/email-already-in-use')) {
      return 'Este e-mail, telefone ou usuário já possui uma conta. Acesse a aba "Entrar" com sua senha ou faça login com o Google.';
    }
    if (msg.includes('auth/weak-password')) {
      return 'A senha precisa ter no mínimo 6 caracteres.';
    }
    if (msg.includes('auth/invalid-email')) {
      return 'Formato de e-mail ou identificador inválido. Digite um e-mail válido (ex: seu@email.com) ou telefone com DDD (ex: 11988887777).';
    }
    if (msg.includes('auth/too-many-requests')) {
      return 'Muitas tentativas consecutivas. Aguarde alguns instantes ou entre com Google.';
    }
    if (msg.includes('auth/user-disabled')) {
      return 'Esta conta foi temporariamente desativada.';
    }
    if (msg.includes('auth/network-request-failed')) {
      return 'Falha na conexão de rede. Verifique sua conexão com a internet.';
    }
    if (msg.includes('auth/popup-closed-by-user')) {
      return 'A janela do Google foi fechada antes de concluir o login.';
    }
    if (msg.includes('auth/popup-blocked')) {
      return 'O navegador bloqueou a janela pop-up do Google. Permita pop-ups para continuar.';
    }
    if (msg.includes('auth/unauthorized-domain')) {
      return 'Domínio não autorizado no Firebase Auth. Adicione este domínio no Firebase Console.';
    }
    return err?.message || 'Ocorreu um erro ao processar sua autenticação. Tente novamente.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();
    setSubmitting(true);

    try {
      if (!identifier.trim()) {
        setError('Por favor, informe seu e-mail ou número de telefone.');
        setSubmitting(false);
        return;
      }

      const { authEmail, isPhone } = resolveAuthIdentifier(identifier);

      if (mode === 'login') {
        if (!password) {
          setError('Por favor, informe sua senha de acesso.');
          setSubmitting(false);
          return;
        }
        await login(authEmail, password);
      } else if (mode === 'register') {
        if (!displayName.trim()) {
          setError('Por favor, informe seu nome ou nome do meliponário.');
          setSubmitting(false);
          return;
        }
        if (!password) {
          setError('Por favor, defina uma senha de acesso.');
          setSubmitting(false);
          return;
        }
        if (password.length < 6) {
          setError('A senha deve conter no mínimo 6 caracteres.');
          setSubmitting(false);
          return;
        }
        await register(authEmail, password, displayName);
      } else if (mode === 'forgot') {
        if (isPhone) {
          setError('A recuperação automática de senha por link exige um endereço de e-mail. Caso tenha cadastrado por telefone, entre em contato ou utilize o login com Google.');
          setSubmitting(false);
          return;
        }
        await resetPassword(authEmail);
        setSuccessMessage('Link de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
      }
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    resetFormState();
    setSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-between selection:bg-amber-400 selection:text-emerald-950 relative overflow-x-hidden overflow-y-auto">
      {/* Background Decorative Ambient Elements */}
      <div className="absolute -top-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Banner */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-md px-3 sm:px-6 lg:px-8 py-3 sm:py-4 relative z-10 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-emerald-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center overflow-hidden relative">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.5L20 7.1V16.9L12 21.5L4 16.9V7.1L12 2.5Z" stroke="#F59E0B" strokeWidth="1.8" strokeLinejoin="round" fill="#183d2e" fillOpacity="0.6" />
                  <path d="M12 6.5C9.8 9 8.5 11.2 8.5 13.5C8.5 15.4 10.1 17 12 17C13.9 17 15.5 15.4 15.5 13.5C15.5 11.2 14.2 9 12 6.5Z" fill="#10B981" fillOpacity="0.85" />
                  <path d="M7.5 11.5C9 10 11 9.5 12.5 9.5C14 9.5 16 10 17.5 11.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M9 13.8H15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="14" r="1.3" fill="#FEF08A" />
                </svg>
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-extrabold text-lg sm:text-2xl text-white font-serif tracking-tight truncate">MeliApp</span>
                <span className="bg-emerald-900/80 text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full font-bold border border-amber-400/30 flex items-center shrink-0">
                  <TreePine className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 inline mr-0.5" />
                  <span>ASF</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-emerald-300/80 font-medium hidden sm:block truncate">
                Gestão Sustentável de Meliponários e Abelhas Nativas
              </p>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <span className="inline-flex items-center space-x-1 bg-stone-800/90 text-stone-300 text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-stone-700">
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span className="font-medium">Acesso Restrito</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content: Split Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-5 sm:py-10 flex items-center justify-center relative z-10 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 w-full items-center">
          
          {/* Hero / Value Proposition (Orders 2nd on mobile, 1st on desktop for optimal mobile login UX) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Segurança e Sincronização em Nuvem</span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight leading-tight">
                Controle Profissional das Suas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400">Abelhas Nativas</span>
              </h1>
              <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-xl">
                Acesse sua conta para gerenciar caixas racionais, histórico de colheitas de mel com umidade, identificação botânica com IA, alertas zootécnicos e conservação das ASF.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
              <div className="bg-stone-800/60 border border-stone-700/80 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex items-start space-x-3 hover:border-emerald-500/50 transition-colors">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 shrink-0">
                  <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white">Meliponários & Colmeias</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">Organização por local, modelo INPA, discos de cria e QR Code individual.</p>
                </div>
              </div>

              <div className="bg-stone-800/60 border border-stone-700/80 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex items-start space-x-3 hover:border-emerald-500/50 transition-colors">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-amber-900/60 text-amber-300 border border-amber-700/50 shrink-0">
                  <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white">Produção de Mel & Manejos</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">Pesagem em ml/kg, controle de umidade, divisões, iscas PET e alimentações.</p>
                </div>
              </div>

              <div className="bg-stone-800/60 border border-stone-700/80 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex items-start space-x-3 hover:border-emerald-500/50 transition-colors">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 shrink-0">
                  <Flower2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white">Pasto Melífero & Botânica</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">Catálogo com mais de 70 espécies de árvores e arbustos nativos para ASF.</p>
                </div>
              </div>

              <div className="bg-stone-800/60 border border-stone-700/80 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex items-start space-x-3 hover:border-emerald-500/50 transition-colors">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-amber-900/60 text-amber-300 border border-amber-700/50 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white">Inteligência Artificial MeliBot</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">Consultor meliponícola em tempo real para prevenção de pragas e manejo.</p>
                </div>
              </div>
            </div>

            {/* Cloud & Security Trust Badge */}
            <div className="flex items-center space-x-2.5 text-[11px] sm:text-xs text-stone-400 pt-2 border-t border-stone-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sincronização criptografada via Google Firestore. Seus dados ficam 100% protegidos.</span>
            </div>
          </div>

          {/* Authentication Card (Orders 1st on mobile, 2nd on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-stone-950/95 border border-stone-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden box-border">
              
              {/* Subtle top amber highlight line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-500" />

              {/* Segmented Mode Selector with mobile-safe padding & typography */}
              <div className="flex p-1 bg-stone-900 rounded-xl sm:rounded-2xl border border-stone-800 mb-4 sm:mb-5 gap-0.5 sm:gap-1" role="tablist">
                <button
                  type="button"
                  id="tab-login"
                  data-testid="tab-login"
                  role="tab"
                  aria-selected={mode === 'login'}
                  onClick={() => handleModeChange('login')}
                  className={`flex-1 py-2 sm:py-2.5 px-1 sm:px-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1 sm:space-x-1.5 ${
                    mode === 'login'
                      ? 'bg-amber-400 text-emerald-950 shadow-md font-extrabold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="truncate">Entrar</span>
                </button>
                <button
                  type="button"
                  id="tab-register"
                  data-testid="tab-register"
                  role="tab"
                  aria-selected={mode === 'register'}
                  onClick={() => handleModeChange('register')}
                  className={`flex-1 py-2 sm:py-2.5 px-1 sm:px-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1 sm:space-x-1.5 ${
                    mode === 'register'
                      ? 'bg-amber-400 text-emerald-950 shadow-md font-extrabold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="truncate">Criar Conta</span>
                </button>
                <button
                  type="button"
                  id="tab-forgot"
                  data-testid="tab-forgot"
                  role="tab"
                  aria-selected={mode === 'forgot'}
                  onClick={() => handleModeChange('forgot')}
                  className={`flex-1 py-2 sm:py-2.5 px-1 sm:px-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1 sm:space-x-1.5 ${
                    mode === 'forgot'
                      ? 'bg-amber-400 text-emerald-950 shadow-md font-extrabold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <KeyRound className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="truncate">Recuperar</span>
                </button>
              </div>

              {/* Header Title for Current Mode */}
              <div className="mb-4 text-left">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
                  {mode === 'login' && 'Entrar no seu Meliponário'}
                  {mode === 'register' && 'Cadastre-se no MeliApp'}
                  {mode === 'forgot' && 'Recuperar Acesso à Conta'}
                </h2>
                <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5 sm:mt-1">
                  {mode === 'login' && 'Insira seus dados ou conecte-se direto com Google.'}
                  {mode === 'register' && 'Crie sua conta para registrar colônias e produções.'}
                  {mode === 'forgot' && 'Enviaremos um link para redefinição de senha.'}
                </p>
              </div>

              {/* Feedback Alerts */}
              {error && (
                <div className="mb-3.5 p-3 bg-rose-950/70 border border-rose-600/60 rounded-xl text-rose-200 text-xs flex items-start space-x-2 animate-fadeIn" role="alert">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-3.5 p-3 bg-emerald-950/70 border border-emerald-600/60 rounded-xl text-emerald-200 text-xs flex items-start space-x-2 animate-fadeIn" role="status">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{successMessage}</span>
                </div>
              )}

              {/* Google 1-Click Fast Sign-In - Mobile-optimized sizing */}
              {mode !== 'forgot' && (
                <div className="space-y-2.5 mb-4">
                  <button
                    type="button"
                    id="google-signin-btn"
                    data-testid="google-signin-button"
                    onClick={handleGoogleSignIn}
                    disabled={submitting}
                    className="w-full flex items-center justify-center space-x-2 sm:space-x-3 bg-white hover:bg-stone-100 text-stone-900 font-extrabold py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl border-2 border-amber-400/80 transition-all shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-50 group"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm font-black text-stone-900 tracking-tight truncate">
                      Entrar com Google
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-center text-emerald-400/90 font-medium">
                    ⚡ Acesso rápido, seguro e sem necessidade de senhas.
                  </p>

                  <div className="relative flex items-center justify-center my-2 sm:my-3">
                    <div className="border-t border-stone-800 w-full" />
                    <span className="bg-stone-950 px-2 sm:px-3 text-[10px] text-stone-500 uppercase tracking-wider font-semibold shrink-0">
                      ou com e-mail/celular
                    </span>
                    <div className="border-t border-stone-800 w-full" />
                  </div>
                </div>
              )}

              {/* Form Controls */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5" data-testid="auth-form">
                {mode === 'register' && (
                  <div>
                    <label htmlFor="auth-name" className="block text-xs font-semibold text-stone-300 mb-1">
                      Nome ou do Meliponário <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="auth-name"
                        name="name"
                        data-testid="auth-name-input"
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Ex: Carlos Silva ou Meliponário Florescer"
                        className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="auth-identifier" className="block text-xs font-semibold text-stone-300">
                      E-mail ou Telefone / Celular <span className="text-amber-400">*</span>
                    </label>
                    {identifier && (
                      <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-stone-800 text-amber-300 border border-stone-700">
                        {resolveAuthIdentifier(identifier).type === 'phone' ? '📱 Telefone' : resolveAuthIdentifier(identifier).type === 'user' ? '👤 Usuário' : '✉️ E-mail'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    {resolveAuthIdentifier(identifier).type === 'phone' ? (
                      <Phone className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
                    ) : (
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
                    )}
                    <input
                      id="auth-identifier"
                      name="email"
                      data-testid="auth-email-input"
                      type="text"
                      autoComplete="username"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="seuemail@exemplo.com ou (11) 98888-7777"
                      className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 outline-none transition-colors"
                    />
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-stone-400 mt-1">
                    Digite seu e-mail ou número de telefone com DDD.
                  </p>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="auth-password" className="block text-xs font-semibold text-stone-300">
                        Senha de Acesso <span className="text-amber-400">*</span>
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          id="forgot-password-link"
                          onClick={() => handleModeChange('forgot')}
                          className="text-[10px] sm:text-[11px] text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                        >
                          Esqueceu?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="auth-password"
                        name="password"
                        data-testid="auth-password-input"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-xl pl-9 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 cursor-pointer p-1"
                        aria-label="Alternar visualização da senha"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  id="auth-submit-btn"
                  data-testid="auth-submit-button"
                  disabled={submitting}
                  className="w-full mt-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] text-emerald-950 font-black py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="inline-flex items-center space-x-2">
                      <span className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                      <span>Autenticando...</span>
                    </span>
                  ) : (
                    <>
                      <span className="truncate">
                        {mode === 'login' && 'Entrar na Plataforma'}
                        {mode === 'register' && 'Concluir Cadastro'}
                        {mode === 'forgot' && 'Enviar E-mail de Recuperação'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] shrink-0" />
                    </>
                  )}
                </button>
              </form>

              {/* Mode Switching Helper Links */}
              <div className="mt-4 pt-3 border-t border-stone-800/80 text-center text-[11px] sm:text-xs text-stone-400">
                {mode === 'login' && (
                  <p>
                    Ainda não possui conta?{' '}
                    <button
                      type="button"
                      onClick={() => handleModeChange('register')}
                      className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                    >
                      Cadastre-se
                    </button>
                  </p>
                )}
                {mode === 'register' && (
                  <p>
                    Já é cadastrado?{' '}
                    <button
                      type="button"
                      onClick={() => handleModeChange('login')}
                      className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                    >
                      Faça login
                    </button>
                  </p>
                )}
                {mode === 'forgot' && (
                  <p>
                    Lembrou a senha?{' '}
                    <button
                      type="button"
                      onClick={() => handleModeChange('login')}
                      className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                    >
                      Voltar ao Login
                    </button>
                  </p>
                )}
              </div>

              {/* Fast Test & Demo Access */}
              <div className="mt-4 pt-3 border-t border-stone-800/80">
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-bold text-center mb-2">
                  Acesso Instantâneo para Demonstração / Testes
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => loginAsDemoUser('new_user')}
                    className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-emerald-300 border border-stone-700/80 text-[11px] font-bold transition-all cursor-pointer hover:border-emerald-500/50"
                  >
                    <span>🧪</span>
                    <span className="truncate">Novo Meliponicultor</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => loginAsDemoUser('admin')}
                    className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-700/80 text-[11px] font-bold transition-all cursor-pointer hover:border-amber-500/50"
                  >
                    <span>👑</span>
                    <span className="truncate">Administrador</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer Gating Notice */}
      <footer className="border-t border-stone-800/80 py-3 sm:py-4 px-3 sm:px-4 text-center text-[10px] sm:text-xs text-stone-500 bg-stone-950/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
          <span>MeliApp • Gestão de Abelhas Sem Ferrão (ASF)</span>
          <span className="text-[10px] sm:text-[11px] text-stone-600">Ambiente Protegido por Firebase Auth</span>
        </div>
      </footer>
    </div>
  );
};
