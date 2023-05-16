import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

const getVariantStyles = ({ primary = false }) =>
  primary ? ['text-white', 'bg-blue-950'] : ['text-white', 'bg-red-950'];

const getSizeStyles = ({ size = 'medium' }) => {
  switch (size) {
    case 'small':
      return ['text-sm', 'p-2'];
    case 'large':
      return ['text-l', 'p-4'];
    default:
      return ['text-base', 'p-3'];
  }
};

export const Button: React.FC<ButtonProps> = ({
  primary,
  backgroundColor,
  size,
  label,
  onClick,
}) => (
  <button
    className={classNames([
      'font-bold',
      'border-0',
      'rounded-full',
      'cursor-pointer',
      'inline-block',
      'line-height-1',
      ...getVariantStyles({ primary }),
      ...getSizeStyles({ size }),
    ])}
    style={{ backgroundColor }}
  >
    {label}
  </button>
);
