const ActionTypes = {
  LOAD_SCRIPTS: 0,
  REGISTER_FUNCTION: 1,
  CALL_FUNCTION: 2
};

const LocalFunctions = {};

self.addEventListener('message', ({ data }) => {
  let resolve = (parameter) => postMessage({
    id: data.id,
    resolved: true,
    parameter
  });
  let reject = (parameter) => postMessage({
    id: data.id,
    parameter
  });
  switch (data.action) {
    case ActionTypes.LOAD_SCRIPTS:
      try{
        data.scripts.map((script) => importScripts(script));
        resolve();
      } catch (e) {
        console.warn('@ LOAD_SCRIPTS', e);
        reject(e.stack);
      }
      break;
    case ActionTypes.REGISTER_FUNCTION:
      try {
        LocalFunctions[data.key] = data.fn;
        resolve();
      } catch (e) {
        console.warn('@ REGISTER_FUNCTION', e);
        reject(e.stack);
      }
      break;
    case ActionTypes.CALL_FUNCTION:
      try {
        LocalFunctions[data.key].apply(self, [ resolve, reject, ...data.parameters ]);
      } catch (e) {
        console.warn('@ CALL_FUNCTION', e);
        reject(e.stack);
      }
      break;
    default:
      console.warn('unhandled message', data);
      break;
  }
});
