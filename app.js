/* ============================================================
   PSICO-PEN | Sistema de Gestión Psicológica Penitenciaria
   app.js — Lógica Frontend Completa
   ============================================================ */

/* ─── Usuarios del sistema (simulado) ─── */
const USERS = [
    { user: 'admin',      pass: 'admin123',     name: 'Dr. Ricardo Flores A.',  role: 'Administrador General',  avatar: 'RF', area: 'Dirección' },
    { user: 'psicologa',  pass: 'psico2024',    name: 'Dra. Carmen Quispe V.',  role: 'Psicóloga Senior',       avatar: 'CQ', area: 'Psicología' },
    { user: 'director',   pass: 'director2024', name: 'Lic. Jorge Mamani H.',   role: 'Director Penitenciario', avatar: 'JM', area: 'Dirección' },
];

/* ─── Datos simulados ─── */
const DATA = {
    stats: {
        internos:      342,
        evaluaciones:   87,
        riesgoAlto:     23,
        rehabilitacion:156,
    },
    chartEvalMeses: [45, 52, 38, 63, 71, 58, 82, 79, 95, 87, 74, 68],
    chartRiesgo:    [23, 145, 174],
    chartRehabEvol: [120, 132, 141, 148, 152, 156],
    chartTiposEval: [38, 27, 15, 7],

    evaluaciones: [
        { id:'EVA-2024-342', interno:'Juan Carlos Mamani T.',   psicologo:'Dra. Carmen Quispe', fecha:'28/11/2024', tipo:'Eval. Inicial',  riesgo:'alto',    estado:'pendiente'  },
        { id:'EVA-2024-341', interno:'Pedro Álvarez Rojas',     psicologo:'Dr. Luis Vargas',    fecha:'27/11/2024', tipo:'Seguimiento',    riesgo:'medio',   estado:'completado' },
        { id:'EVA-2024-340', interno:'María Torres Chura',      psicologo:'Dra. Ana Flores',    fecha:'27/11/2024', tipo:'Eval. Inicial',  riesgo:'bajo',    estado:'en-proceso' },
        { id:'EVA-2024-339', interno:'Roberto Lima Condori',    psicologo:'Dr. Raúl Morales',   fecha:'26/11/2024', tipo:'Riesgo-IA',      riesgo:'critico', estado:'pendiente'  },
        { id:'EVA-2024-338', interno:'Gabriela Ponce Aguirre',  psicologo:'Dra. Carmen Quispe', fecha:'26/11/2024', tipo:'Seguimiento',    riesgo:'bajo',    estado:'completado' },
        { id:'EVA-2024-337', interno:'Daniel Salas Miranda',    psicologo:'Dr. Luis Vargas',    fecha:'25/11/2024', tipo:'Rehabilitación', riesgo:'medio',   estado:'en-proceso' },
        { id:'EVA-2024-336', interno:'Carmen Apaza Flores',     psicologo:'Dra. Ana Flores',    fecha:'25/11/2024', tipo:'Eval. Inicial',  riesgo:'alto',    estado:'completado' },
        { id:'EVA-2024-335', interno:'Francisco Ríos Chávez',   psicologo:'Dr. Raúl Morales',   fecha:'24/11/2024', tipo:'Seguimiento',    riesgo:'bajo',    estado:'completado' },
        { id:'EVA-2024-334', interno:'Lucía Mendoza Tarqui',    psicologo:'Dra. Carmen Quispe', fecha:'24/11/2024', tipo:'Riesgo-IA',      riesgo:'medio',   estado:'pendiente'  },
        { id:'EVA-2024-333', interno:'Hugo Cárdenas Véliz',     psicologo:'Dr. Luis Vargas',    fecha:'23/11/2024', tipo:'Rehabilitación', riesgo:'alto',    estado:'suspendido' },
        { id:'EVA-2024-332', interno:'Rosa Elena Ticona C.',    psicologo:'Dra. Ana Flores',    fecha:'23/11/2024', tipo:'Eval. Inicial',  riesgo:'bajo',    estado:'completado' },
        { id:'EVA-2024-331', interno:'Marcos Quiroga Ibáñez',   psicologo:'Dr. Raúl Morales',   fecha:'22/11/2024', tipo:'Seguimiento',    riesgo:'medio',   estado:'en-proceso' },
    ],

    actividades: [
        { icon:'fa-brain',          color:'#7c3aed', bg:'rgba(124,58,237,.12)',   title:'Análisis IA completado',           sub:'Interno Roberto Lima — Riesgo crítico detectado',  time:'hace 3 min'  },
        { icon:'fa-file-medical',   color:'#10b981', bg:'rgba(16,185,129,.12)',   title:'Nueva evaluación registrada',      sub:'Dra. Carmen Quispe — EVA-2024-342',                time:'hace 8 min'  },
        { icon:'fa-user-plus',      color:'#3b82f6', bg:'rgba(59,130,246,.12)',   title:'Nuevo interno ingresado',          sub:'Juan Carlos Mamani T. — Celda B-14',               time:'hace 15 min' },
        { icon:'fa-chart-line',     color:'#f59e0b', bg:'rgba(245,158,11,.12)',   title:'Reporte mensual generado',         sub:'Sistema IA — Noviembre 2024',                      time:'hace 30 min' },
        { icon:'fa-check-circle',   color:'#10b981', bg:'rgba(16,185,129,.12)',   title:'Alta de rehabilitación',           sub:'Gabriela Ponce A. — Período completado',           time:'hace 1 hora' },
        { icon:'fa-exclamation-circle', color:'#ef4444', bg:'rgba(239,68,68,.12)', title:'Alerta de riesgo elevado',       sub:'Sistema IA — 2 internos en zona roja',             time:'hace 2 horas'},
    ],

    iaMetrics: {
        prediccionReincidencia: 34,
        patronesDetectados: 8,
        analisisCompletados: 87,
        precisonModelo: 94.7,
        alertasActivas: 5,
        progresoRehab: 72,
    },
};

