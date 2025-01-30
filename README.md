# Cache Buster JS

## How to Use

### Installation
First, install the `cache-buster-js` package using:

```sh
npm install cache-buster-js
```

### Updating `package.json`
Update the respective script (commonly `build` or `generate`) so the `generateVersion` function is called when the script runs, ensuring `version.txt` is generated when the project is deployed:

```json
"generate": "node -e \"require('cache-buster-js').generateVersion()\" && nuxt generate"
```

By default, `version.txt` will be generated in the `/static` directory, but you can change this by specifying a different folder:

```json
"generate": "node -e \"require('cache-buster-js').generateVersion('public')\" && nuxt generate"
```

### Importing `cacheBuster`
Import the `cacheBuster` function in the desired component (usually `Index` or `Default`):

```js
import { cacheBuster } from 'cache-buster-js';
```

Then, call `cacheBuster` at the appropriate moment (usually inside `mounted` or `created`):

```js
await cacheBuster();
```

### Nuxt Configuration
For Nuxt projects, add this code in `nuxt.config.js` under `build` to exclude `fs` from the client-side build:

```js
build: {
  extend(config, { isServer }) {
    if (!isServer) {
      // Exclude fs in the client-side build
      config.node = {
        fs: 'empty'
      };
    }
  }
}
```

