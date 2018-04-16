declare namespace _ {
    function concat<T>(_list:Array<T>, ...args:Array<T>[]):Array<T>[];
    function difference<T>(_list:Array<T>, _values:Array<T>):Array<T>[];
}