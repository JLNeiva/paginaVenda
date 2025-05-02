import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, User, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

interface AuthButtonProps {
  initialShowForm?: boolean;
}

export function AuthButton({ initialShowForm = false }: AuthButtonProps) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(initialShowForm);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setShowForm(initialShowForm);
  }, [initialShowForm]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        if (password !== passwordConfirm) {
          setError('As senhas não coincidem');
          setLoading(false);
          return;
        }
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        
        if (error) throw error;
        
        alert('Cadastro realizado com sucesso! Verifique seu email para continuar.');
        setShowForm(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        navigate('/dashboard');
        setShowForm(false);
      }
      
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro ao processar sua solicitação';
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Por favor, confirme seu email antes de fazer login';
      } else if (error.message.includes('Password should be at least 6 characters')) {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres';
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'Este email já está cadastrado';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      alert('Email de recuperação enviado! Verifique sua caixa de entrada.');
      setIsForgotPassword(false);
      setShowForm(false);
    } catch (error: any) {
      setError('Erro ao enviar email de recuperação. Verifique o email informado.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowForm(false);
      setError('');
      setIsRegistering(false);
    }
  };

  return (
    <div className="relative">
      {user ? (
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Fazer logout"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span>Sair</span>
        </button>
      ) : (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Abrir formulário de autenticação"
            aria-expanded={showForm}
          >
            <User className="h-4 w-4" />
            <span>Área do cliente</span>
          </button>

          {showForm && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={handleClickOutside}
            >
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4" role="dialog" aria-modal="true">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {isRegistering ? 'Criar Conta' : isForgotPassword ? 'Recuperar Senha' : 'Login'}
                </h2>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                <form onSubmit={isForgotPassword ? handleForgotPassword : handleAuth} className="space-y-4">
                  <div>
                    <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="auth-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-100"
                      placeholder="seu@email.com"
                      aria-describedby={error ? "auth-error" : undefined}
                    />
                  </div>
                  
                  {!isForgotPassword && (
                    <>
                      <div>
                        <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700">
                          Senha
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="auth-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-100"
                            placeholder="••••••••"
                            aria-describedby={error ? "auth-error" : undefined}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {isRegistering && (
                        <div>
                          <label htmlFor="auth-passwordConfirm" className="block text-sm font-medium text-gray-700">
                            Confirmar Senha
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              id="auth-passwordConfirm"
                              value={passwordConfirm}
                              onChange={(e) => setPasswordConfirm(e.target.value)}
                              required
                              disabled={loading}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-100"
                              placeholder="••••••••"
                              aria-describedby={error ? "auth-error" : undefined}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>
                          {isForgotPassword
                            ? 'Enviando...'
                            : isRegistering
                            ? 'Criando conta...'
                            : 'Entrando...'}
                        </span>
                      </>
                    ) : (
                      <span>
                        {isForgotPassword
                          ? 'Enviar email de recuperação'
                          : isRegistering
                          ? 'Criar Conta'
                          : 'Entrar'}
                      </span>
                    )}
                  </button>

                  <div className="text-center space-y-2">
                    {!isForgotPassword && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsRegistering(!isRegistering);
                          setError('');
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {isRegistering
                          ? 'Já tem uma conta? Faça login'
                          : 'Não tem uma conta? Cadastre-se'}
                      </button>
                    )}
                    
                    {!isRegistering && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPassword(!isForgotPassword);
                          setError('');
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 block w-full"
                      >
                        {isForgotPassword
                          ? 'Voltar ao login'
                          : 'Esqueceu sua senha?'}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}