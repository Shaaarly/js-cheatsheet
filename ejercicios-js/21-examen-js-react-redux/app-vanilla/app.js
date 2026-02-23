/**
 * App lista de tareas — JavaScript base (examen).
 * Estado: tasks[], loading, error, filter.
 * Acciones: cargar desde API, añadir, marcar completada, borrar, filtrar.
 * Objetivo: migrar a React (~1h) y luego a Redux (~1h).
 */

const state = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all' // 'all' | 'active' | 'completed'
};

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

function getFilteredTasks() {
  if (state.filter === 'active') return state.tasks.filter((t) => !t.completed);
  if (state.filter === 'completed') return state.tasks.filter((t) => t.completed);
  return state.tasks;
}

function render() {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const listEl = document.getElementById('task-list');

  if (state.loading) {
    loadingEl.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div><p class="mt-2 text-muted">Cargando tareas...</p>';
    loadingEl.classList.remove('d-none');
  } else {
    loadingEl.classList.add('d-none');
    loadingEl.innerHTML = '';
  }

  if (state.error) {
    errorEl.textContent = 'Error: ' + state.error;
    errorEl.classList.remove('d-none');
  } else {
    errorEl.classList.add('d-none');
  }

  const filtered = getFilteredTasks();
  listEl.innerHTML = filtered
    .map(
      (t) => `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${t.id}">
      <label class="d-flex align-items-center gap-2 mb-0 flex-grow-1">
        <input type="checkbox" class="form-check-input task-toggle" data-id="${t.id}" ${t.completed ? 'checked' : ''} />
        <span class="${t.completed ? 'text-decoration-line-through text-muted' : ''}">${escapeHtml(t.text)}</span>
      </label>
      <button type="button" class="btn btn-sm btn-outline-danger task-delete" data-id="${t.id}">Borrar</button>
    </li>
  `
    )
    .join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function loadTasks() {
  state.loading = true;
  state.error = null;
  render();
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    state.tasks = data.map((t) => ({
      id: t.id,
      text: t.title,
      completed: t.completed
    }));
  } catch (e) {
    state.error = e.message;
  }
  state.loading = false;
  render();
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  state.tasks.push({
    id: Date.now(),
    text: trimmed,
    completed: false
  });
  render();
}

function toggleTask(id) {
  const task = state.tasks.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
  render();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);
  render();
}

function setFilter(filter) {
  state.filter = filter;
  render();
  document.querySelectorAll('#filter-buttons [data-filter]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

function init() {
  document.getElementById('form-add').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('input-text');
    addTask(input.value);
    input.value = '';
  });

  document.getElementById('filter-buttons').addEventListener('click', (e) => {
    const filter = e.target.dataset.filter;
    if (filter) setFilter(filter);
  });

  document.getElementById('task-list').addEventListener('click', (e) => {
    const id = Number(e.target.closest('[data-id]')?.dataset.id);
    if (e.target.classList.contains('task-toggle')) toggleTask(id);
    if (e.target.classList.contains('task-delete')) deleteTask(id);
  });

  loadTasks();
}

init();
