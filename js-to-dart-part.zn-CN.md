---
title: Learning Dart as a JavaScript developer
description: Leverage your JavaScript knowledge when learning Dart.
body_class: highlight-languages
lastVerified: 2022-11-21T00:00:00.000Z
---

这个指南旨在利用你的 JavaScript 编程知识来学习 Dart。
它展示了两种语言的主要相似之处和不同之处，并介绍了 JavaScript 不支持的 Dart 概念。
作为 JavaScript 开发人员，Dart 应该会感觉非常熟悉，因为这两种语言共享许多概念。

与 JavaScript 一样，Dart 运行在事件循环上，因此两种语言以类似的方式执行代码。
例如，异步概念，如 futures（JavaScript 中的 promises）和 `async/await` 语法非常相似。

Dart 是强类型的，不像 JavaScript。
如果你使用过 TypeScript 或 Flow，这应该会简化学习 Dart。
如果你主要使用纯 JavaScript，可能需要更多的调整。
有了强类型，Dart 可以在编译之前捕获许多在 JavaScript 代码中可能存在的错误。

Dart 默认启用空安全。
JavaScript 不支持空安全。
作为 JavaScript 开发人员，可能需要一段时间来学习如何编写空安全的代码，但这样做的好处是更好地防止在编译 Dart 代码之前就检测到的空引用异常。 （从而避免在对 JavaScript 变量执行操作时出现的那些可怕的 `TypeError`。）

## 约定和代码检查

JavaScript 和 Dart 都有代码检查工具来强制执行标准约定。
虽然 JavaScript 提供了许多工具、标准和配置，Dart 只有一个官方的布局和样式约定集以及一个代码检查器来简化合规性。
Dart 分析器会对代码进行检查，并提供更多的分析功能。
要为你的项目自定义代码检查规则，请按照 [自定义静态分析][] 说明。

Dart 提供了 [`dart fix`][] 来查找和修复错误。

Dart 还提供了类似于 JavaScript 工具 [Prettier][] 的代码格式化程序。
要在任何 Dart 项目中格式化代码，请在命令行上运行 [`dart format`](/tools/dart-format)。
Dart 和 Flutter 的 IDE 插件也提供了这种能力。

Dart 支持在集合、参数或参数列表的逗号分隔列表中使用尾随逗号。当你添加尾随逗号时，格式化程序会将每个列表项放在自己的一行上。当你认为你的列表可能在以后有更多的项目时，请添加尾随逗号。仅仅为了格式化的好处而添加尾随逗号。

JavaScript 仅支持在列表和映射文字中使用尾随逗号。

:::secondary 想了解更多：

- 使用逗号使你的代码更像 HTML，请阅读 [使用尾随逗号][] 在 flutter.dev 上。
- 代码检查 Dart，请阅读 [代码检查规则][]。
- 编写良好的 Dart 代码，请阅读 [有效的 Dart][]。
  :::

## 内置类型

JavaScript 和 Dart 都将它们的数据分类为 *类型*。
每个变量都有一个关联的类型。
类型确定变量可以存储的值的类型以及可以对这些值执行的操作。
Dart 与 JavaScript 不同之处在于它为每个表达式和变量分配了静态类型。
静态类型预测了变量的值或表达式的值的运行时类型。
这意味着 Dart 应用程序具有静态类型的类型安全性。

JavaScript 提供了原始类型 `num`、`string` 和 `boolean`，以及 `null` 值，以及 *数组* 和 `Map` 类型。

Dart 支持以下内置类型：

- 数字（`num`、`int`、`double`）
- 字符串（`String`）
- 布尔值（`bool`）
- 列表（`List`，也称为数组）
- 集合（`Set`）
- 映射（`Map`）
- 符号（`Symbol`）
- 值 `null`（`Null`）

要了解更多，请查看 [内置类型][] 在 [Dart 语言导览][] 中。

Dart 中的所有非 `Null` 类型都是 Object 的子类型。
所有值也都是对象。
Dart 不使用像 JavaScript 那样的 "原始类型"。
相比之下，Dart 规范化或 *规范化* 了数字、布尔值和 `null` 值。
这意味着只存在一个具有数值 `1` 的 `int` 值。

:::note
JavaScript 有两个相等运算符，`==` 和 `===`。
`==` 运算符在对原始值进行任何必要的类型转换后执行相等性测试。
`===` 运算符不执行类型转换。
Dart 使用 `identical` 函数来检查两个值是否是相同的对象，并使用 `==` 运算符来检查对象是否认为它们是相等的。
:::

例如：
相等运算符 `==` 和 `identical()` 方法对于数字类型的相同值返回 `true`。请查看以下代码示例中的示例：

```dart
var a = 2;
var b = 1 + 1;

print(a == b); // 输出 true
print(identical(a, b)); // 输出 true；只存在一个 "2" 对象
```

### 原始类型

本节介绍了 Dart 如何表示 JavaScript 中的原始类型。

#### 数字

Dart 有三种用于保存数字的数据类型：

`num`
: 与 JavaScript 中的通用数字类型相当。

`int`
: 没有小数部分的数值。

`double`
: 任何 64 位（双精度）浮点数。

Dart API 将所有这些类型都作为类。
`int` 和 `double` 类型都将 `num` 作为它们的父类：

<img
src="/assets/img/guides/number-classes.png"
alt="num subclasses Object and int and double each subclass num">

由于 Dart 将数字视为对象，数字可以将它们自己的实用函数作为对象方法公开。
你不需要使用额外的对象来将函数应用于数字。

例如，要将 `double` 四舍五入为整数：

```js
let rounded = Math.round(2.5);
```

```dart
var rounded = 2.5.round();
```

#### 字符串

Dart 中的字符串与 JavaScript 中的字符串类似。
要编写字符串文字，将其括在单引号（`'`）或双引号（`"`）中。
大多数 Dart 开发人员使用单引号，但语言并没有强制规定。
如果你不想在字符串中转义单引号，可以使用双引号。

```dart
var a = 'This is a string.';
```

##### 转义特殊字符

