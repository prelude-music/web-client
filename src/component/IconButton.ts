import Button from "./Button.ts";
import Icon from "./Icon.ts";
import Component from "./Component.ts";

export default class IconButton extends Button {
    public constructor(icon: Icon, description: string) {
        super();
        this
            .class("p-2.5", "text-zinc-50", "rounded-full", "text-sm", "transition-colors", "hover:bg-zinc-800")
            .append(icon)
            .append(Component.span(description).class("sr-only"));
    }
}
