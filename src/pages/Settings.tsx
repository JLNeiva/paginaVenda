import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ArrowLeft,
  Trash2,
  Edit2,
  Plus,
  Loader2,
  AlertCircle,
  X,
  Clipboard
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Dashboard {
  id: string;
  nome: string;
  url: string;
  ativo: boolean;
  email: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  nome: string;
  url: string;
  ativo: boolean;
  email: string;
}

interface Parametro {
  id: string;
  chave: string;
  valor: string;
}

export function Settings() {
  const navigate = useNavigate();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDashboard, setEditingDashboard] = useState<Dashboard | null>(null);
  const [editingParametro, setEditingParametro] = useState<Parametro | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    url: '',
    ativo: true,
    email: '',
  });
  const [parametroData, setParametroData] = useState<Parametro>({
    id: '',
    chave: '',
    valor: '',
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboards');

  useEffect(() => {
    fetchDashboards();
    fetchParametros();
  }, []);

  const fetchDashboards = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }

      const { data, error } = await supabase
        .from('dashboard')
        .select('*')
        .order('email');

      if (error) throw error;

      setDashboards(data);
    } catch (error: any) {
      toast.error('Erro ao carregar dashboards: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchParametros = async () => {
    try {
      const { data, error } = await supabase
        .from('parametro')
        .select('*');

      if (error) throw error;

      setParametros(data);
    } catch (error: any) {
      toast.error('Erro ao carregar parâmetros: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      toast.error('Nome é obrigatório');
      return false;
    }
    if (!formData.url.trim() || !validateUrl(formData.url)) {
      toast.error('URL válida é obrigatória');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email é obrigatório');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Usuário não autenticado');
        return;
      }

      const dashboardData = {
        ...formData,
      };

      let error;
      if (editingDashboard) {
        ({ error } = await supabase
          .from('dashboard')
          .update(dashboardData)
          .eq('id', editingDashboard.id));
      } else {
        ({ error } = await supabase
          .from('dashboard')
          .insert([dashboardData]));
      }

      if (error) throw error;

      toast.success(`Dashboard ${editingDashboard ? 'atualizado' : 'criado'} com sucesso`);
      setShowForm(false);
      setEditingDashboard(null);
      setFormData({ nome: '', url: '', ativo: true, email: '' });
      fetchDashboards();
    } catch (error: any) {
      toast.error('Erro ao salvar dashboard: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dashboard: Dashboard) => {
    setEditingDashboard(dashboard);
    setFormData({
      nome: dashboard.nome,
      url: dashboard.url,
      ativo: dashboard.ativo,
      email: dashboard.email,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('dashboard')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Dashboard excluído com sucesso');
      setDeleteConfirm(null);
      fetchDashboards();
    } catch (error: any) {
      toast.error('Erro ao excluir dashboard: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(formData.url);
      toast.success('URL copiada com sucesso');
    } catch (error) {
      toast.error('Erro ao copiar URL: ' + error.message);
    }
  };

  const handleParametroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const newParametroData = {
        chave: parametroData.chave,
        valor: parametroData.valor,
      };

      let error;
      if (editingParametro) {
        ({ error } = await supabase
          .from('parametro')
          .update(newParametroData)
          .eq('id', editingParametro.id));
      } else {
        ({ error } = await supabase
          .from('parametro')
          .insert([newParametroData]));
      }

      if (error) throw error;

      toast.success(`Parâmetro ${editingParametro ? 'atualizado' : 'criado'} com sucesso`);
      setShowForm(false);
      setEditingParametro(null);
      setParametroData({ id: '', chave: '', valor: '' });
      fetchParametros();
    } catch (error: any) {
      toast.error('Erro ao salvar parâmetro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleParametroEdit = (parametro: Parametro) => {
    setEditingParametro(parametro);
    setParametroData({
      id: parametro.id,
      chave: parametro.chave,
      valor: parametro.valor,
    });
    setShowForm(true);
  };

  const handleParametroDelete = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('parametro')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Parâmetro excluído com sucesso');
      setDeleteConfirm(null);
      fetchParametros();
    } catch (error: any) {
      toast.error('Erro ao excluir parâmetro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab('dashboards')}
              className={`w-full text-left p-2 rounded-md ${activeTab === 'dashboards' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Dashboards
            </button>
            <button
              onClick={() => setActiveTab('parametros')}
              className={`w-full text-left p-2 rounded-md ${activeTab === 'parametros' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Parâmetros
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button>

          {activeTab === 'dashboards' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Gerenciar Dashboards</h2>
                <button
                  onClick={() => {
                    setEditingDashboard(null);
                    setFormData({ nome: '', url: '', ativo: true, email: '' });
                    setShowForm(true);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Dashboard
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="w-2/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="w-1/6 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboards.map((dashboard) => (
                        <tr key={dashboard.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{dashboard.nome}</td>
                          <td className="px-6 py-4 whitespace-normal break-words max-w-sm">
                            <a href={dashboard.url} target="_blank" rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline break-all">
                              {dashboard.url}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              dashboard.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {dashboard.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(dashboard.created_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dashboard.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEdit(dashboard)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              aria-label="Editar"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(dashboard.id)}
                              className="text-red-600 hover:text-red-900"
                              aria-label="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'parametros' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Gerenciar Parâmetros</h2>
                <button
                  onClick={() => {
                    setEditingParametro(null);
                    setParametroData({ id: '', chave: '', valor: '' });
                    setShowForm(true);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Parâmetro
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="w-1/2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chave</th>
                        <th className="w-1/2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                        <th className="w-1/6 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {parametros.map((parametro) => (
                        <tr key={parametro.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{parametro.chave}</td>
                          <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{parametro.valor}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleParametroEdit(parametro)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              aria-label="Editar"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(parametro.id)}
                              className="text-red-600 hover:text-red-900"
                              aria-label="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingParametro ? 'Editar Parâmetro' : 'Adicionar Parâmetro'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleParametroSubmit} className="space-y-4">
              <div>
                <label htmlFor="chave" className="block text-sm font-medium text-gray-700">
                  Chave *
                </label>
                <input
                  type="text"
                  id="chave"
                  value={parametroData.chave}
                  onChange={(e) => setParametroData({ ...parametroData, chave: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
                  Valor *
                </label>
                <textarea
                  id="valor"
                  value={parametroData.valor}
                  onChange={(e) => setParametroData({ ...parametroData, valor: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Salvar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}