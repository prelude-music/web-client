import Page from "./Page.ts";
import PreludeSettings from "../../PreludeSettings.ts";

export default class MainPage extends Page {
    public constructor(protected readonly settings: PreludeSettings) {
        super();
        this
            .class("hidden")
            .text("main page");
    }

    protected override open() {
        this.removeClass("hidden");
    }

    protected override close() {
        this.class("hidden");
    }
}
