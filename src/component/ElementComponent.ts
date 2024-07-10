export default abstract class ElementComponent<T extends Element> {
    protected constructor(
        public readonly element: T,
    ) {
    }

    public append<T extends HTMLElement>(child: ElementComponent<T>): this {
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

    public on<K extends keyof ElementEventMap>(type: K, listener: (ev: ElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this {
        this.element.addEventListener(type, listener, options);
        return this;
    }

    public toString(): string {
        return this.element.outerHTML;
    }
}
