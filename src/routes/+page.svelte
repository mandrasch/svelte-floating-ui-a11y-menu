<script>
	import DisclosureNavigation from '../components/DisclosureNavigation.svelte';
</script>

<div class="container" style="margin-top:30px;">
	<h2>Disclosure navigation example</h2>

	<p style="max-width:700px;">
		Quick demo of Svelte menus based on <a
			href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/"
			>WAI Example Disclosure Navigation Menu
		</a>
		and <a href="https://floating-ui.com/">Floating UI</a>, see
		<a href="https://github.com/mandrasch/sveltekit-floating-ui-a11y-menu">GitHub</a> for all details.
	</p>
	<p>🚧 Work in progress, do not use in production without testing! 🚧</p>
</div>

<div class="container" style="margin-top:30px;">
	<h3>Hover (mouseenter), touch on mobile / tables:</h3>
</div>

<h4>Collapsed on mobile</h4>
<DisclosureNavigation useHoverActions={true} />

<h4>Not collapsed on mobile</h4>
<DisclosureNavigation isCollapsible={false} useHoverActions={true} />

<h4>Boxed, collapsible</h4>
<div class="container" style="margin-top:30px;">
	<DisclosureNavigation useHoverActions={true} />
</div>

<h4>Boxed, collapsible: false</h4>
<div class="container" style="margin-top:30px;">
	<DisclosureNavigation isCollapsible={false} useHoverActions={true} />
</div>

<div class="container" style="margin-top:30px;"><h3>Click/touch only, no hovering:</h3></div>

<DisclosureNavigation useHoverActions={false} />

<div class="container">
	<DisclosureNavigation useHoverActions={false} />
</div>

<div class="footer">
	<a href="https://matthias-andrasch.eu/blog/impressum-datenschutz/">Imprint & privacy</a>
</div>

<style>
	.footer {
		margin-top: 50px;
		text-align: center;
	}
	h3,
	h4 {
		text-align: center;
	}
</style>
