import { PartialArgs, CompilerOptions } from "typescript-json-schema";

export interface Prop {
  title: string;
  description: string;
  default?: string;
  required: boolean;
  type?: string;
  enum?: string[];
  anyOf?: {};
}

export interface Doc {
  name: string;
  totalProps: number;
  props?: Prop[];
}

export interface GeneratedDoc extends Doc {
  id: string;
  packageName: string;
  version: string;
  docLink: string;
  subComponents?: Doc[];
}

export interface Paths {
  components: string[];
  subComponents?: string[];
}

export interface DocgenOptions {
  settings?: PartialArgs;
  compilerOptions?: Omit<CompilerOptions, "jsx"> & { jsx: string };
}
