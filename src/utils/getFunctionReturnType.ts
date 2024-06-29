export default function getFunctionReturnType(fun: Function) {
    let contentType = "";
    try {
        const content = fun();

        switch (typeof content) {
            case "undefined":
                contentType = "void"
                break;
            case "function":
                contentType = `(${getFunctionReturnType(fun)})`;
                break;
            case "object":
                break;
            default:
                contentType = typeof content;
                break;
        }
        return contentType;
    } catch (error) {
        contentType = "never"
        return contentType;
    }
}