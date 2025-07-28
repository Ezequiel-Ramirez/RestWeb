import { Server } from "./presentation/server";
import { envs } from "./config/envs";


(async () => {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH
    });
    await server.start();
})();