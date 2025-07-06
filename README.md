# utcode-chat-app

## Development Servers

- Convex (`bun dev:convex`)
  - Convex at <http://localhost:3210>
  - Convex Dashboard at <http://localhost:6790>
- Web Client (`bun dev:web`)
  - depends on Convex
  - <http://localhost:5173>
- Storybook (`bun dev:storybook`)
  - <http://localhost:6006>
- Tauri (`bun dev:tauri`)
  - depends on Convex
  - conflicts with web client

```sh
bun dev
```

でアプリケーションの動作に必要なものだけ (Convex + Web Client) を起動します。

```sh
bun dev:all
```

で上に加え Storybook が起動します。

### Tauri

Tauri はコンパイルに時間と計算資源を使うので、

```sh
bun dev:tauri
```

で明示的に起動しないと起動しません。
