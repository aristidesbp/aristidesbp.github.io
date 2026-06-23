```
lista_de_tarefas: true
diagnostico_atual: "O usuário deu o sinal verde para iniciar as correções e criações do back-end do Supabase com foco no projeto da Igreja Batista Nova Belém. A primeira ação do checklist é a criação da tabela 'mensagens' para o chat, incluindo segurança de linha (RLS) estrita para que apenas o remetente ou o destinatário tenham acesso a elas, e inserção da tabela na publicação Realtime do Supabase."
proxima_tarefa_pendente: "Ajustar nomenclatura e mapeamento da VIEW de Destaques para atender o contrato do front-end ('v_servicos_destaque')."
historico_tarefas_concluidas:
  - id: 1
    status: ok
    objetivo: "Gerar script SQL estruturado, ordenado e corrigido para o Supabase"
    tarefa: "Correção da ordem de criação de tabelas e tipos de dados flutuantes."
  - id: 2
    status: ok
    objetivo: "Criar função Trigger e Gatilho para sincronização"
    tarefa: "Desenvolvimento do bloco PL/pgSQL com tratamento de metadados JSONB."
  - id: 3
    status: ok
    objetivo: "Excluir a função 'rls_auto_enable' de forma limpa via SQL"
    tarefa: "Uso do comando DROP FUNCTION com CASCADE."
  - id: 4
    status: ok
    objetivo: "Criar script de seed de dados para testes"
    tarefa: "Construção de DML SQL ordenado por dependências."
  - id: 5
    status: ok
    objetivo: "Criar VIEW de consolidação de serviços destacados"
    tarefa: "Construção do comando CREATE OR REPLACE VIEW utilizando LEFT JOINs."
  - id: 6
    status: ok
    objetivo: "Reestruturar arquitetura de RLS da tabela usuario_espelho"
    tarefa: "Divisão das regras de RLS em leitura geral e escrita privada por ID."
  - id: 7
    status: ok
    objetivo: "Criar tabela de mensagens para o Chat Interno com Realtime"
    tarefa: "Modelagem DDL da tabela 'mensagens', amarração de FKs com 'usuario_espelho', políticas estritas de RLS e injeção na publicação de Realtime do Supabase."
```

Ótimo. Vamos começar com a Tarefa 7: criar a estrutura do Chat.

Para que os irmãos conversem de forma segura, a política de privacidade (RLS) desta tabela precisa garantir que apenas o remetente ou o destinatário da mensagem consigam ler ou enviar conteúdos ali. Além disso, vamos registrar a tabela no sistema de escuta ativa (Realtime) do Supabase para que a interface atualize na hora, igual ao WhatsApp.

Abra o seu SQL Editor, cole o script abaixo e clique em Run:

```
-- =========================================================================
-- TAREFA 7: CRIAÇÃO DA TABELA DE MENSAGENS (CHAT) E CONFIGURAÇÃO REALTIME
-- =========================================================================

-- 1. Criação da Tabela seguindo a arquitetura de IDs int8
CREATE TABLE IF NOT EXISTS public.mensagens (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    remetente_id bigint NOT NULL,
    destinatario_id bigint NOT NULL,
    conteudo text NOT NULL,
    lida boolean DEFAULT false NOT NULL,
    
    CONSTRAINT mensagens_pkey PRIMARY KEY (id),
    CONSTRAINT mensagens_remetente_fkey FOREIGN KEY (remetente_id) REFERENCES public.usuario_espelho(id) ON DELETE CASCADE,
    CONSTRAINT mensagens_destinatario_fkey FOREIGN KEY (destinatario_id) REFERENCES public.usuario_espelho(id) ON DELETE CASCADE
);

-- 2. Ativação do Row Level Security (RLS) para proteção de dados privados
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se existirem (evita erros em execuções repetidas)
DROP POLICY IF EXISTS "Usuários podem ler suas próprias conversas" ON public.mensagens;
DROP POLICY IF EXISTS "Usuários podem enviar mensagens" ON public.mensagens;

-- 3. Política de Leitura: O irmão só lê a mensagem se for o remetente OU o destinatário dela
CREATE POLICY "Usuários podem ler suas próprias conversas"
ON public.mensagens
FOR SELECT
TO authenticated
USING (
    remetente_id IN (SELECT id FROM public.usuario_espelho WHERE auth_users_id = auth.uid())
    OR 
    destinatario_id IN (SELECT id FROM public.usuario_espelho WHERE auth_users_id = auth.uid())
);

-- 4. Política de Inserção: O irmão só pode enviar mensagens onde ele conste como o remetente legítimo
CREATE POLICY "Usuários podem enviar mensagens"
ON public.mensagens
FOR INSERT
TO authenticated
WITH CHECK (
    remetente_id IN (SELECT id FROM public.usuario_espelho WHERE auth_users_id = auth.uid())
);

-- 5. Habilitar o Realtime do Supabase nesta tabela via banco de dados
-- Remove a tabela da publicação caso ela já estivesse lá para evitar duplicidade
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.mensagens;
-- Insere a tabela de mensagens na lista oficial de escuta em tempo real
ALTER PUBLICATION supabase_realtime ADD TABLE public.mensagens;
```