/* ================================================================
   LOGIN
   ================================================================ */
(function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    /* Generar partículas flotantes */
    const particleContainer = document.getElementById('particleContainer');
    if (particleContainer) {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 12 + 4;
            p.style.cssText = `
                width:${size}px; height:${size}px;
                left:${Math.random()*100}%;
                animation-duration:${Math.random()*18+10}s;
                animation-delay:${Math.random()*12}s;
                opacity:${Math.random()*.6+.1};
                border-radius:${Math.random()>0.5?'50%':'4px'};
            `;
            particleContainer.appendChild(p);
        }
    }

    /* Toggle password */
    const toggleBtn = document.getElementById('togglePassword');
    const passInput = document.getElementById('password');
    const eyeIcon   = document.getElementById('eyeIcon');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isPass = passInput.type === 'password';
            passInput.type = isPass ? 'text' : 'password';
            eyeIcon.className = isPass ? 'fas fa-eye-slash' : 'fas fa-eye';
        });
    }

    /* Validación en tiempo real */
    document.getElementById('username').addEventListener('input', function () {
        clearError('username', 'usernameError');
    });
    passInput.addEventListener('input', function () {
        clearError('password', 'passwordError');
    });

    /* Submit */
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = passInput.value.trim();

        let valid = true;
        if (!username) { showError('username', 'usernameError'); valid = false; }
        if (!password) { showError('password', 'passwordError'); valid = false; }
        if (!valid) return;

        const btn  = document.getElementById('loginBtn');
        const text = btn.querySelector('.btn-text');
        const load = btn.querySelector('.btn-loading');
        btn.disabled = true;
        text.classList.add('d-none');
        load.classList.remove('d-none');

        setTimeout(() => {
            const found = USERS.find(u => u.user === username && u.pass === password);
            btn.disabled = false;
            text.classList.remove('d-none');
            load.classList.add('d-none');

            if (found) {
                sessionStorage.setItem('psicopen_user', JSON.stringify(found));
                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    html: `<b>${found.name}</b><br><small>${found.role}</small>`,
                    showConfirmButton: false,
                    timer: 1800,
                    background: '#0f1d35',
                    color: '#e2e8f0',
                    iconColor: '#10b981',
                }).then(() => { window.location.href = 'dashboard.html'; });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Acceso Denegado',
                    html: 'Credenciales incorrectas.<br><small>Intente nuevamente o contacte al administrador.</small>',
                    confirmButtonText: 'Reintentar',
                    confirmButtonColor: '#0077b6',
                    background: '#0f1d35',
                    color: '#e2e8f0',
                    iconColor: '#ef4444',
                });
                document.getElementById('username').classList.add('is-invalid');
                passInput.classList.add('is-invalid');
            }
        }, 1600);
    });

    function showError(inputId, errorId) {
        document.getElementById(inputId).classList.add('is-invalid');
        document.getElementById(errorId).classList.add('show');
    }
    function clearError(inputId, errorId) {
        document.getElementById(inputId).classList.remove('is-invalid');
        document.getElementById(errorId).classList.remove('show');
    }
})();

