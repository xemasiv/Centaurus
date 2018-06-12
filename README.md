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
      console.log(param1, Boolean(pako) && Boolean(_));
      console.log('pako:', pako);
      console.log('lodash:', _);
      resolve();
    }
  }))
  .then(() => C.saySomething('Anyeonghaseyo!'))
  .then(() => C.checkMyImports('is pako and lodash found?'))
  .catch(console.error);
```

## Notes

#### How does it work?

* All `main-thread` to `worker-thread` communications use promises.
* UUIDv4 & Maps are used to identify incoming & outgoing messages.
* `serialize-javascript` is used to serialize all messages.

#### How do I create global variable assignments within the worker?

Yes. Just assign `self.whatever` inside your functions.

And yes, your other functions can use them also.

```js
C.registerFunctions({
    RegisterSomethinGlobal: (resolve, reject, sayWhat) => {
      self.name = 'xemasiv';
      resolve();
    },
    UseThatGlobal: (resolve, reject, sayWhat) => {
      console.log(name);
      resolve();
    }
  })
  .then(() => C.RegisterSomethinGlobal())
  .then(() => C.UseThatGlobal())
  .catch(console.error);
```

#### Can I pass parameters?

Yes, please see the top-most example.

#### Can I return results?

Oh yes you can, you're unstoppable.

#### What types can we pass to the Worker?

* Everything here @ https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm

## License

Attribution 4.0 International (CC BY 4.0)

* https://creativecommons.org/licenses/by/4.0/
* https://creativecommons.org/licenses/by/4.0/legalcode.txt

![cc](https://creativecommons.org/images/deed/cc_blue_x2.png) ![by](https://creativecommons.org/images/deed/attribution_icon_blue_x2.png)
