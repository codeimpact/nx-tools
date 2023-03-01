export interface BuildExecutorSchema {
    manifest3BackgroundScriptPath?: string;
    fireFoxBuild?: boolean;
    overwriteDest?: boolean;
}

export interface WebExtBuilderSchema extends JsonObject {
    artifactsDir: string;
    overwriteDest?: boolean;
  }
