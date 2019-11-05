let storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    clear:function(){
        localStorage.clear();
    }
}
export default storage;