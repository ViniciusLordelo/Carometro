import '../../src/Login.css';
import { Component } from 'react';
import axios from 'axios';
import { parseJwt, } from '../../src/services/auth';



class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      /*isLoading: false*/
    }
  }

  efetuaLogin = (event) => {

    event.preventDefault();

    //remove a frase do state erroMensagem
    this.setState({ erroMensagem: ''/*isLoading: true*/ })

    axios.post('http://localhost:5000/api/Login', {
      email: this.state.email,
      senha: this.state.senha
    })

      // Verifica o retorno da requisição
      .then(resposta => {
        // Caso o status code seja 200,
        if (resposta.status === 200) {
          // salva o token no localStorage,
          localStorage.setItem('usuario-login', resposta.data.token);
          // exibe o token no console do navegador
          console.log('Meu token é: ' + resposta.data.token);
          // e define que a requisição terminou
          this.setState({ isLoading: false })

          // Define a variável base64 que vai receber o payload do token
          let base64 = localStorage.getItem('usuario-login').split('.')[1];
          // Exibe no console o valor presente na variável base64
          console.log(base64);
          // Exibe no console o valor convertido de base64 para string
          console.log(window.atob(base64));
          // Exibe no console o valor convertido da string para JSON
          console.log(JSON.parse(window.atob(base64)));

          // Exibe no console apenas o tipo de usuário logado
          console.log(parseJwt().role);

          // Verifica se o tipo de usuário logado é Administrador

          // if (parseJwt().role === '1') {
          //   this.props.history.push('/Adm');
          //   console.log('estou logado: ' + usuarioAutenticado());
          // }

          switch (parseJwt().role) {
            case '1':
              this.props.history.push('/Adm');
              break;

            case '2':
              this.props.history.push('/Paciente');
              break;

            case '3':
              this.props.history.push('/Medico');
              break;

            default:
              this.props.history.push('/');
              break;
          }
        }



      })

      //caso o usuario erre a senha ou email,
      .catch(() => {

        //define o valor do state erroMensagem como uma mensagem personalizada
        this.setState({ erroMensagem: 'E-mail ou senha inválidos! Tente novamente.', /*isload: true*/ })
      })

  }

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value })
  }


  render() {
    return (
      <div className='Login'>
        <div className='login__retangulo'>

          <a>LOGIN</a>
          <input
            className='input_login'
            type='text'
            name='email'
            // value={this.state.Email}
            // onChange={this.atualizaStateCampo}
            placeholder='Email'
          />


          <input
            type='password'
            name='senha'
            className='input_login'
            // value={this.state.senha}
            // onChange={this.atualizaStateCampo}
            placeholder='Senha'
          />



          <button type='submit'
            className='button'
          >
            Entre
          </button>

        </div>
      </div>

    );
  }
}
export default Login;
