# Safe Bathrooms

![Screenshot of the application](https://raw.githubusercontent.com/LukePettway/safe-bathrooms/master/app-screenshot.png)

This is a simple demo app that leverages the [Refuge Restrooms](https://www.refugerestrooms.org/api) API to provide a list of safe restrooms to use and [Positionstack](https://positionstack.com/) to provide the ability to search for bathrooms near a particular location.

The app uses the Geolocation API as a quick way to get a users current location. The UI is built using off the shelf Material components with some minor tweaks to them.

## Project setup

```bash
npm install
```

## ENV Setup

```bash
cp .env.local.example .env.local
```

Add the Positionstack API Key to this line: `VUE_APP_GEOCODER_API_KEY=`

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
