[简体中文](./README.md) | English

[Figma](https://www.figma.com/design/ErcL6eJ3hfRb0uQ4tLvWDt/GabageRecycle?m=auto&t=j99wipHRWdSL7DhL-1) | [Aboutme](https://www.zzfw.cc/blocks)

<img width="2541" height="1071" alt="草稿 3025" src="https://github.com/user-attachments/assets/0893efcc-e368-47ff-96b7-b47f8d8ee553" />


# Garbage Recycle

> This is an old project from 3 years ago when I was a front-end newbie, just out of school and trying to make a living, learning front-end development on my own. Because I couldn't find a job I liked, I decided to make some fun little toys to practice the skills I wanted to learn and recycle my own "garbage" time. It's worth mentioning that I did all the UI, animations, and interactions myself (even the illustrations, as I was also learning Figma at the time). Recently, I had some free time and remembered this project. Since I wanted to learn some new things, I decided to revamp it.
> I made this repository public a long time ago, hoping that some friends would join me in creating interesting cases. However, my skills were limited, and I felt my code was too poor to be shared without being laughed at. Now, I've grown a thicker skin 😏

## ✨ Tech Stack

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **GSAP**: For complex animations
- **i18next**: For internationalization
- **React Router**: For client-side routing

## 🪴 Code Reuse

- `src/index.css` contains Tailwind CSS v4 color variables and base fonts.
- The `BackgroundText` and `SliderText` components in `src/pages/home/components` (The idea is that components for different cases are placed in their own `components` folder under their respective page directory. In most cases, components are not reused, which can reduce the mental load, although these two components were reused in the initial three pages).
- [lucide-react](https://lucide.dev/): This is an icon library I use frequently. You will likely find the icons you need here.

## 🚀 Quick Start

1.  Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Rabithua/gabage_recycle.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd gabage_recycle
    ```

3.  Install dependencies (recommended using `bun`):

    ```bash
    bun install
    ```

    Or using `npm`:

    ```bash
    npm install
    ```

4.  Start the development server:

    ```bash
    bun dev
    ```

    Or

    ```bash
    npm run dev
    ```

5.  Open `http://localhost:5173` in your browser to see the project.

6.  You can create a new case by creating a new folder directly in the **pages** directory. You will need to configure the route in `src/main.tsx` to access the page directly.

7.  Once development is complete, you can add it to the **pages** array in `src/pages/scroll/index.tsx` so that it can be opened by scrolling on the homepage.

## 📜 Available Scripts

- `dev`: Starts the development server.
- `build`: Bundles the project into the `dist` directory.
- `lint`: Lints the code using ESLint.
- `preview`: Previews the production build locally.

## 📁 Project Structure

```
/public         # Static assets
/src
  /components   # Reusable UI components
  /hook         # Custom Hooks
  /i18n         # i18n configuration and language packs
  /pages        # Page components
  /types        # TypeScript type definitions
  index.css     # Global styles
  main.tsx      # Application entry point
vite.config.ts  # Vite configuration file
...
```

## 🤝 Contributing

Contributions of all kinds are welcome! If you have any ideas or find a bug, feel free to submit a Pull Request or create an Issue.
