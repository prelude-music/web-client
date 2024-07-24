import Component from "./Component.ts";
import Icon from "./Icon.ts";
import userRoundIcon from "../icons/lucide/user-round.svg?raw";
import chevronDownIcon from "../icons/lucide/chevron-down.svg?raw";

export default class UserButton extends Component<HTMLButtonElement> {
    public constructor(name: string, username: string, image?: string) {
        super(document.createElement("button"));
        this
            .class("rounded-lg", "p-2", "text-left", "hover:bg-zinc-800", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-green-500")
            .append(Component.span("Open user menu").class("sr-only"))
            .append(
                Component
                    .tag("div")
                    .class("flex", "items-center", "gap-x-3")
                    .append(
                        image
                            ? Component
                                .tag("img")
                                .class("h-8", "w-8", "shrink-0", "rounded-full", "object-cover")
                                .attr("src", image)
                                .attr("alt", "")
                                .attr("draggable", "false")
                            : Component
                                .tag("div")
                                .class("flex", "h-8", "w-8", "shrink-0", "items-center", "justify-center", "rounded-full", "bg-zinc-800")
                                .append(Icon.from(userRoundIcon).size(4))
                    )
                    .append(
                        Component
                            .tag("div")
                            .class("flex", "min-w-0", "flex-col")
                            .append(Component.span(name).class("truncate", "text-sm", "font-medium", "text-zinc-50"))
                            .append(Component.span(username).class("truncate", "text-xs", "text-zinc-400"))
                    )
                    .append(Icon.from(chevronDownIcon).size(4).class("ml-auto", "h-4", "w-4", "shrink-0", "text-zinc-400"))
            );
    }
}
