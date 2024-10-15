---
order: 0
layout: default
title: About
permalink: /about/
---
<img class="big-avatar" src="/assets/images/avatar-big.jpg" />

Hey! My name is Christian and I love working with data.
At the moment, I am a Data Engineer at Liebherr Development Center in Ulm, Germany.
Previously, I was a Ph.D. student at Ulm University, where my research focued on making big and complex data comprehensible. 

In my free time I enjoy cooking and I play table tennis in a local team.
I like to take pictures with old analog cameras, especially when traveling or hiking.
Also I like to sail a boat.

<ul class="contact-list">
  {% if site.email %}
  <li>
    {% include icon-mail.html username=site.email %}
  </li>
  {% endif %}

  {% if site.git_url %}
  <li>
    {% include icon-git.html git_url=site.git_url %}
  </li>
  {% endif %}

  {% if site.twitter_username %}
  <li>
    {% include icon-twitter.html username=site.twitter_username %}
  </li>
  {% endif %}

  {% if site.instagram_username %}
  <li>
    {% include icon-instagram.html username=site.instagram_username %}
  </li>
  {% endif %}
</ul>