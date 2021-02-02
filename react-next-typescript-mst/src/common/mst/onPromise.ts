import { Instance, IAnyModelType } from 'mobx-state-tree';
import { Response } from 'common/axios';

export function onPromise<T extends IAnyModelType>(self: Instance<T>) {
    return function* generator(
        promise: (props?: any) => Promise<Response>,
        key?: string | null,
        isMore = false,
    ) {
        self.onPending();

        const response: Response = yield promise();
        if (response.status >= 200 && response.status < 300) {
            if (isMore) {
                key ? self.onMore(response.data[key]) : self.onMore(response.data);
            } else {
                key ? self.onReady(response.data[key]) : self.onReady(response.data);
            }
        } else {
            self.onError(response);
        }
    };
}
