import { PartialArgs, CompilerOptions } from "typescript-json-schema";

export interface Prop {
  name: string;
  description: string;
  defaultValue: string;
  required: boolean;
  type?: string;
  enum?: string[];
}

export interface Doc {
  name: string;
  totalProps: number;
  props?: Prop[];
}

export interface Paths {
  components: string[];
  subComponents?: string[];
}

export interface DocgenOptions {
  settings?: PartialArgs;
  compilerOptions?: Omit<CompilerOptions, "jsx"> & { jsx: string };
}
