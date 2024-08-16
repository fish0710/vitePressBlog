# problem

Lerna如何将所有子项目的依赖关系统一管理，使得子项目可以共享根目录中定义的依赖关系

# answer

Lerna 是一个用于管理 monorepo 项目的工具，可以将多个子项目的代码存储在同一个 Git 仓库中，并使用一个根目录的 package.json 文件来管理所有子项目的依赖关系和其他配置信息。Lerna 可以将所有子项目的依赖关系系统一管理，使得子项目可以共享根目录中定义的依赖关系。

具体来说，Lerna 会在根目录下创建一个 node_modules 目录，用于存储所有子项目的依赖关系。当子项目进行依赖安装时，Lerna 会自动将根目录中定义的依赖关系和子项目的依赖关系合并，然后将这些依赖关系安装到 node_modules 目录下。这样，子项目就可以使用根目录中定义的依赖关系了。

需要注意的是，Lerna 会将所有子项目的依赖关系合并到根目录的 node_modules 目录下，因此可能会出现依赖冲突或者版本不兼容等问题。为了避免这些问题，Lerna 提供了一些工具和命令，用于管理依赖关系和版本控制。例如，可以使用 lerna bootstrap 命令安装所有子项目的依赖关系，并将它们链接到根目录的 node_modules 目录下，以避免依赖冲突和版本不兼容等问题。

下面是一个使用 Lerna 管理 monorepo 项目的示例：

创建 monorepo 项目并初始化 Lerna：

```bash
mkdir my-monorepo
cd my-monorepo
npm init -y
npx lerna init
```
在根目录的 package.json 文件中定义依赖关系：

```json
{
  "name": "my-monorepo",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21",
    "react": "^17.0.2"
  }
}
```
创建一个子项目：

```bash
npx lerna create my-package
```
在子项目的 package.json 文件中声明依赖关系：

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21",
    "react": "^17.0.2"
  }
}
```
安装所有子项目的依赖关系：

```bash
npx lerna bootstrap
```

运行子项目中的脚本：

```bash
npx lerna run test --scope=my-package
```
在上面的示例中，我们使用 Lerna 创建了一个 monorepo 项目，并定义了根目录中的依赖关系。然后创建了一个子项目，并在子项目中声明了依赖关系。最后使用 lerna bootstrap 命令安装了所有子项目的依赖关系，并使用 lerna run 命令运行了子项目中的脚本。