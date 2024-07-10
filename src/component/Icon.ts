import ElementComponent from "./ElementComponent.ts";

export default class Icon extends ElementComponent<SVGSVGElement> {
    public constructor(element?: SVGSVGElement) {
        super(element ?? document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    }

    public size(size: 4 | 10): this {
        switch (size) {
            case 4:
                return this.class("w-4", "h-4");
            case 10:
                return this.class("w-10", "h-10");
        }
    }

    public static from(svg: string): Icon {
        const element = document.createElement("div");
        element.innerHTML = svg;
        return new Icon(element.firstElementChild as SVGSVGElement);
    }
}
