import type {
  MoveFilesIntoDistFolderPluginOptions,
  UseClientInjectionPluginOptions,
} from "../plugins";

export type WebpackBaseConfig = {
  dtsBundleConfig?: { entries: string[] };
  packageJsonConfig?: MoveFilesIntoDistFolderPluginOptions;
  useClientInjectionOptions?: UseClientInjectionPluginOptions;
};
