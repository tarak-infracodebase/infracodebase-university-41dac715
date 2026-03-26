import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  label?: string;
}

export function AudioPlayer({ src, label = "Listen to the introduction" }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const speeds = [1, 1.25, 1.5, 2];

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(0, audioRef.current.currentTime + seconds),
      duration
    );
  };

  const cycleSpeed = () => {
    if (!audioRef.current) return;
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    audioRef.current.playbackRate = next;
    setSpeed(next);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onLoad = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoad);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  return (
    <div
      className="rounded-[6px] overflow-hidden my-6"
      style={{
        background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 30%, #1a0800 60%, #0d0500 100%)",
        border: "0.5px solid rgba(200,112,64,0.25)",
        position: "relative",
      }}
    >
      <div style={{
        position:"absolute",top:"-40px",right:"-40px",
        width:"160px",height:"160px",borderRadius:"50%",pointerEvents:"none",
        background:"radial-gradient(circle, rgba(200,112,64,0.18) 0%, rgba(180,60,20,0.08) 40%, transparent 70%)"
      }}/>
      <div style={{
        position:"absolute",bottom:"-20px",left:"20px",
        width:"100px",height:"100px",borderRadius:"50%",pointerEvents:"none",
        background:"radial-gradient(circle, rgba(150,40,10,0.12) 0%, transparent 70%)"
      }}/>

      <div className="px-6 py-5" style={{ position: "relative" }}>
        <audio ref={audioRef} src={src} preload="metadata" />

        {/* label */}
        <p className="font-serif font-bold text-[13px] text-[#f0ece3]
                      tracking-[-0.01em] mb-4">
          {label}
        </p>

        <div className="flex items-center gap-4">

          {/* skip back 15 */}
          <button
            onClick={() => skip(-15)}
            className="text-white/35 hover:text-white/70 transition-colors
                       flex flex-col items-center gap-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.6">
              <path d="M12 5V2L7 7l5 5V9a7 7 0 110 7"/>
            </svg>
            <span className="text-[8px] font-sans text-white/25">15</span>
          </button>

          {/* play / pause */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center
                       flex-shrink-0 transition-colors"
            style={{
              border: "1px solid rgba(200,112,64,0.5)",
              background: "rgba(200,112,64,0.12)"
            }}
          >
            {playing ? (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"
                   className="text-white/80">
                <rect x="0" y="0" width="3" height="12"/>
                <rect x="7" y="0" width="3" height="12"/>
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"
                   className="text-white/80 ml-0.5">
                <polygon points="0,0 10,6 0,12"/>
              </svg>
            )}
          </button>

          {/* skip forward 15 */}
          <button
            onClick={() => skip(15)}
            className="text-white/35 hover:text-white/70 transition-colors
                       flex flex-col items-center gap-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.6">
              <path d="M12 5V2l5 5-5 5V9a7 7 0 100 7"/>
            </svg>
            <span className="text-[8px] font-sans text-white/25">15</span>
          </button>

          {/* progress bar */}
          <div
            className="flex-1 flex items-center gap-2.5 cursor-pointer group"
            onClick={seek}
          >
            <span className="font-mono text-[15px] font-medium
                             text-white/55 flex-shrink-0 w-9 text-right">
              {fmt(currentTime)}
            </span>
            <div className="flex-1 h-[2px] bg-white/[0.08] rounded-full
                            relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #c87040, #e8904a)"
                }}
              />
            </div>
            <span className="font-mono text-[15px] font-medium
                             text-white/55 flex-shrink-0 w-9">
              {fmt(duration)}
            </span>
          </div>

          {/* speed */}
          <button
            onClick={cycleSpeed}
            className="text-[10px] font-sans font-medium flex-shrink-0
                       hover:text-[rgba(200,112,64,0.9)] transition-colors
                       rounded-sm px-2 py-0.5"
            style={{
              color: "rgba(200,112,64,0.7)",
              border: "0.5px solid rgba(200,112,64,0.3)"
            }}
          >
            {speed}x
          </button>

        </div>
      </div>
    </div>
  );
}
