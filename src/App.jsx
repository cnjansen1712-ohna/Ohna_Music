import { useState, useRef, useEffect } from "react";

const songs = [
  {
    id: 1,
    title: "Solen siger Hej",
    emoji: "🌞",
    color: "#FFB830",
    glow: "#FFB83055",
    cardBg: "linear-gradient(135deg, #3D2E7C 60%, #5C3D00 100%)",
    audioUrl: "/godmorgen.mp3",
    verses: [
      "Godmorgen, [navn], vågn op nu,\ndagen står og venter på dig, du.\nGodmorgen, [navn], kom og se,\nsolen siger: \"Hej!\" til dig i dag. ☀️",
      "[Navn] strækker arme mod himlen blå,\ngnider søvnen væk og er klar til at gå.\nEt lille smil og et lille hop,\nså starter [navn] dagen helt i top! 🌸\n\nGodmorgen, [navn], vågn op nu,\ndagen står og venter på dig, du.\nGodmorgen, [navn], kom og se,\nsolen siger: \"Hej!\" til dig i dag. ☀️"
    ]
  },
  {
    id: 2,
    title: "Lille Stjerne",
    emoji: "⭐",
    color: "#A8CFFF",
    glow: "#A8CFFF44",
    cardBg: "linear-gradient(135deg, #1A1550 60%, #0D0828 100%)",
    audioUrl: null,
    verses: [
      "Lyser du, lille [navn]-stjerne fin,\nOppe på himlen med dit klare skin!\nNår det bli'r mørkt og det er seng-tid snart,\nLyser [navn]-stjernen – smukt og klart! ✨",
      "[Navn] er en stjerne, funkler nat og dag,\nGiver lys og glæde, fuld af mod og fag.\nSov nu sødt, vores lille [navn] kær,\nDrøm om alt det skønne, du os alle er! 🌙"
    ]
  },
  {
    id: 3,
    title: "Hop og Dans",
    emoji: "🐸",
    color: "#5DDA6A",
    glow: "#5DDA6A44",
    cardBg: "linear-gradient(135deg, #1A3D1A 60%, #0D2B0D 100%)",
    audioUrl: null,
    verses: [
      "Hop, hop, hop – [navn] hopper rundt,\nDanser og springer i det grønne lund!\nEn, to, tre – klap i hænderne nu,\n[Navn] er sjov og det véd du! 🎉",
      "Drej dig rundt, [navn], drej dig rundt igen,\nLe og vær glad med alle dine ven'.\nStamp med fødderne og ryst på dit hoved,\n[Navn] danser – det er lovet! 💃"
    ]
  },
  {
    id: 4,
    title: "Regnvejrssang",
    emoji: "🌧️",
    color: "#60C4F0",
    glow: "#60C4F044",
    cardBg: "linear-gradient(135deg, #0D2B40 60%, #071A2B 100%)",
    audioUrl: null,
    verses: [
      "Det regner, det regner, [navn] ser ud,\nRegndråberne falder som en lille bud.\nTrut, trut, trut på støvlerne røde,\n[Navn] er klar til regnen at møde! ☔",
      "Pladsk i vandpytterne, [navn] er med,\nRegnen giver blomster og glæde og fred.\nNår solen kommer frem bag skyen stor,\n[Navn] le'r og danser på vor jord! 🌈"
    ]
  },
  {
    id: 5,
    title: "Godnat Sang",
    emoji: "🌙",
    color: "#D4AAFF",
    glow: "#D4AAFF44",
    cardBg: "linear-gradient(135deg, #1E1040 60%, #100828 100%)",
    audioUrl: null,
    verses: [
      "Godnat, godnat, lille [navn] sød,\nLuk nu øjnene, tæt og blød.\nMånen lyser og stjernerne glo,\nLille [navn] nu skal sove ro! 😴",
      "Drøm om haver med blomster og fryd,\nDrøm om eventyr fulde af lyd.\nNår morgenen kommer med solskin og sang,\n[Navn] vågner glad – det er ikke lang'! 🌸"
    ]
  }
];

