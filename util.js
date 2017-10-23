
function isObject(val) {
    return typeof val === 'object' && val !== null
}

function def(obj, key, val) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: false,
        writable: true,
        configurable: true
    })
}

function hasOwn(value, key) {
    return Object.prototype.hasOwnProperty(value, key)
}

//简单实现，并不可靠
function cloneDeep(value) {
    return JSON.parse(JSON.stringify(value))
}

module.exports = {
    isObject,
    def,
    hasOwn,
    cloneDeep
}