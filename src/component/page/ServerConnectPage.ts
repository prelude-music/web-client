import Page from "./Page.ts";
import Component from "../Component.ts";
import Button from "../Button.ts";
import Input from "../Input.ts";
import URLComponent from "../URLComponent.ts";
import Server from "../../Server.ts";
import PreludeSettings from "../../PreludeSettings.ts";

export default class ServerConnectPage extends Page {
    private readonly discoveredServersComponent = Component.tag("div");
    private readonly serverDiscoveryAbort = new AbortController();
    private readonly input = new Input("text", "server")
        .attr("autofocus", "");
    private readonly form = Component
        .tag("form")
        .attr("novalidate", "")
        .class("space-y-6");

    public constructor(protected readonly settings: PreludeSettings) {
        super();
        this
            .class("min-h-screen", "hidden", "flex-col", "justify-center", "px-6", "py-12", "lg:px-8", "sm:mx-auto", "sm:w-full", "sm:max-w-sm")
            .append(Component
                .from(`<div class="mb-10 space-y-10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto w-10 h-10 text-green-500" aria-hidden="true"><circle cx="8" cy="18" r="4"/><path d="M12 18V2l7 4"/></svg>
                  <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-zinc-50">Connect to a server</h2>
                </div>`)
            );

        const submit = new Button(Button.Size.BASE, Button.Style.PRIMARY)
            .text("Connect")
            .type("submit")
            .class("w-full");

        const disable = () => {
            submit.loading("Connecting…");
            this.discoveredServersComponent.element.querySelectorAll("button").forEach(e => e.disabled = true);
            this.input.disabled();
        };

        const enable = () => {
            submit.loading(false);
            this.discoveredServersComponent.element.querySelectorAll("button").forEach(e => e.disabled = false);
            this.input.disabled(false);
        };

        const invalidate = (message: string | null) => {
            const descriptionComponent = this.input.element.nextElementSibling!;
            if (message !== null) {
                descriptionComponent.classList.remove("hidden");
                descriptionComponent.classList.add("block");
                descriptionComponent.textContent = message;
                this.input.element.setCustomValidity(message);
                this.input.element.focus();
            }
            else {
                descriptionComponent.classList.remove("block");
                descriptionComponent.classList.add("hidden");
                descriptionComponent.textContent = "";
                this.input.element.setCustomValidity("");
            }
        };

        this.form.append(this.discoveredServersComponent)
            .append(Component
                .from(`<div><label for="server" class="block text-sm/6 font-medium text-zinc-50 mb-2">Server address</label></div>`)
                .append(this.input)
                .append(
                    Component
                        .tag("span")
                        .class("text-red-400", "text-xs/5", "mt-2", "hidden")
                )
            )
            .append(submit)
            .on("submit", async e => {
                e.preventDefault();
                disable();
                invalidate(null);
                this.serverDiscoveryAbort.abort();
                if (!/^https?:\/\//.test(this.input.element.value)) this.input.element.value = `http://${this.input.element.value}`;
                try {
                    if (this.input.element.value === "") throw new Error("Server address cannot be empty");
                    const server = await Server.resolve(new URL(this.input.element.value), AbortSignal.timeout(5000));
                    if (server === null) throw new Error("Could not connect to server");
                    enable();
                    this.settings.server = server;
                    this.settings.save();
                    Page.request("main");
                }
                catch (e) {
                    console.error(e);
                    if (e instanceof Error)
                        invalidate(e.message);

                    enable();
                }
            });

        this.append(this.form);
    }

    protected override open() {
        this.replaceClass("hidden", "flex");
        Promise.all(["prelude.local", "127.0.0.1", "[::1]"].map(async hostname => await Server.discover(hostname, this.serverDiscoveryAbort.signal, 300))).then(s => {
            const servers: Server[] = s.flat();
            if (servers.length === 0) return;
            this.discoveredServersComponent
                .append(Component.from(`<p class="block text-sm/6 font-medium text-zinc-50 mb-2">Discovered servers</p>`));
            const container = Component.tag("div")
                .class("flex", "flex-col", "gap-y-2");
            this.discoveredServersComponent.append(container);
            for (const server of servers)
                container
                    .append(
                        new Button(Button.Size.BASE, Button.Style.OUTLINE)
                            .type("button")
                            .append(Component.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-zinc-400 group-disabled:text-zinc-500" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>`))
                            .append(new URLComponent(new URL(server.url)))
                            .class("text-left", "flex", "gap-x-2", "items-center", "group")
                            .on("click", () => {
                                this.input.value(server.url.href);
                                this.form.element.requestSubmit();
                            })
                    );
        });

        this.input
            .value(new URL(document.URL).searchParams.get("server") ?? "")
            .element.focus();

        if (this.input.element.value === "" && this.settings.server !== null) {
            this.input.value(this.settings.server.url.href);
            this.form.element.requestSubmit();
        }
    }

    protected override close() {
        this.replaceClass("flex", "hidden");
        this.serverDiscoveryAbort.abort();
        for (const child of this.discoveredServersComponent.element.children)
            child.remove();
    }
}
