const { getTasks, moveTask, createTask, deleteTask, downloadFile, getTasksByAuthor, authorsList } = require('../../src/controllers');

const spy = jest.fn();

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: spy,
        post: spy,
        delete: spy,
      };
    },
  };
});

describe('router', () => {
  require('../../src/router.js');

  test('should use getTasks controller when "/tasks" is triggered', () => {
    expect(spy).toHaveBeenNthCalledWith(1, '/tasks', getTasks);
  });
  test('should use getTasksByAuthor controller when "/getTasksByAuthor" is triggered', () => {
    expect(spy).toHaveBeenNthCalledWith(2, '/tasks/:author', getTasksByAuthor);
  });
  test('should use moveTask controller when "/moveTask/:id/:toTask" is triggered', () => {
    expect(spy).toHaveBeenNthCalledWith(3, '/moveTask/:id/:toTask', moveTask);
  });
  test('should use moveTask controller when "/moveTask/:id/:toTask" is triggered', () => {
    expect(spy).toHaveBeenNthCalledWith(4, '/authorsList', authorsList);
  });
  test('should use createTask controller when "/createTask" is triggered', () => {
    expect(spy).toHaveBeenNthCalledWith(5, '/createTask', createTask);
  });
  test('should use deleteTask controller when "/deleteTask" is triggered', () => {
    expect(spy).toHaveBeenNthCalledWith(6, '/deleteTask', deleteTask);
  });
  test('should use downloadFile controller when "/downloadFile" is triggered', () => {
    expect(spy).toHaveBeenNthCalledWith(7, '/downloadFile', downloadFile);
  });
  test('should call methods 6 times', () => {
    expect(spy).toHaveBeenCalledTimes(7);
  });
});
