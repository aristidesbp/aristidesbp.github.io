import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Entity, EntityType } from '../../types';
import {
  Users,
  UserPlus,
  Search,
  Phone,
  Mail,
  Edit2,
  Trash2,
  MessageSquare,
  X,
  CreditCard,
  MapPin,
} from 'lucide-react';

export const EntitiesView: React.FC = () => {
  const { entities, saveEntity, deleteEntity } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Partial<Entity> | null>(null);

  const filteredEntities = entities.filter((e) => {
    const matchesSearch =
      e.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.cpf_cnpj && e.cpf_cnpj.includes(searchTerm)) ||
      (e.email && e.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType ? e.tipo_entidade === selectedType : true;
    return matchesSearch && matchesType;
  });

  const handleOpenForm = (entity?: Entity) => {
    if (entity) {
      setEditingEntity(entity);
    } else {
      setEditingEntity({
        id: `ent_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        nome_completo: '',
        cpf_cnpj: '',
        data_nascimento: '',
        email: '',
        telefone: '',
        tipo_entidade: 'cliente',
        status_entidade: 'ativo',
        limite_credito: 500,
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
      });
    }
    setIsFormOpen(true);
  };

  const handleFetchCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setEditingEntity((prev) => ({
            ...prev,
            logradouro: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || '',
          }));
        }
      } catch (err) {
        console.warn('ViaCEP fetch failed', err);
      }
    }
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntity?.nome_completo) {
      alert('Informe o Nome Completo / Razão Social.');
      return;
    }

    const fullEntity: Entity = {
      id: editingEntity.id || `ent_${Date.now()}`,
      nome_completo: editingEntity.nome_completo,
      cpf_cnpj: editingEntity.cpf_cnpj || '',
      cpf: editingEntity.cpf || editingEntity.cpf_cnpj || '',
      data_nascimento: editingEntity.data_nascimento || '',
      email: editingEntity.email || '',
      telefone: editingEntity.telefone || '',
      tipo_entidade: (editingEntity.tipo_entidade as EntityType) || 'cliente',
      status_entidade: editingEntity.status_entidade || 'ativo',
      tipo_acesso: editingEntity.tipo_acesso || editingEntity.tipo_entidade || 'cliente',
      avaliacao: Number(editingEntity.avaliacao) || 5,
      bio: editingEntity.bio || '',
      avatar_url: editingEntity.avatar_url || editingEntity.foto_url || '',
      foto_url: editingEntity.foto_url || editingEntity.avatar_url || '',
      limite_credito: Number(editingEntity.limite_credito) || 0,
      cep: editingEntity.cep || '',
      logradouro: editingEntity.logradouro || '',
      numero: editingEntity.numero || '',
      bairro: editingEntity.bairro || '',
      cidade: editingEntity.cidade || '',
      estado: editingEntity.estado || '',
    };

    await saveEntity(fullEntity);
    setIsFormOpen(false);
    setEditingEntity(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este registro de entidade?')) {
      await deleteEntity(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">
              Clientes, Fornecedores & Colaboradores
            </h2>
            <p className="text-xs text-slate-400">Total de {entities.length} contatos cadastrados</p>
          </div>
        </div>

        <button
          onClick={() => handleOpenForm()}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 text-xs shadow-sm"
        >
          <UserPlus className="w-4 h-4" /> Cadastrar Entidade
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por Nome, CPF/CNPJ ou E-mail..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="">Todos os Tipos</option>
          <option value="cliente">Clientes</option>
          <option value="fornecedor">Fornecedores</option>
          <option value="colaborador">Colaboradores</option>
        </select>
      </div>

      {/* Entities Cards Grid */}
      {filteredEntities.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400">
          <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p className="font-bold text-sm">Nenhum registro de entidade localizado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntities.map((ent) => {
            const cleanPhone = (ent.telefone || '').replace(/\D/g, '');
            const whatsappUrl = cleanPhone ? `https://wa.me/55${cleanPhone}` : null;

            return (
              <div
                key={ent.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        ent.tipo_entidade === 'cliente'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : ent.tipo_entidade === 'fornecedor'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300'
                      }`}
                    >
                      {ent.tipo_entidade}
                    </span>

                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        ent.status_entidade === 'ativo' ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                      title={ent.status_entidade}
                    />
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">
                    {ent.nome_completo}
                  </h3>
                  {ent.cpf_cnpj && (
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">{ent.cpf_cnpj}</p>
                  )}

                  <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    {ent.email && (
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{ent.email}</span>
                      </div>
                    )}
                    {ent.telefone && (
                      <div className="flex items-center gap-1.5 font-mono">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{ent.telefone}</span>
                      </div>
                    )}
                    {ent.logradouro && (
                      <div className="flex items-center gap-1.5 text-[11px] truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {ent.logradouro}, {ent.numero || 'S/N'} • {ent.cidade}/{ent.estado}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl font-bold text-xs transition flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenForm(ent)}
                      className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-600 dark:text-slate-300 rounded-xl transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(ent.id)}
                      className="p-2 bg-red-50 dark:bg-red-950/30 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {isFormOpen && editingEntity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-in zoom-in-95 my-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {editingEntity.nome_completo ? 'Editar Registro' : 'Novo Cadastro de Entidade'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Nome Completo / Razão Social *
                  </label>
                  <input
                    type="text"
                    value={editingEntity.nome_completo || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, nome_completo: e.target.value })}
                    required
                    placeholder="Ex: João da Silva ou Distribuidora Alimentos Ltda"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    CPF ou CNPJ
                  </label>
                  <input
                    type="text"
                    value={editingEntity.cpf_cnpj || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, cpf_cnpj: e.target.value })}
                    placeholder="000.000.000-00"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Tipo de Cadastro
                  </label>
                  <select
                    value={editingEntity.tipo_entidade || 'cliente'}
                    onChange={(e) =>
                      setEditingEntity({ ...editingEntity, tipo_entidade: e.target.value as EntityType })
                    }
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                  >
                    <option value="cliente">Cliente</option>
                    <option value="fornecedor">Fornecedor</option>
                    <option value="colaborador">Colaborador</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Celular / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={editingEntity.telefone || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, telefone: e.target.value })}
                    placeholder="(11) 98765-4321"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={editingEntity.email || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, email: e.target.value })}
                    placeholder="contato@email.com"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                {/* Colaborador Specific User Credentials */}
                {editingEntity.tipo_entidade === 'colaborador' && (
                  <>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl col-span-1 sm:col-span-2 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                      💡 <strong>Criação de Usuário de Sistema:</strong> Ao definir E-mail, Cargo e Senha para este colaborador, ele poderá logar no sistema com permissões limitadas à sua função.
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                        Cargo / Função no ERP
                      </label>
                      <select
                        value={editingEntity.cargo_role || 'caixa'}
                        onChange={(e) =>
                          setEditingEntity({ ...editingEntity, cargo_role: e.target.value as any })
                        }
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-emerald-700 dark:text-emerald-300"
                      >
                        <option value="caixa">🛒 Operador de Caixa (Frente de PDV)</option>
                        <option value="gerente">📦 Gerente / Supervisor de Loja</option>
                        <option value="estoquista">📋 Estoquista Principal</option>
                        <option value="admin">👑 Administrador ERP</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                        Senha de Acesso ao Sistema
                      </label>
                      <input
                        type="password"
                        value={editingEntity.senha_acesso || ''}
                        onChange={(e) => setEditingEntity({ ...editingEntity, senha_acesso: e.target.value })}
                        placeholder="••••••••"
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium"
                      />
                    </div>
                  </>
                )}

                {/* ViaCEP Address */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    CEP (Autocompletar ViaCEP)
                  </label>
                  <input
                    type="text"
                    value={editingEntity.cep || ''}
                    onChange={(e) => {
                      const cepVal = e.target.value;
                      setEditingEntity({ ...editingEntity, cep: cepVal });
                      handleFetchCep(cepVal);
                    }}
                    placeholder="00000-000"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Logradouro / Endereço
                  </label>
                  <input
                    type="text"
                    value={editingEntity.logradouro || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, logradouro: e.target.value })}
                    placeholder="Av. das Nações"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Número / Comp.
                  </label>
                  <input
                    type="text"
                    value={editingEntity.numero || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, numero: e.target.value })}
                    placeholder="123 Bloco A"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={editingEntity.bairro || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, bairro: e.target.value })}
                    placeholder="Centro"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={editingEntity.cidade || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, cidade: e.target.value })}
                    placeholder="São Paulo"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Estado (UF)
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={editingEntity.estado || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, estado: e.target.value.toUpperCase() })}
                    placeholder="SP"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={editingEntity.data_nascimento || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, data_nascimento: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Status do Cadastro
                  </label>
                  <select
                    value={editingEntity.status_entidade || 'ativo'}
                    onChange={(e) => setEditingEntity({ ...editingEntity, status_entidade: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Avaliação (1 a 5 Estrelas)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editingEntity.avaliacao ?? 5}
                    onChange={(e) => setEditingEntity({ ...editingEntity, avaliacao: parseInt(e.target.value) || 5 })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    URL do Avatar / Foto do Perfil
                  </label>
                  <input
                    type="url"
                    value={editingEntity.avatar_url || editingEntity.foto_url || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, avatar_url: e.target.value, foto_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Observações / Bio
                  </label>
                  <textarea
                    rows={2}
                    value={editingEntity.bio || ''}
                    onChange={(e) => setEditingEntity({ ...editingEntity, bio: e.target.value })}
                    placeholder="Notas internas ou biografia da entidade..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-600/20"
                >
                  Confirmar Cadastro
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-5 py-3 rounded-xl"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
