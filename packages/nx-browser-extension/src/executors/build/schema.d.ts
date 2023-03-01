export interface BuildExecutorSchema {
    manifest3BackgroundScriptPath?: string;
    fireFoxBuild?: boolean;
    overwriteDest?: boolean;
    outputPath: string;
    watch: string;
}

export interface WebExtBuilderSchema extends JsonObject {
    artifactsDir: string;
    overwriteDest?: boolean;
  }
