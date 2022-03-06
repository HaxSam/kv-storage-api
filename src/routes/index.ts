import Router from "../utilities/router";
import storage from "./storage";

const router = new Router();

router.use("/v", storage);

export default router;