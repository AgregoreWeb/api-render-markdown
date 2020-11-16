import markdownItContainer from "/bundles/markdown-it-container/bundled.js";
export default [
	markdownItContainer,
	"hider",
	{
		validate: () => true,

		render: (tokens, idx) => {
			return tokens[idx].nesting === 1
				? `<details><summary>${tokens[idx].info}</summary>`
				: `</details>`;
		},
	},
];
