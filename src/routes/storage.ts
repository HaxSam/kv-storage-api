import Router from "../utilities/router";

const router = new Router();

function auth(request: Request) {
	const unauthorized = async () => new Response("Unauthorized", {
		status: 401,
	});

	if (request.method == "GET")
		return undefined;

	const Authorization = request.headers.get("Authorization");
	const [type, token] = (Authorization || "").split(" ");

	if (type != "Basic")
		return unauthorized;
	
	const [username, password] = atob(token).split(":");

	if (username != USER || password != PASS)
		return unauthorized;

	return undefined;
}

router.use("/*", auth);

router.get("/*", async (request) => {
	const pathname = new URL(request.url).pathname;
	const keyname = pathname.split("/v/")[1];

	const value = await storage.get(keyname)

	if (value == null)
		return new Response("", { status: 404, statusText: "Not Found" });

	return new Response(value, {
		status: 200,
		statusText: "OK"
	});
});

router.post("/*", async (request) => {
	const pathname = new URL(request.url).pathname;
	const keyname = pathname.split("/v/")[1];

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

router.put("/*", async (request) => {
	const pathname = new URL(request.url).pathname;
	const keyname = pathname.split("/v/")[1];

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

router.delete("/*", async (request) => {
	const pathname = new URL(request.url).pathname;
	const keyname = pathname.split("/v/")[1];

	if (await storage.get(keyname) == null)
		return new Response(`${keyname} does not exist`, {
			status: 404,
			statusText: "Not Found"
		});

	await storage.delete(keyname);

	return new Response(`Got deleted: ${keyname}`, {
		status: 200,
		statusText: "OK"
	});
});

export default router;