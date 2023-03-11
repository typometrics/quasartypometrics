# Typometrics (typometrics)

Colorful Quantitative Typology

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

### trouble shooting
if the `quasar dev` fails with weird JSON parsing errors, you might want to check the npm and node version:
```
$ npm -v
8.5.0
$ node -v
v16.14.2
```

```
npm install npm@9.6.1 -g
nvm use 16
```
might do the job.
