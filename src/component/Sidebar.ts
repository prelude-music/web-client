import Component from "./Component.ts";
import Input from "./Input.ts";
import Link from "./Link.ts";
import Icon from "./Icon.ts";
import houseIcon from "../icons/lucide/house.svg?raw";
import listMusicIcon from "../icons/lucide/list-music.svg?raw";
import libraryIcon from "../icons/lucide/library.svg?raw";
import music2Icon from "../icons/lucide/music-2.svg?raw";
import usersRoundIcon from "../icons/lucide/users-round.svg?raw";
import menuIcon from "../icons/lucide/menu.svg?raw";
import xIcon from "../icons/lucide/x.svg?raw";
import IconInput from "./IconInput.ts";
import UserButton from "./UserButton.ts";
import IconButton from "./IconButton.ts";

export default class Sidebar extends Component<HTMLDivElement> {
    private readonly search = new IconInput(
        new Input("textarea", "search")
            .attr("placeholder", "Search tracks, playlists, ..."),
        Icon.from(music2Icon)
    );
    private readonly topbar = Component.tag("div");
    private readonly overlay = Component.tag("div");
    private readonly sidebar = Component.tag("div");

    private opened = false;

    private open() {
        this.opened = true;
        this.overlay.removeClass("invisible", "opacity-0");
        this.sidebar.removeClass("invisible", "-translate-x-full");
    }

    private close() {
        this.opened = false;
        this.overlay.class("opacity-0");
        this.sidebar.class("-translate-x-full");
        setTimeout(() => {
            this.overlay.class("invisible");
            this.sidebar.class("invisible");
        }, 150);
    }

    public constructor() {
        super(document.createElement("div"));
        this.topbar
            .class("lg:hidden", "flex", "items-center", "p-2", "md:px-4")
            .append(
                new IconButton(Icon.from(menuIcon).size(5), "open menu")
                    .on("click", () => this.open())
            )
            .append(new Link("/")
                .class("flex", "items-center", "gap-x-2", "px-2", "text-zinc-50", "rounded-md", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-offset-2", "focus-visible:outline-green-500")
                .append(Icon.from(music2Icon).size(5))
                .append(Component.tag("h2").text("Prelude").class("text-lg", "font-semibold", "tracking-tight"))
            )
        this.overlay
            .class("fixed", "inset-0", "bg-zinc-950/80", "z-30", "transition-opacity", "duration-200", "opacity-0", "invisible", "lg:invisible")
            .on("click", () => this.close());
        this.sidebar
            .class("w-64", "h-screen", "shrink-0", "p-4", "bg-zinc-950", "border-r", "border-zinc-900", "invisible", "transition-transform", "-translate-x-full", "flex", "flex-col", "z-40", "fixed", "inset-y-0", "overflow-auto", "gap-y-3", "lg:visible", "lg:transition-none", "lg:translate-x-0", "lg:inset-0", "lg:sticky")
            .append(
                Component.tag("div")
                    .class("flex", "justify-between", "items-center")
                    .append(new Link("/")
                        .class("mb-2", "flex", "items-center", "gap-x-2", "px-2", "text-zinc-50", "rounded-md", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-offset-2", "focus-visible:outline-green-500")
                        .append(Icon.from(music2Icon).size(5))
                        .append(Component.tag("h2").text("Prelude").class("text-lg", "font-semibold", "tracking-tight"))
                    )
                    .append(
                        new IconButton(Icon.from(xIcon).size(4), "close menu")
                            .on("click", () => this.close())
                            .class("ml-auto", "-mr-2.5", "lg:hidden")
                    )
            )
            .append(this.search)
            .append(
                Component
                    .tag("div")
                    .class("space-y-1")
                    .append(
                        new Link("/")
                            .class("flex", "items-center", "p-2", "text-sm", "text-zinc-50", "font-medium", "rounded-lg", "hover:bg-zinc-800", "group", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-green-500")
                            .append(Icon.from(houseIcon).size(4).class("flex-shrink-0"))
                            .append(Component.span("Library").class("flex-1", "ml-3", "whitespace-nowrap"))
                    )
                    .append(
                        new Link("/playlists")
                            .class("flex", "items-center", "p-2", "text-sm", "text-zinc-50", "font-medium", "rounded-lg", "hover:bg-zinc-800", "group", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-green-500")
                            .append(Icon.from(listMusicIcon).size(4).class("flex-shrink-0"))
                            .append(Component.span("Playlists").class("flex-1", "ml-3", "whitespace-nowrap"))
                    )
                    .append(
                        new Link("/albums")
                            .class("flex", "items-center", "p-2", "text-sm", "text-zinc-50", "font-medium", "rounded-lg", "hover:bg-zinc-800", "group", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-green-500")
                            .append(Icon.from(libraryIcon).size(4).class("flex-shrink-0"))
                            .append(Component.span("Albums").class("flex-1", "ml-3", "whitespace-nowrap"))
                    )
                    .append(
                        new Link("/artists")
                            .class("flex", "items-center", "p-2", "text-sm", "text-zinc-50", "font-medium", "rounded-lg", "hover:bg-zinc-800", "group", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-green-500")
                            .append(Icon.from(usersRoundIcon).size(4).class("flex-shrink-0"))
                            .append(Component.span("Artists").class("flex-1", "ml-3", "whitespace-nowrap"))
                    )
                    .append(
                        new Link("/tracks")
                            .class("flex", "items-center", "p-2", "text-sm", "text-zinc-50", "font-medium", "rounded-lg", "hover:bg-zinc-800", "group", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-green-500")
                            .append(Icon.from(music2Icon).size(4).class("flex-shrink-0"))
                            .append(Component.span("Tracks").class("flex-1", "ml-3", "whitespace-nowrap"))
                    )
                    .on("click", () => setTimeout(() => this.close(), 25))
            )
            .append(new UserButton("John Doe", "user@prelude.local")
                .class("mt-auto")
            );

        this.append(this.topbar)
            .append(this.overlay)
            .append(this.sidebar);

        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && this.opened) {
                e.stopPropagation();
                e.preventDefault();
                this.close();
            }
        });
    }
}
