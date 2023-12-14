import React from "react";
import "./NextEvent.css";

import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import { Link, redirect } from "react-router-dom";


const NextEvent = ({ title, description, eventDate, idEvent }) => {
  // function conectar(idEvent) {
  //   // dá pra usar a prop idEvent? testar
  //   alert(`Chamar o recurso para conectar: ${idEvent}`);
  // }
// const NextEvent = ({ title, description, eventDate, idEvent }) => {
//   function visualizar(idEvent) {
//     redirect = "/detalhes/:idEvento"
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
      

      {dateFormatDbToView(eventDate) <= Date.now()?
       ( <Link to = "/detalhes/:idEvento"
        // onClick={() => {
        //   conectar(idEvent);
        // }}
       
        className="event-card__connect-link"
      >
        Visualizar
        </Link>
       )
      :
      (
        <Link to = "/detalhes/:idEvento"
      // onClick={() => {
      //   conectar(idEvent);
      // }}
      className="event-card__connect-link"
    >
     
        Conectar
        </Link>
    
      )
      }
 
    </article>
  );
};

export default NextEvent;