function OhnaElephant({ size = 220 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 340 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="160" cy="295" rx="110" ry="18" fill="#3A8C3A" opacity="0.7"/>
      <path d="M75 290 Q72 272 78 265 Q82 272 80 290Z" fill="#4CAF50"/>
      <path d="M85 292 Q80 270 88 260 Q94 270 90 292Z" fill="#388E3C"/>
      <path d="M95 291 Q90 275 97 268 Q103 275 99 291Z" fill="#4CAF50"/>
      <path d="M220 290 Q217 272 223 265 Q227 272 225 290Z" fill="#4CAF50"/>
      <path d="M232 292 Q228 270 235 262 Q241 272 237 292Z" fill="#388E3C"/>
      <rect x="242" y="238" width="52" height="38" rx="6" fill="#C8873A"/>
      <ellipse cx="268" cy="238" rx="26" ry="9" fill="#E8A855"/>
      <ellipse cx="268" cy="276" rx="26" ry="7" fill="#B5722A"/>
      <line x1="242" y1="252" x2="294" y2="252" stroke="#B5722A" strokeWidth="2"/>
      <line x1="242" y1="262" x2="294" y2="262" stroke="#B5722A" strokeWidth="2"/>
      <path d="M248 238 L252 276" stroke="#8B5E2A" strokeWidth="1.5"/>
      <path d="M260 238 L260 276" stroke="#8B5E2A" strokeWidth="1.5"/>
      <path d="M272 238 L270 276" stroke="#8B5E2A" strokeWidth="1.5"/>
      <path d="M284 238 L282 276" stroke="#8B5E2A" strokeWidth="1.5"/>
      <ellipse cx="162" cy="240" rx="72" ry="60" fill="#9AAAB8"/>
      <ellipse cx="88" cy="160" rx="36" ry="48" fill="#8A9BAA"/>
      <ellipse cx="94" cy="160" rx="24" ry="36" fill="#BCC8D4"/>
      <ellipse cx="236" cy="160" rx="36" ry="48" fill="#8A9BAA"/>
      <ellipse cx="230" cy="160" rx="24" ry="36" fill="#BCC8D4"/>
      <circle cx="162" cy="148" r="65" fill="#AABBC8"/>
      <path d="M138 198 Q118 225 122 255 Q124 268 133 266 Q142 264 140 251 Q136 232 150 210" fill="#9AAAB8" stroke="#8A9BAA" strokeWidth="1"/>
      <ellipse cx="132" cy="261" rx="9" ry="6" fill="#9AAAB8"/>
      <path d="M143 143 Q150 136 157 143" stroke="#4A5A6A" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M168 143 Q175 136 182 143" stroke="#4A5A6A" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M148 170 Q162 186 176 170" stroke="#4A5A6A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="162" cy="175" rx="10" ry="8" fill="#E87070" opacity="0.85"/>
      <ellipse cx="138" cy="162" rx="11" ry="7" fill="#F0A0C0" opacity="0.55"/>
      <ellipse cx="186" cy="162" rx="11" ry="7" fill="#F0A0C0" opacity="0.55"/>
      <rect x="108" y="282" width="34" height="30" rx="16" fill="#9AAAB8"/>
      <rect x="180" y="282" width="34" height="30" rx="16" fill="#9AAAB8"/>
      <path d="M114 308 Q125 312 136 308" stroke="#8A9BAA" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M186 308 Q197 312 208 308" stroke="#8A9BAA" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <rect x="116" y="196" width="10" height="60" rx="5" fill="#7B4F28"/>
      <rect x="113" y="190" width="16" height="12" rx="4" fill="#6B4020"/>
      <circle cx="117" cy="193" r="3" fill="#C8A050"/>
      <circle cx="125" cy="193" r="3" fill="#C8A050"/>
      <ellipse cx="128" cy="264" rx="28" ry="32" fill="#8B5A2A"/>
      <ellipse cx="128" cy="232" rx="22" ry="24" fill="#8B5A2A"/>
      <rect x="106" y="246" width="44" height="14" fill="#8B5A2A"/>
      <circle cx="128" cy="258" r="10" fill="#5C3510"/>
      <circle cx="128" cy="258" r="7" fill="#4A2A0A"/>
      <ellipse cx="118" cy="242" rx="6" ry="10" fill="#A07040" opacity="0.4"/>
      <line x1="119" y1="200" x2="119" y2="290" stroke="#D4C090" strokeWidth="0.8" opacity="0.8"/>
      <line x1="123" y1="200" x2="122" y2="290" stroke="#D4C090" strokeWidth="0.8" opacity="0.8"/>
      <line x1="127" y1="200" x2="126" y2="290" stroke="#D4C090" strokeWidth="0.8" opacity="0.8"/>
      <path d="M110 200 Q100 220 108 250" stroke="#9AAAB8" strokeWidth="18" strokeLinecap="round" fill="none"/>
      <text x="42" y="108" fontSize="30" fill="#F5C842" style={{fontFamily:"serif"}}>★</text>
      <text x="278" y="128" fontSize="18" fill="#F5C842">✦</text>
      <text x="56" y="158" fontSize="22" fill="#FFFFFF" opacity="0.9">♪</text>
      <text x="70" y="185" fontSize="16" fill="#1A1A2E" opacity="0.7">♩</text>
      <text x="280" y="165" fontSize="20" fill="#F5C842">♪</text>
      <text x="296" y="200" fontSize="15" fill="#F5C842">♫</text>
    </svg>
  );
}

