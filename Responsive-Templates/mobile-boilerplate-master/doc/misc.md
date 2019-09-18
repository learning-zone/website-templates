[Mobile Boilerplate homepage](http://mobileboilerplate.com/) | [Documentation table of contents](README.md)

# Miscellaneous

## Tools

### Mobile Bookmark Bubble

The Mobile Bookmark Bubble is a JavaScript library that adds a promo bubble to the bottom of your mobile web application, inviting users to bookmark the app to their device's home screen. The library uses HTML5 local storage to track whether the promo has been displayed already, to avoid constantly nagging users.

The Mobile Bookmark Bubble included with Mobile Boilerplate is based upon the original repository [here](http://code.google.com/p/mobile-bookmark-bubble/) on Google Code.

You can also check out these alternative scripts:

Mobile Safari only: [https://github.com/cubiq/add-to-homescreen](https://github.com/cubiq/add-to-homescreen)

Mobile Safari + others: [https://github.com/okamototk/jqm-mobile-bookmark-bubble](https://github.com/okamototk/jqm-mobile-bookmark-bubble)

## .gitignore

Mobile Boilerplate includes a basic project-level `.gitignore`. This should
primarily be used to avoid certain project-level files and directories from
being kept under source control. Different development-environments will
benefit from different collections of ignores.

OS-specific and editor-specific files should be ignored using a "global
ignore" that applies to all repositories on your system.

For example, add the following to your `~/.gitconfig`, where the `.gitignore`
in your HOME directory contains the files and directories you'd like to
globally ignore:

```gitignore
[core]
    excludesfile = ~/.gitignore
```

* More on global ignores: https://help.github.com/articles/ignoring-files
* Comprehensive set of ignores on GitHub: https://github.com/github/gitignore
