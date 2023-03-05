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

	// https://floating-ui.com/docs/autoUpdate

	function computeBestPositionForDropdownContent() {
		console.log('computeBestPositionForDropdownContent() triggered');
		computePosition(currentSelectedDropdownToggle, currentSelectedDropdownContent, {
			placement: 'bottom',
			middleware: [offset(0), flip(), shift({ padding: 5 })]
		}).then(({ x, y }) => {
			Object.assign(currentSelectedDropdownContent.style, {
				left: `${x}px`,
				top: `${y}px`
			});
		});
	}

	async function toggleDropdownByClick(evt, menuName) {
		console.log('toggleDropdownByClick()', { menuName, activeMenu, target: evt.target });

		// TODO: clashes with openByClick() - how to bundle / synchronize them?
		if (menuSettings.useHoverActions === true) {
			console.log('toggleDropdownByClick() - exit, hover actions will take care');
			return; // bail
		}

		if (activeMenu !== menuName) {
			// Show submenu
			console.log('toggleDropdownByClick()', 'show submenu');
			activeMenu = menuName;

			// Wait for animations / template changes by Svelte {#if}
			// Currently not used because we want to keep submenus in DOM
			// await tick();

			// update element refs
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
			console.log('hide submenu');
			// hide submenu
			activeMenu = '';
			// destroy / remove auto update listener
			currentSelectedDropdownAutoUpdateFn(); // https://floating-ui.com/docs/autoUpdate
		}
	}

	async function openDropdownByHover(evt, menuName) {
		console.log('openDrodownByHover()', { evt, menuName });
		if (menuSettings.useHoverActions === false) {
			console.log('openDrodownByHover() - exit no hover actions activated');
			return; // bail
		}

		// TODO: bundle this in openMenu()
		// if hover actions are permitted:
		activeMenu = menuName;

		// Wait for animations / template changes by Svelte {#if}
		// Currently not used because we want to keep submenus in DOM
		// await tick();

		// update element refs
		currentSelectedDropdownToggle = evt.target;
		currentSelectedDropdownContent = evt.target
			.closest('li')
			.querySelector('ul.disclosure-nav__submenu');
		if (currentSelectedDropdownContent === null) {
			console.error('Could not find ul-submenu in target area:', evt.target.closest('li'));
		}

		console.log(
			'openDrodownByHover()',
			currentSelectedDropdownToggle,
			currentSelectedDropdownContent
		);

		// https://floating-ui.com/docs/autoUpdate
		currentSelectedDropdownAutoUpdateFn = autoUpdate(
			currentSelectedDropdownToggle,
			currentSelectedDropdownContent,
			// TODO: Can i pass arguments here?
			computeBestPositionForDropdownContent
		);
	}

	function closeDropdownByMouseLeave(evt) {
		if (menuSettings.useHoverActions === false) return; // bail

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
			<li on:mouseleave={(evt) => closeDropdownByMouseLeave(evt)}>
				<button
					type="button"
					aria-controls="submenu_news"
					aria-expanded={activeMenu === 'news'}
					on:click|stopPropagation={(evt) => toggleDropdownByClick(evt, 'news')}
					on:mouseenter={(evt) => openDropdownByHover(evt, 'news')}
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
				<ul
					id="submenu_news"
					class="disclosure-nav__submenu"
					class:hide={activeMenu !== 'news'}
					in:fly={{ y: -10 }}
					out:fly={{ y: -10 }}
				>
					<li>
						<a href="#overview"> Overview </a>
					</li>
					<li>
						<a href="#administration"> Tech news </a>
					</li>
				</ul>
			</li>
			<li on:mouseleave={(evt) => closeDropdownByMouseLeave(evt)}>
				<button
					type="button"
					aria-controls="submenu_about"
					aria-expanded={activeMenu === 'about'}
					on:click={(evt) => toggleDropdownByClick(evt, 'about')}
					on:mouseenter={(evt) => openDropdownByHover(evt, 'about')}
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
				<ul
					id="submenu_about"
					class="disclosure-nav__submenu"
					class:hide={activeMenu !== 'about'}
					in:fly={{ y: -10 }}
					out:fly={{ y: -10 }}
				>
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