要在字符串中包含具有其他含义的字符，比如用于字符串插值的 `$`，必须转义该字符。
Dart 中的转义特殊字符与 JavaScript 和大多数其他语言类似。
要转义特殊字符，请在该字符前面加上反斜杠字符（`\`）。

以下代码显示了一些示例。

```dart
final singleQuotes = 'I\'m learning Dart'; // I'm learning Dart
final doubleQuotes = "Escaping the \" character"; // Escaping the " character
final dollarEscape = 'The price is \$3.14.'; // The price is $3.14.
final backslashEscape = 'The Dart string escape character is \\.';
final unicode = '\u{1F60E}'; // 😎,  Unicode scalar U+1F60E
```

:::note
你可以使用带有或不带有花括号的四位十六进制字符。
要了解更多关于使用 Unicode 字符的信息，请参阅 [Runes and grapheme clusters][]。
:::

##### 字符串插值

JavaScript 支持模板文字。
这些使用反引号（`` ` ``）字符定界，有以下原因：

- 允许多行字符串
- 在字符串中插入嵌入式表达式
- 创建称为标记模板的特殊构造

在 Dart 中，你不需要将字符串括在反引号中来连接字符串或在字符串文字中使用插值。

要了解更多，请查看 [Strings][] 在 Dart 语言导览中。

与 JavaScript 模板文字一样，你可以使用 `${<expression>}` 语法将表达式插入字符串文字中。
Dart 使用此语法，并允许你在表达式使用单个标识符时省略花括号。

```dart
var food = 'bread';
var str = 'I eat $food'; // I eat bread
var str = 'I eat ${food}'; // I eat bread
```

#### 字符串连接和多行声明

在 JavaScript 中，你可以使用模板文字来定义多行字符串。
Dart 有两种定义多行字符串的方式。

<ol>
<li> 使用隐式字符串连接：
    Dart 会连接任何相邻的字符串文字，即使它们跨越多行：

```dart
final s1 = 'String '
    'concatenation'
    " even works over line breaks.";
```

</li>

<li> 使用多行字符串文字：
当在字符串的两侧使用三个引号（单引号或双引号）时，该文字可以跨越多行。

```dart
final s2 = '''
You can create
multiline strings like this one.
''';

final s3 = """
This is also a
multiline string.""";
```

</li>
</ol>

#### 相等性

Dart 认为两个字符串包含相同的代码单元序列时它们是相等的。要确定两个字符串是否具有相同的序列，请使用等于运算符（`==`）。

```dart
final s1 = 'String '
    'concatenation'
    " works even over line breaks.";
assert(s1 ==
    'String concatenation works even over '
        'line breaks.');
```

#### 布尔值

Dart 和 JavaScript 中的布尔值表示二进制条件。
这两个值表示一个值或表达式是否为 `true` 或 `false`。
你可以使用字面量 `true` 和 `false` 返回这些值，或者使用表达式如 `x < 5` 或 `y == null` 生成它们。

```js
let isBananaPeeled = false;
```

```dart
var isBananaPeeled = false;
```

## 变量

Dart 中的变量与 JavaScript 中的变量类似，但有两个例外：

1. 每个变量都有一个类型。
2. Dart 将所有变量作用域限制在块级，就像 JavaScript 中的 `let` 和 `const` 变量一样。

Dart 变量有两种方式获得类型：

1. 声明：在声明中写入类型。
2. 推断：用于初始化变量的表达式。按照 [约定][omit_local_variable_types]，当分析器可以推断类型时，请使用 `var` 或 `final`。

```js
// 声明并立即初始化变量
let name = "bob";
```

```dart
// 在不提供初始值时声明具体类型的变量
String name;
// 同时声明和初始化变量，Dart 推断类型
var name = 'bob';
```

变量只能接受其类型的值。

```dart
var name = 'bob';
name = 5; // 禁止，因为 `name` 的类型是 `String`。
```

与 JavaScript 变量一样，你可以将任何值赋给使用 `dynamic` 类型的 Dart 变量。

```js
// 声明一个变量
let name;
// 初始化变量
name = "bob";
```

```dart
// 声明一个没有类型或赋值的变量，Dart 推断为 'dynamic' 类型
var name;
// 初始化变量，类型仍然是 `dynamic`
name = 'bob';
name = 5; // 允许，因为 `name` 的类型是 `dynamic`。
```

### Final 和 const

JavaScript 和 Dart 都使用变量修饰符。两者都使用 `const`，但 `const` 的工作方式不同。JavaScript 使用 `const`，但 Dart 使用 `final`。

当你将 `final` 添加到 Dart 变量或 `const` 添加到 JavaScript 变量时，必须在其他代码读取其值之前初始化变量。初始化后，你无法更改这些变量的引用。

当 Dart 使用 `const` 时，它指的是编译时创建的特殊值。Dart 使用有限的表达式来创建这些不可变值。这些表达式 *不能* 产生副作用。在这些条件下，编译器可以预测常量变量或表达式的确切值，而不仅仅是它的静态类型。

```dart
final String name;
// 不能在此处读取 name，因为它没有初始化。
if (useNickname) {
  name = "Bob";
} else {
  name = "Robert";
}
print(name); // 在此处正确初始化。
```

:::note
当你创建对象时，类构造函数必须初始化 `final` 实例变量。这确保在任何人读取它们之前，这些变量都有一个值。

