export default function getArrayContentType(input: any[]) {
    const types: string[] = [];
    input.forEach(x => {
        if ((!types.includes(typeof x))) {
            types.push(typeof x);
        }
    });
    return types;
}