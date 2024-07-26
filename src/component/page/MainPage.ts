import Page from "./Page.ts";
import PreludeSettings from "../../PreludeSettings.ts";
import Sidebar from "../Sidebar.ts";
import Component from "../Component.ts";

export default class MainPage extends Page {
    public override urlMatch = /^\/$/;

    public constructor(protected readonly settings: PreludeSettings, private readonly sidebar: Sidebar) {
        super();
        this
            .class("hidden", "min-h-screen")
            .append(
                Component
                    .tag("div")
                    .class("flex-1")
                    .text("main")
            );
    }

    protected override open() {
        this
            .replaceClass("hidden", "flex")
            .prepend(this.sidebar);
    }

    protected override close() {
        this.replaceClass("flex", "hidden");
    }
}