function FloatingNote({ x, y, char, delay, color, size }) {
  return (
    <span style={{
      position: "absolute", left: `${x}%`, top: `${y}%`,
      fontSize: size || "1.3rem", color, opacity: 0.2,
      animation: `floatNote ${3.5 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      pointerEvents: "none", userSelect: "none",
    }}>{char}</span>
  );
}

const bgNotes = [
  { x: 4,  y: 14, char: "♪", delay: 0,   color: "#F5C842", size: "1.5rem" },
  { x: 88, y: 10, char: "♫", delay: 1.3, color: "#F0A0C0", size: "1.2rem" },
  { x: 91, y: 58, char: "♩", delay: 2.1, color: "#F5C842", size: "1.4rem" },
  { x: 5,  y: 68, char: "♬", delay: 0.8, color: "#60C4F0", size: "1.1rem" },
  { x: 50, y: 3,  char: "★", delay: 1.9, color: "#F5C842", size: "1rem"   },
  { x: 76, y: 32, char: "✦", delay: 3.1, color: "#F0A0C0", size: "0.9rem" },
  { x: 18, y: 42, char: "♪", delay: 2.6, color: "#A8CFFF", size: "1rem"   },
];

function applyName(text, name) {
  const cap = name.charAt(0).toUpperCase() + name.slice(1);
  return text.replace(/\[Navn\]/g, cap).replace(/\[navn\]/g, name);
}

export default function OhnaBørnesange() {
  const [name, setName]           = useState("Sofie");
  const [inputName, setInputName] = useState("Sofie");
  const [selected, setSelected]   = useState(songs[0]);
  const [verse, setVerse]         = useState(0);
  const [editing, setEditing]     = useState(false);
  const [playing, setPlaying]     = useState(false);
  const audioRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  function togglePlay() {
    if (!selected.audioUrl) return;
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = currentAudio;
        audioRef.current.play();
        setPlaying(true);
      }
    }
  }

  function handleSongChange(s) {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(false);
    setSelected(s);
    setVerse(0);
  }

  function saveName() {
    if (inputName.trim()) setName(inputName.trim());
    setEditing(false);
  }

  const displayName = name || "Barnet";

  const nameAudioMap = {
    "noah": "/godmorgen.mp3",
    "bodil": "/bodil.mp3",
    "ella": "/ella.mp3",
    "karl": "/karl.mp3",
    "karla": "/karla.mp3",
    "rita": "/rita.mp3",
  };

  const currentAudio = selected.audioUrl
    ? (nameAudioMap[displayName.toLowerCase()] || "/godmorgen.mp3")
    : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#3D2E7C",
      fontFamily: "'Nunito', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Baloo+2:wght@700;800&display=swap');
        @keyframes floatNote {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-18px) rotate(5deg); }
        }
        @keyframes popIn {
          0% { transform: scale(0.87) translateY(12px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes starSpin {
          0%,100% { transform: scale(1) rotate(0deg); opacity: 0.75; }
          50% { transform: scale(1.35) rotate(18deg); opacity: 1; }
        }
        .song-pill { cursor:pointer; border:none; transition: all 0.18s; font-family:'Nunito',sans-serif; font-weight:800; }
        .song-pill:hover { transform: translateY(-3px) scale(1.05); }
        .name-btn { cursor:pointer; border:none; font-family:'Baloo 2',cursive; font-weight:800; transition:transform 0.15s; }
        .name-btn:hover { transform: scale(1.06); }
        .vbtn { cursor:pointer; border:none; font-family:'Nunito',sans-serif; font-weight:800; transition:all 0.15s; }
        .vbtn:hover:not(:disabled) { transform: scale(1.09); }
        .vbtn:disabled { opacity: 0.3; cursor:default; }
        .lyric-anim { animation: popIn 0.45s cubic-bezier(.22,1,.36,1); }
      `}</style>

      <audio ref={audioRef} onEnded={() => setPlaying(false)} />

      {bgNotes.map((n, i) => <FloatingNote key={i} {...n} />)}

      {[{x:8,y:20,d:0},{x:84,y:16,d:1.6},{x:91,y:80,d:0.9},{x:5,y:82,d:2.3}].map((s,i)=>(
        <span key={i} style={{
          position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
          fontSize:"1.3rem", color:"#F5C842",
          animation:`starSpin ${2.2+s.d}s ease-in-out infinite`,
          animationDelay:`${s.d}s`, pointerEvents:"none",
        }}>★</span>
      ))}

      <div style={{
        background: "linear-gradient(180deg, #231860 0%, #3D2E7C 100%)",
        paddingTop: 24, paddingBottom: 12,
        textAlign: "center",
        borderBottom: "3px solid rgba(245,200,66,0.18)",
      }}>
        <div style={{ animation: "bounce 3.2s ease-in-out infinite", display:"inline-block" }}>
          <OhnaElephant size={220} />
        </div>
        <h1 style={{
          fontFamily:"'Baloo 2',cursive", fontWeight:800,
          fontSize:"3.2rem", color:"#F5F0E8",
          margin:0, lineHeight:1,
          textShadow:"0 2px 14px rgba(0,0,0,0.35)", letterSpacing:1,
        }}>Ohna</h1>
        <div style={{
          fontFamily:"'Baloo 2',cursive", fontWeight:700,
          fontSize:"1.35rem", color:"#F5C842",
          letterSpacing:3, marginTop:-2, marginBottom:16,
        }}>Børnesange</div>
      </div>

      <div style={{ maxWidth:500, margin:"0 auto", padding:"22px 16px 56px" }}>

        <div style={{
          background:"rgba(255,255,255,0.07)",
          border:"2px solid rgba(245,200,66,0.32)",
          borderRadius:20, padding:"14px 20px", marginBottom:22,
          display:"flex", alignItems:"center", justifyContent:"center",
          gap:12, flexWrap:"wrap",
        }}>
          <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:"1rem", color:"#F5F0E8" }}>
            🧒 Barnets navn:
          </span>
          {editing ? (
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <input
                ref={inputRef}
                value={inputName}
                onChange={e => setInputName(e.target.value)}
                onKeyDown={e => e.key==="Enter" && saveName()}
                maxLength={20}
                placeholder="Skriv navn..."
                style={{
                  fontFamily:"'Baloo 2',cursive", fontWeight:700, fontSize:"1.2rem",
                  border:"2px solid #F5C842", borderRadius:12,
                  padding:"7px 14px", background:"#231860",
                  color:"#F5F0E8", outline:"none", width:148, textAlign:"center",
                }}
              />
              <button onClick={saveName} style={{
                background:"#F5C842", color:"#231860", border:"none",
                borderRadius:50, padding:"9px 18px",
                fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"1rem", cursor:"pointer",
              }}>✓ Gem</button>
            </div>
          ) : (
            <button className="name-btn" onClick={() => { setInputName(name); setEditing(true); }} style={{
              background:"#F5C842", color:"#231860", borderRadius:50,
              padding:"10px 26px", fontSize:"1.25rem",
              boxShadow:"0 4px 18px rgba(245,200,66,0.45)", letterSpacing:0.5,
            }}>✏️ {displayName}</button>
          )}
        </div>

        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:22 }}>
          {songs.map(s => (
            <button key={s.id} className="song-pill"
              onClick={() => handleSongChange(s)}
              style={{
                background: selected.id===s.id ? s.color : "rgba(255,255,255,0.09)",
                color: selected.id===s.id ? "#1A1040" : "#F5F0E8",
                border:`2px solid ${selected.id===s.id ? s.color : "rgba(255,255,255,0.18)"}`,
                borderRadius:50, padding:"9px 16px", fontSize:"0.93rem",
                boxShadow: selected.id===s.id ? `0 4px 20px ${s.glow}` : "none",
              }}
            >{s.emoji} {s.title}</button>
          ))}
        </div>

        <div key={selected.id} style={{
          background: selected.cardBg,
          border:`2.5px solid ${selected.color}55`,
          borderRadius:28, padding:"28px 24px 24px",
          boxShadow:`0 10px 44px ${selected.glow}`,
          animation:"popIn 0.42s cubic-bezier(.22,1,.36,1)",
        }}>
          <div style={{ textAlign:"center", marginBottom:18 }}>
            <div style={{ fontSize:"3rem", lineHeight:1 }}>{selected.emoji}</div>
            <h2 style={{
              fontFamily:"'Baloo 2',cursive", fontWeight:800,
              fontSize:"1.75rem", color:selected.color,
              margin:"8px 0 0", letterSpacing:0.5,
            }}>{selected.title}</h2>
            <div style={{ width:44, height:3, background:selected.color, borderRadius:3, margin:"10px auto 0", opacity:0.65 }}/>
          </div>

          {selected.audioUrl && (
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <button onClick={togglePlay} style={{
                background: playing ? "rgba(255,255,255,0.12)" : selected.color,
                color: playing ? selected.color : "#1A1040",
                border: playing ? `2px solid ${selected.color}` : "none",
                borderRadius:50, padding:"14px 36px",
                fontFamily:"'Baloo 2',cursive", fontWeight:800,
                fontSize:"1.2rem", cursor:"pointer",
                boxShadow: playing ? "none" : `0 6px 20px ${selected.glow}`,
                transition:"all 0.2s",
                display:"inline-flex", alignItems:"center", gap:10,
              }}>
                {playing ? "⏸ Pause" : "▶ Afspil sang"}
              </button>
            </div>
          )}

          <div key={`${selected.id}-${verse}`} className="lyric-anim" style={{
            fontFamily:"'Nunito',sans-serif", fontWeight:700,
            fontSize:"1.05rem", color:"#F5F0E8",
            lineHeight:1.88, whiteSpace:"pre-line", textAlign:"center",
            background:"rgba(0,0,0,0.22)", borderRadius:18,
            padding:"18px 20px", marginBottom:20,
            border:`1px solid ${selected.color}30`,
          }}>
            {applyName(selected.verses[verse], displayName)}
          </div>

          <div style={{ display:"flex", justifyContent:"center", gap:14, alignItems:"center" }}>
            <button className="vbtn" disabled={verse===0} onClick={() => setVerse(v=>v-1)} style={{
              background: verse===0 ? "rgba(255,255,255,0.07)" : selected.color,
              color: verse===0 ? "rgba(255,255,255,0.28)" : "#1A1040",
              borderRadius:50, padding:"10px 20px", fontSize:"0.93rem",
              boxShadow: verse===0 ? "none" : `0 4px 14px ${selected.glow}`,
            }}>◀ Vers 1</button>

            <span style={{ fontFamily:"'Baloo 2',cursive", fontWeight:700, color:selected.color, fontSize:"1rem" }}>
              {verse+1} / {selected.verses.length}
            </span>

            <button className="vbtn" disabled={verse===selected.verses.length-1} onClick={() => setVerse(v=>v+1)} style={{
              background: verse===selected.verses.length-1 ? "rgba(255,255,255,0.07)" : selected.color,
              color: verse===selected.verses.length-1 ? "rgba(255,255,255,0.28)" : "#1A1040",
              borderRadius:50, padding:"10px 20px", fontSize:"0.93rem",
              boxShadow: verse===selected.verses.length-1 ? "none" : `0 4px 14px ${selected.glow}`,
            }}>Vers 2 ▶</button>
          </div>
        </div>

        <p style={{
          textAlign:"center", color:"rgba(255,255,255,0.3)",
          fontFamily:"'Nunito',sans-serif", fontWeight:700,
          fontSize:"0.8rem", marginTop:18,
        }}>Tryk ✏️ {displayName} for at skifte navn i alle sange</p>
      </div>
    </div>
  );
}
