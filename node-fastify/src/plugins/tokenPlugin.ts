import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

import config from "../config";
import { verifyToken } from "services";
import {} from "models";

declare module "fastify" {
  interface FastifyRequest {
    user: null | { id: string };
  }
}

const callback: FastifyPluginCallback = async (fastify, options, done) => {
  fastify.decorateRequest("user", null);
  fastify.addHook("preHandler", async (request, reply) => {
    const cookie = request.cookies[config.KEYS.COOKIE_NAME];
    let accessToken: string | undefined;
    if (cookie) accessToken = request.unsignCookie(cookie)?.value;

    try {
      if (accessToken) {
        const verifed = verifyToken<{ id: string }>(
          config.KEYS.JWT_KEY,
          accessToken
        );
        if (verifed && verifed.id) request.user = { ...verifed };
      }
    } catch (error) {}
  });

  done();
};

export const tokenPlugin = fp(callback, {
  name: "tokenPlugin",
});

export default tokenPlugin;
