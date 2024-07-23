import Component from "./Component.ts";

class Button extends Component<HTMLButtonElement> {
    #preLoadingContent: ChildNode[] = [];
    public constructor(size?: Button.Size, style?: Button.Style) {
        super(document.createElement("button"));
        this.class("relative");
        if (size) this.class(size);
        if (style) this.class(style);
    }

    public type(type: "button" | "submit" | "reset"): this {
        this.element.type = type;
        return this;
    }

    public disabled(disabled: boolean = true): this {
        this.element.disabled = disabled;
        return this;
    }

    public loading(): this;
    public loading(loading: boolean): this;
    public loading(label: string): this;
    public loading(loading: boolean, label: string): this;
    public loading(...args: [] | [boolean] | [string] | [boolean, string]): this {
        if (args.length === 0) return this.loading(true);
        if (args.length === 1) {
            if (typeof args[0] === "boolean") return this.loading(args[0], "Loading…");
            if (typeof args[0] === "string") return this.loading(true, args[0]);
        }
        if (args.length === 2) {
            const loading = args[0];
            const text = args[1];
            this.disabled(loading);
            if (loading) {
                if (this.#preLoadingContent.length === 0) {
                    for (const child of this.element.childNodes) {
                        this.#preLoadingContent.push(child);
                        child.remove();
                    }
                    this.append(Component.from(`<div class="flex w-full items-center gap-x-3"><div class="w-5 h-5 aspect-square border-2 border-zinc-700 border-t-zinc-50 rounded-full animate-spin"></div>${Component.tag("span").text(text).class("flex-1")}</div>`));
                }
            }
            else if (this.#preLoadingContent.length !== 0) {
                for (const child of this.element.children)
                    child.remove();
                for (const child of this.#preLoadingContent)
                    this.element.append(child);
                this.#preLoadingContent = [];
            }
        }
        return this;
    }
}

namespace Button {
    export enum Size {
        BASE = "px-3 py-1.5 text-sm/6 rounded-lg",
    }

    export enum Style {
        PRIMARY = "font-semibold bg-green-500 text-white shadow-sm transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:hover:bg-zinc-800 disabled:cursor-not-allowed",
        OUTLINE = "text-zinc-50 ring-1 ring-inset ring-zinc-50/10 shadow-sm transition-colors hover:bg-zinc-50/10 hover:ring-2 disabled:text-zinc-500 disabled:hover:bg-transparent disabled:hover:ring-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-500",
    }
}

export default Button;
