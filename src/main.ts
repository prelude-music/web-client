import "./style.css";
import PreludeSettings from "./PreludeSettings.ts";
import PageManager from "./PageManager.ts";

const pm = new PageManager(PreludeSettings.load());
pm.open("serverConnect");

document.addEventListener("click", e => {
    if (e.target instanceof HTMLElement) {
        const a = e.target.closest("a");
        if (a === null) return;
        const target = new URL(a.href);
        if (target.origin !== window.location.origin) return;
        if (e.ctrlKey || e.button === 1) return;
        e.preventDefault();
        e.stopPropagation();
        pm.url(target);
    }
})
