<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;">
    <span>简体中文 | <a href="./README.en.md">English</a></span>
    <span><a href="https://www.figma.com/design/ErcL6eJ3hfRb0uQ4tLvWDt/GabageRecycle?m=auto&t=j99wipHRWdSL7DhL-1">Figma</a> | <a href="https://www.zzfw.cc/blocks">Aboutme</a></span>
</div>

<img width="2541" height="1071" alt="草稿 3025" src="https://github.com/user-attachments/assets/0893efcc-e368-47ff-96b7-b47f8d8ee553" />

# 废物回收

> 这是一个 3 年前的旧项目，那时候我还是一个前端菜鸟，刚从学校出来愁于生计，一个人默默学习前端。因为找不到喜欢的工作，索性做一些无聊的小玩具，顺便练习想学的技能，回收一下自己的垃圾时间。值得一提的是，UI/动效/交互都是自己做的（甚至插画也是自己做的，因为当时也在学习 figma），最近闲下来又想起来了这个项目，正好想学一些新东西，就翻新了废物回收。
> 很早的时候就把这个仓库改成了公开仓库，希望能有小伙伴一起做一些有意思的 case 出来，奈何能力有限，觉得自己代码写的太臭，发出来会被大家笑话，现在脸皮厚了😏

## ✨ 技术栈

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **GSAP**: 用于实现复杂的动画效果
- **i18next**: 用于国际化
- **React Router**: 用于客户端路由

## 🪴 代码复用

- `src/index.css` 中包含 tailwindcss v4 颜色变量，以及基础字体
- `src/pages/home/components` 中的 `BackgroudText` `SliderText` 组件（想法是不同的 case 组件写在自己 page 目录下独立的components 文件夹，大多数情况下组件是不用复用的，这样写可以减轻心智负担，虽然这两个组件在最初的三个页面复用了）
- [lucide-react](https://lucide.dev/) 这是我用的比较多的图标库，你大概率可以在这里找到你想用的图标

## 🚀 快速开始

1.  克隆仓库到本地:

    ```bash
    git clone https://github.com/Rabithua/gabage_recycle.git
    ```

2.  进入项目目录:

    ```bash
    cd gabage_recycle
    ```

3.  安装依赖 (推荐使用 `bun`):

    ```bash
    bun install
    ```

    或者使用 `npm`:

    ```bash
    npm install
    ```

4.  启动开发服务器:

    ```bash
    bun dev
    ```

    或者

    ```bash
    npm run dev
    ```

5.  在浏览器中打开 `http://localhost:5173` 查看项目。

6.  你可以直接在 **pages** 目录下新建文件夹做新的 case，需要在 `src/main.tsx` 配置路由以直接访问页面

7.  开发完毕，可以加在 `src/pages/scroll/index.tsx` 页面的 **pages** 数组中，这样就可以在首页滑动打开页面了

## 📜 可用脚本

- `dev`: 启动开发服务器。
- `build`: 将项目打包到 `dist` 目录。
- `lint`: 使用 ESLint 检查代码规范。
- `preview`: 在本地预览生产环境构建包。

## 📁 项目结构

```
/public         # 存放静态资源
/src
  /components   # 可复用的 UI 组件
  /hook         # 自定义 Hooks
  /i18n         # 国际化配置和语言包
  /pages        # 页面组件
  /types        # TypeScript 类型定义
  index.css     # 全局样式
  main.tsx      # 应用入口文件
vite.config.ts  # Vite 配置文件
...
```

## 🤝 贡献

欢迎各种形式的贡献！如果你有任何想法或者发现了 bug，请随时提交 Pull Request 或者创建 Issue。
