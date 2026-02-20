import { useState, useEffect, CSSProperties } from 'react'

function App() {
  // --- CONFIGURACIÓN DE MARCA ---
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal')
  const [title, setTitle] = useState('Codenity')
  const [subtitle, setSubtitle] = useState('Stack')
  const [titleFontSize, setTitleFontSize] = useState(36) // Nuevo estado para tamaño de fuente del título
  const [subtitleFontSize, setSubtitleFontSize] = useState(18) // Nuevo estado para tamaño de fuente del subtítulo
  const [showText, setShowText] = useState(true)
  const [showSubtitle, setShowSubtitle] = useState(true) // Nuevo estado para controlar la visibilidad del subtítulo

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

  const intellijBg = '#000000'; // Base negra para el tema Vibrant

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
      textX = 65;
      viewBoxW = textX + textWidth;
      viewBoxH = 85;
      if (showSubtitle) {
        titleY = 42;
        subTitleY = 65;
      } else {
        titleY = 50; // Ajustado según la solicitud del usuario para un centrado visual
        subTitleY = 0; // no usado
      }
      iconTranslate = 'translate(0,0)';
      textAnchor = 'start';
    } else { // vertical
      viewBoxW = Math.max(120, textWidth + 40);
      viewBoxH = 140;
      textX = viewBoxW / 2;
      iconTranslate = `translate(${(viewBoxW - 80) / 2}, -5)`;
      if (showSubtitle) {
        titleY = 95;
        subTitleY = 118;
      } else {
        // Centra el título en el espacio disponible debajo del ícono
        const availableSpaceTop = 80; // Aprox. donde termina el ícono
        titleY = availableSpaceTop + (viewBoxH - availableSpaceTop) / 2;
        subTitleY = 0; // no usado
      }
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
  // --- FUNCIÓN REUTILIZABLE PARA DIBUJAR EL ICONO CON EFECTO FROSTED GLASS ---
  const renderIconString = (
    uniqueId: string,
    inkColor: string
  ) => {
 
    const isDark = inkColor === "#ffffff";

    // Ajuste de colores base según el modo
    // Si es modo oscuro (logo blanco), usamos blanco transaparente.
    // Si es claro (logo negro), usamos negro/gris transparente.
    const glassBase = isDark ? "white" : "black";

    return `
  <defs>
    <!-- A. GRADIENTE CUERPO (Sutil) -->
    <linearGradient id="${uniqueId}-frostBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <!-- Arriba Izq: Un poco más visible -->
        <stop offset="0%" stop-color="${glassBase}" stop-opacity="${isDark ? '0.35' : '0.2'}" />
        <!-- Centro: Muy transparente -->
        <stop offset="50%" stop-color="${glassBase}" stop-opacity="${isDark ? '0.15' : '0.1'}" />
        <!-- Abajo Der: Sutilmente más denso -->
        <stop offset="100%" stop-color="${glassBase}" stop-opacity="${isDark ? '0.3' : '0.2'}" />
    </linearGradient>

    <!-- B. FILTRO FROSTED -->
    <filter id="${uniqueId}-frostFilter" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
        
        <!-- 1. Sombra Suave (Drop Shadow) -->
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="shadowBlur"/>
        <feOffset in="shadowBlur" dx="0" dy="6" result="shadowOffset"/>
        <feFlood flood-color="black" flood-opacity="0.2" result="shadowColor"/>
        <feComposite in="shadowColor" in2="shadowOffset" operator="in" result="dropShadow"/>

        <!-- 2. Borde / Rim Light (El contorno blanco característico) -->
        <!-- Erosionamos el alpha para crear un borde interior nítido -->
        <feMorphology operator="erode" radius="1" in="SourceAlpha" result="eroded"/>
        <feComposite in="SourceAlpha" in2="eroded" operator="out" result="strokeMask"/>
        
        <!-- Color del borde: Blanco brillante si es dark, Gris oscuro si es light -->
        <feFlood flood-color="${isDark ? 'white' : '#666'}" flood-opacity="${isDark ? '0.8' : '0.5'}" result="strokeColor"/>
        <feComposite in="strokeColor" in2="strokeMask" operator="in" result="rimLight"/>

        <!-- 3. Brillo Especular Suave (Matte sheen) -->
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blurMap"/>
        <feSpecularLighting in="blurMap" surfaceScale="2" specularConstant="0.6" specularExponent="10" lighting-color="white" result="specular">
            <fePointLight x="-100" y="-100" z="300" />
        </feSpecularLighting>
        <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularSheen"/>

        <!-- 4. Composición -->
        <feMerge>
            <feMergeNode in="dropShadow"/>    <!-- Sombra -->
            <feMergeNode in="SourceGraphic"/> <!-- Cuerpo base -->
            <feMergeNode in="specularSheen"/> <!-- Brillo superficie -->
            <feMergeNode in="rimLight"/>      <!-- Borde nítido -->
        </feMerge>
    </filter>

    <mask id="${uniqueId}-m2"><rect x="-1000" y="-1000" width="4000" height="4000" fill="white"/><path d="${p3}" stroke="black" stroke-width="${(4 * thickness) + gap}" stroke-linecap="round"/></mask>
    <mask id="${uniqueId}-m3"><rect x="-1000" y="-1000" width="4000" height="4000" fill="white"/><path d="${p1}" stroke="black" stroke-width="${(6 * thickness) + gap}" stroke-linecap="round"/></mask>
    <clipPath id="${uniqueId}-cp"><rect x="0" y="0" width="80" height="80" /></clipPath>
  </defs>

  <g clip-path="url(#${uniqueId}-cp)">
      <!-- Barra Inferior -->
      <path d="${p2}" stroke="url(#${uniqueId}-frostBody)" stroke-width="${6 * thickness}" stroke-linecap="round" mask="url(#${uniqueId}-m2)" filter="url(#${uniqueId}-frostFilter)" />
      
      <!-- Barra Intermedia -->
      <path d="${p3}" stroke="url(#${uniqueId}-frostBody)" stroke-width="${4 * thickness}" stroke-linecap="round" mask="url(#${uniqueId}-m3)" filter="url(#${uniqueId}-frostFilter)" />
      
      <!-- Barra Superior -->
      <path d="${p1}" stroke="url(#${uniqueId}-frostBody)" stroke-width="${6 * thickness}" stroke-linecap="round" filter="url(#${uniqueId}-frostFilter)" />
  </g>
  `;
  };

  // --- GENERADORES SVG ---
  const generateCurrentSvg = () => {
    return `
<svg width="${size}" height="${(size * viewBoxH) / viewBoxW}" viewBox="0 0 ${viewBoxW} ${viewBoxH}" xmlns="http://www.w3.org/2000/svg" fill="none">
  <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&amp;display=swap'); text { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
  ${!transparent ? `<rect width="${viewBoxW}" height="${viewBoxH}" fill="${bgColor}" />` : ''}
  
  <g transform="${iconTranslate}">
      ${renderIconString('main', color)}
  </g>

  ${showText ? `<text x="${textX}" y="${titleY}" fill="${textColor}" text-anchor="${textAnchor}" font-size="${titleFontSize}" font-weight="700" alignment-baseline="middle">${title}</text>${showSubtitle ? `<text x="${textX}" y="${subTitleY}" fill="${textColor}" text-anchor="${textAnchor}" font-size="${subtitleFontSize}" font-weight="500" opacity="0.6" alignment-baseline="middle">${subtitle}</text>` : ''}` : ''}
</svg>`
  }
  const generatePostSvg = () => {
    // El fondo principal será negro/oscuro para contrastar, pero añadiremos las formas de color
    const bgCanvas = '#000000';
    const buttonColor = '#FFFFFF';
    const buttonTextPrimary = '#000000';

    const titleColor = '#FFFFFF';
    const colorSub = '#E0E0E0';
    const accentLine = 'rgba(255, 255, 255, 0.2)';

    // --- DIMENSIONES Y LAYOUT (Compacto 800x800) ---
    const postW = 740;
    const postH = 740;

    // --- CÁLCULOS DE POSICIÓN ---
    const isVertical = layout === 'vertical';
    const logoScale = isVertical ? 2.0 : 2.2; // Reducimos un poco la escala en vertical para que no invada tanto

    // Posición central base
    const cx = postW / 2;
    const topMargin = 60; // Subimos un poco el inicio del bloque logo

    // Ajustes para el grupo del logo general
    let logoGroupTransform = '';

    // Ajustes internos del texto
    let postTextX = 0;
    let postTextY_Title = 0;
    let postTextY_Sub = 0;
    let postTextAnchor = 'start';

    // Ajustes internos del icono
    let postIconTransform = '';

    // Calculamos la altura que ocupa el bloque del logo para saber donde empezar el contenido
    let logoBlockHeight = 0;

    if (isVertical) {
      // VERTICAL: Logo centrado arriba, texto abajo
      postIconTransform = `translate(-40, 0)`;
      postTextAnchor = 'middle';
      postTextX = 0;
      postTextY_Title = 110; // Un poco más separado del icono
      postTextY_Sub = 140;

      logoGroupTransform = `translate(${cx}, ${topMargin}) scale(${logoScale})`;

      // Estima altura: Icono(80) + Espacio(30) + Texto(30) + Sub(20) ~ 160 * escala
      logoBlockHeight = (150 * logoScale) + topMargin;
    } else {
      // HORIZONTAL
      const totalW = 80 + (showText ? textWidth : 0);
      postIconTransform = 'translate(0, 0)';
      postTextAnchor = 'start';
      postTextX = 75;
      postTextY_Title = 42;
      postTextY_Sub = 65;

      const startX = (postW - (totalW * logoScale)) / 2;
      logoGroupTransform = `translate(${startX}, ${topMargin}) scale(${logoScale})`;

      logoBlockHeight = (80 * logoScale) + topMargin;
    }

    // El contenido empieza dinámicamente debajo del logo con un margen
    const contentStartY = Math.max(logoBlockHeight + 40, 280);

    // Calculamos dónde termina el bloque de texto aprox
    // Headline (aprox 40px) + Gap (30px) + Description (aprox 60px) ~ 130px
    const contentHeight = 160;
    const contentEndY = contentStartY + contentHeight;

    // Posición dinámica de los elementos inferiores
    const bottomDividerY = contentEndY + 40;
    const buttonsY = bottomDividerY + 40;

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

  <!-- 1. FONDO (VIBRANT STROKES) -->
  <defs>
    <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B8AFF"/>
      <stop offset="100%" stop-color="#087CFA"/>
    </linearGradient>
    <linearGradient id="grad-pink" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FE315D"/>
      <stop offset="100%" stop-color="#FF316A"/>
    </linearGradient>
    <linearGradient id="grad-orange" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F97A12"/>
      <stop offset="100%" stop-color="#FE8E2D"/>
    </linearGradient>
  </defs>

  <!-- Fondo base negro -->
  <rect width="${postW}" height="${postH}" fill="${bgCanvas}" />
  
  <!-- Formas Abstractas (Estilo IntelliJ Logo) - Detrás del contenido -->
  <g opacity="0.8">
      <!-- Forma Azul (Superior Derecha / Derecha) -->
      <path d="M 400 0 L 740 0 L 740 500 C 740 500 600 500 500 300 Q 450 200 400 0 Z" fill="url(#grad-blue)" />
      
      <!-- Forma Rosa/Roja (Inferior Izquierda) -->
      <path d="M 0 740 L 450 740 L 300 450 Q 200 400 0 550 Z" fill="url(#grad-pink)" />
      
      <!-- Forma Naranja (Detalle Esquina) -->
      <path d="M 0 0 L 250 0 L 150 150 Q 50 150 0 250 Z" fill="url(#grad-orange)" opacity="0.7"/>
      
      <!-- Desenfoque global para que sea un fondo ambiental -->
      <rect width="${postW}" height="${postH}" fill="black" opacity="0.6"/> <!-- Capa de contraste encima de colores -->
  </g>

// ...existing code...
  <!-- 2. LOGO (Parte Superior) -->
  <!-- POSICIONAMIENTO DEL LOGO SEGÚN LAYOUT (Vertical vs Horizontal) -->
  <g transform="${logoGroupTransform}">
      
      <g transform="${postIconTransform}">
          ${renderIconString('post', color)}
      </g>
      
      ${showText ? `
      <!-- Texto del Logo (Titulo y Subtitulo) -->
      <g transform="translate(${postTextX}, 0)">
        <text x="0" y="${postTextY_Title}" fill="${titleColor}" text-anchor="${postTextAnchor}" 
              font-size="${titleFontSize}" font-weight="700" alignment-baseline="middle">${title}</text>
        <text x="0" y="${postTextY_Sub}" fill="${titleColor}" text-anchor="${postTextAnchor}" 
              font-size="${subtitleFontSize}" font-weight="600" opacity="0.6" alignment-baseline="middle">${subtitle}</text>
      </g>
      ` : ''}
  </g>
  
  <!-- 3. CONTENIDO CENTRAL (Dinámico) -->
  
  <!-- Línea Divisoria Superior -->
  <path d="M 60 ${contentStartY} L ${postW - 60} ${contentStartY}" stroke="${accentLine}" stroke-width="1.5" stroke-linecap="round" />

  <!-- Textos -->
  <g transform="translate(${postW / 2}, 0)" text-anchor="middle">
      
      <!-- HEADLINE: Starts below top divider -->
      <text y="${contentStartY + 50}" font-size="32" font-weight="600" fill="${titleColor}" letter-spacing="-0.5">
          ${ // También envolvemos el título por si acaso
      wrapText(postHeadline, 45).map((line, i) =>
        `<tspan x="0" dy="${i === 0 ? 0 : '1.2em'}">${line}</tspan>`
      ).join('')
      }
      </text>
      
      <!-- DESCRIPTION (BODY): Starts below headline -->
      <text y="${contentStartY + 130}" font-size="18" font-weight="400" fill="${colorSub}" letter-spacing="0">
          ${descriptionLines.map((line, i) =>
        `<tspan x="0" dy="${i === 0 ? 0 : '1.5em'}">${line}</tspan>`
      ).join('')}
      </text>
      
  </g>

  <!-- Línea Divisoria Inferior (Dinámica) -->
  <path d="M 60 ${bottomDividerY} L ${postW - 60} ${bottomDividerY}" stroke="${accentLine}" stroke-width="1.5" stroke-linecap="round" />

  <!-- 4. BOTONES / BADGES (Inferior - Dinámico) -->
  <g transform="translate(0, ${buttonsY})"> 
      <!-- Botón Izquierdo (Solid White) -->
      <g transform="translate(${postW / 2 - 150}, 0)">
          <rect x="-130" y="0" width="260" height="64" rx="8" fill="${buttonColor}" />
          <text x="0" y="40" fill="${buttonTextPrimary}" text-anchor="middle" font-size="16" font-weight="600">${btnText1}</text>
      </g>

      <!-- Botón Derecho (Outline) -->
      <g transform="translate(${postW / 2 + 150}, 0)">
          <rect x="-130" y="0" width="260" height="64" rx="8" fill="none" stroke="${colorSub}" stroke-width="1.5" />
          <text x="0" y="40" fill="${titleColor}" text-anchor="middle" font-size="16" font-weight="600">${btnText2}</text>
      </g>
  </g>

  <!-- Footer Discreto -->
// ...existing code...
  <!-- Footer Discreto -->
  <text x="${postW / 2}" y="${postH - 10}" text-anchor="middle" font-size="13" fill="#666" font-weight="500">Inspired by IntelliJ IDEA Design</text>
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
    canvas.width = 740; canvas.height = 740; // Tamaño exacto del SVG
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = intellijBg; ctx.fillRect(0, 0, 740, 740); // Fondo consistente

      ctx.drawImage(img, 0, 0); // Sin márgenes, fill completo

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `social-post-${title}.png`;
      document.body.appendChild(link);
      link.click();
    };
    img.src = URL.createObjectURL(new Blob([svgString], { type: 'image/svg+xml' }));
  };

  const downloadIco = () => {
    // 1. Generar SVG específico para Icono (Cuadrado, sin texto)
    // ESTA VERSIÓN SIEMPRE ES TRANSPARENTE
    const icoViewBox = 80;
    const svgString = `
      <svg width="256" height="256" viewBox="0 0 ${icoViewBox} ${icoViewBox}" xmlns="http://www.w3.org/2000/svg" fill="none">
        <g>
            ${renderIconString('ico-gen', color)}
        </g>
      </svg>`;

    // 2. Dibujar en Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 256, 256);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) return;

        const reader = new FileReader();
        reader.onloadend = () => {
          const pngData = new Uint8Array(reader.result as ArrayBuffer);

          // 3. Construir Header ICO
          const header = new Uint8Array([0, 0, 1, 0, 1, 0]); // Reserved, Type(1=ICO), Count(1)

          // 4. Construir Entry
          const entry = new Uint8Array(16);
          entry[0] = 0; // Width (0 = 256)
          entry[1] = 0; // Height (0 = 256)
          entry[2] = 0; // Color count
          entry[3] = 0; // Reserved
          entry[4] = 1; // Planes
          entry[5] = 0;
          entry[6] = 32; // BitCount
          entry[7] = 0;

          const size = pngData.length;
          entry[8] = size & 255;
          entry[9] = (size >> 8) & 255;
          entry[10] = (size >> 16) & 255;
          entry[11] = (size >> 24) & 255;

          const offset = 22; // 6 + 16
          entry[12] = offset & 255;
          entry[13] = (offset >> 8) & 255;
          entry[14] = (offset >> 16) & 255;
          entry[15] = (offset >> 24) & 255;

          // 5. Unir todo
          const icoBytes = new Uint8Array(header.length + entry.length + pngData.length);
          icoBytes.set(header, 0);
          icoBytes.set(entry, header.length);
          icoBytes.set(pngData, header.length + entry.length);

          const icoBlob = new Blob([icoBytes], { type: 'image/x-icon' });
          const downloadUrl = URL.createObjectURL(icoBlob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = 'favicon.ico';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
        reader.readAsArrayBuffer(pngBlob);
      }, 'image/png');
    };
    img.src = url;
  };

  // --- ESTILOS REACT ---
  const styles: { [key: string]: CSSProperties } = {
    container: { fontFamily: "'Plus Jakarta Sans', sans-serif", padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', color: '#1A1A1A' },
    section: { marginBottom: '60px' },
    heading: { fontSize: '22px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: 10 },
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
                  <g dangerouslySetInnerHTML={{ __html: renderIconString('preview', color) }} />
                </g>
                {showText && (
                  <>
                    <text x={textX} y={titleY} fill={textColor} textAnchor={textAnchor} fontSize={titleFontSize} fontWeight="700" alignmentBaseline="middle">{title}</text>
                    {showSubtitle && <text x={textX} y={subTitleY} fill={textColor} textAnchor={textAnchor} fontSize={subtitleFontSize} fontWeight="500" opacity="0.6" alignmentBaseline="middle">{subtitle}</text>}
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* CONTROLES */}
          <div style={styles.rightPanel}>
            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Nombres</label>
                <input value={title} onChange={e => setTitle(e.target.value)} style={styles.input} />
                <input value={subtitle} onChange={e => setSubtitle(e.target.value)} style={styles.input} />
              </div>
            </div>

            {showText && (
              <div style={styles.row}>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Tamaño Fuente Título</label>
                  <input type="number" value={titleFontSize} onChange={e => setTitleFontSize(Number(e.target.value))} style={styles.input} min="1" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Tamaño Fuente Subtítulo</label>
                  <input type="number" value={subtitleFontSize} onChange={e => setSubtitleFontSize(Number(e.target.value))} style={styles.input} min="1" />
                </div>
              </div>
            )}

            <label style={styles.label}>Estilo Visual</label>
            <div style={{ ...styles.row, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ height: 35, width: 60, border: 'none', cursor: 'pointer', padding: 0 }} title="Color Icono" />
                <span style={{ fontSize: 9, marginTop: 4, color: '#999' }}>ICONO</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={{ height: 35, width: 60, border: 'none', cursor: 'pointer', padding: 0 }} title="Color Texto" />
                <span style={{ fontSize: 9, marginTop: 4, color: '#999' }}>TEXTO</span>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                <input type="checkbox" checked={showText} onChange={e => setShowText(e.target.checked)} id="tg_txt" style={{ width: 'auto', margin: 0 }} />
                <label htmlFor="tg_txt" style={{ margin: 0, fontSize: 12, cursor: 'pointer' }}>Mostrar Texto</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={showSubtitle} onChange={e => setShowSubtitle(e.target.checked)} id="tg_sub" style={{ width: 'auto', margin: 0 }} />
                <label htmlFor="tg_sub" style={{ margin: 0, fontSize: 12, cursor: 'pointer' }}>Mostrar Subtítulo</label>
              </div>
            </div>

            <label style={styles.label}>Fondo de Previsualización</label>
            <div style={styles.btnGroup}>
              <button onClick={setDarkMode} style={{ ...styles.btnOption, background: bgColor === '#0a0a0a' && !transparent ? '#000' : '#fff', color: bgColor === '#0a0a0a' && !transparent ? '#fff' : '#000' }}>Oscuro</button>
              <button onClick={setLightMode} style={{ ...styles.btnOption, background: bgColor === '#ffffff' && !transparent ? '#eee' : '#fff' }}>Claro</button>
              <button onClick={toggleTransparent} style={{ ...styles.btnOption, border: transparent ? '1px solid blue' : '1px solid #ddd', color: transparent ? 'blue' : '#333' }}>Transparente</button>
            </div>

            {showText && (
              <div style={{ textAlign: 'right', marginBottom: 15 }}>
                <button onClick={() => setLayout(l => l === 'horizontal' ? 'vertical' : 'horizontal')} style={{ fontSize: 11, padding: '4px 8px', cursor: 'pointer', border: 'none', background: 'none', textDecoration: 'underline', color: '#666' }}>
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
        <div style={styles.heading}><span>📢</span> Generador Social (Estilo IntelliJ Vibrant)</div>
        <div style={styles.workspace}>
          <div style={styles.leftPanel}>
            <div style={styles.postPreview}>
              <img src={URL.createObjectURL(new Blob([generatePostSvg()], { type: 'image/svg+xml' }))} alt="Post" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

          <div style={styles.rightPanel}>
            <label style={styles.label}>Contenido del Post</label>
            <textarea value={postHeadline} onChange={e => setPostHeadline(e.target.value)} style={{ ...styles.input, height: 80, resize: 'vertical' }} placeholder="Título Principal" />
            <textarea value={postBody} onChange={e => setPostBody(e.target.value)} style={{ ...styles.input, height: 60, resize: 'vertical' }} placeholder="Subtítulo o descripción" />

            <label style={{ ...styles.label, marginTop: 15 }}>Botones (Badges)</label>
            <div style={styles.row}>
              <input value={btnText1} onChange={e => setBtnText1(e.target.value)} style={styles.input} placeholder="Botón Izq (Negro)" />
              <input value={btnText2} onChange={e => setBtnText2(e.target.value)} style={styles.input} placeholder="Botón Der (Borde)" />
            </div>

            <div style={{ fontSize: 12, color: '#666', marginTop: 10, background: '#f0f0f0', padding: 10, borderRadius: 6 }}>
              💡 El generador social usa formas abstractas vibrantes (Azul, Rosa, Naranja) inspiradas en el logo de IntelliJ IDEA sobre fondo negro.
            </div>

            <button style={{ ...styles.btn, marginTop: 20 }} onClick={downloadPostPng}>Descargar PNG</button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: FAVICON (ICO) */}
      <section style={styles.section}>
        <div style={styles.heading}><span>⚡</span> Generador de Favicon (.ICO)</div>
        <div style={styles.workspace}>
          <div style={styles.leftPanel}>
            <div style={{ ...styles.logoPreview, maxWidth: '200px', margin: '0 auto', aspectRatio: '1/1', minHeight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'conic-gradient(#eee 90deg, #fff 90deg 180deg, #eee 180deg 270deg, #fff 270deg) 0 0/20px 20px' }}>
              <svg width="128" height="128" viewBox="0 0 80 80">
                <g dangerouslySetInnerHTML={{ __html: renderIconString('fav-prev', color) }} />
              </svg>
            </div>
            <div style={{ textAlign: 'center', marginTop: 10, color: '#666', fontSize: 13 }}>Vista previa (Siempre transparente)</div>
          </div>

          <div style={styles.rightPanel}>
            <div style={{ fontSize: 14, marginBottom: 15, lineHeight: '1.5' }}>
              Genera un archivo <strong>.ico</strong> compatible con Windows y navegadores web.
              Incluye una versión de alta resolución (256px) usando el icono actual sin texto.
            </div>
            <button style={{ ...styles.btn, background: '#4a4a4a' }} onClick={downloadIco}>Descargar Favicon .ICO</button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default App