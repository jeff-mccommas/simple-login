# SimplifiedLogin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.

## Installation
``$ cd {app_dir}``   
``$ npm install``   
``$ npm install -g typescript``  
``$ npm install pm2 -g``  
Set value for 'NODE_ENV' in environemnt variable like `set NODE_ENV=dev` (window). Possible value `dev|local|qastg|qalv|pqa|demo|prod`.

## Run and build development server

Run `npm run start` This will build the app and serve it using node at `http://localhost:3000/`.
Run `npm run start:pm2` This will build the app and serve it using pm2 at `http://localhost:3000/`.

## Build the Angular app only

Run `npm run build:client` for building the angular App. This will build and put the angular app inside 'dist/client'.

## Build Node app only

Run `npm run build:server` for building the Node App. This will build the node app and put inside 'dist/server'.

## Serve the SimplifiedLogin using Node

Run `npm run serve` for serving the app using node.

## Serve the application using pm2

Run `npm run serve:pm2` for serving the app using pm2.

## Development: build angular app in case of any change

Run `npm run build:client:watch` for building the angular app automatically on every change you make. This need to run in seperate terminal in case you are not using pm2.


------------------Below section will be updated soon------------------


## Development server only for angular APP

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development server integrated with node

Run `npm run build:start` to build first, after build dist folder will be created where all static file will stay and then node server will start and application will serve from node at `http://localhost:3000/`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
