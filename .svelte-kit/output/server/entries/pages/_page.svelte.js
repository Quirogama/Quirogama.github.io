import "clsx";
import { D as Desktop, T as Taskbar } from "../../chunks/Taskbar.js";
function _page($$renderer) {
  let windows = [
    {
      id: 1,
      title: "Welcome",
      width: 360,
      height: 220,
      z: 2,
      content: "Hola! Bienvenido al Windows 98 de prueba."
    }
  ];
  let tasks = ["Welcome"];
  Desktop($$renderer, { windows });
  $$renderer.push(`<!----> `);
  Taskbar($$renderer, { tasks });
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
