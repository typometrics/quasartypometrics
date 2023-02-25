# Typometrics (typometrics)

A Quasar Framework app

## Install the dependencies
```bash
npm install
npm install -g @quasar/cli
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### if you like it: Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

The server has to point to 	/home/typometrics/quasartypometrics/dist/spa;

check deployment/djangocloeditor for an nginx configuration

### possible errors and fixes

* if you have a *digital envelope routines::unsupported* error, try `export NODE_OPTIONS=--openssl-legacy-provider` before starting quasar
