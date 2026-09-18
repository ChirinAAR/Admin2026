/**
 * SiTech - Plataforma & Landing Institucional
 * Lógica interactiva para Organigrama, Navegación y Contacto
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initOrganigramaModal();
  initContactForm();
});

/* ==========================================================================
   1. NAVEGACIÓN MÓVIL Y SCROLL SUAVE
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (toggle && toggle.checked) {
        toggle.checked = false;
      }
    });
  });
}

/* ==========================================================================
   2. EXPLORADOR INTERACTIVO DE PUESTOS DEL ORGANIGRAMA
   ========================================================================== */
const ROLES_INFO = {
  pm: {
    title: "Project Manager",
    area: "Área de Tecnología — Departamento de Desarrollo",
    dependencia: "Gerente de Desarrollo",
    objetivo: "Garantizar la entrega de proyectos dentro de los plazos, costos y alcance definidos, optimizando recursos y minimizando riesgos.",
    funciones: [
      "Definir cronogramas, hitos y entregables de desarrollo.",
      "Coordinar equipos multidisciplinarios de ingenieros y especialistas.",
      "Gestionar riesgos operativos, cambios y prioridades de negocio.",
      "Monitorear métricas de avance y KPIs del ciclo de software.",
      "Actuar como nexo directo entre el cliente agroindustrial y el equipo técnico."
    ],
    competencias: "Liderazgo situacional, pensamiento estratégico, gestión del tiempo y resolución de conflictos.",
    herramientas: "Metodologías Ágiles (Scrum, Kanban), Jira, Trello, ClickUp, Análisis de riesgos."
  },
  backend: {
    title: "Desarrollador BackEnd",
    area: "Área de Tecnología — Departamento de Desarrollo",
    dependencia: "Gerente de Desarrollo",
    objetivo: "Desarrollar soluciones robustas, seguras y escalables que permitan el correcto funcionamiento del sistema.",
    funciones: [
      "Implementar la lógica del negocio agropecuario y algoritmos de optimización.",
      "Diseñar y desarrollar APIs RESTful de alta disponibilidad.",
      "Integrar servicios externos (sensores IoT, balanzas electrónicas, AFIP/CTG, sistemas legacy).",
      "Manejar autenticación, autorización y control de sesiones seguras.",
      "Optimizar el rendimiento del servidor y consultas a bases de datos."
    ],
    competencias: "Pensamiento lógico y abstracto, capacidad de resolución de problemas complejos, trabajo en equipo.",
    herramientas: ".NET / C#, Python, Node.js, REST APIs, Microservicios, PostgreSQL/SQL Server."
  },
  frontend: {
    title: "Desarrollador FrontEnd",
    area: "Área de Tecnología — Departamento de Desarrollo",
    dependencia: "Gerente de Desarrollo",
    objetivo: "Garantizar una interacción fluida, intuitiva y visualmente coherente entre el usuario y el sistema.",
    funciones: [
      "Desarrollar interfaces web y de escritorio responsive y de alto rendimiento.",
      "Integrar servicios y APIs provistas por el backend.",
      "Optimizar tiempos de renderizado y experiencia interactiva del usuario.",
      "Implementar diseños acordes a las necesidades de operarios de campo y directivos."
    ],
    competencias: "Creatividad aplicada, atención al detalle, pensamiento orientado al usuario final.",
    herramientas: "HTML5, Modern CSS, JavaScript, React, WPF/XAML, Consumo de APIs REST."
  },
  analista: {
    title: "Analista Funcional",
    area: "Área de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Asegurar que las soluciones desarrolladas respondan con precisión a las necesidades operativas del cliente.",
    funciones: [
      "Relevar requerimientos funcionales y no funcionales en plantas y fincas del NOA.",
      "Elaborar documentación técnica, especificaciones y manuales funcionales.",
      "Modelar procesos productivos y flujos de información (BPMN, casos de uso).",
      "Validar soluciones y entregables directamente con los stakeholders de la empresa."
    ],
    competencias: "Pensamiento analítico, escucha activa, comunicación clara, abstracción.",
    herramientas: "UML, BPMN, Técnicas de relevamiento de campo, Documentación funcional."
  },
  data: {
    title: "Data Analyst / DB Administrator",
    area: "Área de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Garantizar la integridad, disponibilidad, seguridad y eficiencia del almacenamiento y explotación de datos.",
    funciones: [
      "Diseñar modelos de datos relacionales y estructuras analíticas.",
      "Administrar usuarios, perfiles y políticas de permisos de base de datos.",
      "Ejecutar estrategias preventivas de backups y planes de contingencia ante fallas.",
      "Optimizar consultas complejas, indexación y tuning de rendimiento."
    ],
    competencias: "Pensamiento estructurado, rigurosidad técnica, alta precisión y atención al detalle.",
    herramientas: "SQL Avanzado, PostgreSQL, MySQL, Tuning de consultas, Modelado relacional."
  },
  ui: {
    title: "Diseñador UI / UX",
    area: "Área de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Optimizar la experiencia del usuario a través del diseño visual intuitivo, accesible y estéticamente consistente.",
    funciones: [
      "Diseñar interfaces gráficas web y aplicaciones de gestión de escritorio.",
      "Crear prototipos interactivos, wireframes y flujos de navegación.",
      "Definir sistemas de diseño, paletas de colores y guías de estilos corporativos."
    ],
    competencias: "Creatividad, sensibilidad visual, empatía con usuarios no técnicos, atención al detalle.",
    herramientas: "Figma, Adobe XD, Principios de diseño UX/UI, Prototipado rápido."
  },
  devops: {
    title: "Ingeniero DevOps",
    area: "Área de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Asegurar la integración continua, despliegue continuo y estabilidad de la infraestructura de software.",
    funciones: [
      "Implementar y mantener pipelines automatizados de CI/CD.",
      "Gestionar infraestructura cloud, servidores locales y contenedores.",
      "Monitorear la salud y disponibilidad de servicios 24/7.",
      "Automatizar tareas operativas de despliegue y mantenimiento."
    ],
    competencias: "Pensamiento sistémico, proactividad técnica, rapidez en resolución de incidentes.",
    herramientas: "Docker, Kubernetes, AWS/Azure/GCP, Bash, Python, Prometheus, Grafana."
  },
  ciberseguridad: {
    title: "Especialista en CiberSeguridad",
    area: "Área de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Garantizar la seguridad de la información, protección de datos y continuidad operativa frente a amenazas.",
    funciones: [
      "Identificar vulnerabilidades en redes, servidores y aplicaciones.",
      "Implementar políticas de seguridad, cifrado y control de accesos.",
      "Realizar auditorías de seguridad periódicas y monitoreo preventivo de eventos."
    ],
    competencias: "Pensamiento crítico, ética profesional inquebrantable, actualización permanente.",
    herramientas: "Seguridad informática, Criptografía, Normas ISO 27001, OWASP, Análisis de riesgos."
  },
  qa: {
    title: "QA Tester Funcional",
    area: "Área de Tecnología — Departamento de Pruebas y Control",
    dependencia: "Gerente de Pruebas",
    objetivo: "Garantizar la calidad funcional del software mediante pruebas exhaustivas, previniendo fallos en etapas tempranas.",
    funciones: [
      "Diseñar matrices y planes detallados de casos de prueba.",
      "Ejecutar pruebas funcionales, de regresión y de aceptación de usuario.",
      "Documentar, reportar y clasificar bugs en las herramientas de seguimiento."
    ],
    competencias: "Responsabilidad, mentalidad crítica, observación minuciosa y trabajo colaborativo.",
    herramientas: "Metodologías Ágiles, TestRail, Jira, Zephyr, Pruebas manuales y exploratorias."
  },
  rendimiento: {
    title: "Especialista en Rendimiento & Seguridad",
    area: "Área de Tecnología — Departamento de Pruebas y Control",
    dependencia: "Gerente de Pruebas",
    objetivo: "Asegurar la estabilidad, velocidad y solidez del software bajo condiciones extremas de carga y posibles ataques.",
    funciones: [
      "Diseñar y modelar escenarios de carga y estrés realistas con miles de transacciones.",
      "Monitorear el consumo anómalo de memoria, CPU y red para diagnosticar cuellos de botella.",
      "Ejecutar pruebas de penetración (pentesting) y análisis estáticos de código bajo OWASP."
    ],
    competencias: "Capacidad analítica profunda, diagnóstico técnico avanzado, hacking ético.",
    herramientas: "JMeter, Gatling, OWASP ZAP, Burp Suite, New Relic, Monitoreo de latencia."
  },
  soporte: {
    title: "Administrador de Sistemas y Soporte",
    area: "Área de Tecnología — Departamento de Soporte",
    dependencia: "Gerente de Soporte",
    objetivo: "Asegurar la disponibilidad continua de servidores, conectividad y atención cercana a las operaciones del cliente.",
    funciones: [
      "Administrar infraestructura de red, servidores y conectividad de campo.",
      "Gestionar altas de usuarios, respaldos periódicos y políticas preventivas.",
      "Brindar asistencia técnica ágil y presencial a los usuarios en las plantas."
    ],
    competencias: "Capacidad de resolución bajo presión, comunicación empática, enfoque de servicio.",
    herramientas: "Linux/Windows Server, Configuración de redes VPN/LAN, Helpdesk, Diagnóstico de hardware."
  }
};

