
import React, { useEffect, useRef } from 'react';

interface SpeechSynthesisProps {
  text: string;
  speak: boolean;
  onEnd?: () => void;
}

const SpeechSynthesis: React.FC<SpeechSynthesisProps> = ({ text, speak, onEnd }) => {
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Create speech synthesis utterance
    if (!speechRef.current) {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.lang = 'fr-FR';
      speechRef.current.rate = 0.9;
      speechRef.current.pitch = 1.0;
      speechRef.current.volume = 1.0;
    }

    // Set up the end event listener
    const handleEnd = () => {
      if (onEnd) {
        onEnd();
      }
    };

    if (speak && text) {
      speechRef.current.text = text;
      speechRef.current.addEventListener('end', handleEnd);
      
      // Cancel any existing speech
      window.speechSynthesis.cancel();
      
      // Start speech
      window.speechSynthesis.speak(speechRef.current);

      return () => {
        if (speechRef.current) {
          speechRef.current.removeEventListener('end', handleEnd);
        }
      };
    } else {
      window.speechSynthesis.cancel();
    }
  }, [text, speak, onEnd]);

  return null; // Component doesn't render anything
};

export default SpeechSynthesis;
