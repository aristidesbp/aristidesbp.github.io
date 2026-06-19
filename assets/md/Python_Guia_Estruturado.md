# Python Prático: Do Básico ao Avançado

**Um Guia de Bolso para Desenvolvimento Profissional**

---

## 📋 Índice

1. [Como Estruturar um Projeto Python](#1-como-estruturar-um-projeto-python)
2. [Fundamentos (Básico)](#2-fundamentos-básico)
3. [Programação Orientada a Objetos](#3-programação-orientada-a-objetos)
4. [CRUD Completo com Banco de Dados](#4-crud-completo-com-banco-de-dados)
5. [API REST com FastAPI](#5-api-rest-com-fastapi)
6. [Inteligência Artificial e Machine Learning](#6-inteligência-artificial-e-machine-learning)
7. [Boas Práticas e Deploy](#7-boas-práticas-e-deploy)

---

## 1. Como Estruturar um Projeto Python

A estrutura correta é essencial. Nunca coloque tudo em um arquivo!

### Estrutura Recomendada

```
meu_projeto/
│
├── venv/                          # Ambiente virtual (não versionar)
│
├── src/                           # Código principal
│   ├── __init__.py
│   ├── main.py                    # Ponto de entrada
│   ├── config.py                  # Configurações
│   ├── models/                    # Modelos de dados
│   │   ├── __init__.py
│   │   ├── usuario.py
│   │   └── tarefa.py
│   ├── repositories/              # Acesso a dados
│   │   ├── __init__.py
│   │   └── tarefa_repo.py
│   ├── services/                  # Lógica de negócio
│   │   ├── __init__.py
│   │   └── tarefa_service.py
│   └── api/                       # Rotas da API
│       ├── __init__.py
│       └── tarefas.py
│
├── tests/                         # Testes unitários
│   ├── __init__.py
│   ├── test_models.py
│   └── test_services.py
│
├── .env                           # Variáveis de ambiente (NÃO versionar)
├── .env.example                   # Template do .env
├── .gitignore
├── requirements.txt               # Dependências
├── README.md                      # Documentação
└── pytest.ini                     # Configuração de testes
```

### Por que essa estrutura?

- **`src/`**: Código isolado, pode ser instalado como pacote
- **`models/`**: Definição de dados (Dataclasses, Pydantic)
- **`repositories/`**: Acesso ao banco de dados (CRUD)
- **`services/`**: Lógica de negócio, independente do banco
- **`api/`**: Rotas HTTP (FastAPI, Flask)
- **`tests/`**: Testes separados

---

## 2. Fundamentos (Básico)

### 2.1 Variáveis e Type Hints

**Por que type hints?** Melhor legibilidade, detecção de erros, autocompletar no IDE.

```python
# ❌ Sem type hints (ruim)
def somar(a, b):
    return a + b

# ✅ Com type hints (bom)
def somar(a: int, b: int) -> int:
    return a + b
```

**Principais tipos:**

```python
# Tipos básicos
nome: str = "João"
idade: int = 30
altura: float = 1.75
ativo: bool = True

# Coleções
tags: list[str] = ["python", "dev"]
ids: tuple[int, ...] = (1, 2, 3)
usuario: dict[str, str] = {"nome": "Ana", "email": "ana@email.com"}

# Tipos opcionais
telefone: str | None = None  # Python 3.10+
# ou: from typing import Optional
# telefone: Optional[str] = None

# Função que retorna múltiplos valores
def dividir(a: int, b: int) -> tuple[int, int]:
    return a // b, a % b

quociente, resto = dividir(10, 3)
print(quociente, resto)  # 3 1
```

---

### 2.2 Estruturas de Controle

```python
# IF/ELSE
idade = 25
if idade < 18:
    print("Menor de idade")
elif idade < 65:
    print("Adulto")
else:
    print("Aposentado")

# FOR - iteração em coleção
frutas = ["maçã", "banana", "laranja"]
for fruta in frutas:
    print(f"Fruta: {fruta}")

# FOR - com índice (quando necessário)
for i, fruta in enumerate(frutas):
    print(f"{i}: {fruta}")

# WHILE
contador = 0
while contador < 3:
    print(f"Contador: {contador}")
    contador += 1

# Break e continue
for x in range(10):
    if x == 3:
        continue  # Pula para próxima iteração
    if x == 7:
        break     # Sai do loop
    print(x)
```

---

### 2.3 Compreensão de Listas (List Comprehension)

Mais rápido e elegante que loops:

```python
# ❌ Loop tradicional
numeros = [1, 2, 3, 4, 5]
dobrados = []
for n in numeros:
    dobrados.append(n * 2)

# ✅ List comprehension
dobrados = [n * 2 for n in numeros]
print(dobrados)  # [2, 4, 6, 8, 10]

# Com condição
pares = [n for n in numeros if n % 2 == 0]
print(pares)  # [2, 4]

# Dictionary comprehension
quadrados = {n: n**2 for n in numeros}
print(quadrados)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Set comprehension
unicos = {x for x in [1, 1, 2, 2, 3, 3]}
print(unicos)  # {1, 2, 3}
```

---

### 2.4 Funções

```python
# Função básica
def saudacao(nome: str) -> str:
    return f"Olá, {nome}!"

print(saudacao("Maria"))

# Função com argumento padrão
def criar_usuario(nome: str, ativo: bool = True) -> dict:
    return {"nome": nome, "ativo": ativo}

print(criar_usuario("Ana"))  # {'nome': 'Ana', 'ativo': True}
print(criar_usuario("Bruno", False))

# *args: número variável de argumentos
def somar(*numeros: int) -> int:
    return sum(numeros)

print(somar(1, 2, 3, 4))  # 10

# **kwargs: argumentos nomeados variáveis
def criar_perfil(nome: str, **dados: str) -> dict:
    perfil = {"nome": nome}
    perfil.update(dados)
    return perfil

print(criar_perfil("Ana", email="ana@email.com", city="SP"))
# {'nome': 'Ana', 'email': 'ana@email.com', 'city': 'SP'}
```

---

### 2.5 Tratamento de Erros

```python
# Try/Except/Else/Finally
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("Erro: divisão por zero!")
except Exception as e:
    print(f"Erro inesperado: {e}")
else:
    print(f"Resultado: {resultado}")
finally:
    print("Limpeza de recursos")

# Levantando exceções
def validar_idade(idade: int) -> None:
    if idade < 0 or idade > 150:
        raise ValueError("Idade inválida")
    print(f"Idade válida: {idade}")

try:
    validar_idade(-5)
except ValueError as e:
    print(f"Erro capturado: {e}")
```

---

## 3. Programação Orientada a Objetos

### 3.1 Classes Básicas

```python
# ❌ Classe tradicional (verbose)
class Pessoa:
    def __init__(self, nome: str, idade: int):
        self.nome = nome
        self.idade = idade

# ✅ Dataclass (moderna, Python 3.7+)
from dataclasses import dataclass

@dataclass
class Pessoa:
    nome: str
    idade: int
    
    def eh_maior(self) -> bool:
        return self.idade >= 18

pessoa = Pessoa("Ana", 25)
print(pessoa.nome, pessoa.eh_maior())  # Ana True
```

### 3.2 Herança vs Composição

**Preferir composição a herança!**

```python
# ❌ Herança (acoplamento forte, evitar)
class Animal:
    def fazer_som(self): pass

class Cachorro(Animal):
    def fazer_som(self):
        return "Au au!"

# ✅ Composição (flexível, usar)
from dataclasses import dataclass

@dataclass
class Som:
    tipo: str
    volume: int

@dataclass
class Animal:
    nome: str
    som: Som  # Composição!
    
    def fazer_som(self) -> str:
        return f"{self.nome} faz {self.som.tipo}"

latido = Som("latido", 80)
rex = Animal("Rex", latido)
print(rex.fazer_som())  # Rex faz latido
```

### 3.3 Propriedades (@property)

```python
from dataclasses import dataclass

@dataclass
class ContaBancaria:
    titular: str
    _saldo: float = 0.0  # Privado por convenção
    
    @property
    def saldo(self) -> float:
        """Getter: acesso controlado"""
        return self._saldo
    
    @saldo.setter
    def saldo(self, valor: float) -> None:
        """Setter: validação antes de atualizar"""
        if valor < 0:
            raise ValueError("Saldo não pode ser negativo")
        self._saldo = valor

conta = ContaBancaria("João")
conta.saldo = 1000
print(conta.saldo)  # 1000

# Isso vai gerar erro:
# conta.saldo = -100  # ValueError!
```

### 3.4 Decoradores

```python
from functools import wraps
from time import time
from typing import Any, Callable

# Decorador simples para medir tempo
def medir_tempo(func: Callable) -> Callable:
    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        inicio = time()
        resultado = func(*args, **kwargs)
        duracao = time() - inicio
        print(f"{func.__name__} levou {duracao:.4f}s")
        return resultado
    return wrapper

@medir_tempo
def buscar_dados(quantidade: int) -> list:
    return list(range(quantidade))

buscar_dados(1000000)
```

---

## 4. CRUD Completo com Banco de Dados

### 4.1 Modelo de Dados

**Arquivo: `src/models/tarefa.py`**

```python
from dataclasses import dataclass
from typing import Optional
from datetime import datetime

@dataclass
class Tarefa:
    id: Optional[int] = None
    titulo: str = ""
    descricao: str = ""
    concluida: bool = False
    criada_em: datetime = None
    
    def __post_init__(self):
        if self.criada_em is None:
            self.criada_em = datetime.now()
```

### 4.2 Repository (Acesso a Dados)

**Arquivo: `src/repositories/tarefa_repo.py`**

```python
import sqlite3
from typing import List, Optional
from datetime import datetime
from src.models.tarefa import Tarefa

class RepositorioTarefa:
    def __init__(self, db_path: str = "tarefas.db"):
        self.db_path = db_path
        self._criar_tabela()
    
    def _criar_tabela(self) -> None:
        """Cria tabela se não existir"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute('''
                CREATE TABLE IF NOT EXISTS tarefas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    titulo TEXT NOT NULL,
                    descricao TEXT,
                    concluida BOOLEAN DEFAULT 0,
                    criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()
    
    # CREATE
    def criar(self, tarefa: Tarefa) -> int:
        """Insere nova tarefa e retorna o ID"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO tarefas (titulo, descricao, concluida) VALUES (?, ?, ?)',
                (tarefa.titulo, tarefa.descricao, tarefa.concluida)
            )
            conn.commit()
            return cursor.lastrowid
    
    # READ (um)
    def obter_por_id(self, id: int) -> Optional[Tarefa]:
        """Busca tarefa por ID"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM tarefas WHERE id = ?', (id,))
            row = cursor.fetchone()
            if row:
                return self._mapear_linha(row)
        return None
    
    # READ (todos)
    def listar_todos(self) -> List[Tarefa]:
        """Lista todas as tarefas"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM tarefas')
            return [self._mapear_linha(row) for row in cursor.fetchall()]
    
    # UPDATE
    def atualizar(self, id: int, tarefa: Tarefa) -> bool:
        """Atualiza tarefa existente"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                'UPDATE tarefas SET titulo = ?, descricao = ?, concluida = ? WHERE id = ?',
                (tarefa.titulo, tarefa.descricao, tarefa.concluida, id)
            )
            conn.commit()
            return cursor.rowcount > 0
    
    # DELETE
    def deletar(self, id: int) -> bool:
        """Deleta tarefa por ID"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM tarefas WHERE id = ?', (id,))
            conn.commit()
            return cursor.rowcount > 0
    
    def _mapear_linha(self, row: tuple) -> Tarefa:
        """Converte linha do banco em objeto Tarefa"""
        return Tarefa(
            id=row[0],
            titulo=row[1],
            descricao=row[2],
            concluida=bool(row[3]),
            criada_em=row[4]
        )
```

### 4.3 Service (Lógica de Negócio)

**Arquivo: `src/services/tarefa_service.py`**

```python
from typing import List, Optional
from src.models.tarefa import Tarefa
from src.repositories.tarefa_repo import RepositorioTarefa

class ServicoTarefa:
    def __init__(self, repositorio: RepositorioTarefa):
        self.repo = repositorio
    
    def criar_tarefa(self, titulo: str, descricao: str = "") -> int:
        """Cria nova tarefa com validação"""
        if not titulo or len(titulo) < 3:
            raise ValueError("Título deve ter pelo menos 3 caracteres")
        
        tarefa = Tarefa(titulo=titulo, descricao=descricao)
        return self.repo.criar(tarefa)
    
    def marcar_concluida(self, id: int) -> bool:
        """Marca tarefa como concluída"""
        tarefa = self.repo.obter_por_id(id)
        if not tarefa:
            return False
        
        tarefa.concluida = True
        return self.repo.atualizar(id, tarefa)
    
    def obter_tarefas_pendentes(self) -> List[Tarefa]:
        """Retorna apenas tarefas não concluídas"""
        todas = self.repo.listar_todos()
        return [t for t in todas if not t.concluida]
```

### 4.4 Usando o CRUD

```python
from src.repositories.tarefa_repo import RepositorioTarefa
from src.services.tarefa_service import ServicoTarefa

# Inicializar
repo = RepositorioTarefa("tarefas.db")
servico = ServicoTarefa(repo)

# CREATE
id_nova = servico.criar_tarefa("Estudar Python", "Aprender OOP e CRUD")
print(f"Tarefa criada: ID {id_nova}")

# READ
tarefas = repo.listar_todos()
for t in tarefas:
    print(f"{t.id}. {t.titulo} - {'✓' if t.concluida else '✗'}")

# UPDATE
repo.atualizar(id_nova, tarefas[0])

# DELETE
repo.deletar(id_nova)
```

---

## 5. API REST com FastAPI

### 5.1 Instalar Dependências

```bash
pip install fastapi uvicorn pydantic python-dotenv
```

### 5.2 Modelo Pydantic (Validação)

**Arquivo: `src/schemas/tarefa_schema.py`**

```python
from pydantic import BaseModel, Field
from typing import Optional

class TarefaCriar(BaseModel):
    titulo: str = Field(..., min_length=3, max_length=200)
    descricao: Optional[str] = None

class TarefaResposta(BaseModel):
    id: int
    titulo: str
    descricao: Optional[str]
    concluida: bool

class TarefaAtualizar(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    concluida: Optional[bool] = None
```

### 5.3 API Endpoints

**Arquivo: `src/api/tarefas.py`**

```python
from fastapi import APIRouter, HTTPException, status
from typing import List
from src.schemas.tarefa_schema import TarefaCriar, TarefaResposta, TarefaAtualizar
from src.repositories.tarefa_repo import RepositorioTarefa
from src.services.tarefa_service import ServicoTarefa
from src.models.tarefa import Tarefa

router = APIRouter(prefix="/tarefas", tags=["tarefas"])

# Inicializar (em produção, usar injeção de dependência)
repo = RepositorioTarefa()
servico = ServicoTarefa(repo)

# CREATE
@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def criar_tarefa(schema: TarefaCriar):
    try:
        id_novo = servico.criar_tarefa(schema.titulo, schema.descricao)
        return {"id": id_novo, "mensagem": "Tarefa criada com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# READ (todos)
@router.get("", response_model=List[TarefaResposta])
async def listar_tarefas():
    tarefas = repo.listar_todos()
    return tarefas

# READ (um)
@router.get("/{id}", response_model=TarefaResposta)
async def obter_tarefa(id: int):
    tarefa = repo.obter_por_id(id)
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return tarefa

# UPDATE
@router.put("/{id}")
async def atualizar_tarefa(id: int, schema: TarefaAtualizar):
    tarefa = repo.obter_por_id(id)
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    # Atualizar apenas campos fornecidos
    if schema.titulo:
        tarefa.titulo = schema.titulo
    if schema.descricao:
        tarefa.descricao = schema.descricao
    if schema.concluida is not None:
        tarefa.concluida = schema.concluida
    
    repo.atualizar(id, tarefa)
    return {"mensagem": "Tarefa atualizada"}

# DELETE
@router.delete("/{id}")
async def deletar_tarefa(id: int):
    if not repo.deletar(id):
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return {"mensagem": "Tarefa deletada"}
```

### 5.4 Aplicação Principal

**Arquivo: `src/main.py`**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import tarefas

app = FastAPI(
    title="API de Tarefas",
    description="CRUD completo com Python",
    version="1.0.0"
)

# CORS (para frontend acessar)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(tarefas.router)

@app.get("/")
async def root():
    return {"mensagem": "Bem-vindo à API de Tarefas"}

# Rodar: uvicorn src.main:app --reload
# Documentação: http://localhost:8000/docs
```

---

## 6. Inteligência Artificial e Machine Learning

### 6.1 Classificação com Scikit-Learn

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score
import numpy as np

# Dados de treinamento
emails = [
    "Clique aqui para ganhar R$ 5000",
    "Você foi sorteado!",
    "Reunião de sprint amanhã",
    "Código aprovado no review",
]

labels = [1, 1, 0, 0]  # 1=spam, 0=legítimo

# Pipeline
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(lowercase=True)),
    ('clf', MultinomialNB())
])

# Dividir dados
X_train, X_test, y_train, y_test = train_test_split(
    emails, labels, test_size=0.25, random_state=42
)

# Treinar
pipeline.fit(X_train, y_train)

# Avaliar
y_pred = pipeline.predict(X_test)
print(f"Acurácia: {accuracy_score(y_test, y_pred):.2%}")

# Prever novo email
novo_email = ["PROMOÇÃO URGENTE!!!"]
resultado = pipeline.predict(novo_email)
print(f"É spam? {resultado[0]}")
```

### 6.2 Redes Neurais com TensorFlow

```python
import tensorflow as tf
from tensorflow import keras
import numpy as np

# Carregar dados
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# Normalizar
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# Achatar
x_train = x_train.reshape(-1, 28*28)
x_test = x_test.reshape(-1, 28*28)

# Modelo
modelo = keras.Sequential([
    keras.layers.Dense(128, activation="relu", input_shape=(784,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dense(10, activation="softmax")
])

# Compilar
modelo.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# Treinar
modelo.fit(x_train, y_train, epochs=5, batch_size=32, verbose=1)

# Avaliar
teste_loss, teste_acuracia = modelo.evaluate(x_test, y_test)
print(f"Acurácia: {teste_acuracia:.2%}")

# Prever
predicao = modelo.predict(x_test[0:1])
print(f"Dígito previsto: {np.argmax(predicao)}")
```

---

## 7. Boas Práticas e Deploy

### 7.1 Testes com Pytest

**Arquivo: `tests/test_tarefa_service.py`**

```python
import pytest
from src.models.tarefa import Tarefa
from src.repositories.tarefa_repo import RepositorioTarefa
from src.services.tarefa_service import ServicoTarefa

@pytest.fixture
def repo():
    """Cria repositório em memória para testes"""
    return RepositorioTarefa(":memory:")

@pytest.fixture
def servico(repo):
    return ServicoTarefa(repo)

def test_criar_tarefa_valida(servico):
    """Testa criação de tarefa válida"""
    id_novo = servico.criar_tarefa("Estudar Python")
    assert id_novo > 0

def test_criar_tarefa_invalida(servico):
    """Testa validação de título"""
    with pytest.raises(ValueError):
        servico.criar_tarefa("ab")  # Muito curto

def test_marcar_concluida(servico, repo):
    """Testa marcar tarefa como concluída"""
    id_novo = servico.criar_tarefa("Tarefa teste")
    servico.marcar_concluida(id_novo)
    
    tarefa = repo.obter_por_id(id_novo)
    assert tarefa.concluida is True

def test_tarefas_pendentes(servico):
    """Testa filtro de tarefas pendentes"""
    servico.criar_tarefa("Tarefa 1")
    servico.criar_tarefa("Tarefa 2")
    servico.marcar_concluida(1)
    
    pendentes = servico.obter_tarefas_pendentes()
    assert len(pendentes) == 1
```

**Rodar testes:**

```bash
pip install pytest
pytest tests/ -v
pytest tests/ --cov  # Com cobertura
```

### 7.2 Docker

**Arquivo: `Dockerfile`**

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Arquivo: `requirements.txt`**

```
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
sqlalchemy==2.0.23
scikit-learn==1.3.2
tensorflow==2.14.0
pytest==7.4.3
python-dotenv==1.0.0
```

**Build e rodar:**

```bash
docker build -t minha-api .
docker run -p 8000:8000 minha-api
```

### 7.3 Arquivo .env

**Arquivo: `.env`**

```
DATABASE_URL=sqlite:///tarefas.db
DEBUG=True
SECRET_KEY=sua_chave_secreta_aqui
API_PORT=8000
```

**Arquivo: `src/config.py`**

```python
import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = os.getenv("DEBUG", "False") == "True"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///app.db")
SECRET_KEY = os.getenv("SECRET_KEY", "dev-key-change-in-prod")
API_PORT = int(os.getenv("API_PORT", 8000))
```

### 7.4 Logging Estruturado

```python
import logging
from logging.handlers import RotatingFileHandler

def configurar_logging():
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)
    
    # Handler para arquivo
    handler_arquivo = RotatingFileHandler(
        'app.log', maxBytes=10485760, backupCount=5
    )
    
    # Formato
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    handler_arquivo.setFormatter(formatter)
    logger.addHandler(handler_arquivo)
    
    return logger

# Uso
logger = configurar_logging()
logger.info("Aplicação iniciada")
logger.error("Erro ao conectar no banco")
```

---

## 🎯 Resumo: Fluxo Prático

1. **Estruture o projeto** (pastas corretas)
2. **Defina modelos** (Dataclass ou Pydantic)
3. **Crie repositório** (CRUD com banco)
4. **Implemente serviço** (lógica de negócio)
5. **Exponha API** (FastAPI com validação)
6. **Adicione testes** (pytest)
7. **Deploy** (Docker + variáveis de ambiente)

---

## 📚 Referências Rápidas

| Conceito | Quando Usar | Exemplo |
|----------|-----------|---------|
| Dataclass | Modelos simples | `@dataclass class Pessoa` |
| Pydantic | Validação HTTP | `class UserSchema(BaseModel)` |
| Repository | Acesso a dados | `class RepositorioUsuario` |
| Service | Lógica de negócio | `class ServicoAutenticacao` |
| FastAPI | APIs REST | `@app.get("/usuarios")` |
| Pytest | Testes unitários | `def test_criar_usuario` |

---

**Criado para desenvolvimento prático em Python 3.10+**

Dúvidas? Consulte a documentação oficial ou execute os exemplos!
