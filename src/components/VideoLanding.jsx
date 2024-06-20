import React from "react";

import "../styles/videoStyle.css";

// const styles = {
//   videoClipPath: {
//     clipPath: "polygon(100% 0, 100% 85%, 50% 100%, 0 85%, 0 0)",
//     "@media (max-width: 768px)": {
//       clipPath: "polygon(100% 0, 100% 85%, 50% 90%, 0 85%, 0 0)",
//     },
//   },
// };

export default function VideoLanding() {
  return (
    <div className="w-full relative">
      <div className="w-full flex justify-center">
        <h1 className="absolute z-10 text-2xl md:text-5xl text-white top-20 uppercase font-semibold max-w-7xl text-center text-balance px-1">
          Crea tu evento deseado y personalizado en minutos juento a Rent Event
        </h1>
      </div>

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
