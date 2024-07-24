import Page from "./Page.ts";
import PreludeSettings from "../../PreludeSettings.ts";
import Sidebar from "../Sidebar.ts";
import Component from "../Component.ts";

export default class MainPage extends Page {
    public constructor(protected readonly settings: PreludeSettings) {
        super();
        this
            .class("hidden", "min-h-screen")
            .append(new Sidebar())
            .append(
                Component
                    .tag("div")
                    .class("flex-1", "h-full")
                    .text("main")
            );
    }

    protected override open() {
        this.replaceClass("hidden", "flex");
    }

    protected override close() {
        this.replaceClass("flex", "hidden");
    }
}