/* ================================================================
   DASHBOARD
   ================================================================ */
(function initDashboard() {
    const dashBody = document.getElementById('dashboardBody');
    if (!dashBody) return;

    /* Cargar usuario de sesión */
    let currentUser = USERS[0];
    try {
        const stored = sessionStorage.getItem('psicopen_user');
        if (stored) currentUser = JSON.parse(stored);
    } catch (_) {}

    /* Actualizar UI con datos del usuario */
    setAll('[data-user-name]',   currentUser.name);
    setAll('[data-user-role]',   currentUser.role);
    setAll('[data-user-avatar]', currentUser.avatar);

    function setAll(selector, value) {
        document.querySelectorAll(selector).forEach(el => {
            if (el.tagName === 'IMG') el.alt = value;
            else el.textContent = value;
        });
    }

    /* ─── Sidebar toggle (escritorio) ─── */
    const sidebar     = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn   = document.getElementById('sidebarToggle');
    const overlay     = document.getElementById('sidebarOverlay');

    function isMobile() { return window.innerWidth <= 992; }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (isMobile()) {
                sidebar.classList.toggle('mobile-open');
                overlay.classList.toggle('show');
            } else {
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
            }
        });
    }
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('show');
        });
    }

    /* ─── Navegación entre secciones ─── */
    const navLinks = document.querySelectorAll('[data-section]');
    const sections = document.querySelectorAll('.content-section');
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    const breadcrumbSub   = document.getElementById('breadcrumbSub');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.dataset.section;
            const title  = this.dataset.title  || 'Panel de Control';
            const sub    = this.dataset.sub    || 'Resumen general del sistema';

            /* Desactivar todos */
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            /* Activar seleccionado */
            this.classList.add('active');
            const section = document.getElementById('sec-' + target);
            if (section) section.classList.add('active');

            if (breadcrumbTitle) breadcrumbTitle.textContent = title;
            if (breadcrumbSub)   breadcrumbSub.textContent   = sub;

            /* Cerrar sidebar en móvil */
            if (isMobile()) {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('show');
            }
        });
    });

    /* ─── Submenús del sidebar ─── */
    document.querySelectorAll('.sidebar-submenu-toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const target   = document.getElementById(targetId);
            if (!target) return;
            const isOpen   = target.classList.contains('show');
            /* Cerrar todos */
            document.querySelectorAll('.sidebar-collapse').forEach(c => c.classList.remove('show'));
            document.querySelectorAll('.sidebar-submenu-toggle').forEach(b => b.setAttribute('aria-expanded','false'));
            if (!isOpen) {
                target.classList.add('show');
                this.setAttribute('aria-expanded','true');
            }
        });
    });

    /* ─── Cerrar sesión ─── */
    document.querySelectorAll('[data-action="logout"]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            Swal.fire({
                icon: 'question',
                title: '¿Cerrar sesión?',
                text: 'Se cerrará su sesión en el sistema.',
                showCancelButton: true,
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#ef4444',
                cancelButtonColor:  '#64748b',
            }).then(r => {
                if (r.isConfirmed) {
                    sessionStorage.removeItem('psicopen_user');
                    window.location.href = 'index.html';
                }
            });
        });
    });

    /* ─── Inicializar contadores animados ─── */
    function animateCounter(el, target, duration = 1500) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { start = target; clearInterval(timer); }
            el.textContent = Math.floor(start).toLocaleString('es-BO');
        }, 16);
    }

    document.querySelectorAll('[data-counter]').forEach(el => {
        const target = parseInt(el.dataset.counter);
        setTimeout(() => animateCounter(el, target), 400);
    });

    /* ─── Barras de progreso IA (animadas) ─── */
    setTimeout(() => {
        document.querySelectorAll('.progress-mini-fill[data-width]').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
        });
    }, 600);

    /* ─── Charts ─── */
    initCharts();

    /* ─── DataTable ─── */
    initDataTable();

    /* ─── AOS ─── */
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic', offset: 20 });
    }

    /* ─── Reloj navbar ─── */
    const clockEl = document.getElementById('navClock');
    function updateClock() {
        if (!clockEl) return;
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString('es-BO', { hour:'2-digit', minute:'2-digit' });
    }
    updateClock();
    setInterval(updateClock, 30000);

})();

