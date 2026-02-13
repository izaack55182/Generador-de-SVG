import { useState, useEffect, CSSProperties } from 'react'

function App() {
  // --- CONFIGURACIÓN DE MARCA ---
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal')
  const [title, setTitle] = useState('Codenity')
  const [subtitle, setSubtitle] = useState('Stack')
  const [showText, setShowText] = useState(true)
  
  // --- ESTILOS VISUALES ---
  const [color, setColor] = useState('#ffffff')      // Color del Icono
  const [textColor, setTextColor] = useState('#ffffff') // Color del Texto
  const [bgColor, setBgColor] = useState('#0a0a0a')  // Color de Fondo
  const [transparent, setTransparent] = useState(false)

  // --- CONFIGURACIÓN FIJA (Estándar) ---
  const size = 256;
  const thickness = 1; // Grosor fijo estándar

  // --- POST SOCIAL ---
  const [postHeadline, setPostHeadline] = useState('Iniciamos el desarrollo de Codenity Stack')
  const [postBody, setPostBody] = useState('Una plataforma moderna para desarrolladores. Más información próximamente.')
  const anthropicBg = '#F3F1E8'

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); }
  }, []);

  // --- LÓGICA DE DIBUJO ---
  const charWidth = 19; 
  const textWidth = Math.max(title.length * charWidth, subtitle.length * 10) + 20;

  // Paths del Logo
  const p1 = `M 60 20 L 30 50`; 
  const p2 = `M 50 50 L 15 85`; 
  const p3 = `M 50 40 L 40 50`; 
  const gap = 4 * thickness; 

  // Variables ViewBox
  let viewBoxW = 80;
  let viewBoxH = 80;
  let textX = 0;
  let titleY = 0;
  let subTitleY = 0;
  let iconTranslate = 'translate(0,0)';
  let textAnchor = 'start';

  if (showText) {
    if (layout === 'horizontal') {
      textX = 72; 
      viewBoxW = textX + textWidth;
      viewBoxH = 80;
      titleY = 42; subTitleY = 65;
      iconTranslate = 'translate(0,0)';
      textAnchor = 'start';
    } else { 
      viewBoxW = Math.max(120, textWidth + 40); 
      viewBoxH = 140; 
      textX = viewBoxW / 2;
      iconTranslate = `translate(${(viewBoxW - 80) / 2}, -5)`; 
      titleY = 95; subTitleY = 118;
      textAnchor = 'middle';
    }
  }

  // --- PRESETS (Botones Rápidos) ---
  const setDarkMode = () => {
      setTransparent(false);
      setBgColor('#0a0a0a');
      setColor('#ffffff');
      setTextColor('#ffffff');
  };

  const setLightMode = () => {
      setTransparent(false);
      setBgColor('#ffffff');
      setColor('#000000');
      setTextColor('#000000');
  };

  const toggleTransparent = () => {
      setTransparent(!transparent);
  };

  // --- GENERADORES SVG ---
  const generateCurrentSvg = () => {
    return `
<svg width="${size}" height="${(size * viewBoxH) / viewBoxW}" viewBox="0 0 ${viewBoxW} ${viewBoxH}" xmlns="http://www.w3.org/2000/svg" fill="none">
  <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&amp;display=swap'); text { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
  <defs>
    <mask id="logo-m2"><rect x="-1k" y="-1k" width="10k" height="10k" fill="white"/><path d="${p3}" stroke="black" stroke-width="${(4 * thickness) + gap}" stroke-linecap="round"/></mask>
    <mask id="logo-m3"><rect x="-1k" y="-1k" width="10k" height="10k" fill="white"/><path d="${p1}" stroke="black" stroke-width="${(6 * thickness) + gap}" stroke-linecap="round"/></mask>
    <clipPath id="logo-cp"><rect x="0" y="0" width="80" height="80" /></clipPath>
  </defs>
  ${!transparent ? `<rect width="${viewBoxW}" height="${viewBoxH}" fill="${bgColor}" />` : ''}
  <g transform="${iconTranslate}"><g clip-path="url(#logo-cp)">
    <path d="${p2}" stroke="${color}" stroke-width="${6 * thickness}" stroke-linecap="round" opacity="0.6" mask="url(#logo-m2)" />
    <path d="${p3}" stroke="${color}" stroke-width="${4 * thickness}" stroke-linecap="round" opacity="0.4" mask="url(#logo-m3)" />
    <path d="${p1}" stroke="${color}" stroke-width="${6 * thickness}" stroke-linecap="round" opacity="1"/>
  </g></g>
  ${showText ? `<text x="${textX}" y="${titleY}" fill="${textColor}" text-anchor="${textAnchor}" font-size="28" font-weight="700" alignment-baseline="middle">${title}</text><text x="${textX}" y="${subTitleY}" fill="${textColor}" text-anchor="${textAnchor}" font-size="14" font-weight="500" opacity="0.6" alignment-baseline="middle">${subtitle}</text>` : ''}
</svg>`
  }
