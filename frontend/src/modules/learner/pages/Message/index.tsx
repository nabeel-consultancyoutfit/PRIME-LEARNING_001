/**
 * Message Page Component
 * Placeholder for messaging feature
 */

import React from 'react';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useMessage } from './useMessage';
import { MessageContainer, MessageTitle, MessageText } from './Message.style';

const Message: React.FC = () => {
  useMessage();

  return (
    <LearnerLayout pageTitle="Message">
      <MessageContainer>
        <MessageTitle>Message</MessageTitle>
        <MessageText>Messaging feature coming soon.</MessageText>
      </MessageContainer>
    </LearnerLayout>
  );
};

export default Message;
