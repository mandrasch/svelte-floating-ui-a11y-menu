<script>
	// Only needed for {#if}, currently not used
	//import { tick } from 'svelte';
	// import { fade, fly } from 'svelte/transition';

	// floating-ui
	import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

	// https://svelte.dev/repl/814c27da2e1344f9b4f205a93e02559f?version=3.38.1
	$: activeMenu = ''; // TODO: good first state?

	// props and menuSettings
	export let useHoverActions = true;
	const menuSettings = {
		useHoverActions
	};

	// the current selected elements
	let currentSelectedDropdownToggle;
	let currentSelectedDropdownContent;
	let currentSelectedDropdownAutoUpdateFn = function () {}; // for clean up later
	let autoUpdateFns = [];

	// https://floating-ui.com/docs/autoUpdate

	function computeBestPositionForDropdownContent() {
		console.log('computeBestPositionForDropdownContent() triggered');
		computePosition(currentSelectedDropdownToggle, currentSelectedDropdownContent, {
			placement: 'bottom',
			middleware: [offset(0), flip(), shift({ padding: 5 })]
		}).then(({ x, y }) => {
			console.log('result:', { x, y });
			Object.assign(currentSelectedDropdownContent.style, {
				left: `${x}px`,
				top: `${y}px`
			});
		});
	}

	function toggleSubmenu(menuName, evt) {
		// destroy / remove previous auto update listener
		currentSelectedDropdownAutoUpdateFn();
		currentSelectedDropdownAutoUpdateFn = function () {}; // reset

		if (activeMenu !== menuName) {
			// show sub menu
			activeMenu = menuName;

			// floatingUI: start an update listener which will
			// recompute positioning after windows is resized
			// https://floating-ui.com/docs/autoupdate
			currentSelectedDropdownToggle = evt.target;
			currentSelectedDropdownContent = evt.target
				.closest('li')
				.querySelector('ul.disclosure-nav__submenu');

			if (currentSelectedDropdownContent === null) {
				console.error('Could not find ul-submenu in target area:', evt.target.closest('li'));
			}
			console.log({ currentSelectedDropdownToggle, currentSelectedDropdownContent });

			// https://floating-ui.com/docs/autoUpdate, returns fn to destroy later
			currentSelectedDropdownAutoUpdateFn = autoUpdate(
				currentSelectedDropdownToggle,
				currentSelectedDropdownContent,
				// TODO: Can i pass arguments here?
				computeBestPositionForDropdownContent
			);
		} else {
			// close submenu
			activeMenu = '';
		}
	}

	// click (not touch)
	async function handleDropdownClick(evt, menuName) {
		console.log('[handleDropdownClick()]', { menuName, activeMenu, target: evt.target });
		toggleSubmenu(menuName, evt);
	}

	// On mobile side calling preventDefault in touchstart event prevents mouseover,
	// mouseenter, mousedown and affiliated events (we use on:touchstart|preventDefault)
	// https://web.dev/mobile-touchandmouse/
	function handleDropdownTouchstart(evt, menuName) {
		console.log('[handleDropdownTouchstart()]', { evt, menuName });
		toggleSubmenu(menuName, evt);
	}

	async function handleDropdownMouseenter(evt, menuName) {
		console.log('[handleDropdownMouseenter()]', {
			evt,
			relatedTarget: evt.relatedTarget,
			menuName
		});
		if (menuSettings.useHoverActions === false) {
			console.log('handleDropdownMouseenter() - exit no hover actions activated');
			return; // bail
		}

		toggleSubmenu(menuName, evt);
	}

	function handleDropdownMouseleave(evt) {
		if (menuSettings.useHoverActions === false) return; // bail
		currentSelectedDropdownAutoUpdateFn(); // destroy previous watcher
		currentSelectedDropdownAutoUpdateFn = function () {};
		console.log('mouseLeave');
		activeMenu = '';
	}

	function handleKeydown(event) {
		const key = event.key;
		const code = event.code;
		// console.log({ key, code });
		if (key === 'Escape') {
			console.log('Escape key triggered, close active menu (if open)');
			activeMenu = '';
		}
	}

	function handleOutsideClick(evt) {
		// console.log('Outside click', { evt, target: evt.target });
		// if outside click was outside of current menu
		if (evt.target.isEqualNode(currentSelectedDropdownToggle)) {
			console.log('Outside click on current menu detected, resetting / closing it it', {
				target: evt.target,
				currentSelectedDropdownToggle
			});
			activeMenu = '';
			currentSelectedDropdownAutoUpdateFn(); // destroy previous update watcher
		} else {
			('Outside click not on current meu');
		}
		//activeMenu = '';
		// currentSelectedDropdownAutoUpdateFn(); // destroy previous update watcher
	}
	// https://svelte.dev/repl/ae791a22dcd14f40bc56d12f2c63c002?version=3.55.1
	export function clickOutside(node) {
		// the node has been mounted in the DOM

		window.addEventListener('click', handleClick);

		function handleClick(e) {
			console.log({ node, target: e.target });
			if (!node.contains(e.target) || !node.equals(e.target)) {
				console.log('DISPATCHING!', { node, target: e.target });
				node.dispatchEvent(new CustomEvent('outsideclick'));
			}
		}

		return {
			destroy() {
				// the node has been removed from the DOM
				window.removeEventListener('click', handleClick);
			}
		};
	}
