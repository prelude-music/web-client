import Page from "./Page.ts";
import Sidebar from "../Sidebar.ts";
import Component from "../Component.ts";
import IconInput from "../IconInput.ts";
import Input from "../Input.ts";
import Icon from "../Icon.ts";
import searchIcon from "../../icons/lucide/search.svg?raw";

export default class NotFoundPage extends Page {
    public constructor(private readonly sidebar: Sidebar) {
        super();
        this
            .class("hidden", "min-h-screen")
            .append(
                Component
                    .tag("div")
                    .class("flex", "flex-1", "min-h-screen", "p-4")
                    .append(
                        Component.tag("div")
                            .class("m-auto")
                            .append(
                                Component.tag("h1")
                                    .text("Page not found")
                                    .class("text-center", "text-4xl", "font-bold", "text-zinc-50", "tracking-tight")
                            )
                            .append(
                                Component.tag("p")
                                    .text("This page has gone missing, like a forgotten chord in a symphony. Try finding your way back to the melody!")
                                    .class("mt-6", "max-w-md", "text-center", "text-base/8", "text-zinc-400")
                            )
                            .append(
                                new IconInput(
                                    new Input("textarea", "search")
                                        .attr("placeholder", "Search tracks, playlists, artists, albums"),
                                    Icon.from(searchIcon)
                                )
                                    .class("max-w-xs", "mx-auto", "mt-8")
                            )
                    )
            );
    }

    protected override open() {
        this
            .replaceClass("hidden", ["block", "lg:flex"])
            .prepend(this.sidebar);
    }

    protected override close() {
        this.replaceClass(["block", "lg:flex"], "hidden");
    }
}
