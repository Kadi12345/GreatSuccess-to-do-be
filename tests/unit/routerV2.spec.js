const { getTasks, moveTask, createTask, deleteTask, downloadFile, getTasksByAuthor, authorsList } = require('../../src/controllers');

const getSpy = jest.fn();
const postSpy = jest.fn();
const deleteSpy = jest.fn();

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: postSpy,
        delete: deleteSpy,
      };
    },
  };
});

describe('router', () => {
  require('../../src/router.js');

  test('should use getTasks controller when "/tasks" is triggered', () => {
    expect(getSpy).toHaveBeenNthCalledWith(1, '/tasks', getTasks);
  });
  test('should use getTasksByAuthor controller when "/getTasksByAuthor" is triggered', () => {
    expect(getSpy).toHaveBeenNthCalledWith(2, '/tasks/:author', getTasksByAuthor);
  });
  test('should use moveTask controller when "/moveTask/:id/:toTask" is triggered', () => {
    expect(getSpy).toHaveBeenNthCalledWith(3, '/moveTask/:id/:toTask', moveTask);
  });
  test('should use authorsList controller when "/authorsList" is triggered', () => {
    expect(getSpy).toHaveBeenNthCalledWith(4, '/authorsList', authorsList);
  });
  test('should use createTask controller when "/createTask" is triggered', () => {
    expect(postSpy).toHaveBeenNthCalledWith(1, '/createTask', createTask);
  });
  test('should use downloadFile controller when "/downloadFile" is triggered', () => {
    expect(postSpy).toHaveBeenNthCalledWith(2, '/downloadFile', downloadFile);
  });
  test('should use deleteTask controller when "/deleteTask" is triggered', () => {
    expect(deleteSpy).toHaveBeenNthCalledWith(1, '/deleteTask', deleteTask);
  });
  test('should call GET method 4 times', () => {
    expect(getSpy).toHaveBeenCalledTimes(4);
  });
  test('should call POST method 2 times', () => {
    expect(postSpy).toHaveBeenCalledTimes(2);
  });
  test('should call DELETE method 1 time', () => {
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });
});
