#My Decisions and Comments

##How to run
* The build folder contains compiled version of the application.
* npm install - to install dependencies.
* npm run development - to run the application in development mode.
* npm run build - to build the application.

##JS
* React - Because I have been using React for the past 3 years.
* Redux - Let's be honest, Redux, Flux, Celebral etc. is a complete overkill for this tiny app, but it feels cleaner than if I put all state related code to the top level component.
* Redux Thunk - again complete overkill, but it helps to handle the one async operation, for fetching the search results.
* Ducks - Dan Abramov is not a big fan of this structure of reducers but I think it makes complete sense in terms of reusability.

##CSS
* BEM for CSS - Because it makes total sense if you think of your UI as components. Would love to check out atomic design though.
* The minimum resolution is 310px. This is based on information from http://www.websitedimensions.com.
* I used normalize.js, autoprefixer and fetch polyfill to make sure it runs and looks good in all major browsers. I could not test it in MS Edge though, because I develop on Apple.

