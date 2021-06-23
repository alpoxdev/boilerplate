import type { FastifyPluginCallback } from "fastify";

// schema
import TestIndexQuerySchema from "schema/test/index-query.json";

// types
import type { TestIndexQuery } from "types/test/index-query";

export const testRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get<{ Querystring: TestIndexQuery }>(
    "/",
    { schema: { querystring: TestIndexQuerySchema } },
    async (request, reply) => {
      reply
        .code(200)
        .setCookie("TEST_COOKIE", "TEST_COOKIE", {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 24,
          sameSite: "none",
          secure: true,
          signed: true,
        })
        .send({ foo: "bar" });
    }
  );
  done();
};
