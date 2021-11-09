

import React from "react";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import paises from './paises.json';
import ciudadesJson from './countries.json';

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  
  const [todos , setTodos]= React.useState()
  const [historial , setHistorial]= React.useState()
  const [climaCity , setClimaCity]= React.useState()
  const [ciudades , setCiudades]= React.useState([])

  const [pais , setPais]= React.useState({
    pais:'',
    nombre:''


  })


  const handleChange=e=>{

    let index = e.target.selectedIndex;
    const {name , value}=e.target;
    console.log(e.target)
    fetchApi(value)
    peticionPost(e.target.options[index].text)
  
    setPais({
      ...pais,
      [name]:value,
      nombre:e.target.options[index].text,
    });
    peticionGetHistorial();


  }




  async function fetchApiClima(value , nombreCity){

    const urlNews = `http://api.openweathermap.org/data/2.5/weather?q=${nombreCity},${value}&APPID=947586f18a3597efa4403d74f5a2a150`
    const response = await fetch(urlNews)
    const responseJSON =await response.json()
    setClimaCity(responseJSON)
    console.log(responseJSON)

    return (
      <div>{this.climaCity.name}</div>
   )
   

  }


  const fetchApi = async (value) =>{

    const urlNews = `https://newsapi.org/v2/top-headlines?country=${value}&apiKey=7ae8d206451f400597f891e4cc3601df`
    const response = await fetch(urlNews)
    const responseJSON =await response.json()
    setTodos(responseJSON)
    console.log(responseJSON)
  }

  
  const ClimaApp = () =>{

    var arrayCities = []
   
    ciudadesJson.data.map((pais1 , index)=>{
      console.log('entro al clima app for')

     if(pais1.country==pais.nombre){
      
        console.log('entro')
        arrayCities = pais1.cities;
        pais1.cities.map((ciry , index)=>{
          console.log(ciry)
        }) 
  
    }
    
  })


  return setCiudades(arrayCities);
  }

  

  const peticionPost=async(nombre)=>{

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: nombre , fecha_consulta:hoy.toISOString()})
  };
  const response = await fetch('https://localhost:5001/api/historial_ciudades', requestOptions);
  const data = await response.json();
  return data;

  }

  const peticionGetHistorial = async () =>{

    const urlNews = `https://localhost:5001/api/historial_ciudades`
    const response = await fetch(urlNews)
    const responseJSON =await response.json()
    setHistorial(responseJSON)
    console.log(responseJSON)
  }

    
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {

    

  });
  return (
    <>
     
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">

            </div>
            <div className="name">
              <h4 className="title">
                News Api  <br />
              </h4>
              <h6 className="description">Prueba para desarrollador , consumo de apis atravez de React</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="5">
              <p>
                Se consumira el Api de newsApi para la seccion de noticias y el Api de openweathermap para la seccion de clima.
                Tambien se consumira el api desarrollada en C# para ver el historial de consumo.
              </p>
              <br />
              <h3>Selecione el pais</h3>

              <select data-id="pais" name="pais" className="form-select" onChange={handleChange}> 

              { !paises ? 'cargando....' :
               paises.map( (pais , index)=>{
               return <option key={index} value={`${pais.iso2}`} >{pais.nombre}</option>
             })
             }
                
              </select>

              <br/>
         
            </Col>
          </Row>
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Noticias
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink 
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      peticionGetHistorial()
                      toggle("2");
                    }}
                    
                  >
                    Historial
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => {
                      ClimaApp();
                      toggle("3");
                    }}
                  >
                    Clima
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          {/* Tab panes */}
          <TabContent className="following" activeTab={activeTab}>
            <TabPane tabId="1" id="follows">
              <Row>
                <Col className="ml-auto mr-auto" md="6">
                  <ul className="list-unstyled follows">
                  { !todos ? 'cargando....' :
                   todos.articles.map( (news , index)=>{
                   return  <li key={index}>
                   <Row>
                     <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                       <img
                         alt="..."
                         className="img-circle img-no-padding img-responsive"
                         src={
                          news.urlToImage
                         }
                       />
                     </Col>
                     <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                       <h6>
                         {news.author} <br />
                           {news.title} <br />
                         <small>{news.content}</small>
                       </h6>
                     </Col>
                     <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                     <br />

                     <div className="form-control-feedback">
                     <h5><a href={news.url}   color="info" >  Ver noticia completa </a></h5>
                     </div>
                     
                     </Col>
                   </Row>
                 </li>
                  })
                }
                  </ul>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="text-center" tabId="2" id="following">
            

            <Row>
                <Col className="ml-auto mr-auto" md="6">
                  <ul className="list-unstyled follows">
                  { !historial ? 'cargando....' :
                   historial.map( (historia , index)=>{
                   return  <li key={index}>
                   <Row>
                     <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                       
                     </Col>
                     <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                       <h6>
                         {historia.city} <br />
                           {historia.fecha_consulta} <br />
                         <small>{historia.id}</small>
                       </h6>
                     </Col>
                     <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                     <br />

                     
                     </Col>
                   </Row>
                 </li>
                  })
                }
                  </ul>
                </Col>
              </Row>
                  

            </TabPane>

            <TabPane className="text-center" tabId="3" id="following">
            

            <Row>
                <Col className="ml-auto mr-auto" md="6">
                  <ul className="list-unstyled follows">
                  { !ciudades ? 'cargando....' :
                   ciudades.map( (ciudad , index)=>{
                   
                   return  <li key={index}>
                   <Row>
                     <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                       
                     </Col>
                     <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                       <h6>
                          <br />
                         <small></small>
                         
                       </h6>
                       <Button
                         className="btn-link"
                         color="primary"
                        href={`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais.value}&APPID=947586f18a3597efa4403d74f5a2a150`}
                        
                       >
                {ciudad}
              </Button>
                      
                     </Col>
                     <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                     <br />

                     
                     </Col>
                   </Row>
                 </li>
                  })
                }
                  </ul>
                </Col>
              </Row>
                  

            </TabPane>





          </TabContent>
        </Container>
      </div>

    </>
  );
}

export default ProfilePage;
