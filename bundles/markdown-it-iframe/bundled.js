let markdownItIframe
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// let markdownItIframe
// TOP OF BUNDLE

markdownItIframe = require('markdown-it-iframe')

// BOTTOM OF BUNDLE
// export default markdownItIframe
},{"markdown-it-iframe":2}],2:[function(require,module,exports){
// allow iframes in markdown
//
"use strict"

module.exports = function iframe_plugin(md, options) {
  var attrs = []
  options = options || {}

  if (options.renderIframe == null) {
    options.renderIframe = true
  }

  if (options.allowfullscreen) {
    attrs.push(["allowfullscreen", true])
  }
  attrs.push(["frameborder", options.frameborder || 0])

  if (options.width) {
    attrs.push(["width", options.width])
  }
  if (options.height) {
    attrs.push(["height", options.height])
  }

  function iframe(state, startLine, endLine, silent) {
    var ch, token

    var pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]

    ch = state.src.substring(pos, pos + 3)

    if (ch !== "/i/" || pos + 4 >= max) {
      return false
    }

    state.line = startLine + 1

    var content = state.src.slice(pos + 3, max).trim()
    if (content.indexOf(":") < 0) {
      return false
    }

    /* istanbul ignore else */
    if (!silent) {
      if (options.renderIframe) {
        token = state.push("div_open", "div", 1)
        token.attrs = [["class", "iframe-container"]]
        token = state.push("iframe_open", "iframe", 1)
        token.markup = "/i/"
        token.attrs = attrs.concat([["src", content]])
        token.map = [startLine, state.line]

        token = state.push("iframe_close", "iframe", -1)
        token.markup = "/i/"
        token = state.push("div_close", "div", -1)
      } else {
        token = state.push("paragraph_open", "p", 1)
        token.markup = "/i/"

        token = state.push("text", "", 0)
        token.content =
          "iFrame rendering can be buggy, so please only render iframes when the URL is complete\n"

        token = state.push("text", "", 0)
        token.content = ch + content

        token = state.push("paragraph_close", "p", -1)
        token.markup = "/i/"
      }
    }

    return true
  }

  md.block.ruler.before("paragraph", "iframe", iframe)
}

},{}]},{},[1]);
export default markdownItIframe