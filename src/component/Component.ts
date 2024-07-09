export default class Component<T extends HTMLElement> {
    protected constructor(
        public readonly element: T,
    ) {
    }

    public append<T extends HTMLElement>(child: Component<T>): this {
        this.element.appendChild(child.element);
        return this;
    }

    public class(...classes: string[]): this {
        this.element.classList.add(...classes.flatMap(c => c.split(" ")));
        return this;
    }

    public removeClass(...classes: string[]): this {
        this.element.classList.remove(...classes.flatMap(c => c.split(" ")));
        return this;
    }

    public replaceClass(oldClass: string | string[], newClass: string | string[]): this {
        if ((typeof oldClass === "string" ? [oldClass] : oldClass).flatMap(c => c.split(" ")).every(c => this.element.classList.contains(c))) {
            this.class(...(typeof newClass === "string" ? [newClass] : newClass));
            this.removeClass(...(typeof oldClass === "string" ? [oldClass] : oldClass));
        }
        return this;
    }

    public attr(name: string, value: any): this {
        this.element.setAttribute(name, String(value));
        return this;
    }

    public text(text: string): this {
        this.element.textContent = text;
        return this;
    }

    public on<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this {
        this.element.addEventListener(type, listener, options);
        return this;
    }

    public toString(): string {
        return this.element.outerHTML;
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
