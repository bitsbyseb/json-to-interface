import type { interfaceItem,attribute } from "../models/interface.model";
import sentenceCase from "./sentenceCase";

export default function toPureInterface(input: interfaceItem) {
    const interfaces: string[] = [];
    function execute(input: interfaceItem) {
        const { attributes } = input;

        const asStr = attributes.map(x => {
            const isAttribute = Object.keys(x).includes("type");

            if (isAttribute) {
                const { name, type } = x as attribute;
                return `\t${name}: ${type}`;
            } else {
                const { name } = x as interfaceItem;
                interfaces.push(`interface ${sentenceCase(name)} {\n${execute(x as interfaceItem).asStr.join(",\n")}\n}`);
                return `\t${name}:${sentenceCase(name)}`;
            }
        });

        return {
            interfaces,
            asStr,
        }
    }
    return execute(input);
}
