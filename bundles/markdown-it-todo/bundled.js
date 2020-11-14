let markdownItTodo
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// let markdownItTodo
// TOP OF BUNDLE

markdownItIframe = require('markdown-it-todo')

// BOTTOM OF BUNDLE
// export default markdownItTodo
},{"markdown-it-todo":2}],2:[function(require,module,exports){
'use strict'

const isInline = token => token && token.type === 'inline'
const isParagraph = token => token && token.type === 'paragraph_open'
const isListItem = token => token && token.type === 'list_item_open'
const startsWithTodoMarkdown = token => token && /^\[([ Xx])]/.test(token.content)

function isTodoItem(tokens, index) {
  return isInline(tokens[index]) &&
    isParagraph(tokens[index - 1]) &&
    isListItem(tokens[index - 2]) &&
    startsWithTodoMarkdown(tokens[index])
}

function setAttr(token, name, value) {
  const index = token.attrIndex(name)
  const attr = [name, value]

  if (index < 0) {
    token.attrPush(attr)
  } else {
    token.attrs[index] = attr
  }
}

function parentToken(tokens, index) {
  const targetLevel = tokens[index].level - 1
  for (let i = index - 1; i >= 0; i--) {
    if (tokens[i].level === targetLevel) {
      return i
    }
  }

  return -1
}

function todoify(token, TokenConstructor) {
  token.children.unshift(createTodoItem(token, TokenConstructor))

  const sliceIndex = '[ ]'.length
  token.content = token.content.slice(sliceIndex)
  token.children[1].content = token.children[1].content.slice(sliceIndex)
}

function createTodoItem(token, TokenConstructor) {
  const todo = new TokenConstructor('html_inline', '', 0)
  if (/^\[ ]/.test(token.content)) {
    todo.content = '<input disabled="true" type="checkbox" class="markdown-todo"></input>'
  } else if (/^\[(x|X)]/.test(token.content)) {
    todo.content = '<input disabled="true" type="checkbox" checked="true" class="markdown-todo"></input>'
  }

  return todo
}

module.exports = md => {
  md.core.ruler.after('inline', 'evernote-todo', state => {
    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        todoify(tokens[i], state.Token)
        setAttr(tokens[i - 2], 'class', 'task-list-item')
        setAttr(tokens[parentToken(tokens, i - 2)], 'class', 'task-list')
      }
    }
  })
}

},{}]},{},[1]);
export default markdownItTodo