function initOrganigramaModal() {
  const organNodes = document.querySelectorAll('.org-node-action');
  const modal = document.getElementById('role-detail-modal');
  const modalClose = document.getElementById('role-modal-close');
  const modalTitle = document.getElementById('role-modal-title');
  const modalArea = document.getElementById('role-modal-area');
  const modalDependencia = document.getElementById('role-modal-dependencia');
  const modalObjetivo = document.getElementById('role-modal-objetivo');
  const modalFunciones = document.getElementById('role-modal-funciones');
  const modalCompetencias = document.getElementById('role-modal-competencias');
  const modalHerramientas = document.getElementById('role-modal-herramientas');

  if (!modal || !organNodes.length) return;

  organNodes.forEach(node => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const roleKey = node.getAttribute('data-role');
      const data = ROLES_INFO[roleKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalArea.textContent = data.area;
      modalDependencia.textContent = "Dependencia: " + data.dependencia;
      modalObjetivo.textContent = data.objetivo;

      modalFunciones.innerHTML = '';
      data.funciones.forEach(fn => {
        const li = document.createElement('li');
        li.textContent = fn;
        modalFunciones.appendChild(li);
      });

      modalCompetencias.textContent = data.competencias;
      modalHerramientas.textContent = data.herramientas;

      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   3. FORMULARIO DE CONTACTO & AUDITORÍA DIGITAL
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre')?.value || 'estimado/a';
    const empresa = document.getElementById('empresa')?.value || 'su organización';
    const tipo = form.querySelector('input[name="tipo"]:checked')?.value || 'auditoria';

    let accionTexto = "la Auditoría de Madurez Digital";
    if (tipo === 'demo') accionTexto = "una demostración de la Plataforma SiTech AgroLogística";
    if (tipo === 'a-medida') accionTexto = "la reunión consultiva para Desarrollo a Medida";

    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:8px;">✓ ¡Solicitud enviada con éxito!</span>`;
      btn.style.backgroundColor = '#1B5E20';
      btn.style.color = '#FFFFFF';

      const alertBox = document.createElement('div');
      alertBox.className = 'form-success-banner';
      alertBox.innerHTML = `
        <div style="font-weight:600;margin-bottom:6px;font-size:16px;color:#1B5E20;">¡Gracias, ${nombre}!</div>
        <p style="margin:0;font-size:14px;color:#334155;line-height:1.5;">
          Hemos registrado tu solicitud para <strong>${empresa}</strong> sobre <strong>${accionTexto}</strong>.
          Un especialista de nuestro equipo en Tucumán te contactará a la brevedad.
        </p>
      `;

      form.appendChild(alertBox);

      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        alertBox.remove();
      }, 7000);
    }
  });
}
