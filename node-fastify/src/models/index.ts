export * from "./_models";

import { Sequelize, ModelCtor } from "sequelize-typescript";

import config from "../config";
import * as modelAttributes from "./_models";

const models = Object.values(modelAttributes)
  .map((value) => typeof value === "function" && value)
  .filter(Boolean) as ModelCtor[];

export const sequelize = new Sequelize({
  ...config.SEQUELIZE,
  models: models,
});
