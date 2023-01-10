const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
      transitionProperty: {
        'outline': 'outline',
        'border': 'border'
      }
    }
	},

	plugins: [
    require('@tailwindcss/forms'),
  ]
};

module.exports = config;
