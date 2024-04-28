"use client";
import * as React from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
} from "@codemirror/view";
import { autocompletion } from "@codemirror/autocomplete";
import { javascript, javascriptLanguage } from "@codemirror/lang-javascript";

let completions = [
  { label: "panic", detail: "panicking", type: "keyword" },
  { label: "park", type: "constant", info: "Test completion" },
  { label: "password", type: "variable" },
];

function myCompletions(context) {
  // i don't remember why i used 2 different regex patterns
  // but the autocompletion doesn't work as expected if you remove one of them
  const before = context.matchBefore(/\w+/);
  const match = context.matchBefore(/\w+.?/);
  //console.log({ before, match });
  if (match) {
    completions = getAutocompletion(context.state.doc.toString(), context.pos);
  }
  // If completion wasn't explicitly started and there
  // is no word before the cursor, don't open completions.
  if (!context.explicit && !before) return null;
  //console.log({ context });
  return {
    from: before ? before.from : context.pos,
    options: completions,
    validFor: /^\w*$/,
  };
}

const Editor = () => {
  const editorParentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (editorParentRef.current === null) return;

    const editorView = new EditorView({
      state: EditorState.create({
        doc: "Hello, World!",
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          highlightActiveLineGutter(),
          autocompletion(),
          javascript(),

          javascriptLanguage.data.of({
            autocomplete: myCompletions,
          }),
        ],
      }),
      parent: editorParentRef.current,
    });

    return () => {
      editorView.destroy();
    };
  }, [editorParentRef]);

  return <div ref={editorParentRef} />;
};

export default function Index() {
  return (
    <div className="mx-4 space-y-2">
      <h1 className="text-xl">Editor</h1>
      <Editor />
    </div>
  );
}
