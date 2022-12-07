/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import { join } from "path";

export const mode = process.env.NODE_ENV ?? "production";
export const isProduction = mode === "production";
export const isDevelopment = !isProduction;
export const rootDir = join(__dirname, "../../");
export const webpackDir = join(__dirname, "../");
