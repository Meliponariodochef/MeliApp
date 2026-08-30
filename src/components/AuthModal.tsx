import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone,
  Lock, 
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
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, loginWithGoogle, loginAsDemoUser, resetPassword, loading } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

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
      return 'O provedor de cadastro com E-mail/Telefone não está ativado no console do Firebase deste projeto. Utilize o botão "Continuar com Google" para entrar instantaneamente com 1 clique.';
    }
    if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password') || msg.includes('auth/user-not-found') || msg.includes('invalid-login-credentials')) {
      return 'E-mail, telefone ou senha incorretos. Verifique suas credenciais.';
    }
    if (msg.includes('auth/email-already-in-use')) {
      return 'Este e-mail ou telefone já está cadastrado. Tente entrar com sua senha ou recuperar o acesso.';
    }
    if (msg.includes('auth/weak-password')) {
      return 'A senha deve ter no mínimo 6 caracteres.';
    }
    if (msg.includes('auth/invalid-email')) {
      return 'Formato de e-mail ou telefone inválido. Digite um e-mail válido ou telefone com DDD (ex: 11988887777).';
    }
    if (msg.includes('auth/too-many-requests')) {
      return 'Muitas tentativas consecutivas. Aguarde alguns instantes ou entre com Google.';
    }
    if (msg.includes('auth/user-disabled')) {
      return 'Esta conta foi temporariamente desativada.';
    }
    if (msg.includes('auth/network-request-failed')) {
      return 'Falha na conexão de rede. Verifique sua internet e tente novamente.';
    }
    if (msg.includes('auth/popup-closed-by-user')) {
      return 'O login com Google foi cancelado antes da conclusão.';
    }
    if (msg.includes('auth/popup-blocked')) {
      return 'A janela pop-up do Google foi bloqueada pelo navegador. Permita pop-ups para autenticar.';
    }
    if (msg.includes('auth/unauthorized-domain')) {
      return 'Domínio de hospedagem não autorizado no Firebase Auth. Acesse o console do Firebase para adicionar o domínio.';
    }
    return err?.message || 'Ocorreu um erro ao processar sua solicitação. Tente novamente.';
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
          setError('Por favor, informe sua senha.');
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
          setError('A recuperação automática de senha por link exige um endereço de e-mail. Caso tenha cadastrado por telefone, utilize o login com Google.');
          setSubmitting(false);
          return;
        }
        await resetPassword(authEmail);
        setSuccessMessage('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-amber-200/60 flex flex-col relative">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 p-1.5 rounded-full transition-colors z-10"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 px-6 py-6 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <span className="text-2xl">🐝</span>
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif leading-tight">
                {mode === 'login' && 'Entrar no Meliponário'}
                {mode === 'register' && 'Criar Conta de Meliponicultor'}
                {mode === 'forgot' && 'Recuperar Acesso'}
              </h2>
              <p className="text-xs text-amber-100 mt-0.5">
                {mode === 'login' && 'Acesse seus enxames, inspeções e dados em nuvem'}
                {mode === 'register' && 'Banco de dados individualizado com sincronização em tempo real'}
                {mode === 'forgot' && 'Enviaremos um link de redefinição de senha'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          
          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm flex flex-col gap-2.5 animate-shake">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
              {error.includes('Google') && (
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={submitting || loading}
                  className="w-full mt-1 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Entrar com Google Agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Google Sign-in Button (Shown in Login & Register) */}
          {mode !== 'forgot' && (
            <div className="space-y-4 mb-5">
              <div className="relative">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={submitting || loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-amber-50/50 text-stone-800 font-semibold rounded-xl border-2 border-amber-300/80 shadow-xs hover:shadow-md transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continuar com Google</span>
                  <span className="ml-auto text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    1-Clique
                  </span>
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-stone-200 w-full" />
                <span className="bg-white px-3 text-xs text-stone-400 uppercase tracking-wider font-semibold">
                  ou com e-mail e senha
                </span>
                <div className="border-t border-stone-200 w-full" />
              </div>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Display Name (Register Only) */}
            {mode === 'register' && (
              <div>
                <label htmlFor="modal-auth-name" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Seu Nome ou Meliponário
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="modal-auth-name"
                    name="name"
                    data-testid="modal-auth-name-input"
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ex: André Silva (Meliponário Jataí)"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {/* Identifier Field (Email or Phone) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="modal-auth-identifier" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  E-mail ou Telefone / Celular
                </label>
                {identifier && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-stone-100 text-amber-800 border border-stone-200">
                    {resolveAuthIdentifier(identifier).type === 'phone' ? '📱 Telefone' : resolveAuthIdentifier(identifier).type === 'user' ? '👤 Usuário' : '✉️ E-mail'}
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  {resolveAuthIdentifier(identifier).type === 'phone' ? (
                    <Phone className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                </div>
                <input
                  id="modal-auth-identifier"
                  name="email"
                  data-testid="modal-auth-email-input"
                  type="text"
                  autoComplete="username"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="seu-email@exemplo.com ou (11) 98888-7777"
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                />
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Informe seu e-mail ou telefone com DDD para acessar ou se cadastrar.
              </p>
            </div>

            {/* Password Field (Login & Register) */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="modal-auth-password" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Senha
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      id="modal-forgot-password-link"
                      onClick={() => handleModeChange('forgot')}
                      className="text-xs text-amber-700 hover:text-amber-800 font-semibold hover:underline cursor-pointer"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="modal-auth-password"
                    name="password"
                    data-testid="modal-auth-password-input"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'register' ? 'Mínimo de 6 caracteres' : '••••••••'}
                    className="w-full pl-9 pr-10 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              id="modal-auth-submit-btn"
              data-testid="modal-auth-submit-button"
              disabled={submitting || loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' && <LogIn className="w-4 h-4" />}
                  {mode === 'register' && <UserPlus className="w-4 h-4" />}
                  {mode === 'forgot' && <KeyRound className="w-4 h-4" />}
                  <span>
                    {mode === 'login' && 'Entrar na Conta'}
                    {mode === 'register' && 'Concluir Cadastro'}
                    {mode === 'forgot' && 'Enviar Link de Redefinição'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Mode Switch Footer */}
          <div className="mt-6 pt-4 border-t border-stone-200 text-center text-xs text-stone-600">
            {mode === 'login' && (
              <p>
                Não tem uma conta ainda?{' '}
                <button
                  type="button"
                  onClick={() => handleModeChange('register')}
                  className="font-bold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
                >
                  Criar conta gratuita
                </button>
              </p>
            )}

            {mode === 'register' && (
              <p>
                Já possui uma conta?{' '}
                <button
                  type="button"
                  onClick={() => handleModeChange('login')}
                  className="font-bold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
                >
                  Entrar agora
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                Lembrou da senha?{' '}
                <button
                  type="button"
                  onClick={() => handleModeChange('login')}
                  className="font-bold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
                >
                  Voltar para o Login
                </button>
              </p>
            )}
          </div>

          {/* Quick Demo Access */}
          <div className="mt-4 pt-3 border-t border-stone-200">
            <p className="text-[10px] uppercase tracking-wider text-stone-500 font-bold text-center mb-2">
              Acesso Rápido para Testes
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginAsDemoUser('new_user')}
                className="py-1.5 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-[11px] font-bold transition-all cursor-pointer truncate"
              >
                🧪 Novo Meliponicultor
              </button>
              <button
                type="button"
                onClick={() => loginAsDemoUser('admin')}
                className="py-1.5 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-amber-800 border border-amber-300 text-[11px] font-bold transition-all cursor-pointer truncate"
              >
                👑 Administrador
              </button>
            </div>
          </div>

          {/* Cloud Info Badge */}
          <div className="mt-4 p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-[11px] text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Banco de Dados Firestore em Nuvem</span>
            </div>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Ativo
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
