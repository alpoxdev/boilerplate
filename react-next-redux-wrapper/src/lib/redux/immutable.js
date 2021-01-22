import { Map, fromJS } from 'immutable';

export const serializeState = (state) => {
    const serialized = {};
    for (const [key, value] of Object.entries(state)) {
        serialized[key] = value && value?.toJS ? value.toJS() : value;
    }
    return serialized;
};

export const deserializeState = (state) => {
    const deserialized = {};
    for (const [key, value] of Object.entries(state)) {
        deserialized[key] = value ? fromJS(value) : value;
    }

    return deserialized;
};

export const createFetchState = {
    pending: () =>
        Map({
            pending: true,
            done: false,
            error: null,
        }),
    done: (data, dataCount = 0) =>
        Map({
            pending: false,
            done: true,
            error: null,
            data,
            dataCount,
        }),
    error: (error) =>
        Map({
            pending: false,
            done: false,
            error,
        }),
};

export const setImmutableState = (state, key, value) => state.set(key, state.get(key).merge(value));
