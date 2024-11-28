module.exports = {
	preset: "ts-jest",
	globals: {
		"ts-test": {
			tsConfig: "tsconfig.test.json",
		},
	},
	transform: {
		"\\.[jt]sx?$": "babel-jest"
	},
	transformIgnorePatterns: ["node_modules/(?!@me/my-package)"],
	testMatch: ["**/tests/**/*.test.ts"]
};