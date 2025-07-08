<script lang="ts">
  import { markdown } from "@codemirror/lang-markdown";
  import { EditorState } from "@codemirror/state";
  import { Watcher } from "@packages/utils";
  import { EditorView } from "codemirror";
  import { basicSetup } from "./extensions/base.ts";

  interface Props {
    doc?: string;
  }
  let { doc = $bindable("") }: Props = $props();
  let view = $state<EditorView>();
  let el = $state<HTMLDivElement>();

  const docWatcher = new Watcher(
    () => doc,
    (v) => {
      doc = v;
    },
  );
  docWatcher.onupdate = (doc) => {
    const changes = {
      from: 0,
      to: view?.state.doc.length,
      insert: doc,
    };
    view?.dispatch({ changes });
  };

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      docWatcher.set(update.state.doc.toString());
    }
  });

  const editorState = EditorState.create({
    extensions: [basicSetup, updateListener, markdown()],
  });

  $effect(() => {
    if (!el) return;
    view = new EditorView({
      state: editorState,
      parent: el,
    });

    return () => view?.destroy();
  });
</script>

<div class="contents" bind:this={el}></div>
