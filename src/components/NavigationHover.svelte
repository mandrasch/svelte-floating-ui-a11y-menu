<script>
	import { tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

	// https://svelte.dev/repl/814c27da2e1344f9b4f205a93e02559f?version=3.38.1
	let activeMenu = 'main';

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
		console.log('toggleDropdownByClick()', { menuName, target: evt.target });

		if (activeMenu != menuName) {
			// show!

			activeMenu = menuName;

			// important: wait for template changes!
			await tick();

			// update element refs
			currentSelectedDropdownToggle = evt.target; // TODO: error checking
			currentSelectedDropdownContent = evt.target.closest('li').querySelector("ul[role='menu']"); // TODO: error checking

			console.log({ currentSelectedDropdownToggle, currentSelectedDropdownContent });
			// https://floating-ui.com/docs/autoUpdate, returns fn to destroy later
			currentSelectedDropdownAutoUpdateFn = autoUpdate(
				currentSelectedDropdownToggle,
				currentSelectedDropdownContent,
				// TODO: Can i pass arguments here?
				computeBestPositionForDropdownContent
			);
		} else {
			activeMenu = 'main';
			// destroy / remove auto update listener
			currentSelectedDropdownAutoUpdateFn(); // https://floating-ui.com/docs/autoUpdate
		}
	}

	async function openDropdownByHover(evt, menuName) {
		activeMenu = menuName;

		// important: wait for template changes, otherwise elements not accessible in DOM!
		await tick();

		// update element refs
		currentSelectedDropdownToggle = evt.target; // TODO: error checking
		currentSelectedDropdownContent = evt.target.closest('li').querySelector("ul[role='menu']"); // TODO: error checking

		console.log(currentSelectedDropdownToggle, currentSelectedDropdownContent);
		console.log('toggleDropdownByHover()', {
			currentSelectedDropdownToggle,
			'aria-expanded': currentSelectedDropdownToggle.getAttribute('aria-expanded'),
			currentSelectedDropdownContent,
			display: currentSelectedDropdownContent.style.display
		});

		// https://floating-ui.com/docs/autoUpdate
		currentSelectedDropdownAutoUpdateFn = autoUpdate(
			currentSelectedDropdownToggle,
			currentSelectedDropdownContent,
			// TODO: Can i pass arguments here?
			computeBestPositionForDropdownContent
		);
	}

	function closeDropdownByMouseLeave() {
		console.log('mouseLeave');
		activeMenu = 'main';
	}
</script>

<p>Active menu: {activeMenu}</p>
<nav aria-label="Mythical University">
	<ul class="menubar-navigation" role="menubar" aria-label="Mythical University">
		<li role="none">
			<a role="menuitem" href="#home"> Home </a>
		</li>
		<li role="none" on:mouseleave={closeDropdownByMouseLeave}>
			<!-- https://svelte.dev/tutorial/inline-handlers -->
			<a
				role="menuitem"
				aria-haspopup="true"
				aria-expanded={activeMenu === 'news'}
				href="#news"
				on:click={(evt) => toggleDropdownByClick(evt, 'news')}
				on:mouseenter={(evt) => openDropdownByHover(evt, 'news')}
			>
				News
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="down"
					width="12"
					height="9"
					viewBox="0 0 12 9"
				>
					<polygon points="1 0, 11 0, 6 8" />
				</svg>
			</a>
			{#if activeMenu == 'news'}
				<ul role="menu" aria-label="About" in:fly={{ y: -10 }} out:fly={{ y: -10 }}>
					<li role="none">
						<a role="menuitem" href="#overview"> Overview </a>
					</li>
					<li role="none">
						<a role="menuitem" href="#administration"> Administration </a>
					</li>
				</ul>
			{/if}
		</li>
		<li role="none" on:mouseleave={closeDropdownByMouseLeave}>
			<a
				on:click={(evt) => toggleDropdownByClick(evt, 'about')}
				on:mouseenter={(evt) => openDropdownByHover(evt, 'about')}
				role="menuitem"
				aria-haspopup="true"
				aria-expanded={activeMenu === 'about'}
				href="#about"
			>
				About
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="down"
					width="12"
					height="9"
					viewBox="0 0 12 9"
				>
					<polygon points="1 0, 11 0, 6 8" />
				</svg>
			</a>
			{#if activeMenu === 'about'}
				<ul role="menu" aria-label="About" in:fly={{ y: -10 }} out:fly={{ y: -10 }}>
					<li role="none">
						<a role="menuitem" href="#overview"> Overview </a>
					</li>
					<li role="none">
						<a role="menuitem" href="#administration"> Administration </a>
					</li>
				</ul>
			{/if}
		</li>
	</ul>
</nav>

<style>
	/* https://stackoverflow.com/a/73391142 */
	.hide {
		display: none !important;
	}

	.menubar-navigation {
		list-style-type: none;
		display: flex;
		flex-direction: row;
		justify-content: end;
	}
	.menubar-navigation li {
		margin: 10px;
	}

	/* hide on startup */
	/*.menubar-navigation ul[role='menu'] {
		display: none;
	}*/

	ul [role='menu'] {
		list-style-type: none;
		background: lightblue;
		width: max-content;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
	}
</style>
