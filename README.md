# Centaurus

![Centaurus](https://www.nasa.gov/images/content/60066main_image_feature_181_jw4.jpg)

Web worker interface. Simplified.

```js
// load up
const Centaurus = require('centaurus');

// create worker, pass path to our worker
let C = new Centaurus('https://unpkg.com/centaurus/dist/centaurus.worker.min.js');

// load umd scripts, be it lodash, whatever.
C.loadScripts(
  'https://unpkg.com/pako/dist/pako.min.js',
  'https://unpkg.com/lodash/lodash.min.js'
)
  .then(() => C.registerFunctions({
    saySomething: (resolve, reject, sayWhat) => {
      console.log(sayWhat);
      resolve();
    },
    checkMyImports: (resolve, reject, param1) => {
      console.log(param1);
      console.log('pako:', pako);
      console.log('lodash:', _);
      resolve(Boolean(pako) && Boolean(_));
    }
  }))
  .then(() => C.saySomething('Anyeonghaseyo!'))
  .then(() => C.checkMyImports('is pako and lodash found?').then(console.log))
  .catch(console.error);
```

## Notes

#### What object types can we pass to the Worker?

* https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
* TL;DR: Everything else including Pure Functions and Objects with Pure Functions
