export default abstract class ElementComponent<T extends Element> {
    protected constructor(
        public readonly element: T,
    ) {
    }

    public append<T extends Element>(child: ElementComponent<T>): this {
        this.element.appendChild(child.element);
        return this;
    }

    public prepend<T extends Element>(child: ElementComponent<T>): this {
        this.element.prepend(child.element);
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

    public toggleClass(...classes: string[]): this {
        for (const c of classes)
            this.element.classList.toggle(c);
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

    public empty(): this {
        while (this.element.firstChild)
            this.element.removeChild(this.element.firstChild);
        return this;
    }

    public replace<T extends Element>(child: ElementComponent<T>): this {
        this.element.replaceWith(child.element);
        return this;
    }

    public on<K extends keyof ElementEventMap>(type: K, listener: (ev: ElementEventMap[K], component: this) => any, options?: boolean | AddEventListenerOptions): this {
        this.element.addEventListener(type, e => listener(e, this), options);
        return this;
    }

    public toString(): string {
        return this.element.outerHTML;
    }
}
