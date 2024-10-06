module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.scss$": "jest-css-modules-transform",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
};
