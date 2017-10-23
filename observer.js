const Dep = require('./dep')
const {
    isObject,
    def,
    hasOwn,
    cloneDeep
} = require('./util')


function observeObject(obj, key, value) {
    let dep = new Dep()
    let childOb = observe(value);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set(newValue) {
            if (newValue === value) return
            value = newValue
            observeObject(obj, key, value)
            dep.notify()
        }
    })
}

function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }
    }
}

//监听数组方法
function observifyArray(arr) {
    const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'] 
    let arrayAugmentations = Object.create(Array.prototype) 
    aryMethods.forEach(method => {
        arrayAugmentations[method] = function (...arg) {
            let ob = this.__ob__
            let oldValue = cloneDeep(this)
            //调用原生方法
            Array.prototype[method].apply(this, arg)
            ob.dep.notify()
        }
    })

    //替换监听数组方法
    Object.setPrototypeOf(arr, arrayAugmentations)
}

function observe(value) {
    if (!isObject(value)) return;
    let ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}

/**
 * 观察数据
 * @param {Object} value
 */
class Observer {
    constructor(value) {
        this.dep = new Dep()

        //标记已经初始化
        def(value, '__ob__', this);

        if (Array.isArray(value)) {
            observifyArray(value)
            this.observeArray(value)
        } else {
            this.observeObject(value)
        }
    }

    observeArray(arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
            observe(arr[i])
        }
    }

    observeObject(obj) {
        Object.keys(obj).forEach(key => {
            observeObject(obj, key, obj[key])
        })
    }
}



module.exports = Observer;