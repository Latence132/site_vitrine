import EventEmitter2 from 'eventemitter2'

if (process.BROWSER_BUILD) {
  window.EventEmitter2 = EventEmitter2.EventEmitter2
}
