/**
 * SiTech - Plataforma & Landing Institucional
 * Lógica interactiva para Barra Flotante Dinámica, Navegación, Organigrama, 
 * Formulario de Contacto B2B, Animaciones de Métricas y Scroll Reveal Bidireccional
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initHeaderScroll();
    initOrganigramaModal();
    initContactForm();
    initScrollAnimations();
    initStatCounters();
    initStrategyCounters();
});

/* ==========================================================================
   1. ANIMACIÓN DE BARRA SUPERIOR DINÁMICA AL HACER SCROLL
   ========================================================================== */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ==========================================================================
   2. NAVEGACIÓN MÓVIL Y SCROLL SUAVE
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
   3. EXPLORADOR INTERACTIVO DE PUESTOS DEL ORGANIGRAMA
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
   4. FORMULARIO DE CONTACTO B2B CON RETROALIMENTACIÓN FLUIDA
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('main-contact-form');
    const successScreen = document.getElementById('contact-success-state');
    const resetBtn = document.getElementById('btn-reset-form');
    const submitBtn = document.getElementById('btn-submit-contact');
    const radioCards = document.querySelectorAll('.request-selector-card');

    if (!form) return;

    radioCards.forEach(card => {
        card.addEventListener('click', () => {
            radioCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre')?.value || 'Estimado/a';
        const empresa = document.getElementById('empresa')?.value || 'su establecimiento';
        const email = document.getElementById('email')?.value || 'su correo institucional';
        const tipoSeleccionado = form.querySelector('input[name="tipo"]:checked')?.value || 'auditoria';

        let tipoNombre = "Auditoría de Madurez Digital";
        if (tipoSeleccionado === 'demo') tipoNombre = "Demostración de Plataforma";
        if (tipoSeleccionado === 'a-medida') tipoNombre = "Proyecto a Medida";

        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = "Procesando solicitud...";

        setTimeout(() => {
            submitBtn.classList.remove('is-loading');
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = "Enviar Solicitud al Equipo SiTech";

            const msgEl = document.getElementById('success-dynamic-message');
            const emailEl = document.getElementById('success-client-email');

            if (msgEl) {
                msgEl.innerHTML = `Gracias <strong>${nombre}</strong>. Hemos registrado la solicitud de <strong>${tipoNombre}</strong> para <strong>${empresa}</strong>. Un especialista técnico se contactará en las próximas 24 horas hábiles.`;
            }

            if (emailEl) {
                emailEl.textContent = email;
            }

            form.style.display = 'none';
            if (successScreen) {
                successScreen.style.display = 'block';
            }
        }, 1100);
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            radioCards.forEach((c, idx) => {
                if (idx === 0) c.classList.add('active');
                else c.classList.remove('active');
            });

            if (successScreen) successScreen.style.display = 'none';
            form.style.display = 'block';
        });
    }
}

/* ==========================================================================
   5. APARICIÓN Y DESAPARICIÓN GRADUAL BIDIRECCIONAL (HERO Y SECCIONES)
   ========================================================================== */
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(`
        .hero-grid > div:first-child,
        .stat-strip,
        .section-head,
        .agro-identity-container,
        .contrast-row,
        .about-box,
        .strategy-card,
        .offering-block,
        .service-card-modular,
        .org-chart-wrapper,
        .contact-layout
    `);

    elementsToAnimate.forEach(el => el.classList.add("reveal-on-scroll"));

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                // Al entrar en pantalla aparece gradualmente
                el.classList.add("is-visible");
                el.classList.remove("exit-top");
            } else {
                // Al salir de pantalla se desvanece gradualmente
                el.classList.remove("is-visible");
                if (entry.boundingClientRect.top < 60) {
                    // Salió por arriba al scrollear hacia abajo
                    el.classList.add("exit-top");
                } else {
                    // Salió por abajo al scrollear hacia arriba
                    el.classList.remove("exit-top");
                }
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "-60px 0px -60px 0px" // Activa el desvanecimiento visible antes de tocar el navbar
    });

    elementsToAnimate.forEach(el => scrollObserver.observe(el));
}

/* ==========================================================================
   6. CONTADOR ANIMADO ESTABLE PARA EL HERO (STAT-STRIP)
   ========================================================================== */
function initStatCounters() {
    const statStrip = document.querySelector(".stat-strip");
    if (!statStrip) return;

    let animated = false;

    const statsData = [
        { target: 18500, prefix: "", suffix: "+", formatCommas: true },
        { target: -32, prefix: "−", suffix: "%", formatCommas: false },
        { target: 100, prefix: "", suffix: "%", formatCommas: false },
        { target: 10, prefix: "", suffix: "+", formatCommas: false }
    ];

    const numElements = statStrip.querySelectorAll(".num");

    const statObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;

            numElements.forEach((el, index) => {
                const conf = statsData[index];
                if (!conf) return;

                const duration = 1400;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentVal = Math.round(conf.target * easeOut);

                    let formattedVal = Math.abs(currentVal).toString();
                    if (conf.formatCommas && Math.abs(currentVal) >= 1000) {
                        formattedVal = formattedVal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    }

                    el.textContent = `${conf.prefix}${formattedVal}${conf.suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        let finalVal = Math.abs(conf.target).toString();
                        if (conf.formatCommas && Math.abs(conf.target) >= 1000) {
                            finalVal = finalVal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        }
                        el.textContent = `${conf.prefix}${finalVal}${conf.suffix}`;
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }, { threshold: 0.25 });

    statObserver.observe(statStrip);
}

/* ==========================================================================
   7. CONTADOR ANIMADO ESTABLE PARA OBJETIVOS ESTRATÉGICOS
   ========================================================================== */
function initStrategyCounters() {
    const stratMetrics = document.querySelectorAll('.strat-metric');
    if (!stratMetrics.length) return;

    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                const prefix = el.getAttribute('data-prefix') || '';
                const suffix = el.getAttribute('data-suffix') || '';

                if (isNaN(target)) return;

                const duration = 1300;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);

                    el.textContent = `${prefix}${current}${suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = `${prefix}${target}${suffix}`;
                    }
                }

                requestAnimationFrame(updateCount);
            }
        });
    }, { threshold: 0.25 });

    stratMetrics.forEach(metric => metricObserver.observe(metric));
}