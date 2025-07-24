# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a TypeScript monorepo using a Convex backend and SvelteKit frontend with Tauri for desktop apps.

### Stack

- **Frontend**: SvelteKit with Svelte 5, TypeScript, TailwindCSS, DaisyUI
- **Backend**: Convex (real-time database and functions)
- **Desktop**: Tauri (optional, conflicts with web dev server)
- **Internationalization**: Paraglide for i18n (English/Japanese)
- **Styling**: TailwindCSS v4 with DaisyUI components
- **Package Manager**: Bun
- **Monorepo Structure**: Workspaces with `packages/`

### Apps Structure

- `packages/client/` - SvelteKit frontend with Tauri integration
- `packages/convex/` - Convex backend with database schema and functions

## Development Commands

### Setup

```bash
bun install --frozen-lockfile
```

### Development Servers

```bash
# Main development (Convex + Web Client)
bun dev

# All development servers including Storybook
bun dev:all

# Individual servers
bun dev:web         # Web client at http://localhost:5173
bun dev:convex      # Convex at http://localhost:3210, Dashboard at http://localhost:6790
bun dev:storybook   # Storybook at http://localhost:6006
bun dev:tauri       # Desktop app (conflicts with web client)
```

### Building and Testing

```bash
# Build all apps
bun run --filter=* build

# Run tests
bun test

# Type checking and linting
bun check          # Runs lint + format + all app checks
bun check:lint     # Biome linting only
bun check:format   # Prettier formatting check only

# Auto-fix
bun fix            # Auto-fix lint + format issues
bun fix:lint       # Biome auto-fix
bun fix:format     # Prettier auto-format
```

### Convex Operations

```bash
# Convex CLI commands
bun convex [command]

# Code generation (run after schema changes)
bun sync
```

### Internationalization

```bash
# Compile i18n messages
bun paraglide
```

## Code Architecture

### Frontend (SvelteKit)

- **Routes**: Standard SvelteKit routing in `packages/client/src/routes/`
- **Components**: Organized in `packages/client/src/components/` with atoms and examples
- **Aliases**:
  - `@` → `src`
  - `@@` → `../..` (workspace root)
  - `$components` → `src/components`
  - `~` → `src/`
- **Convex Integration**: Uses `convex-svelte` for reactive queries
- **State Pattern**: Logic components (e.g., TaskList.svelte) separate from presentation (TaskListSkin.svelte)

### 注意点: convex-svelte の `useQuery` について

`useQuery` に渡す引数は、関数の形式で渡してください。そうでないと、期待しない動作を引き起こす可能性があります。

```svelte
<script lang="ts">
  // good
  const selectedChannel = useQuery(api.channels.get, () => ({
    id: selectedChannelId,
  }));

  // bad - この形だと `selectedChannelId` の変更を検知できない
  const selectedChannelBad = useQuery(api.channels.get, {
    id: selectedChannelId,
  });
  // works, but smelly code
  const selectedChannelSmelly = useQuery(api.channels.list, {});
  // better - only use getter functions
  const selectedChannelBetter = useQuery(api.channels.list, () => ({}));
</script>
```

### Backend (Convex)

- **Schema**: Defined in `packages/convex/src/convex/schema.ts`
- **Functions**: Database operations in `packages/convex/src/convex/[feature].ts`
- **Type Safety**: Auto-generated types from schema shared with frontend via workspace dependency

### Data Flow

1. Convex schema defines database structure
2. Convex functions provide type-safe CRUD operations
3. Frontend uses `convex-svelte` hooks for reactive data
4. Automatic type generation ensures type safety across stack

## Code Quality

### Linting and Formatting

- **Biome**: Primary linter with strict rules
- **Prettier**: Code formatting (Biome formatter disabled)
- **Lefthook**: Pre-commit hooks for code generation and formatting

### Special Biome Rules

- Svelte files have relaxed rules for unused variables/imports
- Convex files exempt from import extension requirements
- Strict style rules including parameter assignment, const assertions

### Pre-commit Hooks

- Automatic code generation (`bun sync`)
- Automatic formatting (`bun fix:format`)

## Tauri Desktop App

Tauri integration requires separate development workflow:

```bash
# Start backend first
bun dev:convex

# Then start Tauri (in separate terminal)
bun dev:tauri
```

Tauri conflicts with the web development server and requires more resources for compilation.
