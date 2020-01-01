> 修饰器对类的行为的改变是在代码编译时发生的, 而不是在运行时. 这意味着, 修饰器能在编译阶段运行代码, 也就是说, 修饰器本质就是编译时执行函数.

Typesctit 的功能

- 类 Classes
- 接口 Iterfaces
- 模块 Modules
- 类型注解 Type annotations 装饰器
- 编译时类型检查 Compile time type checking
- 箭头函数 Arrow ---- Lambda 表达式

装饰器是一个函数用来修饰类的行为.

- 装饰器（Decorator） 仅提供定义劫持，能够对类及其方法、方法入参、属性的定义并没有提供任何附加元数据的功能。
- 注解（Annotation） 仅提供附加元数据支持，并不能实现任何操作。需要另外的 Scanner 根据元数据执行相应操作。

[更详细的内容](https://www.jianshu.com/p/e280d916495b)

- 类装饰
- 方法装饰
- 方法参数装饰
- 属性装饰

执行顺序 [更详细的内容](https://www.cnblogs.com/winfred/p/8216650.html)

1. 有多个参数装饰器时：从最后一个参数依次向前执行

2. 方法和方法参数中参数装饰器先执行。

3. 类装饰器总是最后执行。

4. 方法和属性装饰器，谁在前面谁先执行

5. 类修饰器最后执行

6. 多个装饰器修饰类或者方法时, 顺序执行, 回调是由里向外执行

![Alt text](/09/ts-decorate/result.png)
