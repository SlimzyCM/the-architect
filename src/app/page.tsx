import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <>
      <Hero />

      {/* About Section */}
      <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold gradient-text mb-4">About Me</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Coming in Phase 3...</p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold gradient-text mb-4">Skills</h2>
          <p style={{ color: 'var(--text-secondary)' }}>3D Solar System — Coming in Phase 3...</p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold gradient-text mb-4">Projects</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Case Studies — Coming in Phase 3...</p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold gradient-text mb-4">Experience</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Timeline — Coming in Phase 3...</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold gradient-text mb-4">Contact</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Form — Coming in Phase 4...</p>
        </div>
      </section>
    </>
  );
}
