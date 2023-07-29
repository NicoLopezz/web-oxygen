"use client"; 
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import TokenEmitido from "@/app/components/TokenEmitido";
import "../../src/app/styles/mainpage.css"
import imgServicio1 from "../../public/assets/images/imgServicio1.png"
import imgServicio2 from "../../public/assets/images/imgServicio2.png"
import imgServicio3 from "../../public/assets/images/imgServicio3.png"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "../../src/app/globals.css";
import CardService from "@/app/components/CardService";
import bdbLogo from "../../public/assets/logos/BdBLogo.png";
import chronosPayLogo from "../../public/assets/logos/chronosPayLogo.png"
import finguruLogo from "../../public/assets/logos/finguruLogo.png"
import tokenIcon from "../../public/assets/logos/logoQToken.png"
import logoTokenOM from "../../public/assets/logos/logoTokenOM.png";
import logoTokenOC from "../../public/assets/logos/logoTokenOC.png";
import SliderComp from "@/app/components/SliderComp";
import ReactPlayer from "react-player";
import DataContent from "@/app/components/DataContent";
import Head from "next/head";



const MainPage = () => {
  /*Resize video*/
  useEffect(() => {
    const handleResizeVideo = () => {
      const videoElement = document.querySelector('.videoHome');
      if (videoElement) {
        const width = videoElement.offsetWidth;
        const height = (width / 16) * 9; // Proporción 16:9, ajusta según tus necesidades
        videoElement.style.height = `${height}px`;
      }
    };

    window.addEventListener('resize', handleResizeVideo);
    return () => {
      window.removeEventListener('resize', handleResizeVideo);
    };
  }, []);

  /*Mobile control para sliders*/
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        const mobileThreshold = 650; // Valor de ancho para considerar la vista como móvil
  
        setIsMobileView(screenWidth < mobileThreshold);
      };
  
      handleResize(); // Verificar inicialmente el tamaño de la ventana
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize); // Limpiar el listener al desmontar el componente
      };
    }, []);
