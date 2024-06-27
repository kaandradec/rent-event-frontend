import "../styles/videoStyle.css";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function VideoLanding() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative">
      <section className="w-full flex justify-center">
        <h1 className="absolute z-10 text-2xl md:text-5xl text-white top-20 uppercase font-semibold max-w-7xl text-center text-balance px-1">
          Crea tu evento deseado y personalizado en minutos juento a Rent Event
        </h1>
      </section>
      <section className="flex justify-center items-center absolute z-50 inset-0 gap-4 max-w-xl mx-auto translate-y-96">
        <h2 className="text-lg md:text-xl text-white font-semibold text-center px-1">
          Empieza a crear tu evento y disfruta de una experiencia inolvidable
        </h2>
        <Button
          onClick={() => navigate("/services")}
          size="lg"
          color="warning"
          variant="shadow"
          className="font-bold px-12"
        >
          CREAR EVENTO
        </Button>
      </section>

      <video
        className="w-full h-screen object-cover animate-fade animate-duration-1000 "
        src="/event-video.mp4"
        autoPlay
        muted
        loop
        // style={styles.videoClipPath}
      ></video>
      <video
        className="absolute -bottom-48 blur-3xl -z-40"
        src="/event-video.mp4"
        autoPlay
        muted
        loop
      ></video>
    </div>
  );
}
