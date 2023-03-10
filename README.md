🚧 Work in progress 🚧

- Trying to build accessible dropdown menus / navigation bars with Svelte(Kit) and [Floating UI](https://floating-ui.com/).
  - Floating UI takes care of positioning dropdowns / popovers. It only detects resizing / scroll actions and positions dropdowns / popovers accordingly (https://blog.logrocket.com/popper-vs-floating-ui/)
- Based on https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/.
- Experimental, do not use this in production without serious a11y testing!

Live demo: https://svelte-floating-ui-a11y-menu.vercel.app/

## Local setup

- `npm install`
- `npm run dev -- --open`

## Storybook v7 integration

- `npm run storybook`

- https://storybook.js.org/blog/storybook-for-sveltekit/
- (not compatible yet) https://storybook.js.org/addons/@storybook/addon-svelte-csf
- https://mvolkmann.github.io/blog/svelte/storybook/?v=1.0.15

## TODOs

- [ ] Integrate [Example Disclosure Navigation Menu with Top-Level Links](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/)
- Add https://www.npmjs.com/package/svelte-focus-trap ?
- Handle all resize cases and hide menus if menus switch between mobile & desktop?
- [ ] Read https://adrianroselli.com/2019/06/link-disclosure-widget-navigation.html
- [ ] Use all keyboard events (arrow up, down) of https://w3c.github.io/aria-practices/examples/disclosure/disclosure-navigation.html

- [ ] Get feedback by a11y experts!
- [ ] Set focus properly?
- [ ] Fix contrast errors

## Technical information

I did not use `{#if activeMenu == 'news'}` around `<ul>`-submenus, because this removes submenus temporarily completely from DOM. I wasn't sure if this was okay with aria-controls= references (https://stackoverflow.com/a/73391142). Drawback is, that you can't use Svelte animations like `in:fly={{ y: -10 }}` on these submenus.

Instead I used a `.hide`-class (provided by [Foxeye.Rinx](https://stackoverflow.com/questions/58546496/v-show-alternative-for-svelte/73391142#73391142)), this does not remove elements from DOM. See [feat: svelte-display directive #6336 #7932](https://github.com/sveltejs/svelte/pull/7932) for more details.

## Resources

- Why JS positioning for dropdowns? https://blog.logrocket.com/popper-vs-floating-ui/
- Cancel in `touchstart` events to not trigger click events as well https://web.dev/mobile-touchandmouse/
- Related: https://github.com/picocss/pico/issues/330 (thx to @matuzo!)
- https://w3c.github.io/aria-practices/examples/menubar/menubar-navigation.html
- Maybe relevant in future: https://github.com/jguze/svelte-easy-popover/pull/4
- For Vanilla JS: https://github.com/NickDJM/accessible-menu
- https://bholmes.dev/blog/building-a-sexy-mobile-ready-navbar-in-any-web-framework/
- https://bholmes.dev/blog/accessible-show-hide-animations/
- Practical example (not mine): https://www.wien.gv.at/spezial/cd-manual/

## How was this created

```
npm create svelte@latest .
npm install @floating-ui/dom
npm i @picocss/pico sass svelte-preprocess
```
