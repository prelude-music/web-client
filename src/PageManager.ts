import Page from "./component/page/Page.ts";
import ServerConnectPage from "./component/page/ServerConnectPage.ts";
import MainPage from "./component/page/MainPage.ts";
import PreludeSettings from "./PreludeSettings.ts";
import Sidebar from "./component/Sidebar.ts";
import ArtistsListPage from "./component/page/ArtistsListPage.ts";
import NotFoundPage from "./component/page/NotFoundPage.ts";

class PageManager {
    public constructor(private readonly settings: PreludeSettings) {
        document.addEventListener("requestPage", e => {
            if (e instanceof CustomEvent && e.detail in this.pages)
                this.open(e.detail);
        });
        document.addEventListener("requestUrl", e => {
            if (e instanceof CustomEvent && e.detail instanceof URL)
                this.url(e.detail);
        })
    }

    private readonly sidebar = new Sidebar();

    private readonly pages = {
        serverConnect: new ServerConnectPage(this.settings),
        main: new MainPage(this.settings, this.sidebar),
        artistsList: new ArtistsListPage(this.settings, this.sidebar),
        404: new NotFoundPage(this.sidebar)
    } as const;

    private current: Page | null = null;

    public open(name: keyof typeof this.pages) {
        if (this.current !== null) this.current._close();
        this.current = this.pages[name];
        this.current._open();
    }

    public url(url: URL) {
        history.pushState(null, "", url);
        for (const [id, page] of Object.entries(this.pages))
            if (page.urlMatch !== null && page.urlMatch.test(url.pathname)) {
                console.log("open", id)
                this.open(id as PageManager.PageNames);
                return;
            }

        this.open(404);
    }
}

namespace PageManager {
    // @ts-ignore           Accessing type of private property ↓↓↓↓↓
    export type PageNames = keyof typeof PageManager.prototype.pages;
}

export default PageManager;
