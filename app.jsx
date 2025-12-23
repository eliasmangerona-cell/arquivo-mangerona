import React, { useState, useEffect } from 'react';
import { Shield, Users, TreePine, History, FileText, User, LogOut, Download, Edit, Trash2, Plus, Search, ZoomIn, ZoomOut, Home as HomeIcon, Book, UserPlus, Settings, Menu, X } from 'lucide-react';

// Simulação do Supabase (substituir por integração real)
const mockAuth = {
  user: null,
  isAdmin: false,
  login: (email, password) => {
    if (password === 'Borgesgen2026') {
      return { user: { email, id: '1', role: 'admin' }, isAdmin: true };
    }
    return { user: { email, id: '2', role: 'member' }, isAdmin: false };
  },
  logout: () => ({ user: null, isAdmin: false })
};

// Brasão da Família Mangerona (SVG)
const BrasaoMangerona = ({ variant = 'colorido', size = 120 }) => {
  const colors = {
    colorido: { shield: '#1e3a8a', gold: '#d4af37', tree: '#10b981' },
    escuro: { shield: '#0f172a', gold: '#94a3b8', tree: '#475569' },
    mono: { shield: '#374151', gold: '#6b7280', tree: '#9ca3af' }
  };
  
  const c = colors[variant];
  
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Escudo */}
      <path d="M100 10 L180 40 L180 140 Q180 200 100 230 Q20 200 20 140 L20 40 Z" 
            fill={c.shield} stroke={c.gold} strokeWidth="3"/>
      
      {/* Ornamentos dourados */}
      <path d="M100 10 L180 40 L170 45 L100 20 L30 45 L20 40 Z" fill={c.gold} opacity="0.3"/>
      
      {/* Árvore estilizada */}
      <circle cx="100" cy="120" r="35" fill={c.tree} opacity="0.2"/>
      <rect x="95" y="140" width="10" height="40" fill={c.gold}/>
      
      {/* Folhagem em camadas */}
      <path d="M100 80 L120 110 L80 110 Z" fill={c.tree}/>
      <path d="M100 95 L125 120 L75 120 Z" fill={c.tree} opacity="0.8"/>
      <path d="M100 110 L130 135 L70 135 Z" fill={c.tree} opacity="0.6"/>
      
      {/* Estrelas heráldicas */}
      <path d="M60 60 L62 66 L68 66 L63 70 L65 76 L60 72 L55 76 L57 70 L52 66 L58 66 Z" fill={c.gold}/>
      <path d="M140 60 L142 66 L148 66 L143 70 L145 76 L140 72 L135 76 L137 70 L132 66 L138 66 Z" fill={c.gold}/>
      
      {/* Faixa com iniciais */}
      <path d="M50 190 Q100 200 150 190" stroke={c.gold} strokeWidth="4" fill="none"/>
      <text x="100" y="205" fontSize="24" fontFamily="serif" fontWeight="bold" fill={c.gold} textAnchor="middle">M</text>
    </svg>
  );
};

