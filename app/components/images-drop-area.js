import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['dragover', 'isEmpty'],
  dragover: false,

  isEmpty: true,

  didRender() {
    if (this.get('images.length')) {
      this.set('isEmpty', false);
    } else {
      this.set('isEmpty', true);
    }
  },

  actions: {
    dragEnter(e) {
      e.preventDefault();
      this.set('dragover', true);
    },

    dragOver(e) {
      e.preventDefault();
      this.set('dragover', true);
    },

    dragLeave() {
      this.set('dragover', false);
    },

    drop(e) {
      e.preventDefault();
      this.set('dragover', false);
      const files = Array.prototype.slice.call(e.dataTransfer.files);

      this.sendAction('uploadImage', files[0])
    },

    removeImage() {
      this.sendAction('removeImage');
    }
  },
});
