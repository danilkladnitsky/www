import type { ReactElement } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  children: ReactElement<{ className?: string; children?: string }>;
}

export async function CodeBlock({ children }: CodeBlockProps) {
  const code = typeof children.props.children === "string" ? children.props.children.trim() : "";
  const lang =
    children.props.className && children.props.className.startsWith("language-")
      ? children.props.className.replace("language-", "")
      : "tsx";

  const html = await codeToHtml(code, {
    lang,
    theme: "ayu-dark",
  });

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-neutral-800/60 bg-neutral-950/80">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

