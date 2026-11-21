module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx", esModuleInterop: true, types: ["jest", "@testing-library/jest-dom"] } }],
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
