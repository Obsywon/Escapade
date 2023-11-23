module.exports = {
  preset: 'react-native',
  "setupFiles": [
    "<rootDir>/jest/setup.tsx",
    "<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js"
  ],  
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|react-native-paper/*)/)"
  ],
  "moduleNameMapper": {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "babel-jest"
  }
};
