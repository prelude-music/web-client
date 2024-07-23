import "./style.css";
import PreludeSettings from "./PreludeSettings.ts";
import PageManager from "./PageManager.ts";

new PageManager(PreludeSettings.load())
    .open("serverConnect");
