import { Sequelize, Model } from 'sequelize-typescript';

import { PGSQL } from '../config';
import { User, Board } from '.';

export let sequelize;

export const onConnectDatabase = async () => {
    if (!sequelize) {
        sequelize = new Sequelize(
            PGSQL.database,
            PGSQL.username,
            PGSQL.password,
            {
                dialect: 'postgres',
                host: PGSQL.host,
                models: [User, Board],
                sync: { force: true },
            }
        );
    }

    try {
        await sequelize.authenticate();

        // await User.sync({ force: true });
        // await Board.sync({ force: true });

        await console.log(`Success`, `connecting database!`);
    } catch (error) {
        console.warn(`Error`, error);
    }
};
