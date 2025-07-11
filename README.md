# utcode-chat-app

## 開発

utcode-chat-app では、 Monorepo 構成を採用しており、主に

- `apps` -> リリース時に実行するアプリケーション
- `packages` -> リリース時に直接実行しないライブラリ

という配置になっています。

`packages` はそれぞれ開発方法が違うので、それぞれの README を参考にしてください。

### セットアップ

- インストール: Bun >= v1.2
- 実行: `bun install --frozen-lockfile`

### 開発用サーバー

アプリケーションとして実行するものは `apps` 以下に配置されています。

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

#### Tauri

Tauri はコンパイルに時間と計算資源を使うので、

```sh
bun dev:convex # Tauri の動作にバックエンドが必要
bun dev:tauri
```

で明示的に起動しないと起動しません。
