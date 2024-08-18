import clsx from 'clsx';
import { forwardRef } from 'react';

interface TBItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  bgOpacity?: number;
  editable?: boolean;
}

const TBItem = forwardRef<HTMLDivElement, TBItemProps>(
  ({ active, className, bgOpacity = 1, style, editable, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'h-[2rem] w-full border-b border-gray-10 last:border-b-0 odd:border-dashed even:border-solid',
          className,
          {
            'bg-primary-50': active,
            'bg-gray-05': !active,
            'cursor-pointer': editable || active,
          },
        )}
        style={{
          backgroundColor: active ? `rgba(76, 101, 229, ${bgOpacity})` : '',
          ...style,
        }}
        {...rest}
      />
    );
  },
);

export default TBItem;
