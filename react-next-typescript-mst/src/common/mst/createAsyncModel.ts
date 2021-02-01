import {
    types,
    IAnyType,
    IAnyModelType,
    IOptionalIType,
    ValidOptionalValues,
} from 'mobx-state-tree';
import { AsyncStatus, AsyncModel, AsyncModels } from 'common/mst';

export function createAsyncModel<T extends IAnyModelType>(
    name: string,
    model: T,
): IOptionalIType<IAnyType, ValidOptionalValues> {
    return types.optional(AsyncModel<T>(name, model), {
        status: AsyncStatus.default,
        data: null,
        error: null,
    });
}

export function createAsyncModels<T extends IAnyModelType>(
    name: string,
    model: T,
): IOptionalIType<IAnyType, ValidOptionalValues> {
    return types.optional(AsyncModels<T>(name, model), {
        status: AsyncStatus.default,
        data: [],
        error: null,
    });
}
