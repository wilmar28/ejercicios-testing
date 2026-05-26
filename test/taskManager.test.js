const TaskManager = require('../src/taskManager');

describe('TaskManager', () => {

  let manager;

  beforeEach(() => {
    manager = new TaskManager();
  });

  test('una tarea nueva inicia incompleta', () => {
    const task = manager.addTask('Estudiar');

    expect(task.completed).toBe(false);
  });

  test('addTask aumenta tareas', () => {
    manager.addTask('Tarea 1');

    expect(manager.getAll().length).toBe(1);
  });

  test('completeTask cambia estado', () => {
    const task = manager.addTask('Node');

    manager.completeTask(task.id);

    expect(manager.getCompleted().length).toBe(1);
  });

  test('removeTask elimina tarea', () => {
    const task = manager.addTask('Eliminar');

    manager.removeTask(task.id);

    expect(manager.getAll().length).toBe(0);
  });

  test('getPending solo pendientes', () => {
    manager.addTask('A');

    const task2 = manager.addTask('B');

    manager.completeTask(task2.id);

    expect(manager.getPending().length).toBe(1);
  });

  test('id inválido lanza error', () => {
    expect(() => manager.completeTask(99))
      .toThrow(Error);
  });

  test('title vacío lanza error', () => {
    expect(() => manager.addTask(''))
      .toThrow(Error);
  });

});