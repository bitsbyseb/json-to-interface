import type { Attribute, InterfaceItem } from "../models/interface.model";
import sentenceCase from "./sentenceCase";

export default function toPureInterface(input: InterfaceItem) {
    const interfaces: string[] = [];

    function isAttribute(value:InterfaceItem | Attribute):value is Attribute {
        return "type" in value;
    }

    function execute(input: InterfaceItem) {
        const { attributes } = input;

        const asStr = attributes.map((x) => {
            if (isAttribute(x)) {
                const { name,type } = x;
                return `\t${name}: ${type}`;
            } else {
                const { name } = x;
                interfaces.push(
                    `interface ${sentenceCase(name)} {\n${
                        execute(x).asStr.join(",\n")
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
