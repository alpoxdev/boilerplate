import {
    types,
    flow,
    IAnyModelType,
    IMaybeNull,
    ISimpleType,
    IOptionalIType,
    UnionStringArray,
    ValidOptionalValues,
    IModelType,
    IArrayType,
    Instance,
} from 'mobx-state-tree';
import { Response, Error } from 'common/axios';

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

export const EmptyModel = types.model();

const ErrorModel = types.model<Error>();

function onPromise<T extends IAnyModelType>(self: Instance<T>) {
    return function* generator(
        promise: (props?: any) => Promise<Response>,
        key?: string,
        ...props: any[]
    ) {
        self.onPending();

        const response: Response = yield promise();
        if (response.status >= 200 && response.status < 300) {
            key ? self.onReady(response.data[key]) : self.onReady(response.data);
        } else {
            self.onError(response);
        }
    };
}

export function AsyncModel<T extends IAnyModelType>(
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
        .views((self: Instance<T>) => ({
            get isPending() {
                return self.status === AsyncStatus.pending;
            },
            get isReady() {
                return self.status === AsyncStatus.ready;
            },
            get isError() {
                return self.status === AsyncStatus.error;
            },
        }))
        .actions((self: Instance<T>) => ({
            onDefault() {
                self.status = AsyncStatus.default;
                self.error = null;
                self.data = null;
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
            onGetOne: flow(onPromise(self)),
            onCreate: flow(onPromise(self)),
            onDelete: flow(onPromise(self)),
            onUpdate: flow(onPromise(self)),
        }));
}

export function AsyncModels<T extends IAnyModelType>(
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
        .views((self: Instance<T>) => ({
            get isPending() {
                return self.status === AsyncStatus.pending;
            },
            get isReady() {
                return self.status === AsyncStatus.ready;
            },
            get isError() {
                return self.status === AsyncStatus.error;
            },
        }))
        .actions((self: Instance<T>) => ({
            onDefault() {
                self.status = AsyncStatus.default;
                self.error = null;
                self.data = [];
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
            onGetAll: flow(onPromise(self)),
        }));
}
