import HTMLComponent from "./HTMLComponent.ts";

export default class URLComponent extends HTMLComponent<HTMLSpanElement> {
    public readonly protocol: HTMLComponent<HTMLSpanElement> = HTMLComponent.tag("span").class("text-zinc-400 group-disabled:text-zinc-500");
    public readonly hostname: HTMLComponent<HTMLSpanElement> = HTMLComponent.tag("span").class("text-zinc-50 group-disabled:text-zinc-500");
    public readonly port: HTMLComponent<HTMLSpanElement> = HTMLComponent.tag("span").class("text-zinc-400 group-disabled:text-zinc-500");
    public readonly pathname: HTMLComponent<HTMLSpanElement> = HTMLComponent.tag("span").class("text-zinc-400 group-disabled:text-zinc-500");
    public readonly query: HTMLComponent<HTMLSpanElement> = HTMLComponent.tag("span").class("text-zinc-400 group-disabled:text-zinc-500");

    #url: URL;

    public constructor(url: URL) {
        super(document.createElement("span"));
        this
            .append(this.protocol)
            .append(this.hostname)
            .append(this.port)
            .append(this.pathname)
            .append(this.query);
        this.#url = url;
        this.set(url);
    }

    public set(url: URL): this {
        this.#url = url;
        this.protocol.text(url.protocol + "//");
        this.hostname.text(url.hostname);
        this.port.text(url.port === "" ? "" : `:${url.port}`);
        this.pathname.text(url.pathname === "/" ? "" : url.pathname);
        this.query.text(url.search);
        return this;
    }

    public get url() {
        return Object.freeze(this.#url);
    }
}
