import toInterfaceConstructor from "./utils/toInterfaceConstructor";
import toPureInterface from "./utils/toPureInterface";
import { createNewEditor } from "./utils/createNewEditor";

const jsonContainer = document.querySelector<HTMLDivElement>("#json");
const interfaceContainer= document.querySelector<HTMLParagraphElement>(
    "#interface",
);
const submitButton = document.getElementById("submit");

if (jsonContainer !== null && interfaceContainer !== null) {
    const editorJSON = createNewEditor(
        jsonContainer,
        "json",
        `{
    "id": 3,
    "title": "Code review",
    "description": "Review the latest code commits for the web application.",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-06-28T15:00:00Z",
    "createdAt": "2024-06-24T11:00:00Z",
    "updatedAt": "2024-06-26T14:00:00Z"
}`,
    );
    const editorInterface = createNewEditor(
        interfaceContainer,
        "typescript",
        `interface Root {
	id: number,
	title: string,
	description: string,
	status: string,
	priority: string,
	dueDate: string,
	createdAt: string,
	updatedAt: string
}`,
    );

    submitButton?.addEventListener("click", (e) => {
        e.preventDefault();
        const result = toInterfaceConstructor(editorJSON.getValue(), "root");
        const formatted = toPureInterface(result);

        console.log("result", result);
        console.log("formatted", formatted);
        console.log(
            `interface Root {\n${formatted.asStr.join(",\n")}\n}\n\n${
                formatted.interfaces.join("\n\n")
            }`,
        );

        editorInterface.setValue(
            `interface Root {\n${formatted.asStr.join(",\n")}\n}\n\n${
                formatted.interfaces.join("\n\n")
            }`,
        );
    });
}
