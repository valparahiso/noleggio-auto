import React from 'react';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css'
import Header from './components/Header.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from './components/Filters.js'; 
import './App.css';
import API from './api/API';
import Automobili from './components/Automobili';
import Login from './components/Login';
import LoginError from './components/LoginError';
import {Route, Switch, Redirect} from 'react-router-dom'; 
import Configurazione from './components/Configurazione';
import Risultati from './components/Risultati';
import moment from 'moment'
import Pagamento from './components/Pagamento';
import Prenotazioni from './components/Prenotazioni';
import Storico from './components/Storico'

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      automobili : [],
      marche : [],
      categorie : [],
      authError : {msg:""},
      authUser : {},
      showError : false,
      noleggio : {
        risultati : -1,
        datainizio : "",
        datafine : "",
        categoria : "", 
        chilometri : "",
        etaguidatore : "",
        guidatoriaddizionali : "",
        assicurazione : "" ,
        veicoli : "",
        prezzo : "",
        auto:"",
        user:"",
        giorni:0
      },
      prenotazioni : [],
      storico: []
    }
  }

  login(username, password){
    API.userLogin(username,password).then((user)=>{
      this.props.history.push("/configurazione");
      let noleggio = this.state.noleggio;
      noleggio.user = user.id;
      this.setState({
        authUser : user,
        showError : false,
        noleggio : noleggio
      })
    }).catch((errorObj)=>{
      this.setState({
        authError:errorObj.errors[0],
        authUser : {},
        showError : true
      })
      console.log(this.state.authError);
    })
  }

  logout(){
    API.userLogout().then(()=>{
      this.props.history.push("/login");
      this.setState({
        authError:{},
        authUser:{},
        showError:false,
        noleggio : {
          risultati : -1,
          datainizio : "",
          datafine : "",
          categoria : "", 
          chilometri : "",
          etaguidatore : "",
          guidatoriaddizionali : "",
          assicurazione : "" ,
          veicoli : "",
          prezzo : "",
          auto:"",
          user:"",
          giorni:0
        },
        prenotazioni :[],
        storico : []
        
      })
    })
  }

  getCategorie(automobili){
    let categorie = [];
    for(let auto of automobili){
      if(!categorie.map(categoria => categoria.nome).includes(auto.categoria)) categorie.push(
        {
          nome : auto.categoria,
          checked : true
        });
      } 
    return categorie;
  }

  getMarche(automobili){
    let marche = [];
    for(let auto of automobili){
      if(!marche.map(marca => marca.nome).includes(auto.marca)) marche.push(
      {
        nome : auto.marca, 
        checked : true
      });
    } 
    return marche;
  }

  changeFilters(){
    let marche = this.state.marche.map((marca)=>{
      if(marca.checked !== document.getElementById("checkbox-" + marca.nome).checked){
        return {
          nome : marca.nome,
          checked : !marca.checked
        }
      } return marca;
    })

    let categorie = this.state.categorie.map((categoria)=>{
      if(categoria.checked !== document.getElementById("checkbox-" + categoria.nome).checked){
        return {
          nome : categoria.nome,
          checked : !categoria.checked
        }
      } return categoria;
    })
 
    this.setState({
      marche : marche,
      categorie : categorie
    })
  }

  showError(bool){
    this.setState({
      showError : bool
    })
  }

  getRisultati(datainizio, datafine, categoria, chilometri, etaguidatore, guidatoriaddizionali, assicurazione, bool){
    if(bool === false){
      let noleggio = this.state.noleggio;
      noleggio.risultati = -1; 
      this.setState({
        noleggio:noleggio
      })
    }
    else {
      API.getNoleggi(datainizio, datafine, categoria).then((row)=>{
        let noleggio = this.state.noleggio;
        noleggio.risultati = row.tot;
        noleggio.auto = row.id;
        noleggio.datainizio = datainizio;
        noleggio.datafine = datafine;
        noleggio.categoria = categoria; 
        noleggio.chilometri = chilometri;
        noleggio.etaguidatore = etaguidatore;
        noleggio.guidatoriaddizionali = guidatoriaddizionali;
        noleggio.assicurazione = assicurazione;
        noleggio.giorni = moment(this.state.noleggio.datafine).diff(moment(this.state.noleggio.datainizio), 'days') + 1;

        if(row.tot > 0){
          API.getPrezzo(this.state.authUser.id, noleggio).then((row)=>{
            noleggio.prezzo = row;
            this.setState({noleggio:noleggio}); 
          })
        }
        else this.setState({noleggio:noleggio}); 
      })
    }
  }


  pagamento(pagamento){
    API.pagamento(pagamento).then(()=>{

      this.addNoleggio();
   
    }).catch((err)=>{
      //pagamento non andato a buon fine
    })
  }

  addNoleggio(){
    API.addNoleggio(this.state.noleggio).then(()=>{
      this.props.history.push("/prenotazioni"); 
      this.setState({
        noleggio : {
          risultati : -1,
          datainizio : "",
          datafine : "",
          categoria : "", 
          chilometri : "",
          etaguidatore : "",
          guidatoriaddizionali : "",
          assicurazione : "" ,
          veicoli : "", 
          prezzo : "",
          auto:"",
          user:this.state.authUser.id,
          giorni:0
        }})
    })
  }

  getPrenotazioni(){
    API.getPrenotazioni(this.state.authUser.id, moment().format("YYYYMMDD")).then((prenotazioni)=>{
      this.setState({prenotazioni : prenotazioni});
    }).catch((err)=>{
    })
  }

  deleteNoleggio(id){
    API.deleteNoleggio(id).then(()=>{
      console.log("arrivo")
      this.getPrenotazioni();
    }).catch((err)=>{
       
    })

  }

  getStorico(){
    API.getStorico(this.state.authUser.id, moment().format('YYYYMMDD')).then((storico)=>{
      this.setState({storico:storico});
    }).catch((err)=>{});
  }

  componentDidMount(){
    API.isAuthenticated().then((user)=>{
      this.props.history.push("/configurazione");
      let noleggio = this.state.noleggio;
      noleggio.user = user.id;
      this.setState({
        authUser : user,
        showError : false,
        noleggio : noleggio,
        storico : [],
        prenotazioni :[]
      }) 
    }).catch((err)=>{
      this.setState({
        authUser : {},
        showError : false
      })
      this.props.history.push("/login");
    })
    API.getAutomobili().then((automobili)=> {
      this.setState({ 
        automobili : automobili,
        marche : this.getMarche(automobili),
        categorie : this.getCategorie(automobili),
    });
  })
  }

  render(){
    
    return (
      <> 
      <div className="App">
        <Switch>  
            <Route exact path="/login">
              <Header show={false}/>
              <Container className="cont1" fluid>
                <Row>
                  <Col sm="8">
                    <Filters marche={this.state.marche} categorie={this.state.categorie} onChange={this.changeFilters.bind(this)}/>                    
                    <Automobili automobili={this.state.automobili} marche={this.state.marche} categorie={this.state.categorie}></Automobili>
                  </Col>
                  <Col sm="4">
                    <Login handleSubmit={this.login.bind(this)} error={this.state.authError}/>
                    <LoginError show={this.state.showError} setShow={this.showError.bind(this)} error={this.state.authError.msg}/>
                  </Col>
                </Row>
              </Container>   
            </Route>

            <Route exact path="/configurazione">
              <Header user={this.state.authUser.nome} show={true} onClick={this.logout.bind(this)}/>
              <Container>
                <Row>
                  <Col sm="10">
                    <Configurazione categorie={this.state.categorie} getRisultati={this.getRisultati.bind(this)}/>
                    <Risultati noleggio={this.state.noleggio}/> 
                  </Col>
                </Row>
              </Container>
            </Route>

            <Route exact path="/pagamento">
                <Header user={this.state.authUser.nome} show={true} onClick={this.logout.bind(this)}/>
                <Container>
                  <Row>
                    <Col sm="10">
                      <Pagamento prezzo={this.state.noleggio.prezzo} pagamento={this.pagamento.bind(this)}/>
                    </Col>
                  </Row>
                </Container>
            </Route>

            <Route exact path="/prenotazioni">
              <Header user={this.state.authUser.nome} show={true} onClick={this.logout.bind(this)}/> 
              <Prenotazioni onRender={this.getPrenotazioni.bind(this)} prenotazioni={this.state.prenotazioni} onDelete={this.deleteNoleggio.bind(this)} automobili={this.state.automobili}/>
            </Route>
 
            <Route exact path="/storico">
              <Header user={this.state.authUser.nome} show={true} onClick={this.logout.bind(this)}/> 
              <Storico onRender={this.getStorico.bind(this)} storico={this.state.storico} automobili={this.state.automobili}/>
            </Route>

            <Route> 
              <Redirect to="/login"/>
            </Route>
        </Switch>
        </div>
      
      </>
    );
    
  }
}

export default withRouter(App);
