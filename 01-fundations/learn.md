# System File

## Methods

### Read Files
```
node.js

const fs = require('fs')

const data = readFileSync('fileName.extension');

````

### Edit File Content
```
node.js

const fs = require('fs')

const data = readFileSync('fileName.extension');
const newData = data.replace(/React/ig, "New Content");

```

### Create a file
```
node.js

const fs = require('fs')

const data = readFileSync('fileName.extension');
const newData = data.replace(/React/ig, "New Content");

fs.writeFileSync('fileName.extension', newData)

```

### Delete a file
