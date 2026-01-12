/**
 * Options for publishing to NPM
 */
interface NpmPublishOptions {
  access?: "public" | "restricted";
  tag?: string;
  otp?: string;
}

export type { NpmPublishOptions };
