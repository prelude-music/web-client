import Component from "./Component.ts";

export default class Link extends Component<HTMLAnchorElement> {
    public constructor(href: string) {
        super(document.createElement("a"));
        this
            .attr("href", href)
            .attr("draggable", "false")
    }

    public href(href: string) {
        return this.attr("href", href);
    }
}
