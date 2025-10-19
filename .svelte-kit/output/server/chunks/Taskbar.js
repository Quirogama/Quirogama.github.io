import { z as attr_style, F as slot, G as bind_props, J as stringify, y as attr, K as ensure_array_like } from "./index.js";
import { k as fallback } from "./utils2.js";
import { a as ssr_context, e as escape_html } from "./context.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Window($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let title = fallback($$props["title"], "Untitled");
    let width = fallback($$props["width"], 300);
    let height = fallback($$props["height"], 200);
    let z = fallback($$props["z"], 1);
    let left = fallback($$props["left"], 40);
    let top = fallback($$props["top"], 40);
    $$renderer2.push(`<div class="window svelte-sraem3" role="dialog" tabindex="0"${attr_style(`width: ${stringify(width)}px; height: ${stringify(height)}px; z-index: ${stringify(z)}; left: ${stringify(left)}px; top: ${stringify(top)}px;`)}><div class="title-bar" style="touch-action: none;"><div class="title-bar-text">${escape_html(title)}</div> <div class="title-bar-controls"><button aria-label="Minimize"></button> <button aria-label="Maximize" disabled></button> <button aria-label="Close"></button></div></div> <div class="window-body"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { title, width, height, z, left, top });
  });
}
function DesktopIcon($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let icon = fallback($$props["icon"], "/icons/cv.svg");
    let label = fallback($$props["label"], "Item");
    let x = fallback($$props["x"], 16);
    let y = fallback($$props["y"], 16);
    $$renderer2.push(`<div class="desktop-icon svelte-jukfu0"${attr_style(`left:${stringify(x)}px; top:${stringify(y)}px`)} role="button" tabindex="0"${attr("aria-label", label)}><img${attr("src", icon)}${attr("alt", label)} width="48" height="48" class="svelte-jukfu0"/> <div class="label svelte-jukfu0">${escape_html(label)}</div></div>`);
    bind_props($$props, { icon, label, x, y });
  });
}
function Desktop($$renderer, $$props) {
  let windows = fallback($$props["windows"], () => [], true);
  let icons = [
    {
      id: "cv",
      icon: "/icons/cv.png",
      label: "CV",
      content: "Aquí va mi CV..."
    },
    {
      id: "projects",
      icon: "/icons/proyectos.png",
      label: "Proyectos",
      content: "Listado de proyectos..."
    },
    {
      id: "github",
      icon: "/icons/github.png",
      label: "GitHub",
      content: "Mi perfil de GitHub..."
    },
    {
      id: "linkedin",
      icon: "/icons/linkedin.png",
      label: "LinkedIn",
      content: "Mi perfil de LinkedIn..."
    },
    {
      id: "contact",
      icon: "/icons/contacto.png",
      label: "Contacto",
      content: "Contacto: correo@ejemplo.com"
    }
  ];
  const ICON_W = 110;
  const ICON_H = 110;
  const MARGIN_X = 16;
  const MARGIN_Y = 16;
  const MAX_PER_COLUMN = 4;
  icons = icons.map((ic, i) => {
    const col = Math.floor(i / MAX_PER_COLUMN);
    const row = i % MAX_PER_COLUMN;
    return {
      ...ic,
      x: MARGIN_X + col * (ICON_W + 8),
      y: MARGIN_Y + row * ICON_H
    };
  });
  $$renderer.push(`<div class="desktop svelte-11x9s5f"><!--[-->`);
  const each_array = ensure_array_like(icons);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let ic = each_array[$$index];
    DesktopIcon($$renderer, { icon: ic.icon, label: ic.label, x: ic.x, y: ic.y });
  }
  $$renderer.push(`<!--]--> <!--[-->`);
  const each_array_1 = ensure_array_like(windows);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let w = each_array_1[$$index_1];
    if (!w.closed) {
      $$renderer.push("<!--[-->");
      Window($$renderer, {
        title: w.title,
        width: w.width,
        height: w.height,
        z: w.z,
        children: ($$renderer2) => {
          $$renderer2.push(`<div style="padding:8px">${escape_html(w.content)}</div>`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]--></div>`);
  bind_props($$props, { windows });
}
function Taskbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let visibleTasks;
    let tasks = fallback($$props["tasks"], () => [], true);
    let clock = "";
    let timer;
    onDestroy(() => {
      clearInterval(timer);
    });
    visibleTasks = (tasks || []).filter((t) => {
      try {
        return String(t).trim().toLowerCase() !== "welcome";
      } catch {
        return true;
      }
    });
    $$renderer2.push(`<div class="taskbar svelte-xlbbi5"><div class="start svelte-xlbbi5"><div class="inicio-wrap svelte-xlbbi5"><span class="inicio svelte-xlbbi5">Inicio</span></div></div> <div class="tasks svelte-xlbbi5"><!--[-->`);
    const each_array = ensure_array_like(visibleTasks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let t = each_array[$$index];
      $$renderer2.push(`<button class="task svelte-xlbbi5">${escape_html(t)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="tray svelte-xlbbi5"><span class="task clock svelte-xlbbi5" aria-hidden="false">${escape_html(clock)}</span></div></div>`);
    bind_props($$props, { tasks });
  });
}
export {
  Desktop as D,
  Taskbar as T
};
