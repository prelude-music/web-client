import PageManager from "../../PageManager.ts";
import HTMLComponent from "../HTMLComponent.ts";

export default abstract class Page extends HTMLComponent<HTMLElement> {
    protected opened = false;

    protected constructor() {
        super(document.createElement("div"));
        document.body.append(this.element);
    }

    /** @internal **/
    public _open() {
        if (this.opened) return;
        this.opened = true;
        this.open();
    }

    /** @internal **/
    public _close() {
        if (!this.opened) return;
        this.opened = false;
        this.close();
    }

    protected abstract open(): void;

    protected abstract close(): void;

    public static request(name: PageManager.PageNames) {
        document.dispatchEvent(new CustomEvent("requestPage", {detail: name}));
    }
}
