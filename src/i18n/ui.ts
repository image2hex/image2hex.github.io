export const languages = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  de: 'Deutsch',
  fr: 'Français',
  ja: '日本語',
} as const;

export type SupportedLanguage = keyof typeof languages;
export const defaultLang: SupportedLanguage = 'en';

export const ui = {
  en: {
    seo: {
      title: 'Image to HEX | Free Color Picker from Image (100% Private)',
      description:
        'Extract exact HEX, RGB, HSL, and CMYK color codes from any image online. Fast, free, and 100% private in-browser color picker with magnifying loupe and palette extractor.',
      keywords:
        'image to hex, color picker from image, extract hex from image, image color identifier, hex color picker online, rgb to hex image, hsl color picker, palette extractor, eyedropper online, free color picker',
    },
    header: {
      brand: 'Image to HEX',
      privacyBadge: '100% Private · In-Browser',
      privacyBadgeShort: 'Private',
      support: 'Support Developer',
    },
    hero: {
      badge: 'Free In-Browser Color Inspector & Palette Extractor',
      h1: 'Extract Exact',
      h1Accent: 'HEX Colors',
      h1End: 'from Any Image',
      subtitle:
        'Upload, drag & drop, or paste an image to inspect pixels with a high-precision magnifying loupe. Convert instantly to HEX, RGB, HSL, and CMYK.',
    },
    workspace: {
      dropzoneTitle: 'Drop an image here, click to browse, or',
      dropzonePaste: 'paste (Ctrl+V / Cmd+V)',
      dropzoneSubtitle: 'PNG, JPG, WEBP, SVG supported',
      trySample: 'Try a sample:',
      sampleSunset: 'Sunset',
      sampleArchitecture: 'Architecture',
      sampleGradient: 'Gradient',
      newImage: 'New Image',
      zoomOut: 'Zoom Out',
      zoomIn: 'Zoom In',
      resetView: 'Reset View',
      pickFromScreen: 'Pick from Screen',
      dominantPaletteTitle: 'Dominant Palette',
      copySuccess: 'copied!',
      recentColorsTitle: 'Recent Colors',
      exportLabel: 'Export',
      exportCss: 'CSS Variables',
      exportJson: 'JSON',
      exportTxt: 'Plain Text',
      exportSuccess: 'Exported as',
      clearHistory: 'Clear history',
    },
    howTo: {
      heading: 'How to Pick HEX Colors from an Image',
      subtitle:
        'Four effortless steps to extract, convert, and export color codes from any visual asset.',
      steps: [
        {
          number: '01',
          title: 'Upload or Paste Image',
          description:
            'Drag and drop any PNG, JPG, WEBP, or SVG file into the workspace, browse from your device, or paste directly with Ctrl+V / Cmd+V.',
        },
        {
          number: '02',
          title: 'Target with Loupe',
          description:
            'Hover over the canvas to inspect pixels with the 11×11 circular magnifying loupe and center crosshair for pinpoint accuracy.',
        },
        {
          number: '03',
          title: 'Click to Pick & Convert',
          description:
            'Click any pixel to lock the color. Instantly view real-time conversions in HEX, RGB, HSL, and CMYK color spaces.',
        },
        {
          number: '04',
          title: '1-Click Copy & Export',
          description:
            'Copy any color code format with a single click or export your recent color history as CSS Variables, JSON, or Plain Text.',
        },
      ],
    },
    features: {
      heading: 'Built for Designers, Developers & Creators',
      subtitle:
        'High-performance color utilities engineered with modern web standards and zero bloat.',
      list: [
        {
          icon: 'shield',
          title: '100% Client-Side Privacy',
          description:
            'Zero bytes leave your browser. Images are processed purely in local memory via HTML5 Canvas API—no servers, no storage.',
        },
        {
          icon: 'loupe',
          title: 'Pixel-Precise Loupe',
          description:
            'A responsive 11×11 pixel neighborhood zoom loupe reveals exact color values under your cursor in real time.',
        },
        {
          icon: 'palette',
          title: 'Dominant Palette Generator',
          description:
            'Median-cut color quantization automatically analyzes and clusters the 8 most dominant harmonic colors on upload.',
        },
        {
          icon: 'convert',
          title: 'Multi-Format Conversion',
          description:
            'Accurate, instantaneous conversions between HEX, RGB, HSL, and CMYK with one-click clipboard copying.',
        },
        {
          icon: 'paste',
          title: 'Clipboard Paste & Zoom',
          description:
            'Paste screenshots straight from your clipboard (Ctrl+V / Cmd+V) and pan or zoom seamlessly from 25% up to 800%.',
        },
        {
          icon: 'export',
          title: 'Color History & Export',
          description:
            'Preserve your picked swatches during your session and export full color palettes as CSS Variables, JSON, or TXT.',
        },
      ],
    },
    faq: {
      heading: 'Frequently Asked Questions',
      subtitle:
        'Everything you need to know about privacy, color conversions, and browser support.',
      items: [
        {
          question: 'Are my uploaded images saved on your server?',
          answer:
            'No. Image to HEX operates 100% client-side inside your web browser using HTML5 Canvas and JavaScript. Your images are never uploaded, stored, or transmitted over the internet to any server.',
        },
        {
          question: 'How do I copy a color code from an image?',
          answer:
            'Simply upload or paste your image, hover over the desired area using the magnifying loupe, and click to select a pixel. Then click the copy button next to the HEX, RGB, HSL, or CMYK code cards.',
        },
        {
          question: 'What is the difference between HEX, RGB, HSL, and CMYK?',
          answer:
            'HEX and RGB are digital additive color models used for screens and web design. HSL represents colors by Hue, Saturation, and Lightness, making human adjustment easier. CMYK is a subtractive color model designed for physical ink printing.',
        },
        {
          question: 'Can I paste an image directly from my clipboard?',
          answer:
            'Yes! You can take a screenshot or copy an image anywhere on your computer and press Ctrl+V (Windows/Linux) or Cmd+V (Mac) on this page to load it immediately.',
        },
        {
          question: 'Does this work on mobile and tablet browsers?',
          answer:
            'Yes, the workspace is fully responsive. You can upload photos directly from your camera roll and tap on the image to inspect and pick colors with touch controls.',
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy | Image to HEX',
      description:
        'Image to HEX is a 100% client-side web application. All color picking and image analysis happen exclusively inside your browser with zero server uploads.',
      backToTool: 'Back to Color Picker',
      heading: 'Privacy Policy',
      lastUpdated: 'Last updated: August 2026 · 100% In-Browser Guarantee',
      badgeTitle: 'Zero Server Data Transfer',
      badgeText:
        'Every single byte of your uploaded, pasted, or sampled images is processed locally inside your browser memory using the standard HTML5 Canvas and EyeDropper APIs. We never transmit your images or color data over the internet.',
      s1Title: '1. Image Data & Processing',
      s1P1: 'When you upload an image, drop a file, or paste from your clipboard, the file is read directly into an in-memory HTMLCanvasElement. The pixel data extraction, median-cut palette clustering, and magnifying loupe computations are executed solely on your device CPU/GPU.',
      s1P2: 'When you close or refresh the tab, all image buffers are immediately discarded from your device temporary memory.',
      s2Title: '2. Cookies and Tracking',
      s2P1: 'Image to HEX does not use tracking cookies, analytics pixels, advertising trackers, or fingerprinting scripts. We do not store personal profiles, IP addresses, or device identifiers.',
      s3Title: '3. Session History & Exports',
      s3P1: 'The "Recent Colors" history list is stored temporarily within React component state during your active browser session. When you export a palette as CSS Variables, JSON, or Plain Text, the file is generated client-side via URL.createObjectURL(Blob) without hitting any server endpoint.',
      s4Title: '4. Third-Party CDNs & Fonts',
      s4P1: 'We use Google Fonts to serve the Inter typeface stylesheet. Standard HTTP requests to Google Fonts servers may receive your browser user agent as part of the normal font delivery process.',
      s5Title: '5. Contact & Open Source',
      s5P1: 'Image to HEX is an open-source static project hosted on GitHub Pages. If you have questions, feedback, or security inquiries, please visit our GitHub repository:',
    },
    footer: {
      copyright:
        'Image to HEX — All processing happens in your browser.',
      privacyPolicy: 'Privacy Policy',
    },
  },

  es: {
    seo: {
      title: 'Imagen a HEX | Selector de Color de Imagen Gratis (100% Privado)',
      description:
        'Extrae códigos de color exactos en HEX, RGB, HSL y CMYK de cualquier imagen online. Rápido, gratis y 100% privado en tu navegador con lupa y paleta.',
      keywords:
        'imagen a hex, selector de color de imagen, extraer hex de imagen, selector de color online, extractor de paletas, cuentagotas online, convertir rgb a hex, detector de color',
    },
    header: {
      brand: 'Image to HEX',
      privacyBadge: '100% Privado · En el Navegador',
      privacyBadgeShort: 'Privado',
      support: 'Apoyar al Desarrollador',
    },
    hero: {
      badge: 'Inspector de Color y Extractor de Paletas Gratis en el Navegador',
      h1: 'Extrae Colores',
      h1Accent: 'HEX Exactos',
      h1End: 'de Cualquier Imagen',
      subtitle:
        'Sube, arrastra o pega una imagen para inspeccionar píxeles con una lupa de alta precisión. Convierte al instante a HEX, RGB, HSL y CMYK.',
    },
    workspace: {
      dropzoneTitle: 'Arrastra una imagen aquí, haz clic para buscar o',
      dropzonePaste: 'pega (Ctrl+V / Cmd+V)',
      dropzoneSubtitle: 'Compatible con PNG, JPG, WEBP, SVG',
      trySample: 'Prueba un ejemplo:',
      sampleSunset: 'Atardecer',
      sampleArchitecture: 'Arquitectura',
      sampleGradient: 'Gradiente',
      newImage: 'Nueva Imagen',
      zoomOut: 'Alejar',
      zoomIn: 'Acercar',
      resetView: 'Restablecer',
      pickFromScreen: 'Gotero de Pantalla',
      dominantPaletteTitle: 'Paleta Dominante',
      copySuccess: '¡copiado!',
      recentColorsTitle: 'Colores Recientes',
      exportLabel: 'Exportar',
      exportCss: 'Variables CSS',
      exportJson: 'JSON',
      exportTxt: 'Texto Plano',
      exportSuccess: 'Exportado como',
      clearHistory: 'Borrar historial',
    },
    howTo: {
      heading: 'Cómo Obtener Colores HEX de una Imagen',
      subtitle:
        'Cuatro sencillos pasos para extraer, convertir y exportar códigos de color de cualquier imagen.',
      steps: [
        {
          number: '01',
          title: 'Sube o Pega una Imagen',
          description:
            'Arrastra y suelta cualquier archivo PNG, JPG, WEBP o SVG, búscalo en tu dispositivo o pégalo directamente con Ctrl+V / Cmd+V.',
        },
        {
          number: '02',
          title: 'Apunta con la Lupa',
          description:
            'Pasa el cursor sobre el lienzo para inspeccionar los píxeles con la lupa circular de 11×11 y retícula central.',
        },
        {
          number: '03',
          title: 'Haz Clic para Elegir',
          description:
            'Haz clic en cualquier píxel para fijar el color. Observa conversiones instantáneas en HEX, RGB, HSL y CMYK.',
        },
        {
          number: '04',
          title: 'Copia con 1 Clic y Exporta',
          description:
            'Copia cualquier formato de color con un solo clic o exporta tu historial como Variables CSS, JSON o Texto Plano.',
        },
      ],
    },
    features: {
      heading: 'Creado para Diseñadores, Desarrolladores y Creadores',
      subtitle:
        'Herramientas de color de alto rendimiento diseñadas con estándares web modernos y sin sobrecarga.',
      list: [
        {
          icon: 'shield',
          title: '100% Privacidad en el Cliente',
          description:
            'Cero bytes salen de tu navegador. Las imágenes se procesan únicamente en la memoria local mediante HTML5 Canvas.',
        },
        {
          icon: 'loupe',
          title: 'Lupa de Precisión de Píxeles',
          description:
            'Una lupa de zoom de 11×11 píxeles muestra los valores de color exactos debajo de tu cursor en tiempo real.',
        },
        {
          icon: 'palette',
          title: 'Generador de Paleta Dominante',
          description:
            'La cuantización de color analiza y agrupa automáticamente los 8 colores armónicos más dominantes al cargar la imagen.',
        },
        {
          icon: 'convert',
          title: 'Conversión Multiformato',
          description:
            'Conversiones precisas e instantáneas entre HEX, RGB, HSL y CMYK con copia al portapapeles en un clic.',
        },
        {
          icon: 'paste',
          title: 'Pegado Directo y Zoom',
          description:
            'Pega capturas de pantalla directamente del portapapeles (Ctrl+V / Cmd+V) y haz zoom fluido del 25% al 800%.',
        },
        {
          icon: 'export',
          title: 'Historial y Exportación',
          description:
            'Guarda los colores seleccionados durante tu sesión y exporta paletas completas como Variables CSS, JSON o TXT.',
        },
      ],
    },
    faq: {
      heading: 'Preguntas Frecuentes',
      subtitle:
        'Todo lo que necesitas saber sobre privacidad, conversiones de color y compatibilidad con navegadores.',
      items: [
        {
          question: '¿Mis imágenes subidas se guardan en su servidor?',
          answer:
            'No. Image to HEX funciona al 100% del lado del cliente dentro de tu navegador web usando HTML5 Canvas y JavaScript. Tus imágenes nunca se suben, guardan ni transmiten por internet a ningún servidor.',
        },
        {
          question: '¿Cómo copio el código de color de una imagen?',
          answer:
            'Sube o pega tu imagen, pasa el cursor sobre el área deseada con la lupa y haz clic para seleccionar un píxel. Luego haz clic en el botón de copiar junto a las tarjetas HEX, RGB, HSL o CMYK.',
        },
        {
          question: '¿Cuál es la diferencia entre HEX, RGB, HSL y CMYK?',
          answer:
            'HEX y RGB son modelos aditivos digitales usados en pantallas y diseño web. HSL representa los colores mediante Tono, Saturación y Luminosidad para facilitar ajustes humanos. CMYK es un modelo sustractivo diseñado para impresión en tinta.',
        },
        {
          question: '¿Puedo pegar una imagen directamente desde mi portapapeles?',
          answer:
            '¡Sí! Puedes tomar una captura de pantalla o copiar una imagen en tu ordenador y presionar Ctrl+V (Windows/Linux) o Cmd+V (Mac) en esta página para cargarla al instante.',
        },
        {
          question: '¿Funciona en navegadores móviles y tabletas?',
          answer:
            'Sí, la interfaz es totalmente responsiva. Puedes subir fotos desde tu galería y tocar en la imagen para inspeccionar y seleccionar colores mediante controles táctiles.',
        },
      ],
    },
    privacy: {
      title: 'Política de Privacidad | Image to HEX',
      description:
        'Image to HEX es una aplicación web 100% del lado del cliente. Todo el análisis de color ocurre exclusivamente en tu navegador sin subidas a servidores.',
      backToTool: 'Volver al Selector de Color',
      heading: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Agosto de 2026 · Garantía 100% en el Navegador',
      badgeTitle: 'Cero Transferencia de Datos al Servidor',
      badgeText:
        'Cada byte de tus imágenes subidas, pegadas o de prueba se procesa localmente en la memoria de tu navegador mediante HTML5 Canvas y la API EyeDropper. Nunca transmitimos tus imágenes o datos de color por internet.',
      s1Title: '1. Datos y Procesamiento de Imágenes',
      s1P1: 'Cuando subes una imagen, arrastras un archivo o pegas desde el portapapeles, el archivo se lee directamente en un elemento HTMLCanvasElement en memoria. La extracción de píxeles, la paleta dominante y la lupa se ejecutan exclusivamente en la CPU/GPU de tu dispositivo.',
      s1P2: 'Al cerrar o actualizar la pestaña, todos los datos de la imagen se eliminan de inmediato de la memoria temporal de tu dispositivo.',
      s2Title: '2. Cookies y Seguimiento',
      s2P1: 'Image to HEX no utiliza cookies de seguimiento, píxeles de analítica, rastreadores publicitarios ni scripts de huella digital. No recopilamos perfiles personales, direcciones IP ni identificadores de dispositivos.',
      s3Title: '3. Historial de Sesión y Exportaciones',
      s3P1: 'El historial de "Colores Recientes" se almacena temporalmente en el estado del componente React durante tu sesión activa. Al exportar como Variables CSS, JSON o Texto, el archivo se genera del lado del cliente mediante URL.createObjectURL(Blob) sin consultar ningún servidor.',
      s4Title: '4. Fuentes y CDN de Terceros',
      s4P1: 'Utilizamos Google Fonts para cargar la tipografía Inter. Las solicitudes HTTP estándar a los servidores de Google Fonts pueden recibir el agente de usuario de tu navegador como parte de la entrega normal de fuentes.',
      s5Title: '5. Contacto y Código Abierto',
      s5P1: 'Image to HEX es un proyecto estático de código abierto alojado en GitHub Pages. Si tienes dudas, comentarios o consultas de seguridad, visita nuestro repositorio de GitHub:',
    },
    footer: {
      copyright:
        'Image to HEX — Todo el procesamiento ocurre en tu navegador.',
      privacyPolicy: 'Política de Privacidad',
    },
  },

  pt: {
    seo: {
      title: 'Imagem para HEX | Seletor de Cores de Imagem Grátis (100% Privado)',
      description:
        'Extraia códigos de cor exatos em HEX, RGB, HSL e CMYK de qualquer imagem online. Rápido, gratuito e 100% privado no seu navegador com lupa e paleta.',
      keywords:
        'imagem para hex, seletor de cores de imagem, extrair hex de imagem, conta-gotas online, detector de cores, extrair paleta de cores, converter rgb em hex',
    },
    header: {
      brand: 'Image to HEX',
      privacyBadge: '100% Privado · No Navegador',
      privacyBadgeShort: 'Privado',
      support: 'Apoiar o Desenvolvedor',
    },
    hero: {
      badge: 'Inspetor de Cores e Extrator de Paletas Grátis no Navegador',
      h1: 'Extraia Cores',
      h1Accent: 'HEX Exatas',
      h1End: 'de Qualquer Imagem',
      subtitle:
        'Envie, arraste ou cole uma imagem para inspecionar pixels com uma lupa de alta precisão. Converta instantaneamente para HEX, RGB, HSL e CMYK.',
    },
    workspace: {
      dropzoneTitle: 'Arraste uma imagem aqui, clique para buscar ou',
      dropzonePaste: 'cole (Ctrl+V / Cmd+V)',
      dropzoneSubtitle: 'Suporta PNG, JPG, WEBP, SVG',
      trySample: 'Experimente um exemplo:',
      sampleSunset: 'Pôr do Sol',
      sampleArchitecture: 'Arquitetura',
      sampleGradient: 'Gradiente',
      newImage: 'Nova Imagem',
      zoomOut: 'Diminuir Zoom',
      zoomIn: 'Aumentar Zoom',
      resetView: 'Redefinir',
      pickFromScreen: 'Conta-gotas da Tela',
      dominantPaletteTitle: 'Paleta Dominante',
      copySuccess: 'copiado!',
      recentColorsTitle: 'Cores Recentes',
      exportLabel: 'Exportar',
      exportCss: 'Variáveis CSS',
      exportJson: 'JSON',
      exportTxt: 'Texto Simples',
      exportSuccess: 'Exportado como',
      clearHistory: 'Limpar histórico',
    },
    howTo: {
      heading: 'Como Obter Cores HEX de uma Imagem',
      subtitle:
        'Quatro passos simples para extrair, converter e exportar códigos de cor de qualquer imagem.',
      steps: [
        {
          number: '01',
          title: 'Envie ou Cole a Imagem',
          description:
            'Arraste e solte qualquer arquivo PNG, JPG, WEBP ou SVG, procure no seu dispositivo ou cole diretamente com Ctrl+V / Cmd+V.',
        },
        {
          number: '02',
          title: 'Mire com a Lupa',
          description:
            'Passe o mouse sobre a tela para inspecionar os pixels com a lupa circular 11×11 e mira central com precisão cirúrgica.',
        },
        {
          number: '03',
          title: 'Clique para Escolher',
          description:
            'Clique em qualquer pixel para fixar a cor. Veja conversões imediatas nos formatos HEX, RGB, HSL e CMYK.',
        },
        {
          number: '04',
          title: 'Copie com 1 Clique e Exporte',
          description:
            'Copie qualquer código de cor com um único clique ou exporte seu histórico como Variáveis CSS, JSON ou Texto Simples.',
        },
      ],
    },
    features: {
      heading: 'Feito para Designers, Desenvolvedores e Criadores',
      subtitle:
        'Utilitários de cores de alto desempenho criados com padrões web modernos e sem excessos.',
      list: [
        {
          icon: 'shield',
          title: '100% Privacidade no Cliente',
          description:
            'Zero bytes saem do seu navegador. O processamento é feito puramente na memória local via HTML5 Canvas.',
        },
        {
          icon: 'loupe',
          title: 'Lupa com Precisão de Pixels',
          description:
            'Uma lupa de zoom de 11×11 pixels revela os valores exatos de cor sob o cursor em tempo real.',
        },
        {
          icon: 'palette',
          title: 'Gerador de Paleta Dominante',
          description:
            'A quantização de cor analisa e agrupa automaticamente as 8 cores mais dominantes e harmônicas ao carregar a imagem.',
        },
        {
          icon: 'convert',
          title: 'Conversão Multiformato',
          description:
            'Conversões precisas e instantâneas entre HEX, RGB, HSL e CMYK com cópia em 1 clique para a área de transferência.',
        },
        {
          icon: 'paste',
          title: 'Colar Direto e Zoom',
          description:
            'Cole capturas de tela diretamente da área de transferência (Ctrl+V / Cmd+V) e aplique zoom de 25% a 800%.',
        },
        {
          icon: 'export',
          title: 'Histórico e Exportação',
          description:
            'Salve as cores selecionadas durante sua sessão e exporte paletas completas como Variáveis CSS, JSON ou TXT.',
        },
      ],
    },
    faq: {
      heading: 'Perguntas Frequentes',
      subtitle:
        'Tudo o que você precisa saber sobre privacidade, conversões de cor e compatibilidade.',
      items: [
        {
          question: 'Minhas imagens enviadas são salvas no seu servidor?',
          answer:
            'Não. O Image to HEX opera 100% no lado do cliente no seu navegador usando HTML5 Canvas e JavaScript. Suas imagens nunca são enviadas, salvas ou transmitidas pela internet para nenhum servidor.',
        },
        {
          question: 'Como faço para copiar um código de cor de uma imagem?',
          answer:
            'Basta enviar ou colar sua imagem, passar o cursor sobre a área desejada usando a lupa e clicar para selecionar o pixel. Em seguida, clique no botão de copiar ao lado dos cartões HEX, RGB, HSL ou CMYK.',
        },
        {
          question: 'Qual a diferença entre HEX, RGB, HSL e CMYK?',
          answer:
            'HEX e RGB são modelos aditivos digitais usados para telas e web. HSL representa as cores por Matiz, Saturação e Luminosidade para facilitar ajustes. CMYK é um modelo subtrativo projetado para impressão gráfica.',
        },
        {
          question: 'Posso colar uma imagem diretamente da área de transferência?',
          answer:
            'Sim! Você pode tirar um print ou copiar uma imagem no seu computador e pressionar Ctrl+V (Windows/Linux) ou Cmd+V (Mac) nesta página para carregá-la na hora.',
        },
        {
          question: 'Funciona em navegadores de celular e tablet?',
          answer:
            'Sim, a interface é totalmente responsiva. Você pode enviar fotos da sua galeria e tocar na imagem para inspecionar e escolher cores com controles de toque.',
        },
      ],
    },
    privacy: {
      title: 'Política de Privacidade | Image to HEX',
      description:
        'Image to HEX é um aplicativo web 100% no lado do cliente. Todo o processamento de imagem e cores ocorre no seu navegador sem envio a servidores.',
      backToTool: 'Voltar ao Seletor de Cores',
      heading: 'Política de Privacidade',
      lastUpdated: 'Última atualização: Agosto de 2026 · Garantia 100% no Navegador',
      badgeTitle: 'Zero Transferência de Dados para Servidores',
      badgeText:
        'Cada byte das suas imagens enviadas, coladas ou de exemplo é processado localmente na memória do seu navegador através do HTML5 Canvas e da API EyeDropper. Nunca transmitimos suas imagens ou cores pela internet.',
      s1Title: '1. Dados e Processamento de Imagens',
      s1P1: 'Quando você envia uma imagem, arrasta um arquivo ou cola da área de transferência, o arquivo é lido diretamente em um elemento HTMLCanvasElement na memória. A extração de pixels, paleta dominante e lupa são executadas na CPU/GPU do seu dispositivo.',
      s1P2: 'Ao fechar ou recarregar a aba, todos os dados da imagem são imediatamente descartados da memória temporária do seu dispositivo.',
      s2Title: '2. Cookies e Rastreamento',
      s2P1: 'O Image to HEX não utiliza cookies de rastreamento, pixels de análise, rastreadores de anúncios ou scripts de identificação digital. Não armazenamos perfis de usuário, endereços IP ou identificadores de dispositivo.',
      s3Title: '3. Histórico de Sessão e Exportações',
      s3P1: 'A lista de "Cores Recientes" fica guardada temporariamente no estado do componente React durante sua sessão ativa. Ao exportar como Variáveis CSS, JSON ou Texto, o arquivo é gerado no navegador via URL.createObjectURL(Blob) sem consultar nenhum servidor.',
      s4Title: '4. Fontes e CDNs de Terceiros',
      s4P1: 'Utilizamos o Google Fonts para fornecer a tipografia Inter. Requisições HTTP padrão aos servidores do Google Fonts podem receber o agente de usuário do seu navegador como parte do fornecimento de fontes.',
      s5Title: '5. Contato e Código Aberto',
      s5P1: 'O Image to HEX é um projeto estático de código aberto hospedado no GitHub Pages. Em caso de dúvidas, sugestões ou relatórios de segurança, visite nosso repositório no GitHub:',
    },
    footer: {
      copyright:
        'Image to HEX — Todo o processamento ocorre no seu navegador.',
      privacyPolicy: 'Política de Privacidade',
    },
  },

  de: {
    seo: {
      title: 'Bild zu HEX | Kostenloser Farbwähler aus Bildern (100% Privat)',
      description:
        'Exakte HEX-, RGB-, HSL- und CMYK-Farbcodes aus jedem Bild online extrahieren. Schnell, kostenlos und 100% privat im Browser mit Lupe und Farbpalette.',
      keywords:
        'bild zu hex, farbwähler aus bild, hex farbe aus bild extrahieren, farbpipette online, farbpalette extrahieren, rgb in hex umrechnen, online farberkennung',
    },
    header: {
      brand: 'Image to HEX',
      privacyBadge: '100% Privat · Im Browser',
      privacyBadgeShort: 'Privat',
      support: 'Entwickler unterstützen',
    },
    hero: {
      badge: 'Kostenloser In-Browser Farbinspektor & Paletten-Extraktor',
      h1: 'Exakte',
      h1Accent: 'HEX-Farben',
      h1End: 'aus jedem Bild extrahieren',
      subtitle:
        'Bild hochladen, hineinziehen oder einfügen, um Pixel mit einer hochpräzisen Lupe zu analysieren. Sofort in HEX, RGB, HSL und CMYK umwandeln.',
    },
    workspace: {
      dropzoneTitle: 'Bild hierher ziehen, klicken zum Auswählen oder',
      dropzonePaste: 'einfügen (Strg+V / Cmd+V)',
      dropzoneSubtitle: 'Unterstützt PNG, JPG, WEBP, SVG',
      trySample: 'Beispiel testen:',
      sampleSunset: 'Sonnenuntergang',
      sampleArchitecture: 'Architektur',
      sampleGradient: 'Farbverlauf',
      newImage: 'Neues Bild',
      zoomOut: 'Verkleinern',
      zoomIn: 'Vergrößern',
      resetView: 'Zurücksetzen',
      pickFromScreen: 'Bildschirmpipette',
      dominantPaletteTitle: 'Dominante Farbpalette',
      copySuccess: 'kopiert!',
      recentColorsTitle: 'Zuletzt gewählte Farben',
      exportLabel: 'Exportieren',
      exportCss: 'CSS-Variablen',
      exportJson: 'JSON',
      exportTxt: 'Reiner Text',
      exportSuccess: 'Exportiert als',
      clearHistory: 'Verlauf löschen',
    },
    howTo: {
      heading: 'So wählen Sie HEX-Farben aus einem Bild',
      subtitle:
        'Vier einfache Schritte zum Extrahieren, Konvertieren und Exportieren von Farbcodes aus jedem Bild.',
      steps: [
        {
          number: '01',
          title: 'Bild hochladen oder einfügen',
          description:
            'Ziehen Sie eine PNG-, JPG-, WEBP- oder SVG-Datei in den Arbeitsbereich, wählen Sie eine Datei aus oder fügen Sie sie mit Strg+V / Cmd+V ein.',
        },
        {
          number: '02',
          title: 'Mit der Lupe zielen',
          description:
            'Bewegen Sie den Mauszeiger über das Bild, um Pixel mit der kreisförmigen 11×11-Lupe und dem Fadenkreuz punktgenau zu untersuchen.',
        },
        {
          number: '03',
          title: 'Klicken zum Auswählen',
          description:
            'Klicken Sie auf einen beliebigen Pixel, um die Farbe festzulegen. Erhalten Sie sofortige Umrechnungen in HEX, RGB, HSL und CMYK.',
        },
        {
          number: '04',
          title: '1-Klick-Kopie & Export',
          description:
            'Kopieren Sie jeden Farbcode mit einem Klick oder exportieren Sie Ihren Verlauf als CSS-Variablen, JSON oder reinen Text.',
        },
      ],
    },
    features: {
      heading: 'Entwickelt für Designer, Programmierer & Kreative',
      subtitle:
        'Hochleistungs-Farbwerkzeuge nach modernen Webstandards ohne unnötigen Ballast.',
      list: [
        {
          icon: 'shield',
          title: '100% Privatsphäre im Client',
          description:
            'Kein einziges Byte verlässt Ihren Browser. Bilder werden rein lokal im Arbeitsspeicher über HTML5 Canvas verarbeitet.',
        },
        {
          icon: 'loupe',
          title: 'Pixelgenaue Lupe',
          description:
            'Eine 11×11-Pixel-Zoomlupe zeigt die exakten Farbwerte unter Ihrem Cursor in Echtzeit an.',
        },
        {
          icon: 'palette',
          title: 'Dominanter Palettengenerator',
          description:
            'Die Median-Cut-Farbquantisierung analysiert und gruppiert automatisch die 8 harmonischsten Hauptfarben beim Laden.',
        },
        {
          icon: 'convert',
          title: 'Multi-Format-Konvertierung',
          description:
            'Präzise, sofortige Umwandlungen zwischen HEX, RGB, HSL und CMYK mit 1-Klick-Kopieren in die Zwischenablage.',
        },
        {
          icon: 'paste',
          title: 'Zwischenablage & Zoom',
          description:
            'Screenshots direkt aus der Zwischenablage einfügen (Strg+V / Cmd+V) und stufenlos von 25% bis 800% zoomen.',
        },
        {
          icon: 'export',
          title: 'Farbverlauf & Export',
          description:
            'Speichern Sie ausgewählte Farben während Ihrer Sitzung und exportieren Sie Farbpaletten als CSS-Variablen, JSON oder TXT.',
        },
      ],
    },
    faq: {
      heading: 'Häufig gestellte Fragen (FAQ)',
      subtitle:
        'Alles, was Sie über Datenschutz, Farbkonvertierungen und Browser-Unterstützung wissen müssen.',
      items: [
        {
          question: 'Werden meine hochgeladenen Bilder auf Ihrem Server gespeichert?',
          answer:
            'Nein. Image to HEX arbeitet zu 100% clientseitig in Ihrem Webbrowser mit HTML5 Canvas und JavaScript. Ihre Bilder werden niemals hochgeladen, gespeichert oder über das Internet an Server übertragen.',
        },
        {
          question: 'Wie kopiere ich einen Farbcode aus einem Bild?',
          answer:
            'Laden Sie einfach ein Bild hoch, fahren Sie mit der Lupe über den gewünschten Bereich und klicken Sie auf den Pixel. Klicken Sie dann auf das Kopiersymbol neben der HEX-, RGB-, HSL- oder CMYK-Karte.',
        },
        {
          question: 'Was ist der Unterschied zwischen HEX, RGB, HSL und CMYK?',
          answer:
            'HEX und RGB sind additive Farbmodelle für Bildschirme und Webdesign. HSL beschreibt Farben über Farbton, Sättigung und Helligkeit für intuitive Anpassungen. CMYK ist ein subtraktives Farbmodell für den professionellen Druck.',
        },
        {
          question: 'Kann ich ein Bild direkt aus der Zwischenablage einfügen?',
          answer:
            'Ja! Sie können einen Screenshot machen oder ein Bild kopieren und einfach Strg+V (Windows/Linux) oder Cmd+V (Mac) drücken, um es sofort zu laden.',
        },
        {
          question: 'Funktioniert das Tool auf Smartphones und Tablets?',
          answer:
            'Ja, die Anwendung ist vollständig responsive. Sie können Fotos aus Ihrer Galerie hochladen und Farben bequem per Touchscreen auswählen.',
        },
      ],
    },
    privacy: {
      title: 'Datenschutzerklärung | Image to HEX',
      description:
        'Image to HEX ist eine 100% clientseitige Webanwendung. Die gesamte Farbanalyse erfolgt ausschließlich in Ihrem Browser ohne Server-Uploads.',
      backToTool: 'Zurück zum Farbwähler',
      heading: 'Datenschutzerklärung',
      lastUpdated: 'Zuletzt aktualisiert: August 2026 · 100% In-Browser-Garantie',
      badgeTitle: 'Keine Datenübertragung an Server',
      badgeText:
        'Jedes Byte Ihrer Bilder wird lokal im Browser-Speicher über HTML5 Canvas und die EyeDropper API verarbeitet. Wir übertragen niemals Bilder oder Farbdaten über das Internet.',
      s1Title: '1. Bilddaten & Verarbeitung',
      s1P1: 'Wenn Sie ein Bild hochladen, hineinziehen oder einfügen, wird die Datei direkt in ein HTMLCanvasElement im Arbeitsspeicher geladen. Farbanalyse, Palettengenerierung und Lupe laufen ausschließlich auf der CPU/GPU Ihres Geräts.',
      s1P2: 'Sobald Sie den Tab schließen oder neu laden, werden alle Bilddaten sofort aus dem temporären Gerätespeicher gelöscht.',
      s2Title: '2. Cookies und Tracking',
      s2P1: 'Image to HEX verwendet keine Tracking-Cookies, Analyse-Pixel, Werbe-Tracker oder Fingerprinting-Skripte. Wir speichern keine Benutzerprofile, IP-Adressen oder Gerätekennungen.',
      s3Title: '3. Sitzungsverlauf & Exporte',
      s3P1: 'Die Liste der zuletzt gewählten Farben verbleibt während Ihrer aktiven Sitzung im React-Zustand. Beim Export als CSS-Variablen, JSON oder Text wird die Datei lokal über URL.createObjectURL(Blob) ohne Serveraufruf erzeugt.',
      s4Title: '4. Externe Schriften (CDNs)',
      s4P1: 'Wir nutzen Google Fonts für die Schriftart Inter. Standard-HTTP-Anfragen an Server von Google Fonts können Ihren Browser-User-Agent zur Schriftauslieferung erfassen.',
      s5Title: '5. Kontakt & Open Source',
      s5P1: 'Image to HEX ist ein quelloffenes, statisches Projekt auf GitHub Pages. Bei Fragen oder Feedback besuchen Sie bitte unser GitHub-Repository:',
    },
    footer: {
      copyright:
        'Image to HEX — Die gesamte Verarbeitung findet in Ihrem Browser statt.',
      privacyPolicy: 'Datenschutzerklärung',
    },
  },

  fr: {
    seo: {
      title: 'Image vers HEX | Sélecteur de Couleur d’Image Gratuit (100% Privé)',
      description:
        'Extrayez les codes couleur exacts en HEX, RGB, HSL et CMYK depuis n’importe quelle image en ligne. Rapide, gratuit et 100% privé dans votre navigateur avec loupe et palette.',
      keywords:
        'image vers hex, sélecteur de couleur image, extraire hex image, pipette en ligne, extracteur de palette, convertir rgb en hex, code couleur image',
    },
    header: {
      brand: 'Image to HEX',
      privacyBadge: '100% Privé · Dans le Navigateur',
      privacyBadgeShort: 'Privé',
      support: 'Soutenir le développeur',
    },
    hero: {
      badge: 'Inspecteur de Couleur et Extracteur de Palette Gratuit dans le Navigateur',
      h1: 'Extrayez les Couleurs',
      h1Accent: 'HEX Exactes',
      h1End: 'de N’importe Quelle Image',
      subtitle:
        'Téléversez, glissez-déposez ou collez une image pour inspecter les pixels avec une loupe de haute précision. Convertissez instantanément en HEX, RGB, HSL et CMYK.',
    },
    workspace: {
      dropzoneTitle: 'Déposez une image ici, cliquez pour parcourir ou',
      dropzonePaste: 'collez (Ctrl+V / Cmd+V)',
      dropzoneSubtitle: 'Compatible PNG, JPG, WEBP, SVG',
      trySample: 'Essayer un exemple :',
      sampleSunset: 'Coucher de soleil',
      sampleArchitecture: 'Architecture',
      sampleGradient: 'Dégradé',
      newImage: 'Nouvelle image',
      zoomOut: 'Zoom arrière',
      zoomIn: 'Zoom avant',
      resetView: 'Réinitialiser',
      pickFromScreen: 'Pipette d’écran',
      dominantPaletteTitle: 'Palette Dominante',
      copySuccess: 'copié !',
      recentColorsTitle: 'Couleurs Récentes',
      exportLabel: 'Exporter',
      exportCss: 'Variables CSS',
      exportJson: 'JSON',
      exportTxt: 'Texte Brut',
      exportSuccess: 'Exporté en',
      clearHistory: 'Effacer l’historique',
    },
    howTo: {
      heading: 'Comment Récupérer les Couleurs HEX d’une Image',
      subtitle:
        'Quatre étapes faciles pour extraire, convertir et exporter les codes couleur de tout support visuel.',
      steps: [
        {
          number: '01',
          title: 'Téléversez ou Collez l’Image',
          description:
            'Glissez-déposez un fichier PNG, JPG, WEBP ou SVG, parcourez votre appareil ou collez directement avec Ctrl+V / Cmd+V.',
        },
        {
          number: '02',
          title: 'Ciblez avec la Loupe',
          description:
            'Survolez l’image pour inspecter les pixels avec la loupe circulaire 11×11 et son réticule central haute précision.',
        },
        {
          number: '03',
          title: 'Cliquez pour Sélectionner',
          description:
            'Cliquez sur un pixel pour verrouiller la couleur. Obtenez les conversions instantanées en HEX, RGB, HSL et CMYK.',
        },
        {
          number: '04',
          title: 'Copiez en 1 Clic et Exportez',
          description:
            'Copiez n’importe quel code couleur en un clic ou exportez votre historique en Variables CSS, JSON ou Texte Brut.',
        },
      ],
    },
    features: {
      heading: 'Conçu pour les Designers, Développeurs et Créateurs',
      subtitle:
        'Des outils de couleur haute performance conçus selon les standards web modernes, sans superflu.',
      list: [
        {
          icon: 'shield',
          title: '100% Confidentialité Client',
          description:
            'Zéro octet ne quitte votre navigateur. Le traitement s’effectue en mémoire locale via l’API HTML5 Canvas.',
        },
        {
          icon: 'loupe',
          title: 'Loupe Précise au Pixel Près',
          description:
            'Une loupe de grossissement 11×11 pixels révèle en temps réel les valeurs exactes sous votre curseur.',
        },
        {
          icon: 'palette',
          title: 'Générateur de Palette Dominante',
          description:
            'La quantification médiane regroupe et extrait automatiquement les 8 teintes dominantes et harmonieuses à l’ouverture.',
        },
        {
          icon: 'convert',
          title: 'Conversion Multi-Formats',
          description:
            'Conversions instantanées et précises entre HEX, RGB, HSL et CMYK avec copie directe dans le presse-papiers.',
        },
        {
          icon: 'paste',
          title: 'Collage Direct et Zoom',
          description:
            'Collez vos captures d’écran depuis le presse-papiers (Ctrl+V / Cmd+V) et zoomez avec fluidité de 25% à 800%.',
        },
        {
          icon: 'export',
          title: 'Historique et Exportation',
          description:
            'Conservez vos couleurs choisies et exportez des palettes complètes en Variables CSS, JSON ou TXT.',
        },
      ],
    },
    faq: {
      heading: 'Foire Aux Questions (FAQ)',
      subtitle:
        'Tout ce que vous devez savoir sur la confidentialité, les conversions de couleur et la compatibilité.',
      items: [
        {
          question: 'Mes images téléversées sont-elles enregistrées sur votre serveur ?',
          answer:
            'Non. Image to HEX fonctionne à 100% côté client dans votre navigateur web avec HTML5 Canvas et JavaScript. Vos images ne sont jamais téléversées, enregistrées ni transmises sur Internet.',
        },
        {
          question: 'Comment copier le code couleur d’une image ?',
          answer:
            'Téléversez ou collez votre image, survolez la zone souhaitée avec la loupe et cliquez sur le pixel. Cliquez ensuite sur le bouton de copie à côté des fiches HEX, RGB, HSL ou CMYK.',
        },
        {
          question: 'Quelle est la différence entre HEX, RGB, HSL et CMYK ?',
          answer:
            'HEX et RGB sont des modèles additifs pour les écrans et le web. HSL décrit les couleurs par Teinte, Saturation et Luminosité. CMYK est un modèle soustractif dédié à l’impression papier.',
        },
        {
          question: 'Puis-je coller une image directement depuis mon presse-papiers ?',
          answer:
            'Oui ! Vous pouvez effectuer une capture d’écran ou copier une image et appuyer sur Ctrl+V (Windows/Linux) ou Cmd+V (Mac) sur cette page pour la charger aussitôt.',
        },
        {
          question: 'L’outil fonctionne-t-il sur smartphones et tablettes ?',
          answer:
            'Oui, l’application est entièrement adaptative. Vous pouvez charger des photos depuis votre galerie et sélectionner des couleurs avec les commandes tactiles.',
        },
      ],
    },
    privacy: {
      title: 'Politique de Confidentialité | Image to HEX',
      description:
        'Image to HEX est une application web 100% côté client. Toute l’analyse d’image s’effectue dans votre navigateur sans téléversement sur serveur.',
      backToTool: 'Retour au Sélecteur de Couleur',
      heading: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour : Août 2026 · Garantie 100% dans le Navigateur',
      badgeTitle: 'Zéro Transfert de Données vers un Serveur',
      badgeText:
        'Chaque octet de vos images est traité localement dans la mémoire de votre navigateur à l’aide des API HTML5 Canvas et EyeDropper. Nous ne transmettons jamais vos images ou couleurs sur Internet.',
      s1Title: '1. Données et Traitement des Images',
      s1P1: 'Lorsque vous téléversez une image, glissez un fichier ou collez depuis le presse-papiers, le fichier est lu directement dans un HTMLCanvasElement en mémoire. L’extraction de pixels et la loupe s’exécutent uniquement sur le processeur/GPU de votre appareil.',
      s1P2: 'Dès que vous fermez ou rechargez l’onglet, toutes les données d’image sont immédiatement purgées de la mémoire temporaire.',
      s2Title: '2. Cookies et Suivi',
      s2P1: 'Image to HEX n’utilise aucun cookie de suivi, pixel d’analyse, traceur publicitaire ou script d’empreinte numérique. Nous ne collectons aucun profil personnel ni adresse IP.',
      s3Title: '3. Historique de Session et Exports',
      s3P1: 'La liste des couleurs récentes est conservée temporairement dans l’état du composant React pendant votre session active. Lors de l’export en Variables CSS, JSON ou Texte, le fichier est créé localement via URL.createObjectURL(Blob) sans requête réseau.',
      s4Title: '4. Polices et CDN Tiers',
      s4P1: 'Nous utilisons Google Fonts pour charger la police Inter. Les requêtes HTTP standard vers les serveurs de Google Fonts peuvent enregistrer l’agent utilisateur de votre navigateur dans le cadre de la livraison des polices.',
      s5Title: '5. Contact et Code Source',
      s5P1: 'Image to HEX est un projet statique open source hébergé sur GitHub Pages. Pour toute question ou retour, visitez notre dépôt GitHub :',
    },
    footer: {
      copyright:
        'Image to HEX — Tout le traitement s’effectue dans votre navigateur.',
      privacyPolicy: 'Politique de Confidentialité',
    },
  },

  ja: {
    seo: {
      title: '画像からHEXカラー抽出 | 無料画像カラーピッカー (完全プライベート)',
      description:
        'アップロードした画像からHEX、RGB、HSL、CMYKカラーコードを正確に抽出。ブラウザ上で100%完結する安全・無料のカラーピッカー＆パレット抽出ツール。',
      keywords:
        '画像 hex 抽出, 画像 カラーピッカー, 画像から色を抽出, スポイト ツール オンライン, hex 変換, カラーコード 抽出, パレット 生成, 無料 カラーピッカー',
    },
    header: {
      brand: 'Image to HEX',
      privacyBadge: '100% 完全ローカル処理',
      privacyBadgeShort: '安全',
      support: '開発者を支援',
    },
    hero: {
      badge: '無料・ブラウザ完結のカラーインスペクター＆パレット抽出ツール',
      h1: '画像から正確な',
      h1Accent: 'HEXカラーコード',
      h1End: 'を一瞬で抽出',
      subtitle:
        '画像をアップロード、ドラッグ＆ドロップ、または貼り付けて拡大鏡でピクセルを精密検査。HEX、RGB、HSL、CMYKへ瞬時に変換。',
    },
    workspace: {
      dropzoneTitle: '画像をここにドロップ、クリックして選択、または',
      dropzonePaste: '貼り付け (Ctrl+V / Cmd+V)',
      dropzoneSubtitle: 'PNG, JPG, WEBP, SVG に対応',
      trySample: 'サンプルを試す:',
      sampleSunset: '夕焼け',
      sampleArchitecture: '建築',
      sampleGradient: 'グラデーション',
      newImage: '新しい画像',
      zoomOut: '縮小',
      zoomIn: '拡大',
      resetView: 'リセット',
      pickFromScreen: '画面からスポイト',
      dominantPaletteTitle: '主要カラーパレット',
      copySuccess: 'コピーしました！',
      recentColorsTitle: '選択履歴',
      exportLabel: 'エクスポート',
      exportCss: 'CSS変数',
      exportJson: 'JSON',
      exportTxt: 'テキスト',
      exportSuccess: '出力完了:',
      clearHistory: '履歴を消去',
    },
    howTo: {
      heading: '画像からHEXカラーコードを抽出する方法',
      subtitle:
        'あらゆる画像からカラーコードを抽出・変換・出力する簡単な4つのステップ。',
      steps: [
        {
          number: '01',
          title: '画像を読み込む',
          description:
            'PNG、JPG、WEBP、SVGファイルをドラッグ＆ドロップするか、デバイスから選択、またはCtrl+V / Cmd+Vで貼り付けます。',
        },
        {
          number: '02',
          title: '拡大鏡で狙いを定める',
          description:
            '画像の上にカーソルを合わせると、11×11ピクセルの円形拡大鏡とクロスヘアで狙ったピクセルをピンポイントで確認できます。',
        },
        {
          number: '03',
          title: 'クリックして色を確定',
          description:
            'ピクセルをクリックして色を選択。HEX、RGB、HSL、CMYKの各形式にリアルタイムで自動変換されます。',
        },
        {
          number: '04',
          title: 'ワンクリックでコピー＆出力',
          description:
            'コピーボタンを押してクリップボードにコピー。履歴一覧からCSS変数、JSON、テキスト形式でパレットを一括出力できます。',
        },
      ],
    },
    features: {
      heading: 'デザイナー・開発者・クリエイターのために設計',
      subtitle:
        '最新のWeb標準技術で構築された、軽快で高機能なカラーツール。',
      list: [
        {
          icon: 'shield',
          title: '100% 完全ローカル処理',
          description:
            '画像データはサーバーに一切送信されません。HTML5 Canvas APIを通じてお使いの端末メモリ内だけで安全に処理されます。',
        },
        {
          icon: 'loupe',
          title: 'ピクセル精密拡大ルーペ',
          description:
            'カーソル直下の11×11ピクセルを拡大表示し、リアルタイムにHEXコードを表示してピンポイント抽出を可能にします。',
        },
        {
          icon: 'palette',
          title: '主要パレット自動抽出',
          description:
            'Median-Cut（中央値切断）色量子化アルゴリズムにより、画像内の主要な調和色8色をアップロード時に自動抽出します。',
        },
        {
          icon: 'convert',
          title: 'マルチフォーマット変換',
          description:
            'HEX、RGB、HSL、CMYK相互の正確なリアルタイム変換とワンクリックコピーをサポート。',
        },
        {
          icon: 'paste',
          title: 'クリップボード貼付＆拡大縮小',
          description:
            'スクリーンショットを直接貼り付け可能（Ctrl+V / Cmd+V）。25%から800%までのシームレスなズームとパンに対応。',
        },
        {
          icon: 'export',
          title: 'カラー履歴とパレット出力',
          description:
            '抽出したカラー履歴を保持し、CSS変数、JSON、テキストファイルとしてワンクリックでエクスポート可能。',
        },
      ],
    },
    faq: {
      heading: 'よくある質問 (FAQ)',
      subtitle:
        'プライバシー、カラー変換、対応ブラウザについてのよくあるご質問。',
      items: [
        {
          question: 'アップロードした画像はサーバーに保存されますか？',
          answer:
            'いいえ。Image to HEXはHTML5 CanvasとJavaScriptを使用し、100%お使いのブラウザ内部でのみ動作します。画像が外部サーバーにアップロード、保存、送信されることは一切ありません。',
        },
        {
          question: '画像からカラーコードをコピーするにはどうすればいいですか？',
          answer:
            '画像を読み込み、拡大鏡を使って目的のピクセルをクリックします。その後、HEX、RGB、HSL、CMYKカードの横にあるコピーアイコンをクリックするだけで完了です。',
        },
        {
          question: 'HEX、RGB、HSL、CMYKの違いは何ですか？',
          answer:
            'HEXとRGBはディスプレイやWebデザインで使用される加法混色モデルです。HSLは色相・彩度・輝度を表し直感的な調整に適しています。CMYKは印刷用の減法混色モデルです。',
        },
        {
          question: 'クリップボードから画像を直接貼り付けられますか？',
          answer:
            'はい！画面のスクリーンショットを撮った後、このページ上でCtrl+V（MacはCmd+V）を押すだけで即座に読み込まれます。',
        },
        {
          question: 'スマートフォンやタブレットでも使えますか？',
          answer:
            'はい、レスポンシブデザインに対応しています。カメラロールから写真を読み込み、タップ操作でカラーを検査・抽出できます。',
        },
      ],
    },
    privacy: {
      title: 'プライバシーポリシー | Image to HEX',
      description:
        'Image to HEXは完全クライアントサイドのWebツールです。画像の解析とカラー抽出はブラウザ内部のみで実行され、サーバーへの送信は一切ありません。',
      backToTool: 'カラーピッカーに戻る',
      heading: 'プライバシーポリシー',
      lastUpdated: '最終更新: 2026年8月 · 100% ブラウザ内完結の保証',
      badgeTitle: 'サーバーへのデータ送信は一切行いません',
      badgeText:
        'アップロード、貼り付け、またはサンプル選択された画像データは、HTML5 CanvasおよびEyeDropper APIを通してお使いの端末のメモリ内でのみ処理されます。外部サーバーへの通信は行われません。',
      s1Title: '1. 画像データと処理について',
      s1P1: '画像を読み込む際、ファイルはブラウザのメモリ内にあるHTMLCanvasElementに直接展開されます。ピクセル抽出、パレット生成、拡大鏡の計算はすべてお使いのデバイスのCPU/GPU上で実行されます。',
      s1P2: 'タブを閉じるかリロードすると、すべての画像データは一時メモリから即座に破棄されます。',
      s2Title: '2. クッキーおよびトラッキングについて',
      s2P1: 'Image to HEXでは、トラッキングCookie、解析タグ、広告トラッカー、フィンガープリント等は一切使用していません。個人情報、IPアドレス、端末情報を収集することはありません。',
      s3Title: '3. 履歴とエクスポート機能',
      s3P1: '選択したカラー履歴はブラウザセッション中のReactステート内に一時保存されます。CSS変数、JSON、テキストとしてエクスポートする際も、URL.createObjectURL(Blob)を用いてブラウザ内で直接ファイルを生成します。',
      s4Title: '4. 外部フォント（CDN）について',
      s4P1: '書体（Inter）の読み込みにGoogle Fontsを使用しています。フォント配信に伴う通常のHTTPリクエストにおいて、ブラウザのUser-Agent情報が送信される場合があります。',
      s5Title: '5. お問い合わせ・オープンソース',
      s5P1: 'Image to HEXはGitHub Pages上でホストされているオープンソースプロジェクトです。ご質問やフィードバックはGitHubリポジトリをご覧ください:',
    },
    footer: {
      copyright:
        'Image to HEX — すべての処理はお使いのブラウザ上で行われます。',
      privacyPolicy: 'プライバシーポリシー',
    },
  },
} as const;
