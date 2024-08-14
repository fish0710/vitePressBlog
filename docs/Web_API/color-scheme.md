# Color Scheme

color-scheme CSS 属性允许元素指示它可以舒适地呈现哪些颜色方案。

## 语法

```css
color-scheme: normal;
color-scheme: light;
color-scheme: dark;
color-scheme: light dark;
color-scheme: only light;

/* 全局值 */
color-scheme: inherit;
color-scheme: initial;
color-scheme: revert;
color-scheme: revert-layer;
color-scheme: unset;
```

## 取值

### normal
表示元素未指定任何配色方案，因此应使用浏览器的默认配色方案呈现。

### light
表示可以使用操作系统亮色配色方案渲染元素。

### dark
表示可以使用操作系统深色配色方案渲染元素。

### only

禁止用户代理覆盖元素的颜色方案。

可以使用 color-scheme: only light; 应用于特定的元素或 :root，以关闭由 Chrome 的自动深色主题引起的颜色覆盖。

## 示例

=== ./demos/color-scheme.vue


