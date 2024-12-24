# Hard Hack Website Docs for Site Builders

## Dependencies
Jinja is used for templating (for reducing redundancy in HTML files). PyYAML is
used for configuring the templating program and add variables to templates.

## Jinja Quick Overview

Jinja is a templating engine, a library with 
functionality that takes a file or project directory
as input and outputs a "compiled" version. The input project should have 
template directives as strings inside of its text files (e.g. .html files) that
look like 

```
{% block content %}
...
{% endblock content %}
```

Jinja will then read these directives and replace them with appropriate text
or store contextual information about what is inside the blocks that it can
then use to replace other directives with more appropriate text.

### "Compiling" (idk what to call it) with Jinja in this project
Jinja is only a library. A python program, hardhack.py, actual executes code
using Jinja. To compile your templates, `cd` to the project's root, then run 

```
python hardhack.py
```

This should read files in the `/templates/` folder, and use them to output .html
files into the root, which can be read by GH Pages. It is probably worth noting
that the templates file and hardhack.py will be shared on Pages as well. 
There shouldn't be any particularly sensitive information, but perhaps it is a
good idea to just share a subfolder with just the compiled files.

### Creating a new page using a template

A template is simply a .html file in `/templates/`. The `base.html` template
expresses the menu bar, background, and other elements common to all pages.
The important thing to notice is that there is a `{% block content %}` section
near the end of `base.html`. This can be overwritten by other templates.

Let's say we want to create a new page that utilizes the elements existing in 
the base template, but has different content. To do so, create a .html file
in `/templates/`. (For example, `/templates/mynewpage.html`)
It's name will be the suffix of the url (e.g. a mynewpage.html template,
when compiled,
will produce a page accessible from `hardhack.dev/mynewpage`).

Add this directive: 
```
{% extends "base.html" %}
```

This directive will allow Jinja to generate a page from `base.html`, but
replace its `content` block with what you specify in your new, inheriting 
template. To specify this content, simply create a content block within 
your new template just like the one that exists in `base.html`. 
Your file might look something like this:

```
{% extends "base.html" %}

{% block content %}
<p>This content will be a part of mynewpage!</p>
{% endblock content %}
```

Upon compilation, a .html file will be created in the root (in our example, 
`/mynewpage.html`). It will look much like the base template, but with the 
content block replaced with whatever you wrote inside your template's content
block. This page will be visible when the project is published via GitHub Pages.
It is possible that the compilation step could become a GitHub action, per 
CI/CD philosophy; if this happens, you will not need to compile before 
pushing to the repo.