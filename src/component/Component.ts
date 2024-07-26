import ElementComponent from "./ElementComponent.ts";

export default class Component<T extends HTMLElement> extends ElementComponent<T> {
    public override on<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K], component: this) => any, options?: boolean | AddEventListenerOptions): this {
        return super.on(type as any, listener, options);
    }

    public static tag<K extends keyof HTMLElementTagNameMap>(name: K): Component<HTMLElementTagNameMap[K]> {
        return new Component(document.createElement(name));
    }

    public static span(text?: string): Component<HTMLSpanElement> {
        return Component.tag("span").text(text ?? "");
    }

    public static from<T extends HTMLElement = HTMLElement>(html: string): Component<T> {
        const element = document.createElement("div");
        element.innerHTML = html;
        return new Component(element.firstElementChild as T);
    }
}
