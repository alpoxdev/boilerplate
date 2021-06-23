import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const callback: FastifyPluginAsync = async (fastify, options) => {
  fastify.decorateRequest("offset", 0);
  fastify.decorateRequest("limit", 20);

  fastify.addHook<{ Querystring: { page: string; limit: string } }>(
    "preHandler",
    async (request, reply) => {
      const { page = "1", limit = "20" } = request.query;
      const pageNumber = parseInt(page, 10);
      const pageLimit = parseInt(limit, 10);

      request.offset = (pageNumber - 1) * pageLimit;
      request.limit = pageLimit;
    }
  );
};

declare module "fastify" {
  interface FastifyRequest {
    offset: number;
    limit: number;
  }
}

export const paginationPlugin = fp(callback, {
  name: "paginationPlugin",
});

export default paginationPlugin;
