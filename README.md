🚧 Work in progress 🚧

Trying to build accessible dropdown menus / navigation bars with Svelte(Kit) and [Floating UI](https://floating-ui.com/). Floating UI takes care of positioning dropdowns.

Based on https://w3c.github.io/aria-practices/examples/disclosure/disclosure-navigation.html.

Experimental, do not use this in production without serious a11y testing!

## Local setup

- `npm install`
- `npm run dev -- --open`

## TODOs

- [ ] Use source code of https://w3c.github.io/aria-practices/examples/disclosure/disclosure-navigation.html
- [ ] Add collapsible mobile menu
- [ ] Add example where link and dropdown toggle are separated so that parent link can be clicked
- [ ] Implement other patterns
- [ ] Test with screenreader(s)!
- [ ] Get feedback by a11y experts
- [ ] Set focus properly
- [ ] Fix contrast errors

## Technical

- I did not `{#if activeMenu == 'news'}` around `<ul>`-submenus, because this removes submenus temporarily completely from DOM. I wasn't sure if this was okay with aria-controls= references (https://stackoverflow.com/a/73391142). Drawback is, that you can't use Svelte animations like `in:fly={{ y: -10 }}` on these submenus. See https://github.com/sveltejs/svelte/pull/7932 for more details.

## Resources

- Why JS positioning for dropdowns? https://blog.logrocket.com/popper-vs-floating-ui/
- Related: https://github.com/picocss/pico/issues/330
- https://w3c.github.io/aria-practices/examples/menubar/menubar-navigation.html
- Maybe relevant in future: https://github.com/jguze/svelte-easy-popover/pull/4
- For Vanilla JS: https://github.com/NickDJM/accessible-menu
- https://bholmes.dev/blog/building-a-sexy-mobile-ready-navbar-in-any-web-framework/
- https://bholmes.dev/blog/accessible-show-hide-animations/
- Practical example: https://www.wien.gv.at/spezial/cd-manual/

## How was this created

```
npm create svelte@latest .
npm install @floating-ui/dom
npm i @picocss/pico sass svelte-preprocess
```
