import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  TrendingUp,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchDashboards = async () => {
      if (user) {
        // Primeiro, tenta buscar os dashboards do usuário
        let { data: userDashboards } = await supabase
          .from('dashboard')
          .select('id, nome, url')
          .eq('email', user.email)
          .eq('ativo', true);

        // Se não encontrar dashboards do usuário ou ocorrer erro, busca os dashboards de teste
        if (!userDashboards?.length) {
          const { data: testDashboards, error: testError } = await supabase
            .from('dashboard')
            .select('id, nome, url')
            .eq('email', 'teste@dashvision.com.br')
            .eq('ativo', true);

          if (testError) {
            console.error('Erro ao buscar dashboards de teste:', testError);
          } else {
            const dashboardsData = testDashboards.map((item: any) => ({
              id: item.id,
              title: item.nome,
              url: item.url,
              icon: TrendingUp,
            }));
            setDashboards(dashboardsData);
            if (dashboardsData.length > 0) {
              setSelectedDashboard(dashboardsData[0].url);
            }
          }
        } else {
          // Usa os dashboards do usuário
          const dashboardsData = userDashboards.map((item: any) => ({
            id: item.id,
            title: item.nome,
            url: item.url,
            icon: TrendingUp,
          }));
          setDashboards(dashboardsData);
          if (dashboardsData.length > 0) {
            setSelectedDashboard(dashboardsData[0].url);
          }
        }
      }
    };

    fetchDashboards();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isAdmin = user?.email === "jlianeiva@gmail.com" || user?.email === "jonas.neiva@gmail.com";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">       
            <img 
              src="/assets/dashvision-logo.svg" 
              alt="DashVision Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">DashVision</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link
                to="/settings"
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </Link>
            )}
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {user?.email}
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Ativo
                </span>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-4rem)]">
          <nav className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Dashboards</h2>
            <ul className="space-y-2">
              {dashboards.map((dashboard) => (
                <li key={dashboard.id}>
                  <button 
                    onClick={() => setSelectedDashboard(dashboard.url)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      selectedDashboard === dashboard.url 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <dashboard.icon className={`h-5 w-5 ${
                      selectedDashboard === dashboard.url 
                        ? 'text-blue-600' 
                        : 'text-gray-400'
                    }`} />
                    <span className={`${
                      selectedDashboard === dashboard.url 
                        ? 'text-blue-700' 
                        : 'text-gray-600'
                    }`}>{dashboard.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-1">
          <div className="w-[95%] h-[90vh] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {selectedDashboard && (
              <iframe
                src={selectedDashboard}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

//<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
