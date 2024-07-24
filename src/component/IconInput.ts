import Component from "./Component.ts";
import Input from "./Input.ts";
import Icon from "./Icon.ts";

export default class IconInput extends Component<HTMLDivElement> {
    public constructor(public readonly input: Input, public readonly icon: Icon) {
        super(document.createElement("div"));
        this
            .class("relative", "flex", "items-center")
            .append(this.icon
                .size(4)
                .class("absolute", "pointer-events-none", "left-3", "text-zinc-500")
            )
            .append(this.input
                .class("pl-9")
            )
    }
}
