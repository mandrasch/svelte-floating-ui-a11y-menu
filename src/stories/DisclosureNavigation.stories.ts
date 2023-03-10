// https://mvolkmann.github.io/blog/svelte/storybook/?v=1.0.15
import DisclosureNavigation from '../components/DisclosureNavigation.svelte';

export default {
	title: 'Disclosure Navigation',
	component: DisclosureNavigation
	/*argTypes: {
		isCollapsible: { control: 'boolean' },
		fgColor: { control: 'color' },
		size: { control: 'number' },
		value: { control: 'range' }
	}*/
};

const Template = (props) => ({
	Component: DisclosureNavigation,
	props
});

export const Primary = Template.bind({});
// Primary.args = { value: 30 };