在 [类](#classes) 部分了解更多。
:::

在 Dart 中，*常量变量必须包含常量值*。非常量变量可以包含常量值，你也可以将其标记为 `const`。

```dart
var foo = const [];
  // foo 不是常量，但它指向的值是常量。
  // 你可以重新分配 foo 为不同的列表值，
  // 但它当前的列表值不能被更改。

const baz = []; // 等同于 `const []`
```

同样，类可以有自己的 `const` 构造函数，产生不可变实例。

你不能修改 JavaScript 或 Dart 中的 `const` 变量。JavaScript 允许你修改 `const` 对象的字段，但 Dart 不允许。

要了解更多，请参见 [类](#classes) 部分。

## 空安全

与 JavaScript 不同，Dart 支持空安全。
在 Dart 中，所有类型默认为非空安全。
这对 Dart 开发人员有利，因为 Dart 在编写代码时捕获空引用异常，而不是在运行时。

### 可空 vs 非空类型

以下代码示例中的变量都不能为 `null`。

```dart
// 在空安全的 Dart 中，这些变量永远不能为 null。
var i = 42; // 推断为 int。
String name = getFileName();
final b = Foo(); // Foo() 调用一个构造函数
```

要表示一个变量可能具有值 `null`，请在其类型声明中添加 `?`：

```dart
int? aNullableInt = null;
```

对于任何其他类型声明，如函数声明：

```dart
String? returnsNullable() {
  return random.nextDouble() < 0.5
    ? 'Sometimes null!'
    : null;
}

String returnsNonNullable() {
  return 'Never null!';
}
```

### 空安全运算符

Dart 支持几种运算符来处理空安全性。
与 JavaScript 一样，Dart 支持空赋值运算符（`??=`）、空合并运算符（`??`）和可选链运算符（`?.`）。这些运算符的工作方式与 JavaScript 相同。

#### ! 运算符

在可空变量或表达式可能为非空时，你可以告诉编译器抑制任何编译时错误，使用 (`!`) 运算符在表达式后面放置该运算符。不要将其与 Dart 的非（`!`）运算符混淆，后者使用相同的符号但放在表达式前面。

```dart
int? a = 5;

int b = a; // 不允许。
int b = a!; // 允许。


[Customizing static analysis]: /tools/analysis
[`dart fix`]: /tools/dart-fix
[Effective Dart]: /effective-dart
[Linter rules]: /tools/linter-rules
[Prettier]: https://prettier.io/
[Using trailing commas]: {{site.flutter-docs}}/development/tools/formatting#using-trailing-commas
[Built-in types]: /language/built-in-types
[Dart Language Tour]: /guides/language
[Runes and grapheme clusters]: /language/built-in-types#runes-and-grapheme-clusters
[Strings]: /language/built-in-types#strings
[omit_local_variable_types]: /effective-dart/design#dont-redundantly-type-annotate-initialized-local-variables


### 一流函数

JavaScript 和 Dart 将函数视为一流公民。
这意味着 Dart 将函数视为任何其他对象。
例如，以下代码显示了如何将函数作为参数传递给另一个函数：

```dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// 将 printElement 作为参数传递。
list.forEach(printElement);
```

### 匿名函数

JavaScript 和 Dart 都支持[*匿名*函数][_anonymous_ functions]，即没有名称的函数。与命名函数一样，您可以像任何其他值一样传递匿名函数。例如，将匿名函数存储在变量中，将其作为参数传递给另一个函数，或者从另一个函数返回。

JavaScript 有两种声明匿名函数的方式：

1. 使用标准函数表达式
2. 使用箭头语法

同样，Dart 也有两种声明匿名函数的方式。两者的工作方式与 JavaScript 的箭头表达式类似。Dart 的匿名函数不支持常规函数表达式的附加功能。例如，JavaScript 支持函数表达式充当构造函数，或者创建对 `this` 的自定义绑定。

要了解更多信息，请参阅 [类](#classes) 部分。

```js
// 一个分配给变量的常规函数表达式
let funcExpr = function(a, b) {
  return a * b;
}
// 作为箭头函数表达的相同匿名函数
let arrowFuncExpr = (a, b) => {
  return a * b;
}
// 仅有一个返回语句的箭头函数
// 作为其内容不需要块。
let arrowFuncExpr2 = (a, b) => a * b;
```

```dart
// 将匿名函数分配给变量。
var blockFunc =
  optionalCallback ?? (int a, int b) {
    return a * b;
};

// 对于仅有一个返回语句的表达式，可以使用箭头语法：
var singleFunc = (int a, int b) => a * b;
```

与 JavaScript 一样，您可以将匿名函数传递给其他函数。在使用数组和列表的 `map` 函数时，开发人员经常传递匿名函数：

```js
// 返回 [4, 5, 6]
[1, 2, 3].map(e => e + 3);

// 返回 [5, 7, 9]
[1, 2, 3].map(e => {
  e *= 2;
  return e + 3;
});
```

```dart
// 返回 [4, 5, 6]
[1, 2, 3].map((e) => e + 3).toList();

// 返回 [5, 7, 9]
var list2 = [1, 2, 3].map((e) {
  e *= 2;
  return e + 3;
}).toList();
```

:::note
前面示例中的 `map` 函数返回一个 `Iterable<T>`，而不是 `List<T>`。
`toList` 函数将返回的 `Iterable` 转换回 `List`。

使用列表文字也可以实现相同的目标。

```dart
// 这两个语句是等价的：
print([for (var e in [1, 2, 3]) e + 3]);
print([1, 2, 3].map((e) => e + 3).toList());
```

:::

### 生成器函数

这两种语言都支持[*生成器函数*][_generator functions]。这些函数返回一个可迭代的项目集合，以避免不必要的工作。

要在 Dart 中编写生成器函数，请在函数参数后添加 `sync*` 关键字，并返回一个 `Iterable`。使用 `yield` 关键字向最终可迭代对象添加项目，或使用 `yield*` 添加整套项目。

以下示例显示了如何编写基本的生成器函数：

```js
function* naturalsTo(n) {
  let k = 0;
  while (k < n) {
    yield k++;
  }
}

// 返回 [0, 1, 2, 3, 4]
for (let value of naturalsTo(5)) {
  console.log(value);
}
```

```dart
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) {
    yield k++;
  }
}

// 返回包含 [0, 1, 2, 3, 4] 的可迭代对象
print(naturalsTo(5).toList());
```

```js
function* doubleNaturalsTo(n) {
  let k = 0;
  while (k < n) {
    yield* [k, k];
    k++;
  }
}

// 返回 [0, 0, 1, 1, 2, 2]
for (let value of doubleNaturalsTo(3)) {
  console.log(value);
}
```

```dart
Iterable<int> doubleNaturalsTo(int n) sync* {
  int k = 0;
  while (k < n) {
    yield* [k, k];
    k++;
  }
}

