import Router from "../utilities/router";

const router = new Router();

function auth(request: Request) {
	const unauthorized = async () => new Response("Unauthorized", {
		status: 401,
	});

	const Authorization = request.headers.get("Authorization");
	const [type, token] = (Authorization || "").split(" ");

	if (type != "Basic")
		return unauthorized;
	
	const [username, password] = atob(token).split(":");

	if (username != USER || password != PASS)
		return unauthorized;

	return undefined;
}

router.use("/a/*", auth);

router.get("/g/*", async (request) => {
	const pathname = new URL(request.url).pathname;
	const keyname = pathname.split("/storage/g/")[1];

	const value = await storage.get(keyname)

	if (value == null)
		return new Response("", { status: 404 });

	return new Response(value, {
		status: 200,
		statusText: "OK"
	});
});

router.post("/a/*", async (request) => {
	const pathname = new URL(request.url).pathname;
	const keyname = pathname.split("/storage/a/")[1];

	const { value } = await request.json() as { value: string };

	if (await storage.get(keyname) != null)
		return new Response(`${keyname} already exists`, {
			status: 409,
			statusText: "Conflict"
		});

	await storage.put(keyname, value);

	return new Response(`Got created: ${keyname}`, {
		status: 200,
		statusText: "OK"
	});
});

router.put("/a/*", async (request) => {
	const pathname = new URL(request.url).pathname;
	const keyname = pathname.split("/storage/a/")[1];

	const { value } = await request.json() as { value: string };

	if (await storage.get(keyname) == null)
		return new Response(`${keyname} does not exist`, {
			status: 404,
			statusText: "Not Found"
		});

	await storage.put(keyname, value);

	return new Response(`Got updated: ${keyname}`, {
		status: 200,
		statusText: "OK"
	});
});

export default router;