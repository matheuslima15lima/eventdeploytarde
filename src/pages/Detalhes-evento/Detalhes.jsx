import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import TableD from "./TableD/TableD";
import TableDaluno from "./TableD/TableDaluno";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {
  eventsResource,
  myEventsResource,
  presencesEventResource,
  commentaryEventResource,
  eventsTypeResource,
  User,
} from "../../Services/Service";

import "./Detalhes.css";
import { UserContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { dateFormatDbToView } from "../../Utils/stringFunctions";

const Detalhes = () => {
  // state do menu 
  
  // const{idEvento} = useParams();

  const [eventos, setEventos] = useState({});
  const [comentarios, setComentarios] = useState([]);
  const [dataEvento, setDataEvento] = useState({});
  // select mocado
  // const [quaisEventos, setQuaisEventos] = useState([
  const quaisEventos = [
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ];

  const [tipoEvento, setTipoEvento] = useState({}); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData } = useContext(UserContext);
  
  const {idEvento} = useParams();


  useEffect(() => {
    // loadEventsType();
    listarComentarios();
    events();
    typeEvents();
    // buscarUsuarioPorId();
    {console.log("VE AQUIIIIIIIIIII")}
    console.log(eventos);
  }, [userData.role]); //

  //funcao buscar por id

//   async function buscarUsuarioPorId (){
//     const buscando = await api.get(`${User}/${userData.userId}`);
//     console.log("aqiiiii");
//     console.log(buscando.Nome);
//    return (buscando.data);
  
// }

    //Aqui eu busco as informações do evento
    async function events(){
      try {
        
        const findEvent = await api.get(eventsResource+`/${idEvento}`);
        setEventos(findEvent.data.nomeEvento);

        setDataEvento(findEvent.data.dataEvento);

        

      } catch (error) {
        console.log("PROBLEMAS NO EVENTO");
      }
    }
    
    async function typeEvents(){
      try {
        
        const findEvent = await api.get(eventsTypeResource+`/${idEvento}`);
        

        setTipoEvento(findEvent.data.titulo)

      } catch (error) {
        console.log("PROBLEMAS NO EVENTO");
      }
    }
  
    //GET DE COMENTARIOS
  async function listarComentarios(){
    try {
     // if(userData.role === "Administrador"){
        const listAll = await api.get(commentaryEventResource +`?id=${idEvento}`);
        
        const listOnlyShow = await api.get(commentaryEventResource +`/ListarSomenteExibe?id=${idEvento}`);

        

        //filter para trazer somente os comentarios do evento escolhido ao inves de trazer os comentarios de diversos eventos
        const myComm = await listAll.data.filter(
          (comm) => comm.idEvento === idEvento
        );


          // Chamo o filter aqui pois ele tras a listagem como eu preciso
        setComentarios(userData.role === "Administrador" ? myComm : listOnlyShow.data);
        
       
      //}
   
      //else{

        //const listaTodos = await api.get(commentaryEventResource +`/ListarSomenteExibe?id=${idEvento}`);

        // ListarSomenteExibe?id=3ca40a8c-095f-4a4e-8248-4fc354d67bb9
        //console.log("ver aquiiiiiiiiiiiiiiiiiiiiiii");
       // console.log(listaTodos.data);

       // setComentarios(listaTodos.data);
      }
      

     
    catch (error) {
      console.log(error);
    }
  }
  
 
  
  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={`Detalhes do Evento ${eventos}`} additionalClass="custom-title"  />
          <Title titleText={`Tipo de Evento ${tipoEvento}`} additionalClass="custom-title"  />
          {/*toLocaleDateString esta sendo usado devido o title não estar aceitando o dateFormatDbToView*/}
          <Title titleText={`Data do Evento ${new Date(dataEvento).toLocaleDateString()}`} additionalClass="custom-title"  />
            
            
          {/* <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          /> */}

          
          {userData.role === "Administrador"?//Se a role for diferente de adm, sera mostrada uma tabela sem coluna de situacao
          <TableD
            dados={comentarios}
            // fnConnect={handleConnect}
            // fnShowModal={showHideModal}
          />
          :
          <TableDaluno
          dados={comentarios}
          />
        }
        </Container>
      </MainContent>
      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

   
    </>
  );




    

  
  
  };
  export default Detalhes;
  


 
