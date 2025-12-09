const path = require('path');

module.exports = {
    project: {
        android: {
            sourceDir: '.',
            appName: 'app',
        },
    },
    dependencies: {},
    // Tell React Native where to find node_modules
    watchFolders: [
        path.resolve(__dirname, 'node_modules'),
    ],
};


