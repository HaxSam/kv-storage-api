import Router from "../utilities/router";
import storage from "./storage";

const router = new Router();

router.use("/storage", storage);

export default router;