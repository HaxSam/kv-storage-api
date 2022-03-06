type callbackFunc = (request: Request) => Promise<Response>;
type callbackUndefinedFunc = (request: Request) => (() => Promise<Response>) | undefined;
export default class Router {
	private response: {
		[key: string]: Map<string, callbackFunc>
	}
	private middleware: Map<string, Router> = new Map();
	private middlewareFunc: Map<string, callbackUndefinedFunc> = new Map();

	constructor() {
		this.response = {};
		this.response["GET"] = new Map();
		this.response["POST"] = new Map();
		this.response["PUT"] = new Map();
		this.response["DELETE"] = new Map();
	}

	use(prefix: string, middleware: Router | callbackUndefinedFunc) {
		typeof middleware == "object" && this.middleware.set(prefix, middleware);
		typeof middleware == "function" && this.middlewareFunc.set(prefix, middleware);
	}

	get(route: string, callback: callbackFunc) {
		const { GET } = this.response;
		GET.set(route, callback);
	}
	post(route: string, callback: callbackFunc) {
		const { POST } = this.response;
		POST.set(route, callback);
	}
	put(route: string, callback: callbackFunc) {
		const { PUT } = this.response;
		PUT.set(route, callback);
	}
	delete(route: string, callback: callbackFunc) {
		const { DELETE } = this.response;
		DELETE.set(route, callback);
	}

	private getWildcard(route: string, method: string) {
		const wildcard = new RegExp(/[^\/]*\//g);
		route += "/";

		let buildRoute = "";
		route.match(wildcard)?.every(wild => {
			buildRoute += wild;
			return !this.response[method].has(`${buildRoute}*`);
		})

		return this.response[method].get(`${buildRoute}*`);
	}

	private getMiddelware(route: string) {
		const middle = new RegExp(/[^\/]*\//g);
		route += "/";

		let buildRoute = "";
		route.match(middle)?.every(middle => {
			buildRoute += middle;
			return !this.middleware.has(buildRoute.slice(0, -1));
		})
			
		return { middleware: this.middleware.get(buildRoute.slice(0, -1)), pre: buildRoute.slice(0, -1) };
	}

	private getMiddlewareFunc(route: string) {
		const middle = new RegExp(/[^\/]*\//g);
		route += "/";

		let buildRoute = "";
		route.match(middle)?.every(middle => {
			buildRoute += middle;
			return !this.middlewareFunc.has(buildRoute.slice(0, -1)) && !this.middlewareFunc.has(`${buildRoute}*`);
		});

		return this.middlewareFunc.get(buildRoute.slice(0, -1)) || this.middlewareFunc.get(`${buildRoute}*`);
	}

	async handleRequest(request: Request, prefix?: string): Promise<Response> { 
		const method = request.method;
		const url = new URL(request.url);
		const pathname = prefix ? url.pathname.split(prefix)[1] : url.pathname;

		const notfound = new Response("Not Found", {
			status: 404,
			statusText: "Not Found"
		});

		const wildcard = this.getWildcard(pathname, method);
		const { middleware, pre } = this.getMiddelware(pathname);
		const middlewareFunc = this.getMiddlewareFunc(pathname);

		const middlewareFuncResult = middlewareFunc ? middlewareFunc(request) : undefined;
		if (middlewareFuncResult != undefined)
			return middlewareFuncResult();

		return this.response[method].get(pathname)?.(request) || wildcard?.(request) || middleware?.handleRequest(request, pre) || notfound;
	}
}