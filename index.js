import markdownIt from '/markdown-it-bundled/index.js' // TODO: Find a clean method
import highlightJS from '/highlight.js-modified/src/highlight.js' // TODO: PR for making highlight.js compatible with ES6 modules by default
import javascript from '/highlight.js-modified/src/languages/javascript.js'

const moduleLocation = new URL(import.meta.url)
const highlightOption = moduleLocation.searchParams.get('highlight') || 'none'
const languages = {}
	languages.light = [
		'javascript'
	]
	languages.heavy = languages.light.concat([
		'json',
		'sql',
		'rust',
		'java'
	])

const languagePromise = Promise.all(languages[highlightOption]?.map(async language => {
	import(`${moduleLocation.origin}/highlight.js-modified/src/languages/${language}.js`).then(module => {
		highlightJS.registerLanguage(language, module.default)
	})
})) // I don't like this for performance reasons but oh well I guess

const markdownOptions = {
	allowHTML: false,
	useHeadingIds: false,
	useHeadingAnchors: false,
	hrefMassager: undefined,
}
if (highlightOption !== 'none') markdownOptions.highlight = (
	str,
	lang
) => {
	if (lang && highlightJS.getLanguage(lang)) {
		try {
			return highlightJS.highlight(lang, str).value
		} catch (__) {}
	}

	return '' // use external default escaping
}


const markdown
	= highlightOption === 'none'
	? markdownIt(markdownOptions)
	: async () => {
		await languagePromise
		return markdownIt(markdownOptions)
	}

const importCSS = () => {
	let theme = document.createElement('style')
	document.head.appendChild(theme)
	fetch(`${moduleLocation.origin}/highlight.js-modified/src/styles/monokai-sublime.css`)
		.then(response => response.text())
		.then(text => theme.innerHTML = text)
}

export {markdown as default, importCSS}