</script>

<!-- https://svelte.dev/tutorial/svelte-window -->
<svelte:window on:keydown={handleKeydown} />

<div class="nav-demo-container">
	<nav aria-label="Mythical University">
		<a href="/">The demo company</a>

		<ul class="disclosure-nav" aria-label="Mythical University">
			<li>
				<a href="#home"> Home </a>
			</li>
			<!-- https://svelte.dev/tutorial/inline-handlers -->
			<li on:mouseleave={(evt) => handleDropdownMouseleave(evt)}>
				<!-- important, use |stopPropagation|preventDefault otherwise events will be triggered twice (e.g. click mobile => mouseenter) -->
				<!-- important:On mobile side calling preventDefault in touchstart event prevents mouseover, mouseenter, mousedown and affiliated event, see: https://stackoverflow.com/a/37130354 and https://web.dev/mobile-touchandmouse/-->
				<button
					type="button"
					aria-controls="submenu_news"
					aria-expanded={activeMenu === 'news'}
					on:touchstart|preventDefault={(evt) => handleDropdownTouchstart(evt, 'news')}
					on:click|stopPropagation|preventDefault={(evt) => handleDropdownClick(evt, 'news')}
					on:mouseenter|stopPropagation|preventDefault={(evt) =>
						handleDropdownMouseenter(evt, 'news')}
					use:clickOutside
					on:outsideclick={handleOutsideClick}
					>News
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="down"
						width="12"
						height="9"
						viewBox="0 0 12 9"
					>
						<polygon points="1 0, 11 0, 6 8" />
					</svg></button
				>
				<ul id="submenu_news" class="disclosure-nav__submenu" class:hide={activeMenu !== 'news'}>
					<li>
						<a href="overview"> Overview </a>
					</li>
					<li>
						<a href="#administration"> Tech news </a>
					</li>
				</ul>
			</li>
			<li on:mouseleave={(evt) => handleDropdownMouseleave(evt)}>
				<button
					type="button"
					aria-controls="submenu_about"
					aria-expanded={activeMenu === 'about'}
					on:touchstart|stopPropagation|preventDefault={(evt) =>
						handleDropdownTouchstart(evt, 'about')}
					on:click|stopPropagation|preventDefault={(evt) => handleDropdownClick(evt, 'about')}
					on:mouseenter={(evt) => handleDropdownMouseenter(evt, 'about')}
					use:clickOutside
					on:outsideclick={handleOutsideClick}
					>About
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="down"
						width="12"
						height="9"
						viewBox="0 0 12 9"
					>
						<polygon points="1 0, 11 0, 6 8" />
					</svg></button
				>
				<ul id="submenu_about" class="disclosure-nav__submenu" class:hide={activeMenu !== 'about'}>
					<li>
						<a href="#overview"> Our organisation </a>
					</li>
					<li>
						<a href="#administration"> Why a11y matters</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<p>Active menu: {JSON.stringify(activeMenu)}</p>
</div>

<style>
	/* Important! */
	/* https://css-tricks.com/slightly-careful-sub-elements-clickable-things/ */
	:global(button > *) {
		pointer-events: none;
	}

	.nav-demo-container {
		border: 2px dotted var(--primary);
		margin-bottom: 20px;
	}

	/* https://stackoverflow.com/a/73391142 */
	.hide {
		opacity: 0 !important;
		visibility: hidden !important;
	}

	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	/* main menu */
	ul.disclosure-nav {
		list-style-type: none;
		display: flex;
		flex-direction: row;
		justify-content: end;
	}
	/* main menu child */
	ul.disclosure-nav li {
		margin: 10px;
	}

	/* submenu (dropdowns) */
	ul.disclosure-nav__submenu {
		/* https://bholmes.dev/blog/accessible-show-hide-animations/ */
		opacity: 1;
		visibility: visible;
		transition: opacity 0.8s, visibility 0.8s;

		list-style-type: none;
		background: lightblue;
		width: max-content;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
	}

	/* just some styling, remove default button styles by picocss */
	ul.disclosure-nav button {
		background: none;
		border: none;
		color: var(--primary);
	}
</style>
