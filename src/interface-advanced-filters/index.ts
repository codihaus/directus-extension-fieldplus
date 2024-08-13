import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'advanced-filters',
	name: 'Advanced Filters',
	icon: 'filter_alt',
	description: '',
	component: InterfaceComponent,
	options: null,
	types: ['json', 'text'],
});
