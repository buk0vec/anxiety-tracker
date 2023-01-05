const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
      transitionProperty: {
        'outline': 'outline'
      }
    }
	},

	plugins: [
    require('@tailwindcss/forms'),
  ]
};

module.exports = config;
