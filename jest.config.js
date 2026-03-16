

const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/tests"],
    moduleFileExtensions: ["ts", "js", "json"],
    clearMocks: true,
    setupFiles: ["dotenv/config"], // this loads .env by default
};
export default config;