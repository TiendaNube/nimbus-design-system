/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import { join } from "path";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config({
  path: join(__dirname, "../../../../../.env"),
  quiet: true,
});

export const mode = process.env.NODE_ENV ?? "production";
export const isProduction = mode === "production";
export const isDevelopment = !isProduction;
export const rootDir = join(__dirname, "../../../../../");
export const webpackDir = join(__dirname, "../../");
