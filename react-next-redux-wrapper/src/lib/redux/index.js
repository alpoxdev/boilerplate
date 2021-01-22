import { Map, List } from 'immutable';

export * from './createPromiseThunk';
export * from './immutable';

export const TYPE_DONE = (type) => `${type}_DONE`;
export const TYPE_ERROR = (type) => `${type}_ERROR`;

export const initialFetchState = {
    list: Map({
        pending: false,
        done: false,
        error: null,
        data: List([]),
        dataCount: 0,
        page: 0,
        offset: 20,
    }),
    object: Map({
        pending: false,
        done: false,
        error: null,
        data: Map({}),
    }),
};

export const initialFetchType = (key, value) => ({
    [key]: `${value}`,
    [TYPE_DONE(key)]: TYPE_DONE(value),
    [TYPE_ERROR(key)]: TYPE_ERROR(value),
});
