import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';

export default interface JsonSerializer<T> {
    serialize(input: T): any;
    deserialize(input: any): T;
}

const jsonConvert: JsonConvert = new JsonConvert();
jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
jsonConvert.operationMode = OperationMode.ENABLE;

export { jsonConvert };
