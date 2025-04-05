
import { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing stars
    containerRef.current.innerHTML = '';
    
    // Create stars
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random star properties
      const size = Math.random() * 3;
      const opacity = Math.random() * 0.7 + 0.3;
      const duration = Math.random() * 4 + 2; // Between 2-6 seconds
      
      // Position randomly
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty('--opacity', opacity.toString());
      star.style.setProperty('--duration', `${duration}s`);
      
      // Add a small delay to each star
      star.style.animationDelay = `${Math.random() * duration}s`;
      
      // Append to container
      containerRef.current.appendChild(star);
    }
  }, []);

  return <div ref={containerRef} className="stars"></div>;
};

export default StarfieldBackground;
