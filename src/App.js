import './App.css';
import React, { Component } from 'react';
import Comentario from './components/Comentario';

class App extends Component {

  state = {
    comentarios: [{
      nome: "João",
      email: "joao@gmail",
      data: new Date(2023, 8, 3, 17, 30,1),
      mensagem: "Olá tudo bem?"
    }, {
      nome: "Maria",
      email: "maria@gmail",
      data: new Date(2023, 8, 4, 10, 24,5),
      mensagem: "Olá tudo sim..."
    }],
    novoComentario: {
      nome: '',
      email: '',
      mensagem: ''
    }
  }

  adicionarComentario = (evento) => {
    //anulando evento post (?)
    evento.preventDefault();

    console.log("Adicionando comentário...");
    /*
    const novoComentario = {
      nome: "Maria",
      email: "maria@gmail",
      data: new Date(),
      mensagem: "Olá pessoal"
    }*/

    const novoComentario = {...this.state.novoComentario, data: new Date()}

    /* let listaComentarios = this.state.comentarios;
    listaComentarios.push(novoComentario)
    this.setState({comentarios: listaComentarios}) */

    // quando adiciona o novoComentario, já apaga o valor atual
    this.setState({
      comentarios: [...this.state.comentarios, novoComentario],
      novoComentario: { nome: '', email: '', mensagem: '' }
    })
  }

  removerComentario = comentario => {
    let listaComentarios = this.state.comentarios;
    const novaLista = listaComentarios.filter(com => com !== comentario)
    this.setState({comentarios: novaLista})
  }

  digitacao = evento => {
    // pega o q está no campo de texto
    const value = evento.target.value
    // pega o nome do campo que tá sendo atualizado
    const nameCampo = evento.target.name;
    // atualiza o campo 'nome' da entidade 'novoComentario' no state com o q foi escrito no campo
    this.setState({ novoComentario: { ...this.state.novoComentario, [nameCampo]: value } })

    // opção:
    // const {value, name} = evento.target;
    // this.setState({novoComentario: {...this.state.novoComentario, [name]: value}})
  }
  render() {
    return (
      <div className="App">
        <h1>Meu projeto</h1>

        {this.state.comentarios.map((comentario, indice) => (
          <Comentario
            key={indice}
            nome={comentario.nome}
            email={comentario.email}
            data={comentario.data}
            onRemove={this.removerComentario.bind(this, comentario)}>
            {comentario.mensagem}
          </Comentario>
        ))}

        <form method='post' onSubmit={this.adicionarComentario} className='Novo-Comentario'>
          <h2>Adicionar comentário</h2>
          <div>
            <input type='text' name='nome' placeholder='Digite seu nome' value={this.state.novoComentario.nome}
              onChange={this.digitacao} required></input>
          </div>
          <div>
            <input type='email' name='email' placeholder='Digite seu email' value={this.state.novoComentario.email}
              onChange={this.digitacao} required></input>
          </div>
          <div>
            <textarea name='mensagem' rows="4" value={this.state.novoComentario.mensagem}
              onChange={this.digitacao} required></textarea>
          </div>
          <button type='submit'>Adicionar comentário</button>
        </form>
      </div>
    )
  };
}

export default App;
