
import { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing stars
    containerRef.current.innerHTML = '';
    
    // Create stars with improved properties for better cosmic theme
    const starCount = 200; // Increased star count for more immersive effect
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Enhanced star properties
      const size = Math.random() * 3 + 0.5; // Slightly larger stars
      const opacity = Math.random() * 0.6 + 0.2; // Adjusted opacity range
      const duration = Math.random() * 5 + 3; // Longer animation duration for smoother effect
      
      // Position randomly
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty('--opacity', opacity.toString());
      star.style.setProperty('--duration', `${duration}s`);
      
      // Add a small delay to each star
      star.style.animationDelay = `${Math.random() * duration}s`;
      
      // Add different star colors for more cosmic feel
      const colors = ['#ffffff', '#e0f2ff', '#c4d8ff', '#d9c4ff', '#c4fffa'];
      star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Append to container
      containerRef.current.appendChild(star);
    }
  }, []);

  return <div ref={containerRef} className="stars fixed inset-0 -z-10 pointer-events-none"></div>;
};

export default StarfieldBackground;
