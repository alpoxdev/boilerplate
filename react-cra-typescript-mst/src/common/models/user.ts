import { types, Instance } from 'mobx-state-tree';

export const User = types.model({
    id: types.string,
    email: types.string,
    nickname: types.string,
});

export type IUser = Instance<typeof User>;
