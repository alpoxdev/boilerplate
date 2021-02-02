import { Component } from 'react';
import {} from 'mobx-state-tree';
import { useStore } from 'stores';

export const MSTWrapper = (Page) => {
    return class MSTWrapperClass extends Component {
        static async getInitialProps(context) {
            const { req, res, pathname, query } = context;

            const isServer = !!req;

            const store = useStore();
        }
    };
};
