
import React from 'react';
import TeacherBubble from '@/components/TeacherBubble';

interface TeacherSectionProps {
  message: string;
  speak: boolean;
  onSpeechEnd: () => void;
  use3DAvatar: boolean;
  className?: string;
}

const TeacherSection: React.FC<TeacherSectionProps> = ({ 
  message, 
  speak, 
  onSpeechEnd, 
  use3DAvatar,
  className
}) => {
  return (
    <div className={`flex flex-col justify-start items-center h-full pt-[50px] ${className || ''}`}>
      <TeacherBubble 
        message={message}
        speak={speak}
        onSpeechEnd={onSpeechEnd}
        use3DAvatar={use3DAvatar}
      />
    </div>
  );
};

export default TeacherSection;
