import './Home.css';
import { useState } from 'react';
import axios from 'axios';

const host = "https://dot-back.onrender.com";

function Home() {
  const [nome, setNome] = useState('');
  const [link, setLink] = useState('');
  const [data, setData] = useState('');
  const [dia, setDia] = useState('');
  const [senha, setSenha] = useState('');
  const [modalSit, setModalSit] = useState(false);
  const segredo = "";





  function excluirConf() {
    const dados = { dia }
    if (senha === segredo) {
      axios.delete(`${host}/apagarRegistro`, dados)
        .then(response => {
          console.log('Conferência apagado com sucesso:', response.data);
          alert("Conferência excluida com sucesso");
        })
        .catch(error => {
          console.error('Erro ao apagar Conferência:', error);
          alert("Erro ao apagar Conferência");

        });
    }
    setModalSit(false);
  }


  function abrirModal() {
    setModalSit(true);
  }

  function fecharModal() {
    setModalSit(false);
  }

  function addConferencia() {
    let dados = { nome, link, data };
    if (nome && link && data) {
      axios.post(`${host}/novoRegistro`, dados)
        .then(response => {
          alert("Conferência agendada com sucesso");
        })
        .catch(error => {
          console.error('Erro ao enviar relatório:', error);
          alert("Erro ao enviar relatório, já existe Conferência com essa data");
        });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }


  return (
    <>
      <div className='centralizar'>
        <div className='contentImage'>
          <img src="https://www.sestsenat.org.br/assets/images/logo-login.webp" alt="Logo Sest Senat" className="logo" />
        </div>
        <div className='index'>
          <div>
            <h3>Nome do tutor:</h3>
            <input type='text' id="nome" onChange={(evento) => setNome(evento.target.value)} />
          </div>

          <div>
            <h3>Link da apresentação:</h3>
            <input type='text' id="link" onChange={(evento) => setLink(evento.target.value)} />
          </div>

          <div>
            <h3>Indicação de data para Conferência:</h3>
          </div>

          <div>
            <input type='date' id="data" onChange={(evento) => setData(evento.target.value)} />
          </div>

          <div>
            <button className='adicionarConf' onClick={addConferencia}>
              <span>Adicionar</span>
            </button>
          </div>
        </div >
      </div>

      <div className='contentApagar'>
        <button className='apagar' onClick={abrirModal}>
          <span>Remover</span>
        </button>
      </div>

      {modalSit && (
        <div className='modal'>
          <div className='modalContent'>
            <div>
              <span>Senha:</span>
            </div>
            <p></p>
            <div>
              <input type='text' onChange={(evento) => setSenha(evento.target.value)} ></input>
            </div>
            <p></p>
            <div>
              <span>Data a ser removida a conferencia:</span>
            </div>
            <p></p>
            <div>
              <input type='date' id='dia' onChange={(evento) => setDia(evento.target.value)}></input>
            </div>
            <p></p>
            <div>
              <button onClick={excluirConf}>Excluir</button>
            </div>
            <p></p>

            <button onClick={fecharModal}>Fechar</button>
          </div >
        </div>

      )
      }
    </>

  )
}

export default Home;
