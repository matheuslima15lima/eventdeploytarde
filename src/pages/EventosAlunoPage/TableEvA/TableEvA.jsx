import React from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import { dateFormateDbToView } from "../../../Utils/stringFunctions";
import ToggleSwitch from "../../../components/Toggle/Toggle";
import detailsIcon from "../../../assets/images/icon _eye empty_.svg"
import { Link, redirect } from "react-router-dom";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
// import { Tooltip } from "react-tooltip";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableEvA.css";

const Table = ({ dados, fnConnect = null, fnShowModal = null, idEvent }) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Data
          </th>

           
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Detalhes
          </th>

          <th className="tbal-data__head-title tbal-data__head-title--big">
            Ações
          </th>

        </tr>
      </thead>
      <tbody>
        {dados.map((e) => {
          return (
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
                {e.nomeEvento}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {/* {e.dataEvento} */}
                {dateFormateDbToView(e.dataEvento)}
              </td>

              
              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
               <Link to = {`/detalhes/${e.idEvento}`}
                
             
               >
                <img
                  className="tbal-data__icon"
                  src= {detailsIcon}
                  alt="icone de um olho que te leva para pagina de detalhes"
                >
                </img>
                </Link>
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {/* imagem do comentário - abre o modal */}
                {new Date(e.dataEvento) < Date.now() ? (
                  <img
                    className="tbal-data__icon"
                    // idevento={e.idEvento}
                    src={comentaryIcon}
                    alt=""
                    onClick={() => {
                      fnShowModal(e.idEvento);
                    }}
                  />
                ) : null}
                <ToggleSwitch
                  toggleActive={e.situacao}
                  manipulationFunction={
                    new Date(e.dataEvento) > Date.now()
                      ? () => {
                          fnConnect(
                            e.idEvento,
                            e.situacao ? "unconnect" : "connect",
                            e.idPresencaEvento //parâmetro opcional
                          );
                        }
                      : () => {
                          alert("Evento não está mais disponível");
                        }
                  }
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
