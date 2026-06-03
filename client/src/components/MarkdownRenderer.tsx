import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none text-sm leading-relaxed prose-headings:tracking-tight prose-headings:font-semibold prose-a:text-indigo-400 prose-strong:text-white">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
