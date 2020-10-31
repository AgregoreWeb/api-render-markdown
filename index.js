import markdownIt from '/markdown-it-bundled/index.js' // TODO: Find a clean method
import highlightJS from '/highlight.js-modified/src/highlight.js' // TODO: PR for making highlight.js compatible with ES6 modules by default

// This is a heavy module. Perhaps in future I can implement multiple options for heaviness
import basic from '/highlight.js-modified/src/languages/basic.js'
import django from '/highlight.js-modified/src/languages/django.js'
import bash from '/highlight.js-modified/src/languages/bash.js'
import gcode from '/highlight.js-modified/src/languages/gcode.js'
import scheme from '/highlight.js-modified/src/languages/scheme.js'
import pony from '/highlight.js-modified/src/languages/pony.js'
import llvm from '/highlight.js-modified/src/languages/llvm.js'
import matlab from '/highlight.js-modified/src/languages/matlab.js'
import lisp from '/highlight.js-modified/src/languages/lisp.js'
import rust from '/highlight.js-modified/src/languages/rust.js'
import brainfuck from '/highlight.js-modified/src/languages/brainfuck.js'
import kotlin from '/highlight.js-modified/src/languages/kotlin.js'
import ruby from '/highlight.js-modified/src/languages/ruby.js'
//import latex from '/highlight.js-modified/src/languages/latex.js' VULNERABLE TO BEAKER CUT-OFF
import perl from '/highlight.js-modified/src/languages/perl.js'
import swift from '/highlight.js-modified/src/languages/swift.js'
import xml from '/highlight.js-modified/src/languages/xml.js'
//import monkey from '/highlight.js-modified/src/languages/monkey.js' VULNERABLE TO BEAKER CUT-OFF
import typescript from '/highlight.js-modified/src/languages/typescript.js'
import php from '/highlight.js-modified/src/languages/php.js'
//import sql from '/highlight.js-modified/src/languages/sql.js' VULNERABLE TO BEAKER CUT-OFF
import css from '/highlight.js-modified/src/languages/css.js'
import excel from '/highlight.js-modified/src/languages/excel.js'
import plaintext from '/highlight.js-modified/src/languages/plaintext.js'
import dos from '/highlight.js-modified/src/languages/dos.js'
//import mathematica from '/highlight.js-modified/src/languages/mathematica.js' VULNERABLE TO BEAKER CUT-OFF
import r from '/highlight.js-modified/src/languages/r.js'
import json from '/highlight.js-modified/src/languages/json.js'
import objectivec from '/highlight.js-modified/src/languages/objectivec.js'
import fortran from '/highlight.js-modified/src/languages/fortran.js'
import cLike from '/highlight.js-modified/src/languages/c-like.js'
import javascript from '/highlight.js-modified/src/languages/javascript.js'
import autohotkey from '/highlight.js-modified/src/languages/autohotkey.js'
import python from '/highlight.js-modified/src/languages/python.js'
import scala from '/highlight.js-modified/src/languages/scala.js'
import yaml from '/highlight.js-modified/src/languages/yaml.js'
import java from '/highlight.js-modified/src/languages/java.js'
import c from '/highlight.js-modified/src/languages/c.js'
import cpp from '/highlight.js-modified/src/languages/cpp.js'
import go from '/highlight.js-modified/src/languages/go.js'
import arduino from '/highlight.js-modified/src/languages/arduino.js'
import x86asm from '/highlight.js-modified/src/languages/x86asm.js'
import csharp from '/highlight.js-modified/src/languages/csharp.js'
import purebasic from '/highlight.js-modified/src/languages/purebasic.js'
import powershell from '/highlight.js-modified/src/languages/powershell.js'

highlightJS.registerLanguage('basic', basic)
highlightJS.registerLanguage('django', django)
highlightJS.registerLanguage('bash', bash)
highlightJS.registerLanguage('gcode', gcode)
highlightJS.registerLanguage('scheme', scheme)
highlightJS.registerLanguage('pony', pony)
highlightJS.registerLanguage('llvm', llvm)
highlightJS.registerLanguage('matlab', matlab)
highlightJS.registerLanguage('lisp', lisp)
highlightJS.registerLanguage('rust', rust)
highlightJS.registerLanguage('brainfuck', brainfuck)
highlightJS.registerLanguage('kotlin', kotlin)
highlightJS.registerLanguage('ruby', ruby)
//highlightJS.registerLanguage('latex', latex) VULNERABLE TO BEAKER CUT-OFF
highlightJS.registerLanguage('perl', perl)
highlightJS.registerLanguage('swift', swift)
highlightJS.registerLanguage('xml', xml)
//highlightJS.registerLanguage('monkey', monkey) VULNERABLE TO BEAKER CUT-OFF
highlightJS.registerLanguage('typescript', typescript)
highlightJS.registerLanguage('php', php)
//highlightJS.registerLanguage('sql', sql) VULNERABLE TO BEAKER CUT-OFF
highlightJS.registerLanguage('css', css)
highlightJS.registerLanguage('excel', excel)
highlightJS.registerLanguage('plaintext', plaintext)
highlightJS.registerLanguage('dos', dos)
//highlightJS.registerLanguage('mathematica', mathematica) VULNERABLE TO BEAKER CUT-OFF
highlightJS.registerLanguage('r', r)
highlightJS.registerLanguage('json', json)
highlightJS.registerLanguage('objectivec', objectivec)
highlightJS.registerLanguage('fortran', fortran)
highlightJS.registerLanguage('c-like', cLike)
highlightJS.registerLanguage('javascript', javascript)
highlightJS.registerLanguage('autohotkey', autohotkey)
highlightJS.registerLanguage('python', python)
highlightJS.registerLanguage('scala', scala)
highlightJS.registerLanguage('yaml', yaml)
highlightJS.registerLanguage('java', java)
highlightJS.registerLanguage('c', c)
highlightJS.registerLanguage('cpp', cpp)
highlightJS.registerLanguage('go', go)
highlightJS.registerLanguage('arduino', arduino)
highlightJS.registerLanguage('x86asm', x86asm)
highlightJS.registerLanguage('csharp', csharp)
highlightJS.registerLanguage('purebasic', purebasic)
highlightJS.registerLanguage('powershell', powershell)

const markdown = markdownIt({
	allowHTML: false,
	useHeadingIds: false,
	useHeadingAnchors: false,
	hrefMassager: undefined,
	highlight: (str, lang) => {
		if (lang && highlightJS.getLanguage(lang)) {
			try {
				return highlightJS.highlight(lang, str).value
			} catch (__) {}
		}

		return ''
	}
})

let theme = document.createElement('style')
document.head.appendChild(theme)
fetch(`${new URL(import.meta.url).origin}/highlight.js-modified/src/styles/monokai-sublime.css`)
	.then(response => response.text())
	.then(text => theme.innerHTML = text)


export default markdown