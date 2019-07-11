import React, { memo } from "react";

import { WidgetProps } from "../index";

const Text = memo(({ id, content, setDataValue }: Props) => {
  return (
    <textarea
      className="py-1 px-3 w-100 h-100 border-0 resize-none text-color-widget bg-color-widget"
      aria-label="Text widget"
      // TODO: throttle
      onChange={event =>
        setDataValue({ id, key: "content", value: event.target.value })
      }
      value={content}
    />
  );
});

interface Props extends WidgetProps {
  content?: string;
}

export default Text;