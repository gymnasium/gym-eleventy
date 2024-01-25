# Gym 11ty

[![Netlify Status](https://api.netlify.com/api/v1/badges/655fce6b-0f21-4083-8b06-2d87de788b79/deploy-status)](https://app.netlify.com/sites/gym-11ty/deploys)


### Prerequisites
- [NVM - Node Version Manager](https://github.com/nvm-sh/nvm)
- [node.js](https://nodejs.org/)

### Installation
Check to see which version(s) of node you've got installed:
```
nvm list
```

If the list doesn't include the version referenced in `.nvmrc`, be sure to install it:
```
nvm install 18.17 # for example
```

Switch to the referenced version:

```
nvm use
```

Install dependencies:
```
npm install
```

### Getting Started
Once installed, there are two ways to get this running, depending on your needs.
1. running without netlify-cli, in which case you'd just run:
```
npm run dev
```
The server will be available at [http://localhost:4040](http://localhost:4040).

2. running with netlify-cli, which has the advantage of serving up relevant CORS headers, redirects, etc, which is useful for running locally in parallel with other applications (such as open edx tutor):
```
npx netlify dev
```
The server will be available at [http://localhost](http://localhost).
