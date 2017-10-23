const Dep = require('./dep');
const {
  cloneDeep
} = require('./util')
let id = 0;

/**
 * @param {Function} expFn
 * @param {Function} cb
 */
class Watcher {
  constructor(expFn, cb) {
    this.uid = id++;
    this.depIds = new Set();
    this.expFn = expFn;
    this.cb = cb;
    this.value = this.get()
    this.oldValue = cloneDeep(this.value);
  }
  update() {
    this.run()
  }
  run() {
    let value = this.get()
    if (value !== this.oldValue) {
      this.value = value;
      this.cb(value, this.oldValue);
      this.oldValue = cloneDeep(value)
    }
  }
  addDep(dep) {
    if (!this.depIds.has(dep.id)) {
      this.depIds.add(dep.id)
      dep.addSub(this)
    }
  }
  get() {
    Dep.target = this
    let value = this.expFn()
    Dep.target = null
    return value
  }
}

module.exports = Watcher