// 返回包含 [0, 0, 1, 1, 2, 2] 的可迭代对象
print(doubleNaturalsTo(3));
```

您还可以定义异步生成器函数，它返回流而不是可迭代对象。在即将到来的 [异步性](#asynchrony) 部分中了解更多。

## 语句

本节描述了 JavaScript 和 Dart 之间语句的差异。

### 控制流（if/else、for、while、switch）

大多数控制语句的工作方式与它们在 JavaScript 中的对应语句相似。一些还有额外的用途，适用于 [集合](#collections)。

#### 迭代

虽然 JavaScript 和 Dart 都有 `for-in` 循环，但它们的行为有所不同。

JavaScript 的 `for-in` 循环遍历对象的属性。要遍历 JavaScript 可迭代对象的元素，必须使用 `for-of` 或 `Array.forEach()`。Dart 的 `for-in` 循环与 JavaScript 的 `for-of` 相似。

以下示例显示了遍历集合并打印每个元素：

```js
for (const element of list) {
  console.log(element);
}
```

```dart
for (final element in list) {
  print(element);
}
```

#### Switch

:::note
JavaScript 和 Dart 中 `switch` 语句的一个关键区别：当一个 case 没有 `break`、`continue` 或 `return` 语句时，JavaScript 允许执行流穿过并继续执行下一个语句。然而，Dart 只有在 case 的主体为空时才允许这样做。
:::

在 `switch` 语句中使用 `continue` 时，可以将其与放在 case 上的标签结合使用：

```dart
switch (testEnum) {
  case TestEnum.A:
    print('A');
    continue b;
  b:
  case TestEnum.B:
    print('B');
    break;
}
```

### 运算符

Dart 和 JavaScript 都包含预定义运算符。两种语言都不支持添加新运算符。Dart 使用 `operator` 关键字重载一些现有运算符。例如：

```dart
class Vector {
  final double x;
  final double y;
  final double z;
  Vector(this.x, this.y, this.z);
  Vector operator +(Vector other) => Vector(
    x + other.x, 
    y + other.y,
    z + other.z,
  );
  Vector operator *(double scalar) => Vector(
    x * scalar,
    y * scalar,
    z * scalar,
  );
}
```

#### 算术运算符

两种语言的相等和关系运算符几乎相同，如下表所示：

| 含义                                           | JavaScript 运算符 | Dart 运算符 |
| --------------------------------------------- | ----------------- | ----------- |
| 加法                                           | `+`               | `+`         |
| 减法                                           | `-`               | `-`         |
| 一元减，也称为否定                           | `-expr`           | `-expr`     |
| 乘法                                           | `*`               | `*`         |
| 除法                                           | `/`               | `/`         |
| 返回整数结果的除法                             |                   | `~/`        |
| 整数除法的余数（模）                           | `%`               | `%`         |
| `x = x + 1`（表达式值为 `x + 1`）              | `++x`             | `++x`       |
| `x = x + 1`（表达式值为 `x`）                  | `x++`             | `x++`       |
| `x = x - 1`（表达式值为 `x - 1`）              | `--x`             | `--x`       |
| `x = x - 1`（表达式值为 `x`）                  | `x--`             | `x--`       |

{:.table .table-striped}

例如：

```dart
assert(2 + 3 == 5);
assert(2 - 3 == -1);
assert(2 * 3 == 6);
assert(5 / 2 == 2.5); // 结果是 double
assert(5 ~/ 2 == 2); // 结果是 int
assert(5 % 2 == 1); // 余数

a = 0;
b = ++a; // 在 b 获取其值之前增加 a。
assert(a == b); // 1 == 1

a = 0;
b = a++; // 在 b 获取其值之后增加 a。
assert(a != b); // 1 != 0

a = 0;
b = --a; // 在 b 获取其值之前减少 a。
assert(a == b); // -1 == -1

a = 0;
b = a--; // 在 b 获取其值之后减少 a。
assert(a != b); // -1 != 0
```

您可能已经注意到 Dart 还包含一个 `~/` 运算符（称为 *截断除法运算符*），它将一个 double 进行除法并输出一个向下取整的整数：

```dart
assert(25 == 50.4 ~/ 2);
assert(25 == 50.6 ~/ 2);
assert(25 == 51.6 ~/ 2);
```

#### 相等和关系运算符

两种语言的相等和关系运算符的工作方式相同：

| 含义                  | JavaScript 运算符 | Dart 运算符 |
| --------------------- | ----------------- | ----------- |
| 严格相等              | `===`             | `==`        |
| 抽象相等              | `==`              |             |
| 严格不相等            | `!==`             | `!=`        |
| 抽象不相等            | `!=`              |             |
| 大于                  | `>`               | `>`         |
| 小于                  | `<`               | `<`         |
| 大于或等于            | `>=`              | `>=`        |
| 小于或等于            | `<=`              | `<=`        |

{:.table .table-striped}

JavaScript 的 `==` 和 `!=` 运算符没有等价物。

例如：

```dart
assert(2 == 2);
assert(2 != 3);
assert(3 > 2);
assert(2 < 3);
assert(3 >= 3);
assert(2 <= 3);
```

#### 类型测试运算符

这两种语言之间的测试运算符的实现有些不同：

| 含义                             | JavaScript 运算符 | Dart 运算符 |
| -------------------------------- | ----------------- | ----------- |
| 类型转换                         |                   | `x as T`    |
| 如果对象具有指定类型则为真       | `x instanceof T`  | `x is T`    |
| 如果对象缺少指定类型则为真       | `!(x instanceof T)` | `x is! T`   |

{:.table .table-striped}

`obj is T` 的结果为 true，如果 `obj` 实现了 `T` 指定的接口。例如，`obj is Object?` 总是为 true。

使用类型转换运算符 (`as`) 来确保值具有特定类型。如果您*知道*对象将具有该类型，编译器可以使用它。

例如：

```dart
(person as Employee).employeeNumber = 4204583;
```

如果您不*知道*对象的类型是 `T`，则在使用对象之前使用 `is T` 来检查类型。

在 Dart 中，局部变量的类型在 if 语句的作用域内更新。对于实例变量，情况并非如此。

```dart
if (person is Employee) {
   person.employeeNumber = 4204583;
}
```

#### 逻辑运算符

您可以使用逻辑运算符来反转或组合布尔表达式。两种语言的逻辑运算符是相同的。

| 含义                                                        | JavaScript 运算符 | Dart 运算符 |
| ---------------------------------------------------------- | ----------------- | ----------- |
| 反转下一个表达式（将 false 更改为 true，反之亦然）        | `!x`              | `!x`        |
| 逻辑或                                                      | `\|\|`            | `\|\|`      |
| 逻辑与                                                      | `&&`              | `&&`        |

{:.table .table-striped}

JavaScript 允许在需要布尔值的地方使用任何值。然后将这些值转换为 `true` 或 `false`。JavaScript 将空字符串和数字 `0` 视为“假”值。Dart 允许在条件中使用 `bool` 值和逻辑运算符的操作数。

例如：

```dart
if (!done && (col == 0 || col == 3)) {
  // ...Do something...
}
```

#### 位运算和移位运算符

您可以使用整数的位运算和移位运算符来操作数字的各个位。两种语言的运算符几乎相同，如下表所示：

| 含义                                               | JavaScript 运算符 | Dart 运算符 |
| ------------------------------------------------- | ----------------- | ----------- |
| 按位与                                             | `&`               | `&`         |
| 按位或                                             | `\|`              | `\|`        |
| 按位异或                                           | `^`               | `^`         |
| 一元按位取反（0 变为 1，1 变为 0）               | `~expr`           | `~expr`     |
| 左移                                               | `<<`              | `<<`        |
| 右移                                               | `>>`              | `>>`        |
| 无符号右移                                         | `>>>`             | `>>>`       |

{:.table .table-striped}

例如：

```dart
final value = 0x22;
final bitmask = 0x0f;

