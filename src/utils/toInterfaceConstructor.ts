import type {
    interfaceItem,
    objectWithSignatures,
} from "../models/interface.model";
import getArrayContentType from "./getArrayContent";

export default function toInterfaceConstructor(input: string, name: string) {
    let interfaceInstance: interfaceItem = { name, attributes: [] };
    const asObject: objectWithSignatures = JSON.parse(input);

    for (let property in asObject) {
        const value = asObject[property];

        if (typeof value === "object" && Array.isArray(value)) {
            const arrayTypes = getArrayContentType(value);
            interfaceInstance.attributes.push({
                name: property,
                type: arrayTypes.length > 1
                    ? `(${arrayTypes.join(" | ")})[]`
                    : `${arrayTypes.join(" | ")}[]`,
            });
        } else if (
            typeof value === "object" && !Array.isArray(value) && value !== null
        ) {
            interfaceInstance.attributes.push(
                toInterfaceConstructor(JSON.stringify(value), property),
            );
        } else if (typeof value === "object" && value === null) {
            interfaceInstance.attributes.push({ name: property, type: "null" });
        } else {
            interfaceInstance.attributes.push({
                name: property,
                type: typeof value,
            });
        }
    }
    return interfaceInstance;
}
