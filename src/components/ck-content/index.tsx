import 'ckeditor5/ckeditor5.css';

export function CkContent({ children }: { children: string }) {
  if (!children) {
    return null;
  }

  return (
    <div
      className="ck-content"
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    />
  );
}