/* ─── Charts ─── */
function initCharts() {
    Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";
    Chart.defaults.font.size   = 12;
    Chart.defaults.color       = '#64748b';

    /* Chart 1: Evaluaciones por mes */
    const ctxBar = document.getElementById('chartEvalMeses');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
                datasets: [{
                    label: 'Evaluaciones 2024',
                    data: DATA.chartEvalMeses,
                    backgroundColor: DATA.chartEvalMeses.map((v,i) =>
                        i === 10 ? 'rgba(0,151,178,.9)' : 'rgba(30,58,95,.7)'),
                    borderRadius: 6,
                    borderSkipped: false,
                }],
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { backgroundColor:'#0f1d35', titleColor:'#00d4ff', bodyColor:'#e2e8f0', cornerRadius:8, padding:10 } },
                scales: {
                    x: { grid: { display: false }, border: { display: false } },
                    y: { grid: { color: 'rgba(0,0,0,.05)' }, border: { display: false }, beginAtZero: true, ticks: { stepSize: 20 } },
                },
            },
        });
    }

    /* Chart 2: Distribución de Riesgo */
    const ctxDona = document.getElementById('chartRiesgo');
    if (ctxDona) {
        new Chart(ctxDona, {
            type: 'doughnut',
            data: {
                labels: ['Alto','Medio','Bajo'],
                datasets: [{
                    data: DATA.chartRiesgo,
                    backgroundColor: ['#ef4444','#f59e0b','#10b981'],
                    borderWidth: 0,
                    hoverOffset: 8,
                }],
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10 },
                    },
                    tooltip: { backgroundColor:'#0f1d35', titleColor:'#00d4ff', bodyColor:'#e2e8f0', cornerRadius:8, padding:10 },
                },
            },
        });
    }

    /* Chart 3: Evolución Rehabilitación */
    const ctxLine = document.getElementById('chartRehabEvol');
    if (ctxLine) {
        const gradient = ctxLine.getContext('2d').createLinearGradient(0,0,0,220);
        gradient.addColorStop(0, 'rgba(16,185,129,.35)');
        gradient.addColorStop(1, 'rgba(16,185,129,.00)');
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['Jun','Jul','Ago','Sep','Oct','Nov'],
                datasets: [{
                    label: 'Internos en Rehabilitación',
                    data: DATA.chartRehabEvol,
                    borderColor: '#10b981',
                    backgroundColor: gradient,
                    fill: true,
                    tension: .4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#10b981',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                }],
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { backgroundColor:'#0f1d35', titleColor:'#10b981', bodyColor:'#e2e8f0', cornerRadius:8, padding:10 } },
                scales: {
                    x: { grid: { display: false }, border: { display: false } },
                    y: { grid: { color: 'rgba(0,0,0,.05)' }, border: { display: false }, beginAtZero: false, min: 100 },
                },
            },
        });
    }

    /* Chart 4: Tipos de evaluación (horizontal bar) */
    const ctxTipos = document.getElementById('chartTiposEval');
    if (ctxTipos) {
        new Chart(ctxTipos, {
            type: 'bar',
            data: {
                labels: ['Eval. Inicial', 'Seguimiento', 'Rehabilitación', 'Riesgo-IA'],
                datasets: [{
                    label: 'Cantidad',
                    data: DATA.chartTiposEval,
                    backgroundColor: ['rgba(59,130,246,.75)','rgba(124,58,237,.75)','rgba(16,185,129,.75)','rgba(239,68,68,.75)'],
                    borderRadius: 6,
                    borderSkipped: false,
                }],
            },
            options: {
                indexAxis: 'y',
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { backgroundColor:'#0f1d35', titleColor:'#00d4ff', bodyColor:'#e2e8f0', cornerRadius:8, padding:10 } },
                scales: {
                    x: { grid: { color:'rgba(0,0,0,.05)' }, border:{ display:false }, beginAtZero:true },
                    y: { grid: { display:false }, border:{ display:false } },
                },
            },
        });
    }
}

