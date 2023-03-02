export interface BuildExecutorSchema {
  manifestVersion?: number;
  backgroundDir?: string;
  fireFoxBuild?: boolean;
  overwriteDest?: boolean;
  outputPath: string;
  watch: boolean;
}

export interface WebExtBuilderSchema extends JsonObject {
  artifactsDir: string;
  overwriteDest?: boolean;
}
