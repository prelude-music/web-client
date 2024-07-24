import Component from "./Component.ts";
import Input from "./Input.ts";
import Link from "./Link.ts";
import Icon from "./Icon.ts";
import houseIcon from "../icons/lucide/house.svg?raw";
import listMusicIcon from "../icons/lucide/list-music.svg?raw";
import libraryIcon from "../icons/lucide/library.svg?raw";
import music2Icon from "../icons/lucide/music-2.svg?raw";
import usersRoundIcon from "../icons/lucide/users-round.svg?raw";
import IconInput from "./IconInput.ts";
import UserButton from "./UserButton.ts";

export default class Sidebar extends Component<HTMLDivElement> {
    private readonly search = new IconInput(
        new Input("textarea", "search")
            .attr("placeholder", "Search tracks, playlists, ..."),
        Icon.from(music2Icon)
    );
    public constructor() {
        super(document.createElement("div"));
        this
            .class("w-64", "shrink-0", "p-4", "bg-zinc-950", "border-r", "border-zinc-900", "flex", "flex-col", "z-40", "fixed", "inset-y-0", "overflow-auto", "gap-y-3")
            .append(new Link("/")
                .class("mb-2", "flex", "items-center", "gap-x-2", "px-2", "text-zinc-50", "rounded-md", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-offset-2", "focus-visible:outline-green-500")
                .append(Icon.from(music2Icon).size(5))
                .append(Component.tag("h2").text("Prelude").class("text-lg", "font-semibold", "tracking-tight"))
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
            )
            .append(new UserButton("John Doe", "user@prelude.local")
                .class("mt-auto")
            )
        ;
    }
}
