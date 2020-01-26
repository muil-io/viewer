#Installation

`npm install --dev muil`
or
`yarn add --dev muil`

#Usage

1. Add to package.json:

```
 "scripts": {
    ...
    "muil": "muil dev",
    "muil:publish": "muil publish"
  },
```

2. Add templates:

```
root
├───src
│   ├───components
│   │   ├───Component1.js
│   │   ├───Component2.js
│   │   └───Component3.js
├───templates
│   ├───Template1.js
│   ├───Template2.js
│   └───Template3.js
```

3. Run editor with `yarn muil` to edit your email.

###

4. Publish templates with `yarn muil:publish`
   - this command will ask your email and password of your muil account
