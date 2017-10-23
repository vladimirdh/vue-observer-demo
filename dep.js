let id = 0

class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    depend() { 
        // 依赖收集，在getter中执行，向当前watch添加依赖
        Dep.target && Dep.target.addDep(this)
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

//Watch
Dep.target = null

module.exports = Dep;