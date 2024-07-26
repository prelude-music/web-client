import {Artist} from "@prelude-music/ts-sdk";
import Page from "./Page.ts";
import PreludeSettings from "../../PreludeSettings.ts";
import Sidebar from "../Sidebar.ts";
import Component from "../Component.ts";
import Link from "../Link.ts";
import SvgComponent from "../SvgComponent.ts";

class ArtistsListPage extends Page {
    public override urlMatch = /^\/artists\/?$/;
    private readonly grid = Component.tag("div")
        .class("grid", "grid-cols-2", "sm:grid-cols-4", "lg:grid-cols-4", "xl:grid-cols-6", "gap-12", "mt-4")

    public constructor(protected readonly settings: PreludeSettings, private readonly sidebar: Sidebar) {
        super();
        this
            .class("hidden", "min-h-screen")
            .append(
                Component
                    .tag("div")
                    .class("flex-1", "pb-16", "px-4", "md:px-6")
                    .append(Component.tag("div")
                        .class("py-6", "lg:py-12")
                        .append(
                            Component.tag("h1")
                                .text("Artists")
                                .class("text-4xl", "font-bold", "text-zinc-50", "tracking-tight")
                        )
                        .append(
                            Component.tag("p")
                                .class("text-lg", "text-zinc-400", "mt-4")
                        ))
                    .append(this.grid)
            );
    }

    protected override open() {
        if (this.settings.server === null) return;
        this
            .replaceClass("hidden", ["block", "lg:flex"])
            .prepend(this.sidebar);
        (async () => {
            const page = await this.settings.server!.prelude.artist.list(48);
            this.element.querySelector("div > div > p")!.textContent = `There are ${page.total} artist${page.total === 1 ? "" : "s"} in your Prelude library.`;
            this.renderArtists(page.resources);
            for await (const nextPage of page.pages(48, 2))
                this.renderArtists(nextPage.resources)
        })();
    }

    protected override close() {
        this.grid.empty();
        this.replaceClass(["block", "lg:flex"], "hidden");
    }

    private renderArtists(artists: Artist[]) {
        for (const artist of artists)
            this.grid.append(new ArtistsListPage.ArtistListItem(artist));
    }
}

namespace ArtistsListPage {
    export class ArtistListItem extends Component<HTMLDivElement> {
        public constructor(artist: Artist) {
            super(document.createElement("div"));
            this
                .class("relative", "flex", "flex-col", "items-center")
                .append(
                    Component.tag("img")
                        .class("rounded-full", "max-w-32", "max-h-32", "w-full", "object-cover", "aspect-square")
                        .attr("alt", "")
                        .attr("draggable", "false")
                        .attr("src", artist.proxiedImage())
                        .on("error", (_, c) => {
                            c.replace(SvgComponent.from(`<svg class="${c.element.classList.value}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 96 96"><path fill="#27272a" d="M0 0h96v96H0z"/><path fill="none" stroke="#a1a1aa" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M71.71 66.284c0-7.702-4.571-14.856-9.142-18.284a11.427 11.427 0 0 0-1.029-18.97m-5.828 9.828a11.427 11.427 0 0 1-11.427 11.428 11.427 11.427 0 0 1-11.428-11.428 11.427 11.427 0 0 1 11.428-11.427A11.427 11.427 0 0 1 55.71 38.858Zm6.857 29.711a18.284 18.284 0 0 0-36.568 0"/></svg>`));
                        })
                )
                .append(
                    new Link(`/artists/${artist.id}`)
                        .class("mt-4", "text-sm/5", "font-medium", "text-zinc-50", "text-center")
                        .text(artist.name)
                        .append(
                            Component.span()
                                .class("absolute", "inset-0")
                                .attr("aria-hidden", "true")
                        )
                )
            Promise.all([
                artist.albums(0),
                artist.tracks(0)
            ]).then(([albums, tracks]) => {
                this.append(
                    Component.tag("p")
                        .class("mt-1", "text-xs/3", "text-zinc-400", "text-center")
                        .text(`${albums.total} albums · ${tracks.total} tracks`)
                );
            })
        }
    }
}

export default ArtistsListPage;
