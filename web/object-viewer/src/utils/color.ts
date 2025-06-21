import {detectType} from "@utils/type";

export type DataType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'date'
    | 'object'
    | 'array'
    | 'null'
    | 'undefined'
    | 'unknown';

const typeColorMap: Record<DataType, string> = {
    string: '#4A90E2',   // синий
    number: '#50E3C2',   // бирюзовый
    boolean: '#F5A623',   // оранжевый
    date: '#9013FE',   // фиолетовый
    object: '#7ED321',   // зелёный
    array: '#D0021B',   // красный
    null: '#9B9B9B',   // серый
    undefined: '#9B9B9B',   // серый
    unknown: '#000000',   // чёрный
};


export function getColorByValue(value: unknown): string {
    const dataType = detectType(value);
    return typeColorMap[dataType] ?? typeColorMap.unknown;
}
