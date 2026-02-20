'use client';

export default function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-[14px] font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Chidi Michael Okobia
          </p>
          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
            Engineering systems that scale.
          </p>
        </div>

        <div className="flex items-center gap-8">
          {[
            { label: 'GitHub', href: 'https://github.com/SlimzyCM' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/slimzycm' },
            { label: 'Email', href: 'mailto:chidimicheal17@gmail.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] transition-opacity duration-300 hover:opacity-60"
              style={{ color: 'var(--text-muted)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
