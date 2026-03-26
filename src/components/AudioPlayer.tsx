import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  label?: string;
  footer?: string;
}

export function AudioPlayer({ src, label = "Listen to the introduction", footer }: AudioPlayerProps) {
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
    <div className="w-full my-6">
      <div
        style={{
          borderRadius: "14px",
          padding: "1.5px",
          boxShadow:
            "0 0 0 1.5px rgba(200,112,64,0.35), 0 0 24px rgba(200,80,30,0.2), 0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            borderRadius: "13px",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #1a0a00 0%, #2d1200 30%, #1a0800 60%, #0d0500 100%)",
            padding: "18px 22px",
            position: "relative",
          }}
        >
          <audio ref={audioRef} src={src} preload="metadata" />

          {/* Glow top-right */}
          <div style={{
            position:"absolute",top:"-40px",right:"-40px",width:"160px",
            height:"160px",borderRadius:"50%",pointerEvents:"none",
            background:"radial-gradient(circle, rgba(200,112,64,0.18) 0%, rgba(180,60,20,0.08) 40%, transparent 70%)"
          }}/>
          {/* Glow bottom-left */}
          <div style={{
            position:"absolute",bottom:"-20px",left:"20px",width:"100px",
            height:"100px",borderRadius:"50%",pointerEvents:"none",
            background:"radial-gradient(circle, rgba(150,40,10,0.12) 0%, transparent 70%)"
          }}/>

          {/* Label */}
          <p style={{
            fontFamily:"Georgia,'Times New Roman',serif",
            fontSize:"13px",fontWeight:700,color:"#f0ece3",
            letterSpacing:"-0.01em",marginBottom:"14px",
            lineHeight:1.45,position:"relative"
          }}>
            {label}
          </p>

          {/* Controls row */}
          <div style={{ display:"flex",alignItems:"center",gap:"14px",position:"relative" }}>

            {/* Skip back 15 */}
            <button onClick={() => skip(-15)} style={{
              display:"flex",flexDirection:"column",alignItems:"center",
              gap:"2px",opacity:.5,background:"none",border:"none",cursor:"pointer"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="rgba(255,255,255,0.9)" strokeWidth="1.6">
                <path d="M12 5V2L7 7l5 5V9a7 7 0 110 7"/>
              </svg>
              <span style={{fontSize:"8px",color:"rgba(255,255,255,0.25)"}}>15</span>
            </button>

            {/* Play / pause */}
            <button onClick={toggle} style={{
              width:"36px",height:"36px",borderRadius:"50%",flexShrink:0,
              border:"1px solid rgba(200,112,64,0.5)",
              background:"rgba(200,112,64,0.12)",
              display:"flex",alignItems:"center",justifyContent:"center",
              cursor:"pointer"
            }}>
              {playing ? (
                <svg width="10" height="12" viewBox="0 0 10 12" fill="rgba(255,255,255,0.85)">
                  <rect x="0" y="0" width="3" height="12"/>
                  <rect x="7" y="0" width="3" height="12"/>
                </svg>
              ) : (
                <svg width="10" height="12" viewBox="0 0 10 12"
                     fill="rgba(255,255,255,0.85)" style={{marginLeft:"2px"}}>
                  <polygon points="0,0 10,6 0,12"/>
                </svg>
              )}
            </button>

            {/* Skip forward 15 */}
            <button onClick={() => skip(15)} style={{
              display:"flex",flexDirection:"column",alignItems:"center",
              gap:"2px",opacity:.5,background:"none",border:"none",cursor:"pointer"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="rgba(255,255,255,0.9)" strokeWidth="1.6">
                <path d="M12 5V2l5 5-5 5V9a7 7 0 100 7"/>
              </svg>
              <span style={{fontSize:"8px",color:"rgba(255,255,255,0.25)"}}>15</span>
            </button>

            {/* Progress bar */}
            <div onClick={seek} style={{
              flex:1,display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"
            }}>
              <span style={{
                fontFamily:"'Courier New',monospace",fontSize:"15px",fontWeight:500,
                color:"rgba(255,255,255,0.55)",flexShrink:0,width:"36px",textAlign:"right"
              }}>
                {fmt(currentTime)}
              </span>
              <div style={{
                flex:1,height:"2px",background:"rgba(255,255,255,0.08)",
                borderRadius:"1px",position:"relative",overflow:"hidden"
              }}>
                <div style={{
                  position:"absolute",left:0,top:0,height:"100%",
                  width:`${progress}%`,borderRadius:"1px",
                  background:"linear-gradient(90deg, #c87040, #e8904a)",
                  transition:"width .1s"
                }}/>
              </div>
              <span style={{
                fontFamily:"'Courier New',monospace",fontSize:"15px",fontWeight:500,
                color:"rgba(255,255,255,0.55)",flexShrink:0,width:"36px"
              }}>
                {fmt(duration)}
              </span>
            </div>

            {/* Speed */}
            <button onClick={cycleSpeed} style={{
              fontSize:"10px",color:"rgba(200,112,64,0.7)",
              border:"0.5px solid rgba(200,112,64,0.3)",borderRadius:"20px",
              padding:"3px 10px",flexShrink:0,background:"none",cursor:"pointer"
            }}>
              {speed}x
            </button>

          </div>

          {/* Footer */}
          {footer && (
            <div style={{
              marginTop:"12px",paddingTop:"12px",
              borderTop:"0.5px solid rgba(255,255,255,0.07)"
            }}>
              <p style={{
                fontFamily:"Georgia,'Times New Roman',serif",
                fontSize:"14px",fontWeight:700,color:"#f0ece3",lineHeight:1.3
              }}>
                {footer}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
