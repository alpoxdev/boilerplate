import 'reflect-metadata';

import {
    Connection,
    createConnection,
    getConnectionManager,
    EntitySchema,
} from 'typeorm';
import { MYSQL } from '../config';

import User from './User';
import Log from './Log';
import Weather from './Weather';

const { host, user, password, database, logging, synchronize } = MYSQL;

let apickConnection: Connection | undefined;

const getConnectApickConnection = async () => {
    const connectionName = 'default';
    const connectionManager = getConnectionManager();

    if (connectionManager.has(connectionName)) {
        apickConnection = connectionManager.get(connectionName);
        if (!apickConnection.isConnected) {
            await apickConnection.connect();
        }
    } else {
        apickConnection = await createConnection({
            type: 'mysql',
            host,
            name: connectionName,
            username: user,
            password,
            database,
            logging,
            entities: [User, Log, Weather],
        });

        if (synchronize) await apickConnection.synchronize();
    }

    return apickConnection;
};

const connectDatabase = async () => {
    const connection = await getConnectApickConnection();

    return {
        connection,
        getRepository: <Entity>(entity: EntitySchema<Entity>) =>
            connection.getRepository(entity),
    };
};

export { connectDatabase };
