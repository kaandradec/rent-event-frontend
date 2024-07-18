import "../styles/videoStyle.css";
import {CrearEventoButton} from "@/components/CrearEventoButton.jsx";

export default function VideoLanding() {

    return (
        <div className="w-full relative">
            <section className="w-full flex justify-center">
                <h1 className="backdrop-blur-sm absolute mt-32 z-10 text-2xl md:text-5xl text-white top-20 uppercase font-semibold max-w-7xl text-center text-pretty px-1">
                    Organiza tu evento aqui!
                </h1>
                <h1 className="backdrop-blur-sm absolute mt-48 z-10 text-2xl md:text-5xl text-white top-20 uppercase font-semibold max-w-7xl text-center text-pretty px-1">
                    Personalizalo a tu gusto en minutos!
                </h1>
            </section>
            <section
                className="flex justify-center items-center absolute z-50 inset-0 gap-4 max-w-xl mx-auto translate-y-60">
                <h2 className="text-lg md:text-xl text-white font-semibold text-center px-1">
                    Empieza a crear tu evento y disfruta de una experiencia inolvidable
                </h2>
                <CrearEventoButton/>
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
