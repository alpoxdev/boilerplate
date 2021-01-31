import {
    types,
    IAnyModelType,
    IMaybeNull,
    ISimpleType,
    IOptionalIType,
    UnionStringArray,
    ValidOptionalValues,
    IModelType,
    IArrayType,
} from 'mobx-state-tree';
import { Error } from 'common/axios';

export enum AsyncStatus {
    default = 'default',
    pending = 'pending',
    ready = 'ready',
    error = 'error',
}

export type AsyncModelType<T extends IAnyModelType, E extends IAnyModelType> = {
    status: IOptionalIType<ISimpleType<UnionStringArray<AsyncStatus[]>>, ValidOptionalValues>;
    data: IMaybeNull<T>;
    error: IMaybeNull<E>;
};

export type AsyncModelTypes<T extends IAnyModelType, E extends IAnyModelType> = {
    status: IOptionalIType<ISimpleType<UnionStringArray<AsyncStatus[]>>, ValidOptionalValues>;
    data: IArrayType<T>;
    error: IMaybeNull<E>;
};

const ErrorModel = types.model<Error>();

function AsyncModel<T extends IAnyModelType>(
    name: string,
    model: T,
): IModelType<AsyncModelType<T, any>, any> {
    return types
        .model(name, {
            status: types.optional(
                types.enumeration('status', [
                    AsyncStatus.default,
                    AsyncStatus.pending,
                    AsyncStatus.ready,
                    AsyncStatus.error,
                ]),
                AsyncStatus.default,
            ),
            data: types.maybeNull(model),
            error: types.maybeNull(ErrorModel),
        } as AsyncModelType<T, any>)
        .views((self) => ({}))
        .actions((self) => ({
            onDefault() {
                self.status = AsyncStatus.default;
                self.error = null;
            },
            onPending() {
                self.status = AsyncStatus.pending;
                self.error = null;
            },
            onReady(data) {
                self.status = AsyncStatus.ready;
                self.error = null;
                self.data = data;
            },
            onError(error: Error) {
                self.status = AsyncStatus.error;
                self.error = error;
            },
        }));
}

function AsyncModels<T extends IAnyModelType>(
    name: string,
    model: T,
): IModelType<AsyncModelTypes<T, any>, any> {
    return types
        .model(name, {
            status: types.optional(
                types.enumeration('status', [
                    AsyncStatus.default,
                    AsyncStatus.pending,
                    AsyncStatus.ready,
                    AsyncStatus.error,
                ]),
                AsyncStatus.default,
            ),
            data: types.array(model),
            error: types.maybeNull(ErrorModel),
        } as AsyncModelTypes<T, any>)
        .views((self) => ({}))
        .actions((self) => ({
            onDefault() {
                self.status = AsyncStatus.default;
                self.error = null;
            },
            onPending() {
                self.status = AsyncStatus.pending;
                self.error = null;
            },
            onReady(data) {
                self.status = AsyncStatus.ready;
                self.error = null;
                self.data = data;
            },
            onError(error: Error) {
                self.status = AsyncStatus.error;
                self.error = error;
            },
        }));
}

export function onAsyncModel<T extends IAnyModelType>(name: string, model: T) {
    return types.optional(AsyncModel<T>(name, model), {
        status: AsyncStatus.default,
        data: null,
        error: null,
    });
}

export function onAsyncModels<T extends IAnyModelType>(name: string, model: T) {
    return types.optional(AsyncModels<T>(name, model), {
        status: AsyncStatus.default,
        data: [],
        error: null,
    });
}
