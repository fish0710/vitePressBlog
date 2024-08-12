# View Transition API

`View Transition API`在DOM更新内容时，能够为DOM状态更新创建平滑的过渡动画。

## 视图过渡过程

简单来说就是`View Transition API`为DOM更新前后的状态截图，并在两者之间创建平滑的过渡动画。

1. 调用document.startViewTransition方法时，API会截取当前屏幕截图
2. 调用传入startViewTransition的回调函数，会导致DOM更新
3. 回调函数执行成功后，ViewTransition对象的updateCallbackDone方法Promise兑现，允许响应DOM更新
3. API会捕获页面新状态，并创建伪元素树
4. 在过渡动画开始前，由startViewTransition方法返回的ViewTransition对象的ready方法，完成Promise兑现，在此之间可以使用JS运行自定义动画
5. 过渡动画结束，可以通过ViewTransition对象的finished方法完成一些操作


css属性view-transition-name为选定的元素提供单独的标识名称，并使其参与与根视图过渡不同的单独视图过渡——或者如果指定了 none 值，则不参与视图过渡。

就是说，如果某个元素设置了view-transition-name属性，那么它和根元素的过渡动画将会被分离，而不会和其他元素的过渡动画混合在一起。

比如当根元素过渡动画结束，设置了view-transition-name属性的元素的过渡动画如果还没结束就会继续执行，而不会因为根元素的过渡动画结束而结束。

伪元素数据结构如下：
```
::view-transition
├─ ::view-transition-group(root)
│ └─ ::view-transition-image-pair(root)
│     ├─ ::view-transition-old(root)
│     └─ ::view-transition-new(root)
└─ ::view-transition-group(figure-caption)
  └─ ::view-transition-image-pair(figure-caption)
      ├─ ::view-transition-old(figure-caption)
      └─ ::view-transition-new(figure-caption)
```

## API

1. document.startViewTransition(callback)：开始视图过渡，传入回调函数，在回调函数中执行DOM更新操作。
2. ViewTransition.ready()：Promise，在视图即将开始动画时，Promise会被兑现。
3. ViewTransition.finished()：视图动画结束时，调用此方法。
4. CSS属性 view-transition-name 为选定的元素提供单独的标识名称。
5. 伪元素 ::view-transition
6. 伪元素 ::view-transition-group()
7. 伪元素 ::view-transition-image-pair()
8. 伪元素 ::view-transition-new() 转换后的新视图的实时表示。
9. 伪元素 ::view-transition-old() 转换前的旧视图的静态屏幕截图。

## 使用方法

### 自定义动画

1. 调用document.startViewTransition方法，传入回调函数。
2. 在回调函数中执行DOM更新操作。
3. 调用ViewTransition对象的ready方法，执行自定义动画
```html
<script setup lang="ts">
import { ref } from "vue";
defineProps<{ msg: string }>();
const element = ref<HTMLDivElement>();
let a = ref(1);
const _doClick = () => {
  a.value++;
};
const doClick = () => {
  const t = document.startViewTransition(() => _doClick());// 执行startViewTransition方法
  t.ready.then(() => {// 视图即将开始动画时，Promise会被兑现
    element.value?.animate(
      [{ transform: "translateX(0px)" }, { transform: "translateX(100px)" }],
      {
        duration: 1000, // 动画持续时间，单位为毫秒
        easing: "ease-in-out" // 缓动函数
      }
    );
  });
};
</script>
<template>
  <h1>
    <button type="button" @click="doClick">动画启动</button>
  </h1>
  <div class="element" ref="element">
    <h1>{{ a }}</h1>
  </div>
</template>
<style>
.element {
  background-color: #edc3a1;
  height: 200px;
  width: 200px;
  box-shadow: 0 0 10px #888;
}
</style>

```


### 使用CSS伪类

1. 为变化类定义CSS伪类 ::view-transition-name，并设置其值。
2. 为::view-transition-old和::view-transition-new定义动画效果
3. 在document.startViewTransition方法中，传入回调函数，在回调函数中执行DOM更新操作。
```html
<template>
  <h1>
    <el-button @click="doClick">动画启动</el-button>
  </h1>
  <div class="element" ref="element">
    <h1>{{ a }}</h1>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
let a = ref(1);
const _doCLick = () => {// 响应式数据变化会影响DOM元素更新
  a.value++;
};
const doClick = () => { // 点击按钮触发动画
  document.startViewTransition(() => _doCLick());
};
</script>
<style>
.read-the-docs {
  color: #888;
}
.element {
  background-color: #edc3a1;
  height: 200px;
  width: 200px;
  box-shadow: 0 0 10px #888;
  view-transition-name: element;
}
@keyframes startDo {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}
@keyframes endDo {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
::view-transition-old(element) {
  animation: startDo 0.5s ease-in-out;
}
::view-transition-new(element) {
  animation: endDo 0.5s ease-in-out;
}
</style>
```
这种办法如果父组件调用startViewTransition方法，子组件有::view-transition-old/new伪类也会执行动画。


### 示例

1. 主题切换动画(圆形变化，矩形变化，平行四边形变化)
```js

  // 动画路径
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  // 执行动画
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;// 切换主题
    await nextTick();
  }).ready;

  // 定义动画效果
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
</style>
```
2. 元素移动动画
```js
  // 执行动画
 const t = document.startViewTransition(() => _doClick());
  t.ready.then(() => {
    element.value?.animate(
      [{ transform: "translateX(0px)" }, { transform: "translateX(100px)" }],
      {
        duration: 1000, // 动画持续时间，单位为毫秒
        easing: "ease-in-out" // 缓动函数
      }
    );
  });
````

### 注意

1. 在Vue中使用::view-transition伪类需要关闭scoped样式，否则伪类::view-transition-old/new无法生效。
2. 父组件调用startViewTransition方法，与子组件有关的::view-transition-old/new也会执行动画