assert((value & bitmask) == 0x02); // AND
assert((value & ~bitmask) == 0x20); // AND NOT
assert((value | bitmask) == 0x2f); // OR
assert((value ^ bitmask) == 0x2d); // XOR
assert((value << 4) == 0x220); // 左移
assert((value >> 4) == 0x02); // 右移
assert((-value >> 4) == -0x03); // 右移
assert((value >>> 4) == 0x02); // 无符号右移
assert((-value >>> 4) > 0); // 无符号右移
```

#### 条件运算符

Dart 和 JavaScript 都包含一个条件运算符 (`?:`) 用于评估表达式。一些开发人员将其称为三元运算符，因为它需要三个操作数。由于 Dart 还有另一个需要三个操作数的运算符 (`[]=`)，因此将此运算符 (`?:`) 称为条件运算符。此运算符对表达式的工作方式类似于 [if-else][] 对语句的工作方式。

```js
let visibility = isPublic ? "public" : "private";
```

```dart
final visibility = isPublic ? 'public' : 'private';
```

### 赋值运算符

使用 (`=`) 运算符来赋值。

```dart
// 将 value 赋给 a
a = value;
```

此运算符还有一个空值感知变体 (`??=`)。

要了解更多信息，请参阅 [空值

[_anonymous_ functions]: https://en.wikipedia.org/wiki/Anonymous_function
[_generator functions_]: /language/functions#generators
[if-else]: /language/branches#if


如果`maybePerson`的值为`null`，Dart将忽略整个级联。

## 集合

本节介绍了Dart中的一些集合类型，并将它们与JavaScript中的类似类型进行了比较。

### 列表

Dart以与JavaScript数组相同的方式编写列表文字。Dart使用方括号括起列表，并用逗号分隔值。

```dart
// 初始化列表并指定完整类型
final List<String> list1 = <String>['one', 'two', 'three'];

// 使用简写类型初始化列表
final list2 = <String>['one', 'two', 'three'];

