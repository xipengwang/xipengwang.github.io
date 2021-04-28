---
layout: old_post
title: Autonoums Robots
---
---
<div class="posts">
  {% for post in site.posts %}
    {% if post.tag == "AutonomousRobotsBook" %}
    <article class="post">
    <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>
    <div class="entry">
      {{ post.excerpt }}
    </div>
    </article>
    {% else %}
    {% endif %}
  {% endfor %}
</div>
