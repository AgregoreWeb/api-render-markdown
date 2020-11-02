import markdownItContainer from '/markdown-it-container-bundled/index.js'
const hider = [
	markdownItContainer,
	'hider',
	{
		validate: function(params) {
			return params.trim().match(/^[spoiler\s|warner|warning|summary|hide|hider]+(.*)$/);
		},

		render: function (tokens, idx) {
			const message = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)?.[1] || ''

			if (tokens[idx].nesting === 1) {
				// opening tag
				return `<details><summary>${message}</summary>\n`;

			} else {
				// closing tag
				return '</details>\n';
			}
		}
	}
]
export default hider