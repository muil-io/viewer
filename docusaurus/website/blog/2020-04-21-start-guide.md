---
title: Build Dynamic Email Templates using React
author: Nir Avraham
authorURL: http://twitter.com/ericnakagawa
authorImageURL: https://scontent.ftlv5-1.fna.fbcdn.net/v/t31.0-1/cp0/p40x40/13411627_10207784128175070_1188973701029606411_o.jpg?_nc_cat=103&_nc_sid=dbb9e7&_nc_ohc=Q8RjAr8j3JkAX-3uJFA&_nc_ht=scontent.ftlv5-1.fna&oh=c0d926136771fe7ad1d0be3354ce51c9&oe=5EC66375
---

Building an email template is hard. Building a dynamic email template is very hard. Adding variables, loops, dynamic text based on variables or even a chart is overhead. What if we could build an email using React? Fortunately, this is exactly what Muil is doing.

<!--truncate-->

> Muil is a powerfull service to build dynamic emails, images and PDFs using React

Yes, it can generate images and PDFs also but in this post, I'll talk about emails and how to build one.

<br>

![Example](/media/2020-04-21-start-guide/example.png)

<br>

---

## Step 1 - Register to Muil's service

Go to https://portal.muil.io and register to Muil. Be sure you know your project ID. This ID will be attached to your URL for generating emails.

![Register](/media/2020-04-21-start-guide/register.png)

<br>

## Step 2 - Install Muil

In this example, I'll attach Muil to an empty project (but can be attached to any existing project e.g. create-react-app).

In the root directory run:

```
npx -p @muil/cli muil-cli init
```

![Install](/media/2020-04-21-start-guide/install.png)

> NOTE: I've chosen the Automate Installation in this guide https://docs.muil.io/docs/getting-started/quickStart/

<br>

## Step 3 - Create an Email Template

### 1. Run Editor

Let's run Muil Editor using this command:

```
yarn muil
```

and the browser will open:

![Editor](/media/2020-04-21-start-guide/editor.png)

<br>

### 2. New Template

Let's clear all the templates from the templates directory and start fresh.

We'll create a new template called **HelloWorld.template.js**:

```js
import React from 'react';

const HelloWorld = () => <h1>Hello World</h1>;

export default HelloWorld;
```

<br>

### 3. Template Name

In the left panel, you will see:

![Template Name](/media/2020-04-21-start-guide/template_name.png)

If you would like to add a meaningful name just add:

```js
import React from "react""";

const HelloWorld = () => <h1>Hello World</h1>;

HelloWorld.displayName = "Hello World";

export default HelloWorld;
```

![Template Name](/media/2020-04-21-start-guide/template_name2.png)

<br>

### 4. Dynamic Props

Let's use one of the greatest features of Muil. The dynamic props.

Add your file dynamicProps and use them inside your component:

```js
import React from 'react';

const HelloWorld = ({ name, url, projects }) => (
  <div className="root">
    <h1>Hello World, {name}</h1>
    <a href={url}>Click Here</a>
    <ul>
      {projects.map(({ label, value }) => (
        <li key={label}>
          {label}: {value}
        </li>
      ))}
    </ul>
  </div>
);

HelloWorld.displayName = 'Hello World';
HelloWorld.dynamicProps = {
  name: 'John',
  url: 'https://wwww.muil.io',
  projects: [
    { label: 'Project 1', value: 3 },
    { label: 'Project 2', value: 10 },
    { label: 'Project 3', value: 60 },
  ],
};
export default HelloWorld;
```

The result:

![Result 1](/media/2020-04-21-start-guide/result1.png)

In the right panel you can see an editor of the dynamic props so you can change it in live:

![Dynamic Props](/media/2020-04-21-start-guide/dynamic_props.png)

### 5. Adding some CSS

You can add style using simple CSS, CSS modules and styled-components. I chose to use a simple CSS

```js
import React from "react";
import "./HelloWorld.css";
...
```

> You can add **HelloWorld.css** from https://gist.github.com/nir905/934b817577a52636115b3c181c5f0348

![Result 2](/media/2020-04-21-start-guide/result2.png)

> More about styling https://docs.muil.io/docs/getting-started/stylingTemplate/

<br>

## Step 4 - Add Charts

### 1. Install Muil Charts

To install Muil Charts run this command:

```
yarn add -D @muil/charts
```

### 2. Simple Bar Chart

To add a bar chart I'll add this code:

```js
import React from 'react';
import { BarChart } from '@muil/charts';
import './HelloWorld.css';

const HelloWorld = ({ name, url, projects }) => (
  <div className="root">
    <h1>Hello World, {name}</h1>
    <a href={url}>Click Here</a>
    <BarChart className="bar" height={200} legend={false} categories={[{ color: '#17a2b8' }]} series={projects} />
  </div>
);

HelloWorld.displayName = 'Hello World';

HelloWorld.dynamicProps = {
  name: 'John',
  url: 'https://wwww.muil.io',
  projects: [
    { label: 'Project 1', value: 3 },
    { label: 'Project 2', value: 10 },
    { label: 'Project 3', value: 60 },
  ],
};

export default HelloWorld;
```

![Result 3](/media/2020-04-21-start-guide/result3.png)

> More about charts https://docs.muil.io/docs/extra/charts/

<br>

## Step 5 - Publish Templates

Congrats! we've finished our template and now we would like to use it.

### 1. Login to Muil service

To login you need to run this command:

```
yarn muil-cli login
```

Use the email and password you've registered in **Step 1**.

### 2. Publish templates

To publish your templates just run this command:

```
yarn muil-cli publish
```

<br>

## Step 6 - Send An Email

To send an email you should authorize first. The simplest way is to use an API key.

### 1. Create an API key

Run this command to create an API key:

```
yarn muil-cli apikey
```

![API key](/media/2020-04-21-start-guide/api.png)

As you can see, this command can create a new API key and enable/disable an API key.

Select Generate a new api key and then enter a name.

> **IMPORTANT:** The key and the id will only be displayed now! If you would like to use them keep in mind to save them!

> For more authorization options read here https://docs.muil.io/docs/api/authorization

Use the project ID you've entered in **Step 1**.

<br>

### 2. Send An Email

To send an email you need to send a request:

```
curl
- request POST 'https://us-central1-muil-io.cloudfunctions.net/templates/[projectId]/[template name]/email' \
- header 'Content-Type: application/json' \
- header 'x-api-key: [generated api key]' \
- data-raw '{
     "subject": "Welcome World",
     "to": "nir@muil.io",
     "props": {
       "name": "John",
       "url": "https://wwww.muil.io",
       "projects": [
         { "label": "Project 1", "value": 3 },
         { "label": "Project 2", "value": 10 },
         { "label": "Project 3", "value": 60 }
       ]
     }
  }'
```

> For more options visit here https://docs.muil.io/docs/api/sendingEmail

<br>

### 3. The Result

![Example](/media/2020-04-21-start-guide/example.png)

## Conclusion

Muil service lets you build dynamic and simple templates. I haven't gone through all the features of Muil (such as email attachments, generating PDF/Image and more available charts). For all the features you can visit Muil's Documentation https://docs.muil.io

Thank you for reading :)
