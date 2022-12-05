import { App } from 'vue'
import clickOutside from './ClickOutside'

export default {
  install (app: App) {
    app.directive('click-outside', clickOutside)
  }
}
