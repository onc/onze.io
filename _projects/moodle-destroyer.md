---
layout: project
title:  "moodle-destroyer.el"
github: manly-man/moodle-destroyer.el
description: "Emacs plugin for moodle-destroyer-tools"
---
Moodle provides a really bad interface for grading many assignments.
Therefore we started the [moodle-destroyer-tools](https://github.com/manly-man/moodle-destroyer-tools).

At first this was more a tools to merge csv-data, but now it uses the moodle-api directly.
So moodle-destroyer-tools are now more like a wrapper for moodle which offers a json iterface for moodle.

While json is a great joice for data-transfer, it is not that great for writing detailed (multiline) feedback.

moodle-destroyer.el converts the `gradingfile.json` from moodle-destroyer-tools to emacs `org-mode` for grading.
After finishing grading, it exports `org-mode` back to json, so you can upload the gradings via moodle-destroyer-tools.