const tokensEmitidos = [
    {
      logo: tokenIcon,
      title: "¿Qué es un token?",
      text: "Es una moneda virtual que representa un activo o una utilidad comercializable. Se almacena en una billetera digital y permite al titular usarlo para fines de inversión o económicos",
    },
    {
      logo: logoTokenOM,
      title: "Token OM",
      text: "Éste token es una certificación digital de 1 m2 de bosque nativo. Con tu compra, estás protegiendo el bosque para siempre",
    },
    {
      logo: logoTokenOC,
      title: "Token OC",
      text: "Día a día, los árboles absorbe el carbono de la atmósfera que emitimos como humanos. Medimos cuánto carbone absorbe tu (OM) y te entregamos este token (C) como certificación digital de Bonos de Carbono",
    },
  ];

  const dataObject = [
    {
      number: "133.150",
      text: "hectareas de bosque",
    },
    {
      number: "190.214",
      text: "estadios de fútbol",
    },
    {
      number: "27.548",
      text: "tn CO2 compensadas",
    },
  ]

  
  
  
  return (<>
        
        <Head>
      <title>Oxygen Token</title>
      <meta name='description' content='Reduci tus emisiones de CO2 con Oxygen'/>
      <link rel='icon' href='./favicon.ico'/>
      
      </Head> 
        <Navbar/>
        <section className="layoutHome">
      

            <ReactPlayer
                url="https://www.youtube.com/watch?v=nqye02H_H6I&ab_channel=RelaxingTree"
                className="videoLayout"
                playing= {true}
                loop ={true}
                muted
                height="100vh"
                width="100%"
              

              />
            <h1>Invertí a favor del ambiente</h1>
            <h3>Protegemos árboles de ser talados y conservamos  <br/> territorios nativos</h3>
            <button className="buttonHome"><a href="#servicios"> Comenzá </a></button>

            <div className="dataBoard">
              {isMobileView ? (
              <SliderComp automatico = {true} estilo="2" proyectos={dataObject.map((data, index) => (
              <DataContent
              key={index}
              number={data.number}
              text={data.text}
              />
              ))} />
              ) : (
                <>
                <div className="dataContent">
                <p className="dataNumber"><strong>133.150</strong></p>
                <p>hectareas <br/> de bosque</p>
                </div>
                <div className="dataBoardLine"></div>
                <div className="dataContent">
                <p className="dataNumber"><strong>190.214</strong></p>
                <p>estadios <br/> de fútbol</p>
                </div>
                <div className="dataBoardLine"></div>
                <div className="dataContent">
                <p className="dataNumber"><strong>27.548</strong></p>
                <p>tn CO2 <br/> compensadas</p>
                </div>
                </>
                
           
      )}
    </div>           
        </section>
        
        <section className="servicesHome" id="servicios">
            <div className="servicesText"><h3>SERVICIOS</h3>
            <h1>CONSERVÁ LOS <br/>TERRITORIOS NATIVOS</h1>
            <p>Los bosques nativos son uno de los principales  <br/> productores de oxígeno, son esenciales para nosotros y <br/> todos los seres vivos del planeta. Por esto, debemos <br/>proteger los territorios nativos de ser deforestados.</p></div>
            <div className="servicesContainer" >
            <CardService 
                number= "1."
                image={imgServicio1} 
                title="Medí"
                text="Conocé tu impacto ambiental. Utilizá la calculadora y descubrí tus emisiones de CO2"
                link = "https://www.mihuelladecarbono.app/quiz"
                />
                
            <CardService 
                number="2."
                image={imgServicio2} 
                title="Compensá"
                text="Tu compra garantiza la protección del bosque. Salvá a los árboles de ser talados y a la fauna de ser desplazada"
                link= "/"/>
            <CardService 
                number="3."
                image={imgServicio3}
                title="Monitoreá"
                text="Visualizá la cantidad de árboles y especies salvadas, y cuánto CO2 absorbió tu inversión en un año."
                link = ""/>
               
            </div>


            
            
        </section>

        <section className="tokensEmitidos">
            <h2>TOKENS EMITIDOS</h2>
            <h1>LOS ÁRBOLES SON LA MEJOR TECNOLOGÍA <br/> PARA DETENER EL CAMBIO CLIMÁTICO</h1>
            <div className="tokenContainer">
      {isMobileView ? (
        <SliderComp proyectos={tokensEmitidos.map((token, index) => (
          <TokenEmitido
            key={index}
            logo={token.logo}
            title={token.title}
            text={token.text}
          />
        ))} />
      ) : (
        tokensEmitidos.map((token, index) => (
          <TokenEmitido
            key={index}
            logo={token.logo}
            title={token.title}
            text={token.text}
          />
        ))
      )}
    </div>
 
        </section>
        <section className="tokensHome">
            <h1> Oxygen Token</h1>
            <div className="tokenContainer">
                <div className="token"></div>
                <div className="token"></div>
                <div className="token"></div>
                <div className="token"></div>

            </div>
            <div className="tokensProgress">
                <div className="progressLine"></div>
                <p> Objetivo final: <br/> 000 hectareas</p>
            </div>
            <div className="line"></div>

        </section>



        <section className="videoPresentacion" >
            
              <ReactPlayer
                url="https://www.youtube.com/watch?v=ZLd7lNXcinI"
                className="videoHome"
                controls
              
              />


            <div className="videoText">
                <h3>NUESTRO MANIFIESTO</h3>
                <h1>CONVERTITE EN CARBONO <br/> NEUTRAL, USA OXYGEN</h1>
                <p>Queremos cambiar el esquema de donaciones convencional <br/>y así, poder salvar los bosques nativos. ¡Abrimos el mercado <br/> para una valoración internacional de terrenos de bosque nativo!</p>
            </div>
        </section>

        <section className="alianzasSeccion">
            <h3>ALIANZAS</h3>
            <div className="alianzasContainer">
                <Image className = "alianza" src={bdbLogo} alt = "Banco de Bosques"/>
                <Image className = "alianza" src={chronosPayLogo} alt = "Chronos Pay"/>
                <Image className = "alianza" src={finguruLogo} alt = "Finguro"/>
                
            </div>
        </section>

        <section className="phrase">
            <h2>"La crisis climática esta causada por nosotros y las soluciones deben venir <br/> de nosotros. Tenemos las herramientas:la tecnología está de nuestro <br/> lado"</h2> <p>- Antonio Guterres, Secretario General de la ONU</p>
            <button>Comenzar</button>
        </section>

        <Footer/>
        
        </>
     
    );
  };
  
  export default MainPage;