// Dart也可以推断类型
final list3 = ['one', 'two', 'three'];
```

以下代码示例概述了可以在Dart `List`上执行的基本操作。以下示例显示了如何使用索引运算符从`List`中检索值。

```dart
final fruits = <String>['apple', 'orange', 'pear'];
final fruit = fruits[1];
```

使用`add`方法将值添加到`List`的末尾。使用`addAll`方法添加另一个`List`：

```dart
final fruits = <String>['apple', 'orange', 'pear'];
fruits.add('peach');
fruits.addAll(['kiwi', 'mango']);
```

使用`insert`方法在特定位置插入值。使用`insertAll`方法在特定位置插入另一个`List`：

```dart
final fruits = <String>['apple', 'orange', 'pear'];
fruits.insert(0, 'peach');
fruits.insertAll(0, ['kiwi', 'mango']);
```

使用索引和赋值运算符更新`List`中的值：

```dart
final fruits = <String>['apple', 'orange', 'pear'];
fruits[2] = 'peach';
```

使用以下方法从`List`中删除项目：

```dart
final fruits = <String>['apple', 'orange', 'pear'];
// 从列表中删除值'pear'。
fruits.remove('pear');
// 从列表中删除最后一个元素。
fruits.removeLast();
// 从列表中删除位置为1的元素。
fruits.removeAt(1);
// 从列表中删除位置大于或等于start（1）且小于end（3）的元素。
fruits.removeRange(1, 3);
// 从列表中删除与给定谓词匹配的所有元素。
fruits.removeWhere((fruit) => fruit.contains('p'));
```

使用`length`获取`List`中的值的数量：

```dart
final fruits = <String>['apple', 'orange', 'pear'];
assert(fruits.length == 3);
```

使用`isEmpty`检查`List`是否为空：

```dart
var fruits = [];
assert(fruits.isEmpty);
```

使用`isNotEmpty`检查`List`是否不为空：

```dart
final fruits = <String>['apple', 'orange', 'pear'];
assert(fruits.isNotEmpty);
```

#### Filled

Dart的`List`类包括一种创建每个项目具有相同值的列表的方法。`filled`构造函数创建一个大小为`n`的固定长度列表，其中每个项目都具有一个默认值。以下示例创建了一个包含3个项目的列表：

```dart
final list1 = List.filled(3, 'a'); // 创建: [ 'a', 'a', 'a' ]
```

- 默认情况下，您无法向此列表添加或删除元素。要允许此列表添加或删除元素，请在参数列表的末尾添加`, growable: true`。
- 您可以使用它们的索引值访问和更新此列表的元素。

#### 生成

Dart的`List`类包括一种创建递增值列表的方法。`generate`构造函数使用模板创建大小为`n`的固定长度列表的元素值。此模板将索引作为参数。

```dart
// 创建: [ 'a0', 'a1', 'a2' ]
final list1 = List.generate(3, (index) => 'a$index');
```

### 集合

与JavaScript不同，Dart支持使用文字定义`Set`。Dart以与列表相同的方式定义集合，但使用花括号而不是方括号。集合是无序集合，只包含唯一项。Dart使用哈希码强制这些项的唯一性，这意味着对象需要哈希值才能存储在`Set`中。

:::note
在Dart中，哈希值默认为对象的实例，但您可以重写它以使用一组属性。要了解更多，请参阅[`hashCode`][]属性页面。
:::

以下代码片段显示了如何初始化`Set`：

```dart
final abc = {'a', 'b', 'c'};
```

创建空集合的语法可能一开始看起来有点混乱，因为指定空花括号（`{}`）会创建一个空的`Map`。要创建一个空的`Set`，请在`{}`声明之前加上类型参数或将`{}`分配给`Set`类型的变量：

```dart
final names = <String>{};
// Set<String> names = {}; // 这也可以。
// final names = {}; // 创建一个空映射，而不是集合。
```

以下示例概述了可以在Dart `Set`上执行的基本操作。

使用`add`方法将值添加到`Set`。使用`addAll`方法添加多个值：

```dart
final fruits = {'apple', 'orange', 'pear'};
fruits.add('peach');
fruits.addAll(['kiwi', 'mango']);
```

在`Set`中使用以下方法之一删除内容：

```dart
final fruits = {'apple', 'orange', 'pear'};
// 从集合中删除值'pear'。
fruits.remove('pear');
// 从集合中删除提供的列表中的所有元素。
fruits.removeAll(['orange', 'apple']);
// 删除与给定谓词匹配的集合中的所有元素。
fruits.removeWhere((fruit) => fruit.contains('p'));
```

使用`length`获取`Set`中的值的数量：

```dart
final fruits = {'apple', 'orange', 'pear'};
assert(fruits.length == 3);
```

使用`isEmpty`检查`Set`是否为空：

```dart
var fruits = <String>{};
assert(fruits.isEmpty);
```

使用`isNotEmpty`检查`Set`是否不为空：

```dart
final fruits = {'apple', 'orange', 'pear'};
assert(fruits.isNotEmpty);
```

### 映射

Dart中的`Map`类型类似于JavaScript中的`Map`类型。这两种类型都将键与值关联起来。如果所有键具有相同类型，则键可以是任何对象类型。这个规则也适用于值。每个键最多出现一次，但可以多次使用相同的值。

Dart基于哈希表构建字典。这意味着键需要是可哈希的。每个Dart对象都包含一个哈希。

:::note
在Dart中，对象的哈希值默认为从对象的标识派生的值，并且与对象只能等于自身的相等兼容。要引入基于对象*内容*的相等性，重写`hashCode`和`operator==`。
:::

考虑以下使用文字创建的简单`Map`示例：

```dart
final gifts = {
  'first': 'partridge',
  'second': 'turtle doves',
  'fifth': 'golden rings'
};

final nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

以下代码示例概述了可以在Dart `Map`上执行的基本操作。以下示例显示了如何使用索引运算符从`Map`中检索值。

```dart
final gifts = {'first': 'partridge'};
final gift = gifts['first'];
```

:::note
如果映射不包含查找键，则索引运算符返回`null`。
:::

使用`containsKey`方法检查`Map`是否包含键。

```dart
final gifts = {'first': 'partridge'};
assert(gifts.containsKey('fifth'));
```

使用索引赋值运算符（`[]=`）添加或更新`Map`中的条目。如果`Map`尚未包含键，则Dart将添加该条目。如果键存在，则Dart将更新其值。

```dart
final gifts = {'first': 'partridge'};
gifts['second'] = 'turtle'; // 被添加
gifts['second'] = 'turtle doves'; // 被更新
```

使用`addAll`方法添加另一个`Map`。使用`addEntries`方法向`Map`添加其他条目。

```dart
final gifts = {'first': 'partridge'};
gifts['second'] = 'turtle doves';
gifts.addAll({
  'second': 'turtle doves',
  'fifth': 'golden rings',
});
gifts.addEntries([
  MapEntry('second', 'turtle doves'),
  MapEntry('fifth', 'golden rings'),
]);
```

使用`remove`方法从`Map`中删除条目。使用`removeWhere`方法删除满足给定测试的所有条目。

```dart
final gifts = {'first': 'partridge'};
gifts.remove('first');
gifts.removeWhere((key, value) => value == 'partridge');
```

使用`length`获取`Map`中键值对的数量。

```dart
final gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
```

使用`isEmpty`检查`Map`是否为空。

```dart
final gifts = {};
assert(gifts.isEmpty);
```

使用`isNotEmpty`检查`Map`是否不为空。

```dart
final gifts = {'first': 'partridge'};
assert(gifts.isNotEmpty);
```

### 不可修改

纯JavaScript不支持不可变性。Dart提供了多种方法来使数组、集合或字典等集合不可变。

- 如果集合是编译时常量且不应被修改，请使用`const`关键字：<br>
  `const fruits = <String>{'apple', 'orange', 'pear'};`
- 将`Set`分配给`final`字段，这意味着`Set`本身不必是编译时常量。这确保字段不能被另一个`Set`覆盖，但仍允许修改`Set`的大小或内容：<br>
  `final fruits = <String>{'apple', 'orange', 'pear'};`
