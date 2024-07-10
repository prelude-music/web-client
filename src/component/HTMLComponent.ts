import Component from "./Component.ts";

export default class HTMLComponent<T extends HTMLElement> extends Component<T> {
    public override on<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this {
        this.element.addEventListener(type, listener, options);
        return this;
    }

    public static tag<K extends keyof HTMLElementTagNameMap>(name: K): HTMLComponent<HTMLElementTagNameMap[K]> {
        return new HTMLComponent(document.createElement(name));
    }

    public static from<T extends HTMLElement = HTMLElement>(html: string): HTMLComponent<T> {
        const element = document.createElement("div");
        element.innerHTML = html;
        return new HTMLComponent(element.firstElementChild as T);
    }
}
