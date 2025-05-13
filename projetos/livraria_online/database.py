import sqlite3

def conectar():
    return sqlite3.connect('livros.db')

def criar_tabela():
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            preco REAL NOT NULL
        )
    ''')
    conexao.commit()
    conexao.close()

def inserir_livro(titulo, autor, preco):
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute('INSERT INTO livros (titulo, autor, preco) VALUES (?, ?, ?)', (titulo, autor, preco))
    conexao.commit()
    conexao.close()

def listar_livros():
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute('SELECT * FROM livros')
    livros = cursor.fetchall()
    conexao.close()
    return livros

def buscar_livro(id):
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute('SELECT * FROM livros WHERE id = ?', (id,))
    livro = cursor.fetchone()
    conexao.close()
    return livro

def atualizar_livro(id, titulo, autor, preco):
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute('UPDATE livros SET titulo = ?, autor = ?, preco = ? WHERE id = ?', (titulo, autor, preco, id))
    conexao.commit()
    conexao.close()

def excluir_livro(id):
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute('DELETE FROM livros WHERE id = ?', (id,))
    conexao.commit()
    conexao.close()