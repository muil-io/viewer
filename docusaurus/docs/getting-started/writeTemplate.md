---
id: writeTemplate
title: Write Template
sidebar_label: Write Template
---

## Template File

Each file with the extension of `.template.js` will be added to the editor.

For example, let's create a `GettingStarted.template.js`:

```
import React from 'react';

const GettingStarted = () => (
	<div>Welcome Guest!</div>
);

export default GettingStarted;
```

## Template Name

By default, the name of the template will be the name of the file.
To add a custom name use `displayName`:

```
import React from 'react';

const GettingStarted = () => (
	<div>Welcome Guest!</div>
);

GettingStarted.displayName = 'Getting Started Template';

export default GettingStarted;
```

## Dynamic Props

To inject dynamic props to the template and be able to change them in the editor use `dynamicProps`:

```
import React from 'react';

const GettingStarted = ({name}) => (
	<div>Welcome {name}!</div>
);

GettingStarted.dynamicProps = {
  name: 'John',
};

export default GettingStarted;
```

## Final Result

```
import React from 'react';

const GettingStarted = ({name}) => (
	<div>Welcome {name}!</div>
);

GettingStarted.displayName = 'Getting Started Template';

GettingStarted.dynamicProps = {
  name: 'John',
};

export default GettingStarted;
```
