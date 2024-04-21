// routes/_main.js
const APIRoute = require('./apiRoutes');
const WebRoutes = require('./webRoutes');

module.exports = (app) => {
    app.use('/', WebRoutes);

    app.use('/api', APIRoute);
}