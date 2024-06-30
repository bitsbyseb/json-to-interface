import { editor } from "monaco-editor";
import { dracula } from "../themes/dracula";

type allowedLanguages = "json" | "typescript";

editor.defineTheme("default", dracula);

export function createNewEditor(
    container: HTMLElement,
    language: allowedLanguages,
    template = "",
) {
    self.MonacoEnvironment = {
        async getWorker(_, label: string) {
            const getWorkerModule = (moduleUrl: string, label: string) => {
                return new Worker(
                    self.MonacoEnvironment !== undefined &&
                        self.MonacoEnvironment.getWorkerUrl !== undefined
                        ? self.MonacoEnvironment?.getWorkerUrl(moduleUrl, label)
                        : "",
                    {
                        name: label,
                        type: "module",
                    },
                );
            };

            switch (label) {
                case "json":
                    return getWorkerModule(
                        "/monaco-editor/esm/vs/language/json/json.worker?worker",
                        label,
                    );
                case "typescript":
                    return getWorkerModule(
                        "/monaco-editor/esm/vs/language/typescript/ts.worker?worker",
                        label,
                    );
                default:
                    return getWorkerModule(
                        "/monaco-editor/esm/vs/editor/editor.worker?worker",
                        label,
                    );
            }
        },
    };
    return editor.create(container, {
        value: template,
        language: language,
        theme: "default",
    });
}
