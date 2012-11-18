# Drag
-----------------

An HTML5 drag & drop plugin for jQuery.

This is meant to be used as a drop in replacement for jQuery UI draggable in modern browsers that support HTML5 drag & drop.
Much more performant than jQuery-ui draggable with a more native app feel and without the bloat.

Very inspired by the [dagron](https://github.com/ded/Dagron) ender plugin written by @ded 

Example usage
--------------

```javascript
  $('.selector').drag();
```
> By default it will use the body as the drop target

You can pass in an optional options object to the constructor
```javascript
  $('.selector').drag({
    target: '.drop-target',
    'setData': 'Text',
  	'effectAllowed': 'copyMove',
  	start: function (e, $el) {
      console.log("Start", e, $el);
      return this;
    },
    drag: function (e, $el) {
      // This fires like crazy!
      // console.log("Drag", e, $el);
      return this;
    },
    enter: function (e, $el) {
      console.log("Enter", e, $el);
      return this;
    },
    leave: function (e, $el) {
      console.log("Leave", e, $el);
      return this;
    },
    drop: function (e, $el) {
      console.log("Drop", e, $el);
      return this;
    },
    end: function (e, $el) {
      console.log("End", e, $el);
      return this;
    }
  });
```
> This example shows all of the possible options parameters