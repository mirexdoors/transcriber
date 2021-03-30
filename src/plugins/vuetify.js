import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#343434',
        secondary: '#AEAEAE',
        accent: '#FFFFFF',
      }
    }
  }
});
