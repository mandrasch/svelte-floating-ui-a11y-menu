🚧 Work in progress 🚧

Try to build accessible dropdown menus / navigation bars with SvelteKit and [floating ui](https://floating-ui.com/). Floating UI takes care of positioning dropdowns.

Based on https://w3c.github.io/aria-practices/examples/menubar/menubar-navigation.html, but I'll convert it to https://w3c.github.io/aria-practices/examples/disclosure/disclosure-navigation.html.

Experimental, do not use this in production without serious a11y testing!

## Local setup

- `npm install`
- `npm run dev -- --open`

## TODOs

- [ ] Use source code of https://w3c.github.io/aria-practices/examples/disclosure/disclosure-navigation.html
- [ ] Add collapsible mobile menu
- [ ] Add example where link and dropdown toggle are separated so that parent link can be clicked
- [ ] Test with screenreader(s)!
- [ ] Get feedback by a11y experts
- [ ] Set focus properly
- [ ] Exit menu on escape key

## Resources

- Context: https://github.com/picocss/pico/issues/330
- https://w3c.github.io/aria-practices/examples/menubar/menubar-navigation.html
- Maybe relevant in future: https://github.com/jguze/svelte-easy-popover/pull/4
- For Vanilla JS: https://github.com/NickDJM/accessible-menu

## How was this created

```
npm create svelte@latest .
npm install @floating-ui/dom
npm i @picocss/pico sass svelte-preprocess
```
