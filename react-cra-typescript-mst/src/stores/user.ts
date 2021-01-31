import { types, Instance } from 'mobx-state-tree';
import { User, IUser } from 'common/models';

export const UserStore = types
    .model('UserStore', {
        users: types.array(User),
        user: types.maybeNull(User),
    })
    .views((self) => ({}))
    .actions((self) => ({
        setUsers(users) {
            self.users = users;
        },
        addUser(user: IUser) {
            self.users.push(user);
        },
    }));

const userStore = UserStore.create({
    users: [],
    user: null,
});

export type IUserStore = Instance<typeof userStore>;

export default userStore;
