import {Prelude} from "@prelude-music/ts-sdk";

/**
 * A Prelude backend server pointer
 */
export default class Server {
    public readonly prelude: Prelude;

    /**
     * Create new server
     * @param url The server URL. The server may not be listening on this address if federation is set up on this URL.
     * @param [federatedURL] The actual server-backend URL that will be used for connections. Defaults to `url`.
     */
    public constructor(
        /**
         * The server URL. The server may not be listening on this address if federation is set up on this URL.
         */
        public readonly url: URL,
        /**
         * The actual server-backend URL that will be used for connections.
         */
        public readonly federatedURL: URL = url
    ) {
        this.prelude = new Prelude(federatedURL);
    }

    /**
     * Resolve server URL to actual server-backend URL
     * @param url The server URL. The server may not be listening on this address if federation is set up on this URL.
     * @param [abort] Abort signal
     * @param [timeout] Timeout in ms per address after which discovery will be aborted
     */
    public static async resolve(url: URL, abort?: AbortSignal, timeout?: number): Promise<Server | null> {
        try {
            const newURL = new URL(url);
            newURL.pathname = "/.well-known/prelude";
            const abortController = new AbortController();
            if (abort) {
                abort.addEventListener("abort", abortController.abort.bind(abortController));
                setTimeout(() => abortController.abort(), timeout);
            }
            const res = await fetch(newURL, {signal: abortController.signal});
            if (res.ok) {
                const json = await res.json();
                if ("prelude" in json && typeof json.prelude === "string") {
                    newURL.pathname = "/";
                    return new Server(newURL, new URL(json.prelude));
                }
            }
        }
        catch (e) {}

        try {
            const newURL = new URL(url);
            const abortController = new AbortController();
            if (abort !== undefined) abort.addEventListener("abort", abortController.abort.bind(abortController));
            if (timeout !== undefined) setTimeout(() => abortController.abort(), timeout);
            const res = await fetch(newURL, {signal: abortController.signal});
            if (res.ok) {
                const json = await res.json();
                if ("prelude" in json && typeof json.prelude === "object" && "version" in json.prelude && typeof json.prelude.version === "string") {
                    newURL.pathname = "/";
                    return new Server(newURL);
                }
            }
        }
        catch (e) {}

        return null;
    }

    /**
     * Discover Prelude server on hostname
     *  1. Check for federation on `https://`
     *  2. Check for default port (9847)
     *  3. Check for federation on `http://`
     * @param hostname The hostname to check (can be IP, for IPv6 surround in `[]`). Without port.
     * @param [abort] Abort signal
     * @param [timeout] Timeout in ms per address after which discovery will be aborted
     */
    public static async discover(hostname: string, abort?: AbortSignal, timeout?: number): Promise<Server[]> {
        const urls = [
            new URL(`https://${hostname}`),
            new URL(`http://${hostname}:9847`),
            new URL(`http://${hostname}`)
        ] as const;
        return (await Promise.all(urls.map(async url => {
            try {
                const abortController = new AbortController();
                if (abort !== undefined) abort.addEventListener("abort", () => abortController.abort());
                if (timeout !== undefined) setTimeout(() => abortController.abort(), timeout);
                const server = await Server.resolve(url, abortController.signal, timeout);
                if (server !== null) return server;
            }
            catch (e) {
            }
            return null;
        }))).filter(s => s !== null) as Server[];
    }
}
