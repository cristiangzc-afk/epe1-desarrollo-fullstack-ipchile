// ============================================================
// RutaControl · EPE1 Desarrollo Full Stack
// Toda la información es temporal y vive mientras la página está abierta.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Interacción 01: actualización de estado mediante evento click.
  const confirmDispatchBtn = document.querySelector('#confirmDispatchBtn');
  const dispatchStatus = document.querySelector('#dispatchStatus');
  const dispatchMessage = document.querySelector('#dispatchMessage');
  confirmDispatchBtn.addEventListener('click', () => {
    dispatchStatus.textContent = 'En ruta';
    dispatchStatus.classList.remove('badge-waiting');
    dispatchStatus.classList.add('badge-success');
    dispatchMessage.textContent = `Salida confirmada a las ${new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}.`;
    confirmDispatchBtn.textContent = 'Salida confirmada ✓';
    confirmDispatchBtn.disabled = true;
    document.querySelector('#interaccion-01').dataset.complete = 'true';
  });

  // Interacción 02: booleano y clase CSS para representar contingencia.
  const modeToggle = document.querySelector('#modeToggle');
  const modePill = document.querySelector('#modePill');
  const modeLabel = document.querySelector('#modeLabel');
  modeToggle.addEventListener('click', () => {
    const contingencyActive = modeToggle.getAttribute('aria-checked') !== 'true';
    modeToggle.setAttribute('aria-checked', String(contingencyActive));
    modePill.textContent = contingencyActive ? 'Contingencia' : 'Modo normal';
    modeLabel.textContent = contingencyActive ? 'Atención reforzada activa' : 'Operación estable';
    document.querySelector('#interaccion-02').classList.toggle('contingency', contingencyActive);
  });

  // Interacción 03: variable numérica y renderizado del contador operativo.
  let processedPackages = 24;
  const packageCount = document.querySelector('#packageCount');
  const renderPackageCount = () => { packageCount.textContent = processedPackages; };
  document.querySelector('#increasePackageBtn').addEventListener('click', () => { processedPackages += 1; renderPackageCount(); });
  document.querySelector('#decreasePackageBtn').addEventListener('click', () => { processedPackages = Math.max(0, processedPackages - 1); renderPackageCount(); });

  // Interacción 04: mostrar/ocultar detalle y cambiar el texto de la acción.
  const detailToggle = document.querySelector('#detailToggle');
  const incidentDetail = document.querySelector('#incidentDetail');
  detailToggle.addEventListener('click', () => {
    const isHidden = incidentDetail.hidden;
    incidentDetail.hidden = !isHidden;
    detailToggle.setAttribute('aria-expanded', String(isHidden));
    detailToggle.innerHTML = isHidden ? 'Ocultar detalle <span>↑</span>' : 'Ver detalle <span>↓</span>';
  });

  // Interacción 05: input, vista previa inmediata, limpieza y conteo.
  const driverNote = document.querySelector('#driverNote');
  const notePreview = document.querySelector('#notePreview');
  const noteCount = document.querySelector('#noteCount');
  const renderNote = () => {
    const text = driverNote.value.trim();
    notePreview.textContent = text || 'Tu instrucción aparecerá aquí.';
    noteCount.textContent = `${driverNote.value.length} / 120`;
  };
  driverNote.addEventListener('input', renderNote);
  document.querySelector('#clearNoteBtn').addEventListener('click', () => { driverNote.value = ''; renderNote(); driverNote.focus(); });

  // Interacción 06: select + número convertido explícitamente + cálculo.
  const vehicleSelect = document.querySelector('#vehicleSelect');
  const packageInput = document.querySelector('#packageInput');
  const loadResult = document.querySelector('#loadResult');
  const loadFormula = document.querySelector('#loadFormula');
  const calculateLoad = () => {
    const kilogramsPerPackage = Number(vehicleSelect.value);
    const packages = Number(packageInput.value);
    const totalLoad = kilogramsPerPackage * packages;
    loadResult.textContent = `${totalLoad.toFixed(1)} kg`;
    loadFormula.textContent = kilogramsPerPackage && packages >= 0 ? `${packages} paquetes × ${kilogramsPerPackage} kg = ${totalLoad.toFixed(1)} kg estimados` : 'Completa los datos para ver el cálculo.';
  };
  vehicleSelect.addEventListener('change', calculateLoad);
  packageInput.addEventListener('input', calculateLoad);

  // Interacción 07: range que sincroniza porcentaje, texto y barra visual.
  const routeProgress = document.querySelector('#routeProgress');
  const progressValue = document.querySelector('#progressValue');
  const progressBar = document.querySelector('#progressBar');
  const progressStatus = document.querySelector('#progressStatus');
  const renderProgress = () => {
    const percentage = Number(routeProgress.value);
    progressValue.textContent = `${percentage}%`;
    progressBar.style.width = `${percentage}%`;
    progressStatus.textContent = percentage >= 90 ? 'Capacidad crítica' : percentage >= 70 ? 'Carga elevada' : 'Operación óptima';
  };
  routeProgress.addEventListener('input', renderProgress);

  // Interacción 08: creación y eliminación de nodos <li> sin recargar.
  const taskInput = document.querySelector('#taskInput');
  const taskList = document.querySelector('#taskList');
  const taskTotal = document.querySelector('#taskTotal');
  const updateTaskTotal = () => { taskTotal.textContent = `${taskList.children.length} ${taskList.children.length === 1 ? 'pendiente' : 'pendientes'}`; };
  const createTaskNode = (taskText) => {
    const listItem = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = taskText;
    const removeButton = document.createElement('button');
    removeButton.type = 'button'; removeButton.className = 'remove-task'; removeButton.setAttribute('aria-label', `Eliminar tarea ${taskText}`); removeButton.textContent = '×';
    removeButton.addEventListener('click', () => { listItem.remove(); updateTaskTotal(); });
    listItem.append(text, removeButton);
    return listItem;
  };
  document.querySelector('#addTaskBtn').addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (!taskText) { taskInput.focus(); return; }
    taskList.append(createTaskNode(taskText)); taskInput.value = ''; updateTaskTotal(); taskInput.focus();
  });
  taskInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); document.querySelector('#addTaskBtn').click(); } });
  taskList.querySelectorAll('.remove-task').forEach((button) => button.addEventListener('click', () => { button.closest('li').remove(); updateTaskTotal(); }));

  // Interacción 09: filtro de colección mediante data-status.
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceItems = document.querySelectorAll('.service-item');
  const filterCount = document.querySelector('#filterCount');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    let visibleServices = 0;
    serviceItems.forEach((item) => {
      const visible = selectedFilter === 'todos' || item.dataset.status === selectedFilter;
      item.hidden = !visible; if (visible) visibleServices += 1;
    });
    filterCount.textContent = `${visibleServices} ${visibleServices === 1 ? 'servicio' : 'servicios'}`;
  }));

  // Interacción 10: validación, preventDefault y feedback en la interfaz.
  const incidentForm = document.querySelector('#incidentForm');
  incidentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = [
      { input: document.querySelector('#routeCode'), error: document.querySelector('#routeCodeError'), message: 'Ingresa el código de ruta.' },
      { input: document.querySelector('#incidentType'), error: document.querySelector('#incidentTypeError'), message: 'Selecciona un tipo de incidencia.' },
      { input: document.querySelector('#incidentDescription'), error: document.querySelector('#incidentDescriptionError'), message: 'Describe brevemente la incidencia.' },
    ];
    let isValid = true;
    fields.forEach(({ input, error, message }) => { error.textContent = ''; input.removeAttribute('aria-invalid'); if (!input.value.trim()) { error.textContent = message; input.setAttribute('aria-invalid', 'true'); isValid = false; } });
    const feedback = document.querySelector('#formFeedback');
    feedback.className = 'form-feedback';
    if (!isValid) { feedback.textContent = 'Revisa los campos marcados antes de guardar.'; feedback.classList.add('error'); return; }
    feedback.textContent = `Incidencia registrada para ${fields[0].input.value.trim().toUpperCase()}.`; feedback.classList.add('success'); incidentForm.reset();
  });
});
