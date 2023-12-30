import React, { useState } from "react";
import "./NextEvent.css";

import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import { Link, redirect } from "react-router-dom";
import Detalhes from "../../pages/Detalhes-evento/Detalhes";
import Toggle from "../Toggle/Toggle";


const NextEvent = ({ title, description, eventDate, idEvent, s }) => {

  // const {idEvento, setIdEvento} = useState({});

  function conectar(idEvent) {
    // dá pra usar a prop idEvent? testar
    alert(`Chamar o recurso para conectar: ${idEvent}`);
  }

  function visualizar(idEvent) {
    // dá pra usar a prop idEvent? testar
    alert(`Chamar o recurso para conectar: ${idEvent}`);
  }
  // const NextEvent = ({ title, description, eventDate, idEvent }) => {
    //   function visualizar(idEvent) {
      //     <Link to = "/detalhes/:idEvento" ></Link>  
      //   }

  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"
        
        data-tooltip-id={idEvent}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvent} className="tooltip" />
          {description.substr(0, 15)} ...  
       
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
        
      </p>
      

      {new Date(eventDate) < Date.now()?
        <Link to  = {`/detalhes/${idEvent}`}
        onClick={() => {
          conectar(idEvent);
          
        }}
       
        className="event-card__connect-link"
      >
        Visualizar
        </Link>
        //Tag link aqui (TAG DE FECHAMENTO)
       
      :
      
          <Link to = {`/detalhes/${idEvent}`}
      onClick={() => {
        conectar(idEvent);

      }}
      className="event-card__connect-link"
    >
     
        Conectar
        </Link>
    
      
      }
 
    </article>
  );
};

export default NextEvent;

