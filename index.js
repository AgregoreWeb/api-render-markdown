import markdownIt from '/markdown-it-bundled/index.js'
import highlightJS from '/highlight.js-modified/src/highlight.js'
import javascript from '/highlight.js-modified/src/languages/javascript.js';
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
fetch('/highlight.js-modified/src/styles/monokai-sublime.css')
	.then(response => response.text())
	.then(text => theme.innerHTML = text)

export default markdown