// Componente Principal
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [authState, setAuthState] = useState(mockAuth);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [people, setPeople] = useState([
    { id: 1, name: 'José Mangerona', birth: '1920-01-15', death: '1995-03-20', photo: null, creator: '1' },
    { id: 2, name: 'Maria Silva Mangerona', birth: '1925-05-10', death: '2010-07-14', photo: null, creator: '1', spouse: 1 },
    { id: 3, name: 'João Mangerona Filho', birth: '1950-08-22', death: null, photo: null, creator: '2', father: 1, mother: 2 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [treeZoom, setTreeZoom] = useState(1);

  const handleLogin = (e) => {
    e.preventDefault();
    const result = mockAuth.login(loginEmail, loginPassword);
    setAuthState(result);
    if (result.user) {
      setCurrentPage('tree');
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleLogout = () => {
    setAuthState(mockAuth.logout());
    setCurrentPage('home');
  };

  // Header
  const Header = () => (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <BrasaoMangerona variant="colorido" size={50} />
          <div>
            <h1 className="text-xl font-bold">Família Mangerona</h1>
            <p className="text-xs text-blue-200">Memória, Origem e Continuidade</p>
          </div>
        </div>
        
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 bg-blue-900 md:bg-transparent flex-col md:flex-row gap-2 md:gap-4 p-4 md:p-0 z-50`}>
          {authState.user ? (
            <>
              <button onClick={() => { setCurrentPage('tree'); setMenuOpen(false); }} className="flex items-center gap-2 hover:text-yellow-400 transition">
                <TreePine size={18} /> Árvore
              </button>
              <button onClick={() => { setCurrentPage('add'); setMenuOpen(false); }} className="flex items-center gap-2 hover:text-yellow-400 transition">
                <UserPlus size={18} /> Cadastrar
              </button>
              {authState.isAdmin && (
                <button onClick={() => { setCurrentPage('admin'); setMenuOpen(false); }} className="flex items-center gap-2 hover:text-yellow-400 transition">
                  <Settings size={18} /> Admin
                </button>
              )}
              <button onClick={() => { setCurrentPage('about'); setMenuOpen(false); }} className="flex items-center gap-2 hover:text-yellow-400 transition">
                <Book size={18} /> Sobre
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-400 transition">
                <LogOut size={18} /> Sair
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { setCurrentPage('home'); setMenuOpen(false); }} className="flex items-center gap-2 hover:text-yellow-400 transition">
                <HomeIcon size={18} /> Início
              </button>
              <button onClick={() => { setCurrentPage('about'); setMenuOpen(false); }} className="flex items-center gap-2 hover:text-yellow-400 transition">
                <Book size={18} /> Sobre
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );

  // Página Home
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <BrasaoMangerona variant="colorido" size={200} />
          <h1 className="text-5xl font-bold text-blue-900 mt-6 mb-3">Arquivo Genealógico</h1>
          <h2 className="text-3xl text-blue-700 mb-4">Família Mangerona</h2>
          <p className="text-xl text-gray-600 italic">Memória, Origem e Continuidade</p>
        </div>

        {!authState.user ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-900">Acesso ao Arquivo</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Entrar no Arquivo
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">
                Admin: usar senha Borgesgen2026
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-6">Bem-vindo(a) ao arquivo genealógico!</p>
            <button
              onClick={() => setCurrentPage('tree')}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Ver Árvore Genealógica
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="mx-auto text-blue-900 mb-4" size={48} />
            <h3 className="font-bold text-lg mb-2">Preservação</h3>
            <p className="text-gray-600 text-sm">Mantenha viva a história da família Mangerona</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="mx-auto text-blue-900 mb-4" size={48} />
            <h3 className="font-bold text-lg mb-2">Colaboração</h3>
            <p className="text-gray-600 text-sm">Construção coletiva da árvore genealógica</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <History className="mx-auto text-blue-900 mb-4" size={48} />
            <h3 className="font-bold text-lg mb-2">Continuidade</h3>
            <p className="text-gray-600 text-sm">Legado para as próximas gerações</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Página Árvore Genealógica
  const TreePage = () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Árvore Genealógica</h2>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setTreeZoom(Math.max(0.5, treeZoom - 0.1))} className="p-2 bg-blue-100 rounded hover:bg-blue-200">
              <ZoomOut size={20} />
            </button>
            <span className="text-sm font-medium">{Math.round(treeZoom * 100)}%</span>
            <button onClick={() => setTreeZoom(Math.min(2, treeZoom + 0.1))} className="p-2 bg-blue-100 rounded hover:bg-blue-200">
              <ZoomIn size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pessoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg shadow-lg p-8 overflow-auto" style={{ transform: `scale(${treeZoom})`, transformOrigin: 'top left' }}>
        <div className="flex flex-col items-center space-y-8">
          {people.filter(p => !p.father && !p.mother).map(person => (
            <PersonNode key={person.id} person={person} people={people} />
          ))}
        </div>
      </div>
    </div>
  );

  const PersonNode = ({ person, people }) => {
    const children = people.filter(p => p.father === person.id || p.mother === person.id);
    const spouse = people.find(p => p.id === person.spouse);
    
    return (
      <div className="flex flex-col items-center">
        <div className="flex gap-4 items-center">
          <div className="bg-white border-2 border-blue-900 rounded-lg p-4 shadow-md text-center min-w-[180px]">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              <User size={32} className="text-blue-900" />
            </div>
            <p className="font-bold text-sm">{person.name}</p>
            <p className="text-xs text-gray-600">{person.birth?.split('-')[0]}{person.death ? ` - ${person.death.split('-')[0]}` : ''}</p>
          </div>
          
          {spouse && (
            <div className="bg-white border-2 border-pink-400 rounded-lg p-4 shadow-md text-center min-w-[180px]">
              <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <User size={32} className="text-pink-600" />
              </div>
              <p className="font-bold text-sm">{spouse.name}</p>
              <p className="text-xs text-gray-600">{spouse.birth?.split('-')[0]}{spouse.death ? ` - ${spouse.death.split('-')[0]}` : ''}</p>
            </div>
          )}
        </div>
        
        {children.length > 0 && (
          <div className="mt-4">
            <div className="w-0.5 h-8 bg-blue-900 mx-auto"></div>
            <div className="flex gap-8">
              {children.map(child => (
                <PersonNode key={child.id} person={child} people={people} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Página Cadastrar Pessoa
  const AddPersonPage = () => {
    const [formData, setFormData] = useState({
      name: '', birth: '', death: '', father: '', mother: '', spouse: '', notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newPerson = {
        id: people.length + 1,
        ...formData,
        creator: authState.user.id,
        photo: null
      };
      setPeople([...people, newPerson]);
      setFormData({ name: '', birth: '', death: '', father: '', mother: '', spouse: '', notes: '' });
      alert('Pessoa cadastrada com sucesso!');
    };

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Cadastrar Nova Pessoa</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
              <input
                type="date"
                value={formData.birth}
                onChange={(e) => setFormData({...formData, birth: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Falecimento</label>
              <input
                type="date"
                value={formData.death}
                onChange={(e) => setFormData({...formData, death: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pai</label>
              <select
                value={formData.father}
                onChange={(e) => setFormData({...formData, father: parseInt(e.target.value) || ''})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mãe</label>
              <select
                value={formData.mother}
                onChange={(e) => setFormData({...formData, mother: parseInt(e.target.value) || ''})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Cadastrar Pessoa
          </button>
        </form>
      </div>
    );
  };

  // Página Sobre a Família
  const AboutPage = () => (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <BrasaoMangerona variant="colorido" size={150} />
        <h2 className="text-4xl font-bold text-blue-900 mt-6 mb-2">Família Mangerona</h2>
        <p className="text-xl text-gray-600 italic">Memória, Origem e Continuidade</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <section>
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Nossa História</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A família Mangerona tem suas raízes profundamente fincadas na história e tradição. Ao longo de gerações, preservamos valores de união, respeito e continuidade que nos definem como uma família unida e comprometida com nosso legado.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Este arquivo genealógico digital foi criado para que cada membro da família possa contribuir com a construção e preservação de nossa história coletiva, garantindo que as próximas gerações conheçam suas origens e mantenham vivo o espírito Mangerona.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Nossos Valores</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">Memória</h4>
              <p className="text-sm text-gray-700">Preservar e honrar a história de nossos antepassados</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">Origem</h4>
              <p className="text-sm text-gray-700">Conhecer e valorizar nossas raízes familiares</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">Continuidade</h4>
              <p className="text-sm text-gray-700">Garantir o legado para as futuras gerações</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-blue-900 mb-4">O Brasão da Família</h3>
          <p className="text-gray-700 leading-relaxed">
            O brasão heráldico da família Mangerona representa nossa identidade através de símbolos cuidadosamente escolhidos: o escudo azul profundo simboliza lealdade e verdade; a árvore estilizada representa nossas raízes e crescimento contínuo; os elementos dourados representam prosperidade e sabedoria transmitida através das gerações; as estrelas simbolizam os membros da família que nos guiam.
          </p>
        </section>
      </div>
    </div>
  );

  // Página Admin
  const AdminPage = () => {
    const exportJSON = () => {
      const data = JSON.stringify(people, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mangerona_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    };

    const exportSQL = () => {
      let sql = '-- Backup Família Mangerona\n\n';
      people.forEach(p => {
        sql += `INSERT INTO people (id, name, birth, death, father, mother, spouse, creator) VALUES (${p.id}, '${p.name}', '${p.birth}', '${p.death || 'NULL'}', ${p.father || 'NULL'}, ${p.mother || 'NULL'}, ${p.spouse || 'NULL'}, '${p.creator}');\n`;
      });
      const blob = new Blob([sql], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mangerona_backup_${new Date().toISOString().split('T')[0]}.sql`;
      a.click();
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Painel Administrativo</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Backup do Banco de Dados</h3>
            <div className="space-y-3">
              <button onClick={exportJSON} className="w-full flex items-center justify-center gap-2 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition">
                <Download size={20} /> Exportar JSON
              </button>
              <button onClick={exportSQL} className="w-full flex items-center justify-center gap-2 bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition">
                <Download size={20} /> Exportar SQL
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Estatísticas</h3>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Total de pessoas:</strong> {people.length}</p>
              <p className="text-gray-700"><strong>Pessoas vivas:</strong> {people.filter(p => !p.death).length}</p>
              <p className="text-gray-700"><strong>Pessoas falecidas:</strong> {people.filter(p => p.death).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Gerenciar Registros</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Nascimento</th>
                  <th className="px-4 py-2 text-left">Criador</th>
                  <th className="px-4 py-2 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {people.map(person => (
                  <tr key={person.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{person.name}</td>
                    <td className="px-4 py-2">{person.birth}</td>
                    <td className="px-4 py-2">ID: {person.creator}</td>
                    <td className="px-4 py-2 text-center">
                      <button className="text-blue-600 hover:text-blue-800 mx-1">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 mx-1">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'tree' && authState.user && <TreePage />}
      {currentPage === 'add' && authState.user && <AddPersonPage />}
      {currentPage === 'about' && <AboutPage
