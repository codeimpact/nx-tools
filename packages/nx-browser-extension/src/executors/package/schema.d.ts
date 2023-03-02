export interface WebExtBuilderSchema extends JsonObject {
  sourceDir: string;
  artifactsDir: string;
  overwriteDest?: boolean;
}
