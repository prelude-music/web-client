import SvgComponent from "./SvgComponent.ts";

export default class Icon extends SvgComponent {
    public size(size: 4 | 5 | 10): this {
        switch (size) {
            case 4: return this.class("w-4", "h-4");
            case 5: return this.class("w-5", "h-5");
            case 10: return this.class("w-10", "h-10");
        }
    }

    public static override from(svg: string): Icon {
        return new this(SvgComponent.svgFromString(svg));
    }
}
