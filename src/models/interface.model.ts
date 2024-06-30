export type Attribute = Readonly<{
    name: string,
    type: string
}>;

export type ObjectWithSignatures = Record<string,unknown>;

export type InterfaceItem = Readonly<Pick<Attribute,'name'> & {attributes:(Attribute|InterfaceItem)[]}>