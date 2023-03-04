<!-- <script>
	// TODO: Learn how to import a local popover
	import { Popover } from './dist/popover';

	let referenceElement;
</script>

<button bind:this={referenceElement}>Open popover</button>
<Popover triggerEvents={['hover', 'focus']} {referenceElement} placement="top" spaceAway={10}>
	<div class="popover-contents" transition:fade={{ duration: 250 }}>I'm a popover!</div>
</Popover>

<style>
	.popover-contents {
		border: 1px solid black;
		border-radius: 4px;
		padding: 8px;
	}
</style>
-->
<script>
	import NavigationHover from '../components/NavigationHover.svelte';
	import NavigationClickOnly from '../components/NavigationClickOnly.svelte';
</script>

<h2>SvelteKit + floating-ui a11y menus</h2>
<p>
	See <a href="https://github.com/mandrasch/sveltekit-floatingui-a11y-menu">GitHub</a>.
</p>

<h3>Hover + click:</h3>
<NavigationHover />

<h3>Click only:</h3>
<NavigationClickOnly />
