# Centaurus
Highly extendable, context-based web workers.

### Backstory:
I was looking for a way to do the following:

* Easily instantiate web workers

```
const centauri = new Centaurus();
```

* Easily load multiple scripts

```
let centauriOpts = {

  // required
  // can be served from your domain e.g. '/centaurus.worker.js' or '/libs/go/here/centaurus.worker.js'
  // can be served from urls e.g. '//unpkg.com/centaurus/dist/centaurus.worker.js'
  workerPath: 'centaurus.worker.js',
  
  // optional,
  // custom scripts or libraries like async / lodash / whatever
  scriptPaths: [
    '/worker.pako.js'
  ]
  
};
centauri.initialize(centauriOpts)
```

* Easily pass functions for these workers

```
let centauriOpts = {
  // ... 
};
let centauriFunctions = {
  sayHello: (context) => {
    const { resolve, reject } = context;
    resolve();
  }
}
centauri.initialize(centauriOpts)
  .then(() => centauri.withFunctions(centauriFunctions))
```

* Easily call passed functions from web worker itself
* Easily turn all web worker functions into promises

```
let centauriOpts = {
  // ... 
};
let centauriFunctions = {
  sayHello: (context) => {
    const { resolve, reject } = context;
    resolve();
  }
}
centauri.initialize(centauriOpts)
  .then(() => centauri.withFunctions(centauriFunctions))
  .then(() => centauri.sayHello())
```

* Easily access function arguments in the web worker

```
let centauriOpts = {
  // ... 
};
let centauriFunctions = {
  sayHello: (context) => {
    const { name, resolve, reject } = context;
    console.log('Hello', name, '!');
    resolve();
  }
}
centauri.initialize(centauriOpts)
  .then(() => centauri.withFunctions(centauriFunctions))
  .then(() => centauri.sayHello({ name: 'Xema' ))

// console.log result:
// Hello Xema !
```

* Easily chain all actions from web worker

```
let centauriOpts = {
  // ... 
};
let centauriFunctions = {
  sayHello: (context) => {
    const { name, resolve, reject } = context;
    console.log('Hello', name, '!');
    resolve();
  },
  sayHi: (context) => {
    const { name, resolve, reject } = context;
    console.log('Hi', name, '!');
    resolve();
  }
}
centauri.initialize(centauriOpts)
  .then(() => centauri.withFunctions(centauriFunctions))
  .then(() => centauri.sayHello({ name: 'Xema' ))
  .then(() => centauri.sayHi({ name: 'Siv' ))

// console.log result:
// Hello Xema !
// Hi Siv !
```

Ended up writing this library.
End of story.
