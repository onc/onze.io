---
layout: post
title:  "Publishing jekyll using git"
author: "onze"
date: 2017-01-22 21:23:00 +0100
categories: jekyll git
---
Deploying blog-posts should be as quick and easy as a `git push`.
Using jekyll and git this can easily be done.
There is a [guide](https://jekyllrb.com/docs/deployment-methods/#git-post-receive-hook) on how to install such a hook on your server.

Unfortunately this guide is missing one important part.
If you are pushing, the `post-receive` script is not running in a login-shell!
So you have to make sure, your script finds your jekyll binary.

My hook looks something like this:

```sh
#!/bin/sh
PATH="`ruby -e 'print Gem.user_dir'`/bin:${PATH}"

GIT_REPO=$HOME/my-webapp
TMP_GIT_CLONE=$HOME/tmp/my-webapp
PUBLIC_WWW=/path/to/your/webservers-directory
JEKYLL=$(which jekyll)

git clone $GIT_REPO $TMP_GIT_CLONE
$JEKYLL build -s $TMP_GIT_CLONE -d $PUBLIC_WWW
rm -Rf $TMP_GIT_CLONE
exit
```
