# Cache Buster JS

## Introduction
`cache-buster-js` is a simple utility to generate a `version.txt` file during the build process, ensuring that deployed applications can detect updates and refresh caches accordingly.

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

By default, `version.txt` will be generated in the `/static` directory, but you can change this by specifying a different folder. The path should be relative to the project's root:

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

### How `cacheBuster` Works
The `cacheBuster` function fetches the `version.txt` file from the server and compares it with the previously stored version in `localStorage`. If a new version is detected, it reloads the page to ensure users receive the latest updates. This helps prevent users from running outdated cached assets.

### Nuxt Configuration
In Nuxt projects, add this configuration inside `nuxt.config.js` under `build` to exclude `fs` from the client-side build:

```js
    extend(config, { isServer }) {
      if (!isServer) {
        // Exclude fs in the client-side build
        config.node = {
          fs: 'empty'
        };
      }
    }
```

