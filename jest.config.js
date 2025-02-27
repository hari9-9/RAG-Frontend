export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transform JS/JSX files using Babel
    },

    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
        "^@/(.*)$": "<rootDir>/src/$1",
    },

    setupFilesAfterEnv: ["./jest.setup.ts"],
};