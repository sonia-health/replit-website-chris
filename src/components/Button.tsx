import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'large' | 'medium';
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  className = '',
  external = false,
}: ButtonProps) {
  const classes = `button button--${variant} button--${size} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
