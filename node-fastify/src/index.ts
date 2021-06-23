import fastify, { FastifyInstance } from "fastify";

// init setting
import config from "config";

// routes
import { testRoutes } from "api/routes";

// plugins
import corsPlugin from "fastify-cors";
import cookiePlugin from "fastify-cookie";
import { tokenPlugin, paginationPlugin } from "plugins";

console.log(`config loading...`, config);

export default class Server {
  public app: FastifyInstance;
  constructor() {
    this.app = fastify({ logger: true });
  }

  public setting() {
    this.pluginSetting();
    this.routerSetting();
    this.errorSetting();
  }

  public pluginSetting() {
    this.app.register(corsPlugin, {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const host = origin.split("://")[1];
        const allowedHost = ["localhost:3000"];
        const allowed = allowedHost.includes(host);
        callback(null, allowed);
      },
      credentials: true,
    });
    this.app.register(cookiePlugin, {
      secret: config.KEYS.COOKIE_KEY,
    });
    this.app.register(tokenPlugin);
    this.app.register(paginationPlugin);
  }

  public routerSetting() {
    this.app.register(testRoutes, { prefix: "/test" });
  }

  public errorSetting() {
    this.app.setErrorHandler((error: any, request, reply) => {
      const statusCode = error?.status || 500;
      const message = error?.message || "Server Internal Error";

      reply.code(statusCode).send({
        statusCode,
        message,
      });
    });
  }

  public async listen() {
    try {
      await this.app.listen(config.PORT || 8080, "0.0.0.0");
      console.log(`Server 0.0.0.0:${config.PORT} Listening...`);
    } catch (error) {
      console.log(`Server Error`, error);
    }
  }

  public get() {
    return this.app;
  }
}

(() => {
  const server = new Server();
  server.setting();
  server.listen();
})();
