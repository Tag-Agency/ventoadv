'use client'

export default function GutenbergContent({ content, className = 'py-20', compact = false }) {
  return (
    <div className={`gutenberg-content ${compact ? 'compact' : ''} ${className}`}>
      <style jsx global>{`
        .gutenberg-content .wp-block-group {
          display: flex;
          gap: 3rem;
          align-items: center;
          padding: 3rem 1rem;
          max-width: 80%;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 2rem;
        }
        /* Compact variant: tighter vertical rhythm */
        .gutenberg-content.compact .wp-block-group {
          padding: 2rem 1rem;
          margin-bottom: 1.25rem;
        }
        
        .gutenberg-content .wp-block-group.alignfull {
          width: 80%;
          max-width: 80%;
        }
        
        .gutenberg-content .wp-block-group.is-nowrap {
          flex-wrap: nowrap;
        }
        
        .gutenberg-content .wp-block-image {
          margin: 0;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 2rem;
        }
        
        .gutenberg-content .wp-block-image img {
          display: block;
          height: auto;
          border-radius: 2rem;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          transition: transform 0.6s ease-out;
        }
        
        .gutenberg-content .wp-block-image:hover img {
          transform: scale(1.05);
        }
        
        .gutenberg-content p {
          flex: 1;
          font-size: 1.25rem;
          line-height: 1.2em;
          color: #4B5563;
          margin: 0;
        }
        .gutenberg-content.compact p {
          font-size: 1.125rem;
          line-height: 1.5em;
        }
        
        .gutenberg-content .has-text-align-right {
          text-align: right;
        }
        
        .gutenberg-content .has-text-align-left {
          text-align: left;
        }
        
        @media (max-width: 768px) {
          .gutenberg-content .wp-block-group {
            flex-direction: column;
            gap: 2rem;
            padding: 2rem 1rem;
            max-width: 95%;
          }
          .gutenberg-content.compact .wp-block-group {
            gap: 1.25rem;
            padding: 1.5rem 1rem;
          }
          
          /* Assicura che l'immagine sia sempre prima del testo */
          .gutenberg-content .wp-block-group > .wp-block-image {
            order: -1;
            width: 100%;
            max-width: 100%;
          }
          
          .gutenberg-content .wp-block-image img {
            width: 100% !important;
            height: auto !important;
            max-height: 300px;
            object-fit: cover;
          }
          
          .gutenberg-content .wp-block-image:hover img {
            transform: scale(1);
          }
          
          /* Testo sempre dopo l'immagine */
          .gutenberg-content .wp-block-group > p {
            order: 1;
            width: 100%;
          }
          
          .gutenberg-content p {
            text-align: center !important;
            font-size: 1.125rem;
            line-height: 1.6em;
          }
          .gutenberg-content.compact p {
            font-size: 1.0625rem;
            line-height: 1.55em;
          }
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
