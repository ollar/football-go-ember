import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('contacts');
  this.route('register');
  this.route('profile', { path: 'profile/:player_id'});
});

export default Router;
