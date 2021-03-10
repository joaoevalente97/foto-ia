import React, { useState } from 'react'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import GifCarregando from '../src/images/Spinner-1s-64px.gif'
import { MdClear, MdMoveToInbox } from "react-icons/md"

//JSX Java Script eXtension
//Hook
function App() {
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [idade, setIdade] = useState('')
  const [etnia, setEtnia] = useState('')
  const estiloIcone = { background: '#5162FF', fontSize: '1.5em' }

  function ListaPessoas() {
    const listagemPessoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]} title="Gerada por IA"
        alt="Pessoa Gerada por IA" />
    )
    return (
      <> {listagemPessoas}</>
    )
  }

  async function obterFoto() {
    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY

    // Set variavel filtraEtinia para &ethnicity= + valor da opcao selecionada no campo "Etnia:"
    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''

    // Set variavel filtraIdade para &age= + valor da opcao selecionada no campo "Idade:"
    const filtraIdade = idade.length > 0 ? `&age=${idade}` : ''

    // Concatena a url da API com as variaveis chaveAPI, filtraEtinia e filtraIdade para fazer a requisicao
    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraIdade}${filtraEtnia}&order_by=random`

    // Faz a requisicao e espera pelo resultado
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setPessoas(data.faces)
        console.log('Dados carregados com sucesso!')
      })
      .catch(function (error) {
        console.error('Houve um problema na requisição: ' + error.message)
      })
    setCarregando(false)
  }

  return (
    <div className="App">
      <h1>Gerador de Fotos via IA</h1>
      <Robot />
      {carregando &&
        <img src={GifCarregando} title="Aguarde..." alt="Aguarde, dados sendo carregados" />
      }
      <div className="linha">
        <ListaPessoas />
      </div>

      <div className="linha">
        <label>Idade:</label>
        <select onChange={event => setIdade(event.target.value)}>
          <option value="">Todas</option>
          <option value="infant">Infantil</option>
          <option value="child">Criança</option>
          <option value="young-adult">Jovem</option>
          <option value="adult">Adulto</option>
          <option value="elderly">Véio</option>
        </select>
        <label>Etnia:</label>
        <select onChange={event => setEtnia(event.target.value)}>
          <option value="">Todas</option>
          <option value="white">Branca</option>
          <option value="latino">Latina</option>
          <option value="asian">Asiática</option>
          <option value="black">Negra</option>
        </select>
      </div>

      <div className="linha">
        <button type='button' onClick={obterFoto}>
          <MdMoveToInbox style={estiloIcone} />Obter Imagens
      </button>
        {pessoas.length > 0 &&
          <button type='button' onClick={() => setPessoas([])}>
            <MdClear style={estiloIcone} />Limpar Imagens
      </button>
        }
      </div>
    </div>
  )
}

export default App

