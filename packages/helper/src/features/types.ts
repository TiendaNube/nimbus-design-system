export interface PropAnyOf {
  enum?: string[];
  propertyOrder?: string[];
  type: string;
}

export interface DocumentProps {
  title: string;
  description: string;
  type: string | string[];
  enum?: string[];
  anyOf?: PropAnyOf[];
  default?: string;
  required?: boolean;
}

export interface Document {
  id: string;
  name: string;
  totalProps: number;
  packageName: string;
  version: string;
  docLink: string;
  props: DocumentProps[];
}

export interface Dependencies {
  [key: string]: string;
}

export interface PackageJSON {
  dependencies: Dependencies;
}

export interface OutdatedDependencies {
  [key: string]: { currentVersion: string; latestVersion: string };
}
