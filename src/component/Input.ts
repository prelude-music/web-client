import HTMLComponent from "./HTMLComponent.ts";

export default class Input extends HTMLComponent<HTMLInputElement> {
    public constructor(type: string, id?: string, required: boolean = false) {
        super(document.createElement("input"));
        this.attr("type", type);
        if (id) {
            this.attr("id", id);
            this.attr("name", id);
        }
        if (required) this.attr("required", "");
        this.class("block", "w-full", "rounded-lg", "bg-zinc-50/5", "px-3", "py-1.5", "text-zinc-50", "shadow-sm", "ring-1", "ring-inset", "ring-zinc-50/10", "placeholder:text-zinc-500", "focus:outline", "focus:outline-2", "focus:outline-green-500", "sm:text-sm sm:leading-6", "disabled:opacity-50", "disabled:cursor-not-allowed", "invalid:focus:outline-red-500", "invalid:text-red-400");
    }

    public disabled(disabled: boolean = true): this {
        this.element.disabled = disabled;
        return this;
    }

    public value(value: string): this {
        this.element.value = value;
        return this;
    }
}
