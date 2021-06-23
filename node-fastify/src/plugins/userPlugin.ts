import type { FastifyPluginAsync, FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

import {} from "models";

const callback: FastifyPluginAsync<{ fetch: boolean; tokenType: string }> =
  async (fastify, options) => {
    const { fetch = true } = options;
    fastify.decorateRequest("userData", null);
    fastify.addHook("preHandler", async (request, reply) => {
      if (!request.user) {
        throw { status: 401, message: "Unauthorized" };
      }

      if (fetch) {
        // 사용자 데이터 긁어오기
      }
    });
  };

declare module "fastify" {
  interface FastifyRequest {
    userData: null;
  }
}

export const userPlugin = fp(callback, {
  name: "userPlugin",
});

export default userPlugin;
