import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    "dist/**",
    "node_modules/**",
    "qa/**",
    "scripts/**",
  ]),
]);

export default eslintConfig;
