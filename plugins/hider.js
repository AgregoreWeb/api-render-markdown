import markdownItContainer from '/markdown-it-container-bundled/index.js'
const hider = [
	markdownItContainer,
	'hider',
	{
		validate: () => true,

		render: (tokens, idx) => {
			const message = tokens[idx].info.match(/^[\s]*[spoil|warn|summary|hid|TW|trig]+[d|g|e]*[r|s|rs|ing|en|ed]*[s]*[:][\s]*(.*)$/)?.[1] || ''

			if (tokens[idx].nesting === 1) {
				// opening tag
				return `<details><summary>${message}</summary>\n`

			} else {
				// closing tag
				return '</details>\n'
			}
		}
	}
]
export default hider