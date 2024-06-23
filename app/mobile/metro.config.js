const path = require('path');
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
    ...defaultConfig,
    watchFolders: [
        path.resolve(__dirname, '../public'),
    ],
    projectRoot: path.resolve(__dirname),
}