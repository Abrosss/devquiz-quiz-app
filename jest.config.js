module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.svg$": "<rootDir>/svgTransform.js" 
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileMock.js",
      "\\.(css|less)$": "identity-obj-proxy",
    },
    testEnvironment: 'jsdom'
  };
  