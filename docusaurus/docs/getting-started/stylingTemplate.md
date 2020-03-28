---
id: stylingTemplate
title: Styling Template
sidebar_label: Styling Template
---

## CSS

CSS is supported out of the box:

```
import React from 'react';
import './app.css';

const Button = () => (
	<button className='button'>Click Me</button>
);

export default Button;
```

> class names will be shared across all templates!

## CSS Modules

CSS Modules is supported by creating css files with the extention `.module.css`:

```
import React from 'react';
import './Button.module.css';

const Button = () => (
	<button className='button'>Click Me</button>
);

export default Button;
```

> class names will be unique for the specific template

## Styled Components

To use styled-components just install `styled-components` and use it:

```
import React from 'react';
import styled from 'styled-components`

const PrimaryButton = styled.button`
	color: red;
`;

const Button = () => (
	<PrimaryButton>Click Me</PrimaryButton>
);

export default Button;
```

> You can add `babel-plugin-styled-components` by
> [creating a custom babelrc.](configurations/customBabel.md)