// ...existing code...
  const generatePostSvg = () => {
    const logoW = 72 + (showText ? textWidth : 0);
    const logoScale = 1.8;
    const logoRealW = logoW * logoScale;
    const logoX = (1200 - logoRealW) / 2;
    const brandColor = '#1A1A1A';
    
    // TRUCO VISUAL: Usamos stroke del color de fondo (#F3F1E8) para recortar sin mascaras complejas
    const bg = anthropicBg; 

    return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" fill="none">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&amp;display=swap');
    text { font-family: 'Plus Jakarta Sans', sans-serif; }
    .title { font-size: 50px; font-weight: 700; fill: #1A1A1A; }
    .subtitle { font-size: 24px; font-weight: 500; fill: #4a4a4a; }
  </style>
  <rect width="1200" height="630" fill="${anthropicBg}" />
  <g transform="translate(${logoX}, 80) scale(${logoScale})">
      <defs>
        <clipPath id="post-cp"><rect x="0" y="0" width="80" height="80" /></clipPath>
      </defs>
      <g clip-path="url(#post-cp)">
        <!-- Path 3 (Borrador para cortar a P2) -->
        <path d="${p3}" stroke="${bg}" stroke-width="${(4 * thickness) + gap}" stroke-linecap="round"/>
        <!-- Path 2 (Abajo) -->
        <path d="${p2}" stroke="${brandColor}" stroke-width="${6 * thickness}" stroke-linecap="round" opacity="0.6" />
        
        <!-- Path 1 (Borrador para cortar a P3) -->
        <path d="${p1}" stroke="${bg}" stroke-width="${(6 * thickness) + gap}" stroke-linecap="round"/>
        <!-- Path 3 (Medio) -->
        <path d="${p3}" stroke="${brandColor}" stroke-width="${4 * thickness}" stroke-linecap="round" opacity="0.4" />
        
        <!-- Path 1 (Arriba) -->
        <path d="${p1}" stroke="${brandColor}" stroke-width="${6 * thickness}" stroke-linecap="round" opacity="1"/>
      </g>
      <text x="72" y="42" fill="${brandColor}" font-size="28" font-weight="700" alignment-baseline="middle">${title}</text>
      <text x="72" y="65" fill="${brandColor}" font-size="14" font-weight="500" opacity="0.6" alignment-baseline="middle">${subtitle}</text>
  </g>
  <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#688F83"/><stop offset="1" stop-color="#D5A686"/></linearGradient></defs>
  <path d="M 150 200 L 1050 200" stroke="url(#g1)" stroke-width="4" stroke-linecap="round" />
  <text x="600" y="300" text-anchor="middle" class="title">${postHeadline}</text>
  <text x="600" y="360" text-anchor="middle" class="subtitle" width="800">${postBody}</text>
  <path d="M 150 420 L 1050 420" stroke="url(#g1)" stroke-width="4" stroke-linecap="round" />
  <text x="600" y="590" text-anchor="middle" font-size="14" fill="#888" opacity="0.7">Inspired by Anthropic Design Standards</text>
  <path d="M 400 570 L 800 570" stroke="#000" stroke-width="1" opacity="0.1" />
</svg>`
  }
// ...existing code...

  // --- DESCARGAS ---
  const download = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const downloadCurrent = () => download(generateCurrentSvg(), `logo-${showText ? 'completo' : 'icon'}.svg`);
  
  const downloadPostPng = () => {
    const svgString = generatePostSvg();
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 630;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
        if (!ctx) return;
        ctx.fillStyle = anthropicBg; ctx.fillRect(0, 0, 1200, 630);
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `social-post-${title}.png`;
        document.body.appendChild(link);
        link.click();
    };
    img.src = URL.createObjectURL(new Blob([svgString], {type: 'image/svg+xml'}));
  };

  // --- ESTILOS REACT ---
  const styles: { [key: string]: CSSProperties } = {
    container: { fontFamily: "'Plus Jakarta Sans', sans-serif", padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', color: '#1A1A1A' },
    section: { marginBottom: '60px' },
    heading: { fontSize: '22px', fontWeight: 800, marginBottom: '20px', display:'flex', alignItems:'center', gap: 10 },
    workspace: { display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' },
    leftPanel: { flex: 3 },
    rightPanel: { flex: 2, minWidth: '300px', backgroundColor: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #e5e5e5', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' },
    
    // Preview Areas
    logoPreview: { borderRadius: '12px', padding: '60px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: transparent ? 'conic-gradient(#eee 90deg, #fff 90deg 180deg, #eee 180deg 270deg, #fff 270deg) 0 0/20px 20px' : bgColor, transition: 'background 0.3s ease', border: '1px solid #eee' },
    postPreview: { borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },

    // Inputs
    label: { display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' },
    input: { width: '100%', padding: '10px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '8px', fontFamily: 'inherit' },
    row: { display: 'flex', gap: '10px', marginBottom: '15px' },
    
    // Buttons
    btn: { width: '100%', padding: '14px', background: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' },
    btnGroup: { display: 'flex', gap: '5px', marginBottom: 15 },
    btnOption: { flex: 1, padding: '8px', fontSize: '12px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fff', color: '#333' }
  }

  return (
    <div style={styles.container}>
      
      {/* SECCIÓN 1: LOGO */}
      <section style={styles.section}>
         <div style={styles.heading}><span>🎨</span> Configuración de Marca</div>
         <div style={styles.workspace}>
             
             {/* PREVIEW */}
             // ...existing code...
             <div style={styles.leftPanel}>
                <div style={styles.logoPreview}>
                   <svg width="100%" height="100%" style={{ maxHeight: '300px', maxWidth: '100%' }} viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}>
                       <g transform={iconTranslate}>
                          { /* TRUCO VISUAL PARA PREVIEW: Usamos bordes del color de fondo para simular cortes */ }
                          <g clipPath="url(#r-cp)">
                             {/* Definimos el clipPath localmente para que funcione el recorte inferior */}
                             <defs><clipPath id="r-cp"><rect x="0" y="0" width="80" height="80"/></clipPath></defs>
                             
                             {/* Path 2 (Abajo) */}
                             {/* Si no es transparente, dibujamos un borde ancho del color de fondo en P3 para cortar a P2 */}
                             {!transparent && <path d={p3} stroke={bgColor} strokeWidth={(4*thickness)+gap} strokeLinecap="round" />}
                             <path d={p2} stroke={color} strokeWidth={6 * thickness} strokeLinecap="round" opacity="0.6" />

                             {/* Path 3 (Medio) */}
                             {/* Cortamos P3 con un borde ancho de P1 */}
                             {!transparent && <path d={p1} stroke={bgColor} strokeWidth={(6*thickness)+gap} strokeLinecap="round" />}
                             <path d={p3} stroke={color} strokeWidth={4 * thickness} strokeLinecap="round" opacity="0.4" />

                             {/* Path 1 (Arriba) - Siempre visible */}
                             <path d={p1} stroke={color} strokeWidth={6 * thickness} strokeLinecap="round" opacity="1"/>
                          </g>
                       </g>
                       {showText && (
                         <>
                           <text x={textX} y={titleY} fill={textColor} textAnchor={textAnchor} fontSize="28" fontWeight="700" alignmentBaseline="middle">{title}</text>
                           <text x={textX} y={subTitleY} fill={textColor} textAnchor={textAnchor} fontSize="14" fontWeight="500" opacity="0.6" alignmentBaseline="middle">{subtitle}</text>
                         </>
                       )}
                   </svg>
                </div>
             </div>

             {/* CONTROLES */}
             <div style={styles.rightPanel}>
                 <div style={styles.row}>
                     <div style={{flex:1}}>
                        <label style={styles.label}>Nombres</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} style={styles.input} />
                        <input value={subtitle} onChange={e => setSubtitle(e.target.value)} style={styles.input} />
                     </div>
                 </div>

                 <label style={styles.label}>Estilo Visual</label>
                 <div style={{...styles.row, alignItems: 'center'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{height:35, width:60, border:'none', cursor:'pointer', padding:0}} title="Color Icono" />
                        <span style={{fontSize:9, marginTop:4, color:'#999'}}>ICONO</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={{height:35, width:60, border:'none', cursor:'pointer', padding:0}} title="Color Texto" />
                        <span style={{fontSize:9, marginTop:4, color:'#999'}}>TEXTO</span>
                    </div>
                    <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'flex-end', gap:8}}>
                        <input type="checkbox" checked={showText} onChange={e=>setShowText(e.target.checked)} id="tg_txt" style={{width:'auto', margin:0}}/>
                        <label htmlFor="tg_txt" style={{margin:0, fontSize:12, cursor:'pointer'}}>Mostrar Texto</label>
                    </div>
                 </div>

                 <label style={styles.label}>Fondo de Previsualización</label>
                 <div style={styles.btnGroup}>
                    <button onClick={setDarkMode} style={{...styles.btnOption, background: bgColor==='#0a0a0a' && !transparent ? '#000':'#fff', color: bgColor==='#0a0a0a' && !transparent ? '#fff':'#000'}}>Oscuro</button>
                    <button onClick={setLightMode} style={{...styles.btnOption, background: bgColor==='#ffffff' && !transparent ? '#eee':'#fff'}}>Claro</button>
                    <button onClick={toggleTransparent} style={{...styles.btnOption, border: transparent ? '1px solid blue' : '1px solid #ddd', color: transparent ? 'blue' : '#333'}}>Transparente</button>
                 </div>

                 {showText && (
                    <div style={{textAlign:'right', marginBottom: 15}}>
                        <button onClick={()=>setLayout(l=>l==='horizontal'?'vertical':'horizontal')} style={{fontSize:11, padding:'4px 8px', cursor:'pointer', border:'none', background:'none', textDecoration:'underline', color:'#666'}}>
                            Cambiar Orientación ({layout})
                        </button>
                    </div>
                 )}

                 <button style={styles.btn} onClick={downloadCurrent}>
                    Descargar {showText ? 'Logo Completo' : 'Solo Icono'}
                 </button>
             </div>
         </div>
      </section>

      {/* SECCIÓN 2: POST */}
      <section style={styles.section}>
         <div style={styles.heading}><span>📢</span> Generador Social (Anthropic Style)</div>
         <div style={styles.workspace}>
             <div style={styles.leftPanel}>
                 <div style={styles.postPreview}>
                    <img src={URL.createObjectURL(new Blob([generatePostSvg()], {type: 'image/svg+xml'}))} alt="Post" style={{width: '100%', display: 'block'}} />
                 </div>
             </div>

             <div style={styles.rightPanel}>
                 <label style={styles.label}>Contenido del Post</label>
                 <textarea value={postHeadline} onChange={e => setPostHeadline(e.target.value)} style={{...styles.input, height: 80, resize:'vertical'}} />
                 <textarea value={postBody} onChange={e => setPostBody(e.target.value)} style={{...styles.input, height: 60, resize:'vertical'}} />
                 
                 <div style={{fontSize: 12, color: '#666', marginTop: 10, background: '#f0f0f0', padding: 10, borderRadius: 6}}>
                    💡 El generador social usa automáticamente tu logo configurado arriba (en negro) sobre el fondo "Beige Anthropic".
                 </div>

                 <button style={{...styles.btn, marginTop: 20}} onClick={downloadPostPng}>Descargar PNG</button>
             </div>
         </div>
      </section>
      
    </div>
  )
}

export default App