import { forwardRef } from 'react';
import { WIDGET_CARD_CONTAINER_NAME } from '@/page-layout/widgets/widget-card/constants/WidgetCardContainerName';

export const ReactGridLayoutCardWrapper = forwardRef<
  HTMLDivElement,
  {
    key: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
    onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  }
>(
  (
    { children, key, className, style, onMouseDown, onMouseUp, onMouseMove },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        key={key}
        data-select-disable="true"
        className={className}
        // A grid cell has a fixed height, so a widget can adapt to it, like a one-row tile.
        style={{
          ...style,
          containerName: WIDGET_CARD_CONTAINER_NAME,
          containerType: 'size',
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {children}
      </div>
    );
  },
);