- 使用`unmodifiable`构造函数创建集合类型的最终版本（如下例所示）。这将创建一个无法改变其大小或内容的集合：

```dart
final _set = Set<String>.unmodifiable(['a', 'b', 'c']);
final _list = List<String>.unmodifiable(['a', 'b', 'c']);
final _map = Map<String, String>.unmodifiable({'foo': 'bar'});
```

### 展开运算符

与JavaScript一样，Dart支持使用展开运算符（`...`）和空安全展开运算符（`...?`）将列表嵌入另一个列表。

```dart
var list1 = [1, 2, 3];
var list2 = [0, ...list1];　// [0, 1, 2, 3]
// 当要插入的列表可能为null时：
list1 = null;
var list2 = [0, ...?list1]; // [0]
```

这也适用于集合和映射：

```dart
// 使用映射的展开运算符
var map1 = {'foo': 'bar', 'key': 'value'};
var map2 = {'foo': 'baz', ...map1}; // {foo: bar, key: value}
// 使用集合的展开运算符
var set1 = {'foo', 'bar'};
var set2 = {'foo', 'baz', ...set1}; // {foo, baz, bar}
```

### 集合 if/for

在Dart中，`for`和`if`关键字在处理集合时具有附加功能。

集合`if`语句仅在满足指定条件时包含列表文字中的项目：

```dart
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet',
];
```

对于映射和集合，它的工作方式类似。

集合`for`语句允许将多个项目映射到另一个列表：

```dart
var listOfInts = [1, 2, 3];
var listOfStrings = [
  '#0',
  for (var i in listOfInts) '#$i',
]; // [#0, #1, #2, #3]
```

对于映射和集合，它的工作方式也相同。

## 异步

与JavaScript一样，Dart虚拟机（VM）运行单个事件循环，处理所有Dart代码。这意味着这里适用与异步相关的类似规则。您的所有代码都是同步运行的，但您可以根据您使用的异步工具以不同的顺序处理它。以下是一些这些构造的示例以及它们与JavaScript对应物的关系。

### Futures

`Future`是Dart的版本JavaScript `Promise`。两者都是异步操作的*结果*，在以后解析。

Dart或Dart包中的函数可能返回`Future`，而不是它们表示的值，因为值可能要到以后才能获得。

以下示例显示了处理`Future`的方式与JavaScript中的`Promise`相同。

```js
const httpResponseBody = func();

httpResponseBody.then(value => {
  console.log(
    `Promise resolved to a value: ${value}`
  );
});
```

```dart
Future<String> httpResponseBody = func();

httpResponseBody.then((String value) {
  print('Future resolved to a value: $value');
});
```

类似地，`Future`可以像`Promise`一样失败。捕获错误也是一样的：

```js
httpResponseBody
  .then(...)
  .catch(err => {
    console.log(
      "Promise encountered an error before resolving."
    );
  });
```

```dart
httpResponseBody
  .then(...)
  .catchError((err) {
    print(
      'Future encountered an error before resolving.'
    );
  });
```

您还可以创建`Future`。要创建`Future`，请定义并调用`async`函数。当您有一个需要是`Future`的值时，将函数转换为如下示例。

```dart
String str = 'String Value';
Future<String> strFuture = Future<String>.value(str);
```

#### Async/Await

如果您熟悉JavaScript中的`Promise`，您可能也熟悉`async`/`await`语法。这种语法在Dart中是相同的：函数标记为`async`，并且`async`函数始终返回`Future`。如果函数返回`String`并标记为`async`，它将返回`Future<String>`。如果它不返回任何内容，但是它是`async`，它将返回`Future<void>`。

以下示例显示了如何编写`async`函数：

```js
// 返回一个字符串的Promise，
// 因为该方法是异步的
async fetchString() {
  // 通常在这里执行其他异步操作。
  return "String Value";
}
```

```dart
// 返回一个字符串的Future，
// 因为该方法是异步的
Future<String> fetchString() async {
  // 通常在这里执行其他异步操作。
  return 'String Value';
}
```

调用此`async`函数如下：

```dart
Future<String> stringFuture = fetchString();
stringFuture.then((String str) {
  print(str); // 'String Value'
});
```

使用`await`关键字获取`Future`的值。与JavaScript一样，这样可以避免调用`then`来获取其值，并且允许您以更类似同步的方式编写异步代码。与JavaScript一样，在`async`上下文中才能等待`Future`。

以下示例显示了如何等待`Future`获取其值：

```dart
// 我们只能在async上下文中等待Future。
Future<void> asyncFunction() async {
  var str = await fetchString();
  print(str); // 'String Value'
}
```

要了解有关`Future`和`async`/`await`语法的更多信息，请参阅[异步编程][]教程。

### 流

Dart异步工具箱中的另一个工具是`Stream`。虽然JavaScript有自

[`hashCode`]: {{site.dart-api}}/dart-core/Object/hashCode.html
[Asynchronous programming]: /libraries/async/async-await

#### 创建流

与`Future`一样，你有几种不同的方法来创建流。`Stream`类具有用于从`Future`或`Iterable`创建流的实用构造函数，还可以创建定时发出值的流。要了解更多信息，请参阅[`Stream`][] API页面。

##### StreamController

实用类[`StreamController`][]可以创建和控制流。其stream属性公开了它控制的流。它的方法提供了向该流添加事件的方法。

例如，`add`方法可以发出新的项，而`close`方法会完成该流。

以下示例显示了流控制器的基本用法：

```dart
var listeners = 0;
StreamController<int>? controller;
controller = StreamController<int>(
  onListen: () {
    // 每次流有新的监听器时发出一个新值。
    controller!.add(listeners++);
    // 在第五个监听器之后关闭该流。
    if (listeners > 5) controller.close();
  }
);
// 获取流控制器的流
var stream = controller.stream;
// 监听流
stream.listen((int value) {
  print('$value');
});
```

##### 异步生成器

异步生成器函数可以创建流。这些函数类似于同步生成器函数，但使用`async*`关键字并返回一个`Stream`。

