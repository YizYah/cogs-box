/**
 * Sample:
 *     name: string;
    version: string;
    category: string;
    format: FormatSpec;
    componentTypes: ComponentTypes;
    dataFunctionTypes: DataFunctionTypes;
    dirs: ConfigurationDirectories;
    setupSequence: SetupSequence;
    general: SpecSet;
    static: StaticTypesSpecList;
    ignore?: string[];
 */

const existsKey = (obj:any, key: string)=> obj[key] !== undefined
function checkKey(obj:any, key: string){
    if (!existsKey(obj, key)) throw new Error(`invalid config file. Missing ${key}`);
    
}

export function isValidConfig(obj:any):boolean {

    const keys = [
        "name",
        "version",
        "category",
        "format",
        "componentTypes",
        "dataFunctionTypes",
        "dirs",
        "setupSequence",
        "general",
        "static",
    ]

    keys.map(key=>checkKey(obj, key))
    return true
}