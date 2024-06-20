import './Home.css';
import { useState } from 'react';
import axios from 'axios';

const host = "https://dot-back.onrender.com";

function Home() {
  const [nome, setNome] = useState('');
  const [link, setLink] = useState('');
  const [data, setData] = useState('');



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

    </>

  )
}

export default Home;
