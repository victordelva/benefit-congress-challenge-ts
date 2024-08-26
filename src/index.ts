import {createServer} from "./server";
import {configureDependencies} from "./infrastructure/config/dependencies";

const dependencies = configureDependencies();

createServer(dependencies,() => {
    console.info(`API is running on 5050`)
})
