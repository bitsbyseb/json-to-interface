import type { Attribute, InterfaceItem } from "../models/interface.model";
import sentenceCase from "./sentenceCase";

export default function toPureInterface(input: InterfaceItem) {
    const interfaces: string[] = [];
    function execute(input: InterfaceItem) {
        const { attributes } = input;

        const asStr = attributes.map((x) => {
            const isAttribute = Object.keys(x).includes("type");

            if (isAttribute) {
                const { name, type } = x as Attribute;
                return `\t${name}: ${type}`;
            } else {
                const { name } = x as InterfaceItem;
                interfaces.push(
                    `interface ${sentenceCase(name)} {\n${
                        execute(x as InterfaceItem).asStr.join(",\n")
                    }\n}`,
                );
                return `\t${name}:${sentenceCase(name)}`;
            }
        });

        return {
            interfaces,
            asStr,
        };
    }
    return execute(input);
}
