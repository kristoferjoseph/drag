/*global describe: false, it: false, expect: false, afterEach: false, beforeEach: false*/
(function ($) {
  'use strict';

  describe("Test", function() {

    it("has jQuery available", function() {
      expect($).to.exist;
    });

  });

  describe("jQuery", function() {

    it("has event stop method", function() {
      expect($.Event.prototype.stop).to.be.a("function");
    });

    it("has drag method", function() {
      expect($().drag).to.be.a("function");
    });

  });

  describe("drag", function() {

    beforeEach(function () {
      this.$el = $('<div></div>').drag();
    });

    afterEach(function () {
      this.$el = null;
      $('body').off();
    });

    it("returns a jQuery object", function() {
      expect(this.$el).to.exist;
    });

    it("has a drag method", function() {
      expect(this.$el.drop).to.exist;
    });

    it("has a drop method", function() {
      expect(this.$el.drop).to.exist;
    });

    it("has an enter method", function() {
      expect(this.$el.enter).to.exist;
    });

    it("has a leave method", function() {
      expect(this.$el.leave).to.exist;
    });

    it("has a start method", function() {
      expect(this.$el.start).to.exist;
    });

    it("has an end method", function() {
      expect(this.$el.end).to.exist;
    });

    it("has draggable enabled on mousedown", function() {
      this.$el.mousedown();
      expect(this.$el.attr('draggable')).to.equal('true');
    });

    it("has original offset stored on mousedown", function() {
      this.$el.mousedown();
      expect(this.$el.offsetX).to.not.equal(undefined);
      expect(this.$el.offsetY).to.not.equal(undefined);
    });

    it("has start function called on dragstart", function(done) {
      this.timeout(1);
      this.$el = $('<div></div>').drag({
        start: function(e, $el) {
          done();
        }
      });

      this.$el.trigger({
        'type': 'dragstart',
        'dataTransfer': {
          'setData': function (data, id) {
            this.data = data;
          },
          'effectAllowed': 'move'
        }
      });

    });

    it("has dataTransfer effectAllowed set to copyMove by default", function() {
      this.$el = $('<div></div>').drag({
        start: function(e, $el) {
          expect(e.dataTransfer.effectAllowed).to.equal("copyMove");
        }
      });

      this.$el.trigger({
        'type': 'dragstart',
        'dataTransfer': {
          'setData': function (data, id) {
            this.data = data;
          },
          'effectAllowed': 'move'
        }
      });

    });

    it("has dataTransfer data set to Text", function() {
      this.$el = $('<div></div>').drag({
        start: function(e, $el) {
          expect(e.dataTransfer.data).to.equal("Text");
        }
      });

      this.$el.trigger({
        'type': 'dragstart',
        'dataTransfer': {
          'setData': function (data, id) {
            this.data = data;
          },
          'effectAllowed': 'move'
        }
      });

    });

    it("has drag function called on drag", function(done) {
      this.timeout(1);
      this.$el = $('<div></div>').drag({
        drag: function(e, $el) {
          done();
        }
      });

      this.$el.trigger({
        'type': 'drag'
      });

    });

    it("has enter function called when dragenter is triggered on the drop target", function(done) {
      this.timeout(1);
      this.$el = $('<div></div>').drag({
        enter: function(e, $el) {
          done();
        }
      });

      $('body').trigger({
        'type': 'dragenter'
      });

    });

    it("has leave function called when dragleave is triggered on the drop target", function(done) {
      this.timeout(1);
      this.$el = $('<div></div>').drag({
        leave: function(e, $el) {
          done();
        }
      });

      $('body').trigger({
        'type': 'dragleave'
      });

    });

    it("has drop function called when drop is triggered on the drop target", function(done) {
      this.timeout(1);
      this.$el = $('<div></div>').drag({
        drop: function(e, $el) {
          done();
        }
      });

      $('body').trigger({
        'type': 'drop',
        'originalEvent': {
          'pageX': 0,
          'pageY': 0
        }
      });

    });

    it("has end function called on dragend", function(done) {
      this.timeout(1);
      this.$el = $('<div></div>').drag({
        end: function(e, $el) {
          done();
        }
      });

      this.$el.trigger({
        'type': 'dragend'
      });

    });

    it("has draggable disabled on dragend", function() {
      this.$el.trigger('dragend');
      expect(this.$el.attr('draggable')).to.equal('false');
    });

  });

}(jQuery));
