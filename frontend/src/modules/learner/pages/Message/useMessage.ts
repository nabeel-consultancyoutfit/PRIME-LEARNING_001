/**
 * Hook for Message page state management
 */

import { useState } from 'react';
import { MessageState } from './Message.interface';

const initialState: MessageState = {};

export const useMessage = () => {
  const [state] = useState<MessageState>(initialState);

  return {
    state,
  };
};
