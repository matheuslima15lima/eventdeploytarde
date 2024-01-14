import React, { useEffect, useState } from "react";

import{Swiper, SwiperSlide} from 'swiper/react'
import "./HomePage.css";
import App from "../../App";
import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import { nextEventResource, eventsResource,  presencesEventResource } from "../../Services/Service";
import { Link } from "react-router-dom";





const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification
{/* <Link to={`/detalhes-evento/${idEvento}`}>Detalhes do Evento</Link> */}
  // roda somente na inicialização do componente
  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(eventsResource);//AGORA TRAZENDO TODOS OS EVENTOS AO INVÉS DE SÓ OS PRÓXIMOS
        const dados = await promise.data;
        // console.log(dados);
        setNextEvents(dados); //atualiza o state

      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
        // setNotifyUser({
        //   titleNote: "Erro",
        //   textNote: `Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet`,
        //   imgIcon: "danger",
        //   imgAlt:
        //   "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        //   showMessage: true,
        // });
      }
    }

    

    getNextEvents(); //chama a função
  }, []);
  return (
    
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          {/* <Title titleText={"Próximos Eventos"} /> */}

          <div className="events-box">
            <Swiper
              slidesPerView={3}
              pagination ={{clickable: true}}
              navigation
            >
            {nextEvents.map((e) => {
              return (
                <SwiperSlide>
                <NextEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                  s = {e.situacao}

                  
                />
                </SwiperSlide>
              );
            })}
            </Swiper>
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
