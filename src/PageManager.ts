import Page from "./component/page/Page.ts";
import ServerConnectPage from "./component/page/ServerConnectPage.ts";
import MainPage from "./component/page/MainPage.ts";
import PreludeSettings from "./PreludeSettings.ts";

class PageManager {
    public constructor(private readonly settings: PreludeSettings) {
        document.addEventListener("requestPage", e => {
            if (e instanceof CustomEvent && e.detail in this.pages)
                this.open(e.detail);
        });
    }

    private readonly pages = {
        serverConnect: new ServerConnectPage(this.settings),
        main: new MainPage(this.settings),
    } as const;

    private current: Page | null = null;

    public open(name: keyof typeof this.pages) {
        if (this.current !== null) this.current._close();
        this.current = this.pages[name];
        this.current._open();
    }
}

namespace PageManager {
    // @ts-ignore           Accessing type of private property ↓↓↓↓↓
    export type PageNames = keyof typeof PageManager.prototype.pages;
}

export default PageManager;
