/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const Template2 = () => (
  <div>
    Test with:
    <br />
    Iframe
    <iframe title="test" src="https://www.google.co.il/" />
    <br />
    Flash
    <object width="400" height="50" data="bookmark.swf"></object>
    <br />
    Video
    <video width="320" height="240" controls>
      <source src="movie.mp4" type="video/mp4" />
      <source src="movie.ogg" type="video/ogg" />
      Your browser does not support the video tag.
    </video>
    <br />
    Audio
    <audio controls src="/media/examples/t-rex-roar.mp3">
      Your browser does not support the
      <code>audio</code>
    </audio>
    <br />
    Form
    <form action="/">
      <label htmlFor="title">
        Title
        <input name="title" type="text" />
      </label>
      <input type="submit" />
    </form>
    <script>alert()</script>
  </div>
);

Template2.displayName = 'Template with not allowed tags';

export default Template2;
