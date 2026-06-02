export default function Button({ as: Component = 'button', className = '', ...props }) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded bg-brand px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-ink ${className}`}
      {...props}
    />
  );
}