/* ─── DataTable ─── */
function initDataTable() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    const riskLabels   = { alto:'<span class="risk-badge alto"><i class="fas fa-circle-dot"></i>Alto</span>', medio:'<span class="risk-badge medio"><i class="fas fa-circle-dot"></i>Medio</span>', bajo:'<span class="risk-badge bajo"><i class="fas fa-circle-dot"></i>Bajo</span>', critico:'<span class="risk-badge critico"><i class="fas fa-triangle-exclamation"></i>Crítico</span>' };
    const estadoLabels = { pendiente:'<span class="estado-badge pendiente">Pendiente</span>', completado:'<span class="estado-badge completado">Completado</span>', 'en-proceso':'<span class="estado-badge en-proceso">En Proceso</span>', suspendido:'<span class="estado-badge suspendido">Suspendido</span>' };

    DATA.evaluaciones.forEach(ev => {
        tableBody.insertAdjacentHTML('beforeend', `
        <tr>
            <td class="fw-600 text-accent" style="font-family:monospace;font-size:.78rem">${ev.id}</td>
            <td><div style="font-weight:600;font-size:.84rem">${ev.interno}</div></td>
            <td style="font-size:.82rem">${ev.psicologo}</td>
            <td style="font-size:.82rem">${ev.fecha}</td>
            <td style="font-size:.80rem">${ev.tipo}</td>
            <td>${riskLabels[ev.riesgo] || ev.riesgo}</td>
            <td>${estadoLabels[ev.estado] || ev.estado}</td>
            <td>
                <div class="action-btns d-flex gap-1">
                    <button class="btn-view" title="Ver detalle" onclick="verDetalle('${ev.id}')"><i class="fas fa-eye"></i></button>
                    <button class="btn-edit" title="Editar" onclick="editarRegistro('${ev.id}')"><i class="fas fa-pen"></i></button>
                    <button class="btn-del"  title="Eliminar" onclick="eliminarRegistro('${ev.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`);
    });

    if (typeof $ !== 'undefined' && $.fn && $.fn.DataTable) {
        $('#tablaEvaluaciones').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
            },
            pageLength: 7,
            lengthMenu: [5, 7, 10, 25, 50],
            order: [[0,'desc']],
            dom: "<'row mb-3'<'col-sm-6'l><'col-sm-6 d-flex justify-content-end'f>>" +
                 "<'row'<'col-12'tr>>" +
                 "<'row mt-3'<'col-sm-5'i><'col-sm-7 d-flex justify-content-end'p>>",
            responsive: true,
        });
    }
}

/* ─── Acciones de tabla (globales) ─── */
function verDetalle(id) {
    const ev = DATA.evaluaciones.find(e => e.id === id);
    if (!ev) return;
    Swal.fire({
        title: `<span style="font-size:1rem;color:#0097b2">${ev.id}</span>`,
        html: `
        <div style="text-align:left;font-size:.88rem;line-height:2">
            <b>Interno:</b> ${ev.interno}<br>
            <b>Psicólogo:</b> ${ev.psicologo}<br>
            <b>Fecha:</b> ${ev.fecha}<br>
            <b>Tipo:</b> ${ev.tipo}<br>
            <b>Riesgo:</b> ${ev.riesgo.toUpperCase()}<br>
            <b>Estado:</b> ${ev.estado.replace('-',' ').toUpperCase()}
        </div>`,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#1e3a5f',
        width: 480,
    });
}

function editarRegistro(id) {
    Swal.fire({
        icon: 'info',
        title: 'Editar Evaluación',
        text: `Módulo de edición para ${id} en construcción.`,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#10b981',
    });
}

function eliminarRegistro(id) {
    Swal.fire({
        icon: 'warning',
        title: '¿Eliminar registro?',
        html: `Se eliminará permanentemente <b>${id}</b>.`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
    }).then(r => {
        if (r.isConfirmed) {
            Swal.fire({ icon:'success', title:'Eliminado', text:'El registro fue eliminado.', timer:1500, showConfirmButton:false });
        }
    });
}

function guardarFormulario(tipo) {
    Swal.fire({
        icon: 'success',
        title: '¡Guardado!',
        text: `El ${tipo} fue registrado exitosamente.`,
        timer: 2000,
        showConfirmButton: false,
        iconColor: '#10b981',
    });
}

function generarReporte(tipo) {
    Swal.fire({
        title: 'Generando Reporte...',
        html: `<div class="text-center"><div class="spinner-border text-primary mb-2"></div><br><small>${tipo}</small></div>`,
        showConfirmButton: false,
        timer: 2200,
        didClose: () => {
            Swal.fire({ icon:'success', title:'Reporte Generado', text:'El reporte fue generado exitosamente.', confirmButtonColor:'#1e3a5f' });
        },
    });
}
