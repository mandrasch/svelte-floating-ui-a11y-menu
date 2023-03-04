🚧 Work in progress 🚧

Try to build accessible dropdown menus / navigation bars with SvelteKit and [floating ui](https://floating-ui.com/). Floating UI takes care of positioning dropdowns.

Based on https://w3c.github.io/aria-practices/examples/menubar/menubar-navigation.html

Experimental, do not use this in production without serious a11y testing!

## Local setup

- `npm install`
- `npm run dev -- --open`

## TODOs

- [ ] Test with screenreader(s)!
- [ ] Get feedback by a11y experts
- [ ] Set focus properly
- [ ] Exit menu on escape key
- [ ] Add collapsible mobile menu

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
