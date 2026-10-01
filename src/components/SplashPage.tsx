import React, { useRef, useEffect, useState } from 'react';

interface SplashPageProps {
  onEnterLobby: () => void;
}

export const SplashPage: React.FC<SplashPageProps> = ({ onEnterLobby }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play with audio once
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If browser security policy blocks unmuted autoplay without prior gesture, play muted
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  const handleExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      onEnterLobby();
    }, 500);
  };

  const handleContainerClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.muted) {
        video.muted = false;
        video.play().catch(() => {});
      } else {
        handleExit();
      }
    } else {
      handleExit();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-500 cursor-pointer select-none ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #faf9f6 50%, #f4f1ea 100%)',
      }}
    >
      {/* Clean Minimalist Center Video (Apple-Style Clean Frame, No Buttons) */}
      <div className="relative w-full max-w-4xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.18)] bg-black">
        <video
          ref={videoRef}
          playsInline
          autoPlay
          onEnded={handleExit}
          onError={handleExit}
          className="w-full h-full object-cover"
        >
          <source src="/videos/contax360_intro.mp4" type="video/mp4" />
          <source
            src="https://raw.githubusercontent.com/amalliance27-bit/contAX360/e22d6835496963624042d994fa7f91c7d42231d0/Contax360%20intro%20video.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

