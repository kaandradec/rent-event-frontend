import Bento from "@/components/Bento";
import Bento2 from "@/components/Bento2";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import IntroContent from "@/components/IntroContent";
import VideoLanding from "@/components/VideoLanding";

export default function Landing() {
  return (
    <main >
      <VideoLanding />
      <Intro
        title="Plataforma web de creación de eventos"
        description1="Elige entre una amplia variedad de plantillas de eventos y personalízalas a tu gusto."
        description2="Crea eventos de forma rápida y sencilla, sin necesidad de conocimientos técnicos."
        description3="Gestiona tus eventos de forma eficiente y segura."
      />
      <Bento />
      <IntroContent title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ducimus
        quas impedit, debitis at laborum iusto nisi consequuntur quod excepturi
        sed rerum non incidunt illum nemo eaque ad obcaecati cumque!" />
      <Bento2 />
      <IntroContent
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ducimus
        quas impedit, debitis at laborum iusto nisi consequuntur quod excepturi
        sed rerum non incidunt illum nemo eaque ad obcaecati cumque!"
        description2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ducimus quas impedit, debitis at laborum iusto nisi consequuntur quod excepturi sed rerum non incidunt illum nemo eaque ad obcaecati cumque!"
      />
      <Footer />
    </main>
  )
}
