'use client'

export default function GutenbergContent({ content }) {
  return (
    <div className="gutenberg-content py-20">
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
          }
          
          .gutenberg-content .wp-block-image img {
            width: 100% !important;
            height: auto !important;
          }
          
          .gutenberg-content .wp-block-image:hover img {
            transform: scale(1);
          }
          
          .gutenberg-content p {
            text-align: center !important;
            font-size: 1.125rem;
            line-height: 1.2em;
          }
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