在异步生成器函数中，`yield`关键字将给定的值发送到流中。`yield*`关键字则与其他可迭代对象不同，它用于配合流。这样，来自其他流的事件可以被发送到这个流中。在下面的示例中，一旦新生成的流完成，函数就会继续执行。

```dart
Stream<int> asynchronousNaturalsTo(int n) async* {
  var k = 0;
  while (k < n) yield k++;
}

Stream<int> stream = asynchronousNaturalsTo(5);

// 依次打印出0 1 2 3 4。
stream.forEach(print(value));
```

在[异步编程][]文档中可以了解更多关于`Future`、`Stream`和其他异步功能的信息。

## 类

在Dart中，类与JavaScript中的类非常相似，尽管JavaScript类在技术上更像是原型的包装器。在Dart中，类是语言的标准特性。本节介绍在Dart中定义和使用类以及它们与JavaScript的区别。

### "this" 上下文

在Dart中，`this`关键字比JavaScript更直接。在Dart中，你无法将函数绑定到`this`，而且`this`永远不依赖于执行上下文（如在JavaScript中）。在Dart中，`this`仅在类内部使用，并且始终指向当前实例。

### 构造函数

本节讨论了Dart中的构造函数与JavaScript的不同之处。

#### 标准构造函数

标准的类构造函数看起来与JavaScript的构造函数非常相似。在Dart中，`constructor`关键字被完整的类名替代，并且所有参数都必须明确指定类型。在Dart中，曾经需要使用`new`关键字来创建类实例，但现在是可选的，并且不再推荐使用。

```dart
class Point {
  final double x;
  final double y;

  Point(double x, double y) : this.x = x, this.y = y { }
}

// 创建Point类的新实例
Point p = Point(3, 5);
```

#### 初始化列表

使用初始化列表来编写你的构造函数。将初始化列表插入构造函数的参数和函数体之间。

```dart
class Point {
  ...
  Point.fromJson(Map<String, double> json)
      : x = json['x']!,
        y = json['y']! {
    print('In Point.fromJson(): ($x, $y)');
  }
  ...
}
```

#### 构造函数参数

在构造函数中编写代码来为类字段赋值可能会感觉像是创建样板代码，所以Dart提供了一些语法糖，称为[初始化参数][]，以简化此过程：

```dart
class Point {
  double x;
  double y;

  // 在构造函数体运行之前设置x和y的语法糖。
  Point(this.x, this.y);
}

// 创建Point类的新实例
Point p = Point(3, 5);
```

与函数类似，构造函数可以采用定位或命名参数的方式：

```dart
class Point {
  ...
  // 使用可选的定位参数
  Point(this.x, [this.y = 5]);
  // 使用命名参数
  Point({required this.y, this.x = 5});
  // 使用定位参数和命名参数
  Point(int x, int y, {bool multiply}) {
    ...
  }
  ...
}
```

#### 命名构造函数

与JavaScript不同，Dart允许类具有多个构造函数，通过允许你为它们命名来实现。你可以选择有一个未命名的构造函数，任何其他构造函数必须具有名称：

```dart
const double xOrigin = 0;
const double yOrigin = 0;

class Point {
  double x = 0;
  double y = 0;

  Point(this.x, this.y);

  // 命名构造函数
  Point.origin()
      : x = xOrigin,
        y = yOrigin;
}
```

#### const构造函数

要创建不可变类实例，请使用`const`构造函数。具有`const`构造函数的类只能有`final`实例变量。

```dart
class ImmutablePoint {
  final double x, y;

  const ImmutablePoint(this.x, this.y);
}
```

#### 构造函数重定向

你可以从其他构造函数调用构造函数，以防止代码重复或为参数添加其他默认值：

```dart
class Point {
  double x, y;

  // 该类的主构造函数。
  Point(this.x, this.y);

  // 委托给主构造函数。
  Point.alongXAxis(double x) : this(x, 0);
}
```

#### 工厂构造函数

当你不需要创建一个新的类实例时，可以使用工厂构造函数。一个例子是当返回一个已缓存的实例时：

```dart
class Logger {
  static final Map<String, Logger> _cache =
      <String, Logger>{};
 
  final String name;
 
  // 工厂构造函数，返回一个缓存的副本，
  // 如果还没有可用的副本，则创建一个新的副本。
  factory Logger(String name) {
    return _cache.putIfAbsent(
        name, () => _cache[name] ??= Logger._internal(name);
  }

  // 仅供内部使用的私有构造函数
  Logger._internal(this.name);
}
```

### 方法

在Dart和JavaScript中，方法用作为对象提供行为的函数。

```js
function doSomething() { // 这是一个函数
  // 实现...
}

class Example {
  doSomething() { // 这是一个方法
    // 实现...
  }
}
```

```dart
void doSomething() { // 这是一个函数
 // 实现...
}

class Example {
 void doSomething() { // 这是一个方法
   // 实现...
 }
}
```

### 扩展类

Dart允许类扩展另一个类，与JavaScript类似。

```dart
class Animal {
  int eyes;
 
  Animal(this.eyes);
 
  makeNoise() {
    print('???');
  }
}

class Cat extends Animal {
  Cat(): super(2);

  @override
  makeNoise() {
    print('Meow');
  }
}
Animal animal = Cat();
print(animal.eyes); // 2
animal.makeNoise(); // Meow
```

当覆盖父类的方法时，请使用`@override`注解。虽然此注解是可选的，但它表示覆盖是有意的。如果该方法实际上不是覆盖了超类方法，则Dart分析器将显示警告。

仍然可以使用`super`关键字调用被覆盖的父类方法：

```dart
class Cat extends Animal {
  ...
  @override
  makeNoise() {
    print('Meow');
    super.makeNoise();
  }
}
Animal animal = Cat();
animal.makeNoise(); // Meow
                    // ???
```

[`Stream`]: {{site.dart-api}}/dart-async/Stream-class.html
[`StreamController`]: {{site.dart-api}}/dart-async/StreamController-class.html
[asynchronous programming]: /libraries/async/using-streams
[initializing parameters]: /language/constructors


