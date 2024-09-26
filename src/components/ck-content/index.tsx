import { Box } from '@mui/material';

import './style.css';

export function CkContent({ content }: { content: string }) {
  if (!content) {
    return null;
  }

  return (
    <Box
      className="ck-content"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
