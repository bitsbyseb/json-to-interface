export default function getArrayContentType(input: any[]) {
    const workArrAsTuple = false;
    const types: string[] = [];
    input.forEach(x => {
        if ((!types.includes(typeof x)) && !workArrAsTuple) {
            types.push(typeof x);
        }
    });
    return types;
}