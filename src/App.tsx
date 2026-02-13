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
  // NUEVOS ESTADOS PARA LOS BOTONES
  const [btnText1, setBtnText1] = useState('En Desarrollo')
  const [btnText2, setBtnText2] = useState('Mantente Atento')
  
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
// ...existing code...
  const toggleTransparent = () => {
      setTransparent(!transparent);
  };

  // --- FUNCIÓN REUTILIZABLE PARA DIBUJAR EL ICONO ---
  // Genera el SVG del icono con las máscaras y cortes exactos
  const renderIconString = (uniqueId: string, inkColor: string) => {
      return `
      <defs>
        <mask id="${uniqueId}-m2"><rect x="-1000" y="-1000" width="4000" height="4000" fill="white"/><path d="${p3}" stroke="black" stroke-width="${(4 * thickness) + gap}" stroke-linecap="round"/></mask>
        <mask id="${uniqueId}-m3"><rect x="-1000" y="-1000" width="4000" height="4000" fill="white"/><path d="${p1}" stroke="black" stroke-width="${(6 * thickness) + gap}" stroke-linecap="round"/></mask>
        <clipPath id="${uniqueId}-cp"><rect x="0" y="0" width="80" height="80" /></clipPath>
      </defs>
      <g clip-path="url(#${uniqueId}-cp)">
        <path d="${p2}" stroke="${inkColor}" stroke-width="${6 * thickness}" stroke-linecap="round" opacity="0.6" mask="url(#${uniqueId}-m2)" />
        <path d="${p3}" stroke="${inkColor}" stroke-width="${4 * thickness}" stroke-linecap="round" opacity="0.4" mask="url(#${uniqueId}-m3)" />
        <path d="${p1}" stroke="${inkColor}" stroke-width="${6 * thickness}" stroke-linecap="round" opacity="1"/>
      </g>`;
  }

  // --- GENERADORES SVG ---
  const generateCurrentSvg = () => {
    return `
<svg width="${size}" height="${(size * viewBoxH) / viewBoxW}" viewBox="0 0 ${viewBoxW} ${viewBoxH}" xmlns="http://www.w3.org/2000/svg" fill="none">
  <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&amp;display=swap'); text { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
  ${!transparent ? `<rect width="${viewBoxW}" height="${viewBoxH}" fill="${bgColor}" />` : ''}
  
  <g transform="${iconTranslate}">
      ${renderIconString('main', color)}
  </g>

  ${showText ? `<text x="${textX}" y="${titleY}" fill="${textColor}" text-anchor="${textAnchor}" font-size="28" font-weight="700" alignment-baseline="middle">${title}</text><text x="${textX}" y="${subTitleY}" fill="${textColor}" text-anchor="${textAnchor}" font-size="14" font-weight="500" opacity="0.6" alignment-baseline="middle">${subtitle}</text>` : ''}
</svg>`
  }
  const generatePostSvg = () => {
    // --- CONFIGURACIÓN DE COLORES Y ESTILO ---
    const bgCanvas = '#F3F1E8';     // Fondo estilo papel
        const buttonColor = '#1A1A1A'; 

    // Cambiamos el color secundario a un gris un poco más claro y neutro para la descripción
    const colorSub = '#666666';     
    
    const accentLine = '#D08266';   // Terracota cálido

    // --- DIMENSIONES Y LAYOUT (Compacto 800x800) ---
    const postW = 740;
    const postH = 740;

    // --- CÁLCULOS DE POSICIÓN ---
    const logoScale = 2.2; 
    const contentWidth = 50 + (showText ? textWidth : 0);
    const logoStartX = (postW - (contentWidth * logoScale)) / 2;

    const baseTextX = 65;  
    const baseTitleY = 49; 
    const baseSubY = 70;   
        const wrapText = (text: string, maxChars: number) => {
        const words = text.split(' ');
        let lines: string[] = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            if (currentLine.length + 1 + words[i].length <= maxChars) {
                currentLine += ' ' + words[i];
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine);
        return lines;
    };
    const descriptionLines = wrapText(postBody, 70);

    return `
<svg width="${postW}" height="${postH}" viewBox="0 0 ${postW} ${postH}" xmlns="http://www.w3.org/2000/svg" fill="none">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap');
    text { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>

  <!-- 1. FONDO -->
  <rect width="${postW}" height="${postH}" fill="${bgCanvas}" />

// ...existing code...
  <!-- 2. LOGO (Parte Superior) -->
  <!-- Movemos todo 40px hacia arriba (120 -> 80) -->
  <g transform="translate(${logoStartX}, 65) scale(${logoScale})">
      <g transform="translate(0, 5)">
        <!-- AQUI: Usamos 'color' (estado del icono) -->
        ${renderIconString('post', color)}
      </g>
      ${showText ? `
      <!-- AQUI: Usamos 'textColor' (estado del texto) -->
      <text x="${baseTextX}" y="${baseTitleY}" fill="${textColor}" font-size="28" font-weight="700" alignment-baseline="middle">${title}</text>
      <!-- Subtítulo: Usamos textColor con opacidad o lo dejamos gris? Lo dejaré relativo al texto -->
      <text x="${baseTextX}" y="${baseSubY}" fill="${textColor}" font-size="14" font-weight="600" opacity="0.6" alignment-baseline="middle">${subtitle}</text>
      ` : ''}
  </g>

  <!-- 3. CONTENIDO CENTRAL -->
  
 <!-- Línea Divisoria Superior -->
  <!-- Movemos todo 40px hacia arriba (320 -> 280) -->
  <path d="M 60 280 L ${postW - 60} 280" stroke="${accentLine}" stroke-width="6" stroke-linecap="round" />

  <!-- Textos -->
  <g transform="translate(${postW / 2}, 0)" text-anchor="middle">
      
      <!-- HEADLINE -->
      <!-- Movemos todo 40px hacia arriba (390 -> 350) -->
      <text y="350" font-size="32" font-weight="450" fill="#333333" letter-spacing="-0.5">
          ${ // También envolvemos el título por si acaso
             wrapText(postHeadline, 45).map((line, i) => 
                `<tspan x="0" dy="${i === 0 ? 0 : '1.2em'}">${line}</tspan>`
             ).join('') 
           }
      </text>
      
      <!-- DESCRIPTION (BODY) CON SALTO DE LÍNEA AUTOMÁTICO -->
      <!-- 'dy' mueve cada línea hacia abajo relativo a la anterior -->
      <!-- Movemos todo 40px hacia arriba (455 -> 415) -->
      <text y="425" font-size="18" font-weight="380" fill="${colorSub}" letter-spacing="0">
          ${descriptionLines.map((line, i) => 
              `<tspan x="0" dy="${i === 0 ? 0 : '1.5em'}">${line}</tspan>`
          ).join('')}
      </text>
      
  </g>

  <!-- Línea Divisoria Inferior -->
  <!-- Movemos todo 40px hacia arriba (540 -> 500) -->
  <path d="M 60 500 L ${postW - 60} 500" stroke="${accentLine}" stroke-width="6" stroke-linecap="round" />

    <!-- 4. BOTONES / BADGES (Inferior) -->
  <!-- Movemos todo 40px hacia arriba (580 -> 540) -->
  <g transform="translate(0, 540)"> 
      <!-- Botón Izquierdo -->
      <g transform="translate(${postW / 2 - 150}, 0)">
          <!-- Usamos buttonColor (negro fijo) o quieres que los botones también cambien? 
               Por diseño, suelen verse mejor en negro, los dejo en buttonColor -->
          <rect x="-130" y="0" width="260" height="64" rx="12" fill="${buttonColor}" />
          <text x="0" y="40" fill="#FFFFFF" text-anchor="middle" font-size="18" font-weight="700">${btnText1}</text>
      </g>

      <!-- Botón Derecho -->
      <g transform="translate(${postW / 2 + 150}, 0)">
          <rect x="-130" y="0" width="260" height="64" rx="12" fill="none" stroke="${buttonColor}" stroke-width="2.5" />
          <text x="0" y="40" fill="${buttonColor}" text-anchor="middle" font-size="18" font-weight="700">${btnText2}</text>
      </g>
  </g>

  <!-- Footer Discreto -->
// ...existing code...
  <!-- Footer Discreto -->
  <text x="${postW / 2}" y="${postH - 30}" text-anchor="middle" font-size="13" fill="#999" font-weight="500">Inspired by Anthropic Design Standards</text>
</svg>`
  }

// ...existing code...
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
  canvas.width = 800; canvas.height = 800; // Cuadrado 1:1
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
        if (!ctx) return;
        ctx.fillStyle = anthropicBg; ctx.fillRect(0, 0, 800, 800); // Actualizamos fill
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
                 <textarea value={postHeadline} onChange={e => setPostHeadline(e.target.value)} style={{...styles.input, height: 80, resize:'vertical'}} placeholder="Título Principal" />
                 <textarea value={postBody} onChange={e => setPostBody(e.target.value)} style={{...styles.input, height: 60, resize:'vertical'}} placeholder="Subtítulo o descripción" />
                 
                 <label style={{...styles.label, marginTop: 15}}>Botones (Badges)</label>
                 <div style={styles.row}>
                    <input value={btnText1} onChange={e => setBtnText1(e.target.value)} style={styles.input} placeholder="Botón Izq (Negro)" />
                    <input value={btnText2} onChange={e => setBtnText2(e.target.value)} style={styles.input} placeholder="Botón Der (Borde)" />
                 </div>

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