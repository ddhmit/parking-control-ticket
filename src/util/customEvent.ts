import EventEmitter from 'events';

export const CustomEvents = {
  ReloadApp: 'reload_app'
};

export default new EventEmitter();
