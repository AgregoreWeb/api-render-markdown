# api-render-markdown
API for rendering markdown, made for use in Agregore

## Usage
This API is designed for use in vanilla javascript modules.

For imports you will need two things:  
Key: `bfa59937d1c74437f015096ab07ef04c30c051ad5a9d4bdf9d01abb19ca97f1c`  
> Note: This is a temporary drive and is due to change. Currently this is keyed by @KyGost

Version: `962`  
> Note: This may be out of date and is also due to change.

### Importing main API
This includes highlighting and commonmark compliant markdown rendering. Uses [markdown-it](https://github.com/markdown-it/markdown-it).
```javascript
import Markdown from 'hyper://<ADDRESS>+<VERSION>/index.js'
```

### Importing plugins
```javascript
import <PLUGIN> from 'hyper://<ADDRESS>+<VERSION>/plugins/<PLUGIN>.js'
Markdown.use(...<PLUGIN>)
```

## Plugins
This API has a few plugins to achieve a few objectives.

### Hider
**Name**: `hider`  
**Achieves**: Hiding spoilers/warnings  
**Uses**: [`markdown-it-container`](https://github.com/markdown-it/markdown-it-container)  
**Markdown usage**:
```markdown
:::
Collapsed words
:::

::: Spoiler: The secrets lie within!
Collapsed words
:::
```
**Notes**: Supported keywords: `spoiler`, `warning`, `TW`, `hider`

### IFrame
**Name**: `iframe`  
**Achieves**: Embedding iframes  
**Uses**: [`markdown-it-iframe`](https://github.com/rjriel/markdown-it-iframe)  
**Markdown usage**:
```markdown
/i/<URL>
```
**Notes**: Will render at 100% width

### Todo
**Name**: `Todo`  
**Achieves**: Adds Github-like todo lists
**Uses**: [`markdown-it-todo`](https://github.com/dexfire/markdown-it-todo)  
**Markdown usage**:
```markdown
- [ ] Unchecked
- [x] Checked
```
