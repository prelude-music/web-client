import Server from "./Server.ts";

export default class PreludeSettings {
    public constructor(
        public server: Server | null = null
    ) {
    }

    private json() {
        return {
            server: this.server === null ? null : {url: this.server.url.href, federated: this.server.federatedURL.href}
        } as const;
    }

    public save() {
        localStorage.setItem("prelude", JSON.stringify(this.json()));
    }

    public static from(json: ReturnType<typeof PreludeSettings.prototype.json>) {
        return new PreludeSettings(
            json.server === null ? null : new Server(new URL(json.server.url), new URL(json.server.federated))
        );
    }

    public static load() {
        const ls = localStorage.getItem("prelude");
        if (ls === null) return new PreludeSettings();
        return PreludeSettings.from(JSON.parse(ls));
    }
}
