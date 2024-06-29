export interface attribute {
    readonly name: string,
    readonly type: string
}

export interface objectWithSignatures extends Object {
    [key: string]: unknown;
}

export interface interfaceItem {
    readonly name: string,
    attributes: (attribute | interfaceItem)[]
}