/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-useless-return */
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Typography } from 'antd';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

import ScrollToTop from '../helpers/ScrollToTop';

const { Title } = Typography;

function Chat() {
  const { user, firestore } = useAuth();
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  );

  if (loading) return <Loader />;

  const sendMessage = async (message) => {
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <>
      <ScrollToTop />
      <Title level={2} className="coin-name">
        Crypto Chat
      </Title>
      <div
        style={{
          position: 'relative',
          height: 'calc(100vh - 90px)',
        }}
      >
        <ChatContainer style={{ 'border-radius': '20px' }}>
          <MessageList style={{ 'border-radius': '20px' }}>
            {messages.map((message, i) =>
              user.uid === message.uid ? (
                <Message
                  key={i}
                  model={{
                    message: message.text,
                    sentTime: message.createdAt,
                    sender: message.displayName,
                    direction: 'outgoing',
                    position: 'single',
                  }}
                />
              ) : (
                <Message
                  key={i}
                  model={{
                    message: message.text,
                    sentTime: message.createdAt,
                    sender: message.displayName,
                    direction: 'incoming',
                    position: 'single',
                  }}
                >
                  <Message.Header
                    sentTime={message.createdAt.toDate().toLocaleTimeString()}
                    sender={message.displayName}
                  />
                  <Avatar
                    src={
                      message.photoURL
                        ? message.photoURL
                        : 'https://crypto.ru/wp-content/plugins/q-auth/assets/img/default-user.png'
                    }
                  />
                </Message>
              )
            )}
          </MessageList>
          <MessageInput
            style={{ 'border-radius': '20px' }}
            onSend={sendMessage}
            placeholder="Type message here..."
            autoFocus
            attachButton={false}
          />
        </ChatContainer>
      </div>
    </>
  );
}
export default Chat;
