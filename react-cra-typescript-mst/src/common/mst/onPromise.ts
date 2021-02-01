import { Instance, IAnyModelType } from 'mobx-state-tree';
import { Response } from 'common/axios';

// interface IGetActions {
//     pending?: Array<(props: any) => void>;
//     ready?: Array<(props: any) => void>;
//     error?: Array<(props: any) => void>;
// }

export function onPromise<T extends IAnyModelType>(self: Instance<T>) {
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
