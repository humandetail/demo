export default {
  mounted (el: any, bindings: any) {
    el.handler = function (e: any) {
      if (!el.contains(e.target)) {
        bindings.value(e)
      }
    }
    document.addEventListener('click', el.handler, true)
  },
  unmounted (el: any) {
    document.removeEventListener('click', el.handler)
  }
}
