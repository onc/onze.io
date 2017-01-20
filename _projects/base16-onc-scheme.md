---
layout: project
title:  "base16-onc-scheme"
github: onc/base16-onc-scheme
description: "Custom base16 colorscheme based on the dark base16 google colorscheme."
---
My custom colorscheme based on the dark base16 google colorscheme.

To build the colorscheme for your application use [base16-builder](https://github.com/base16-builder/base16-builder) from `npm` like this:

```sh
$ base16-builder -s onc.yaml -t iterm2 -b dark > base16-onc.scheme
```

Run `$ base16-builder ls templates` to get a list of supported applications.


![emacs base16](/assets/images/base16-onc/emacs-base16.png)

![zsh base16](/assets/images/base16-onc/zsh-base16.png)
