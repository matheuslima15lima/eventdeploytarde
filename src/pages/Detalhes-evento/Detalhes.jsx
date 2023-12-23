import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import TableD from "./TableD/TableD";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {
  eventsResource,
  myEventsResource,
  presencesEventResource,
  commentaryEventResource,
  User,
} from "../../Services/Service";

import "./Detalhes.css";
import { UserContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const Detalhes = () => {
  // state do menu 
  
  // const{idEvento} = useParams();

  const [eventos, setEventos] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  // select mocado
  // const [quaisEventos, setQuaisEventos] = useState([
  const quaisEventos = [
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ];

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData } = useContext(UserContext);
  const [comentario, setComentario] = useState("");
  const [idComentario, setIdComentario] = useState(null);
  const {idEvento} = useParams();


  useEffect(() => {
    // loadEventsType();
    listarComentarios();
    // buscarUsuarioPorId();
  }, [userData.role]); //

  //funcao buscar por id

//   async function buscarUsuarioPorId (){
//     const buscando = await api.get(`${User}/${userData.userId}`);
//     console.log("aqiiiii");
//     console.log(buscando.Nome);
//    return (buscando.data);
  
// }
  
    //GET DE COMENTARIOS
  async function listarComentarios(){
    try {
     // if(userData.role === "Administrador"){
        const listAll = await api.get(commentaryEventResource +`?id=${idEvento}`);
        
        const listOnlyShow = await api.get(commentaryEventResource +`/ListarSomenteExibe?id=${idEvento}`);


        console.log(userData.role);

        //filter para trazer somente os comentarios do evento escolhido
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
          <Title titleText={"Detalhes do Evento"} additionalClass="custom-title" />

          {/* <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          /> */}
          <TableD
            dados={comentarios}
            // fnConnect={handleConnect}
            // fnShowModal={showHideModal}
          />
        </Container>
      </MainContent>
      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

   
    </>
  );




    

  
  
  };
  export default Detalhes;
  


 
