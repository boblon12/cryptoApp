import React from 'react';
import { useAuth } from '../../context/AuthContext';
import userAvatar from '../../images/userAvatar.png';

function MyCustomAvatar() {
  const { user } = useAuth();
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div
        className="react-chatbot-kit-chat-bot-avatar-container"
        style={{ background: 'none' }}
      >
        <img
          alt="BotAvatar"
          src={user.photoURL || userAvatar}
          style={{
            width: '40px',
            height: '40px',
            'border-radius': '50%',
            marginLeft: '20px',
          }}
        />
      </div>
    </div>
  );
}

export default MyCustomAvatar;
