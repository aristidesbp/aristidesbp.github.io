from flask import Flask, render_template, request, redirect
from database import criar_tabela, inserir_livro, listar_livros, buscar_livro, atualizar_livro, excluir_livro

app = Flask(__name__)
criar_tabela()

@app.route('/')
def index():
    livros = listar_livros()
    return render_template('index.html', livros=livros)

@app.route('/cadastrar', methods=['GET', 'POST'])
def cadastrar():
    if request.method == 'POST':
        titulo = request.form['titulo']
        autor = request.form['autor']
        preco = float(request.form['preco'])
        inserir_livro(titulo, autor, preco)
        return redirect('/')
    return render_template('cadastrar.html')

@app.route('/editar/<int:id>', methods=['GET', 'POST'])
def editar(id):
    livro = buscar_livro(id)
    if request.method == 'POST':
        novo_titulo = request.form['titulo']
        novo_autor = request.form['autor']
        novo_preco = float(request.form['preco'])
        atualizar_livro(id, novo_titulo, novo_autor, novo_preco)
        return redirect('/')
    return render_template('editar.html', livro=livro)

@app.route('/excluir/<int:id>')
def excluir(id):
    excluir_livro(id)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)