# utcode-chat-app

## Development Servers

- Convex at http://localhost:3210
- Convex Dashboard at http://localhost:6790
- Web Client at http://localhost:5173
- Storybook at http://localhost:6006

```sh
bun dev:all
```

で全部起動します。

```sh
bun dev
```

でアプリケーションの動作に必要なものだけ起動します。

## Tauri

Tauri はコンパイルに計算資源をたくさん使うので、 Opt-In になっています。

```sh
bun dev:convex # バックエンドが必要
bun dev:tauri
```