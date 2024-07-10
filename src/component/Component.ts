import ElementComponent from "./ElementComponent.ts";

export default class Component<T extends HTMLElement> extends ElementComponent<T> {
    public override on<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this {
        this.element.addEventListener(type, listener, options);
        return this;
    }

    public static tag<K extends keyof HTMLElementTagNameMap>(name: K): Component<HTMLElementTagNameMap[K]> {
        return new Component(document.createElement(name));
    }

    public static from<T extends HTMLElement = HTMLElement>(html: string): Component<T> {
        const element = document.createElement("div");
        element.innerHTML = html;
        return new Component(element.firstElementChild as T);
    }
}