import markdownIt from '/markdown-it-bundled/index.js' // TODO: Find a clean method
import highlightJS from '/highlight.js-modified/src/highlight.js' // TODO: PR for making highlight.js compatible with ES6 modules by default
import javascript from '/highlight.js-modified/src/languages/javascript.js'
highlightJS.registerLanguage('javascript', javascript)

const markdown = markdownIt({
	allowHTML: false,
	useHeadingIds: false,
	useHeadingAnchors: false,
	hrefMassager: undefined,
	highlight: function (str, lang) {
		if (lang && highlightJS.getLanguage(lang)) {
			try {
				return highlightJS.highlight(lang, str).value
			} catch (__) {}
		}

		return '' // use external default escaping
	}
})
let theme = document.createElement('style')
document.head.appendChild(theme)
fetch('hyper://7a9332a74279a911bd01e5d016fed0d790256637c3dc4423635b4ab3d9074880/highlight.js-modified/src/styles/monokai-sublime.css') // TODO: Find a better way to load this
	.then(response => response.text())
	.then(text => theme.innerHTML = text)

export default markdown