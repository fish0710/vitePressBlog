#### Creating streams

As with `Future`s,
you have several different ways to create a stream.
The `Stream` class has utility constructors for
creating streams from `Future`s or `Iterable`s,
or for creating streams that emit values at a timed interval.
To learn more, see the [`Stream`][] API page.

[`Stream`]: {{site.dart-api}}/dart-async/Stream-class.html

##### StreamController

The utility class [`StreamController`][] can create and control streams.
Its stream property exposes the stream it controls.
Its methods provides ways to add events to that stream.

For example, the `add` method can emit new items and the `close` method
completes the stream.

The following example shows basic usage of a stream controller:

```dart
var listeners = 0;
StreamController<int>? controller;
controller = StreamController<int>(
  onListen: () {
    // Emit a new value every time the stream gets a new listener.
    controller!.add(listeners++);
    // Close the stream after the fifth listener.
    if (listeners > 5) controller.close();
  }
);
// Get the stream for the stream controller
var stream = controller.stream;
// Listen to the stream
stream.listen((int value) {
  print('$value');
});
```

[`StreamController`]: {{site.dart-api}}/dart-async/StreamController-class.html

##### Async generators

Async generator functions can create streams.
These functions resemble a synchronous generator function
but use the `async*` keyword and return a `Stream`.

In an async generator function, the `yield` keyword
emits the given value to the stream. The `yield*` keyword,
however, works with streams instead of other iterables.
This allows events from other streams to be emitted to this stream.
In the following example,
the function continues once the newly yielded stream has completed.

```dart
Stream<int> asynchronousNaturalsTo(int n) async* {
  var k = 0;
  while (k < n) yield k++;
}

Stream<int> stream = asynchronousNaturalsTo(5);

// Prints each of 0 1 2 3 4 in succession.
stream.forEach(print(value));
```

Learn more about futures, streams,
and other asynchronous functionality in the
[asynchronous programming][] docs.

[asynchronous programming]: /libraries/async/using-streams

## Classes

On the surface, classes in Dart are similar to classes
in JavaScript, although JavaScript classes are technically
more of a wrapper around prototypes. In Dart,
classes are a standard feature of the language.
This section covers defining and using classes in Dart
and how they differ from JavaScript.

### "this" context

The `this` keyword in Dart is more straightforward
than in JavaScript. In Dart, you can't bind functions
to `this`, and `this` never depends on the execution
context (as it does in JavaScript). In Dart,
`this` is only used within classes,
and always refers to the current instance.

### Constructors

This section discusses how constructors differ in
Dart from JavaScript.

#### Standard constructor

A standard class constructor looks very similar to
a JavaScript constructor. In Dart,
the `constructor` keyword is replaced by the full class name,
and all parameters must be explicitly typed. In Dart,
the `new` keyword was once required for creating class instances,
but is now optional and its use is no longer recommended.

```dart
class Point {
  final double x;
  final double y;

  Point(double x, double y) : this.x = x, this.y = y { }
}

// Create a new instance of the Point class
Point p = Point(3, 5);
```

#### Initializer lists

Use initializer lists to write your constructor.
Insert the initializer list between the constructor's parameters
and body.

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

#### Constructor parameters

Writing code to assign class fields in the constructor
can feel like creating boilerplate code,
so Dart has some syntactic sugar, called
[initializing parameters][] to make this easier:

```dart
class Point {
  double x;
  double y;

  // Syntactic sugar for setting x and y
  // before the constructor body runs.
  Point(this.x, this.y);
}

// Create a new instance of the Point class
Point p = Point(3, 5);
```

[initializing parameters]: /language/constructors

Similar to functions, constructors have the
option to take positioned or named parameters:

```dart
class Point {
  ...
  // With an optional positioned parameter
  Point(this.x, [this.y = 5]);
  // With named parameters
  Point({ required this.y, this.x = 5 });
  // With both positional and named parameters
  Point(int x, int y, { boolean multiply }) {
    ...
  }
  ...
}
```

#### Named constructors

Unlike JavaScript, Dart allows classes to have
multiple constructors, by allowing you to name them.
You can optionally have one single unnamed constructor,
any additional constructors must be named:

```dart
const double xOrigin = 0;
const double yOrigin = 0;

class Point {
  double x = 0;
  double y = 0;

  Point(this.x, this.y);

  // Named constructor
  Point.origin()
      : x = xOrigin,
        y = yOrigin;
}
```

#### Const constructors

To enable immutable class instances, use a `const` constructor.
A class with a `const` constructor can have `final` instance variables only.

```dart
class ImmutablePoint {
  final double x, y;

  const ImmutablePoint(this.x, this.y);
}
```

#### Constructor redirection

You can call constructors from other constructors to prevent code
duplication or to add additional defaults for parameters:

```dart
class Point {
  double x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(double x) : this(x, 0);
}
```

#### Factory constructors

You can use a factory constructor when you
don't need to create a new class instance.
One example would be when returning a cached instance:

```dart
class Logger {
  static final Map<String, Logger> _cache =
      <String, Logger>{};
 
  final String name;
 
  // Factory constructor that returns a cached copy,
  // or creates a new one if it is not yet available.
  factory Logger(String name) {
    return _cache.putIfAbsent(
        name, () => _cache[name] ??= Logger._internal(name);
  }

  // Private constructor for internal use only
  Logger._internal(this.name);
}
```

### Methods

In both Dart and JavaScript, methods serve as functions that provide
behavior for an object.

```js
function doSomething() { // This is a function
  // Implementation..
}

class Example {
  doSomething() { // This is a method
    // Implementation..
  }
}
```

```dart
void doSomething() { // This is a function
 // Implementation..
}

class Example {
 void doSomething() { // This is a method
   // Implementation..
 }
}
```



### Extending classes

Dart allows classes to extend another class,
in the same way that JavaScript does.

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

When overriding a method from the parent class,
use the `@override` annotation.
While this annotation is optional,
it shows that the override is intentional.
The Dart analyzer shows a warning if the method
is not actually overriding a superclass method.

The parent method that is being overridden can
still be called using the `super` keyword:

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
