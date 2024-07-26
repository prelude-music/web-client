import ElementComponent from "./ElementComponent.ts";

export default class SvgComponent extends ElementComponent<SVGSVGElement> {
    public constructor(element?: SVGSVGElement) {
        super(element ?? document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    }

    public static from(svg: string) {
        return new this(this.svgFromString(svg));
    }

    protected static svgFromString(svg: string) {
        const element = document.createElement("div");
        element.innerHTML = svg;
        return element.firstElementChild as SVGSVGElement;
    }
}
