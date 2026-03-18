import { ReactNode } from 'react';
import Message from '@/modules/learner/pages/Message';

function MessagePage() {
  return <Message />;
}

MessagePage.getLayout = (page: ReactNode) => page;

export default MessagePage;
