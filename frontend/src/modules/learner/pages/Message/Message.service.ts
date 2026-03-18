/**
 * Learner Messages Mock Service
 * Figma node 40000068:36425 — contacts: X_AE_A-13b, Pippins McGray, McKinsey Vermillion,
 * Benedict Combersmacks, Saylor Twift, Miranda Blue
 */

export interface LearnerMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  timestamp: string;
  isFromLearner: boolean;
}

export interface LearnerConversation {
  id: string;
  contactId: string;
  contactName: string;
  contactInitials: string;
  contactRole: string;
  avatarColor: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen: string;
  programme: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isResolved: boolean;
  messages: LearnerMessage[];
}

const MOCK_CONVERSATIONS: LearnerConversation[] = [
  {
    id: '1',
    contactId: 'contact-1',
    contactName: 'X_AE_A-13b',
    contactInitials: 'XA',
    contactRole: 'Trainer',
    avatarColor: '#7B61FF',
    status: 'online',
    lastSeen: 'Active now',
    programme: 'Business Administrator Apprenticeship',
    lastMessage: 'You viewed X_AE_A-13b',
    lastMessageTime: '12:25',
    unreadCount: 0,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'Hey, just checking in on your progress this week. How are you getting on with the portfolio evidence?',
        senderId: 'contact-1',
        senderName: 'X_AE_A-13b',
        senderInitials: 'XA',
        timestamp: '12:10',
        isFromLearner: false,
      },
      {
        id: 'm2',
        content: 'Going really well! I\'ve completed the KSB mapping for units 1 and 2.',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '12:18',
        isFromLearner: true,
      },
      {
        id: 'm3',
        content: 'That\'s great to hear. Make sure you get the reflective account done before Friday.',
        senderId: 'contact-1',
        senderName: 'X_AE_A-13b',
        senderInitials: 'XA',
        timestamp: '12:22',
        isFromLearner: false,
      },
      {
        id: 'm4',
        content: 'Will do, thanks for the reminder!',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '12:25',
        isFromLearner: true,
      },
    ],
  },
  {
    id: '2',
    contactId: 'contact-2',
    contactName: 'Pippins McGray',
    contactInitials: 'PM',
    contactRole: 'IQA',
    avatarColor: '#F5A623',
    status: 'offline',
    lastSeen: 'Last seen 2h ago',
    programme: 'Business Administrator Apprenticeship',
    lastMessage: 'Please review your portfolio before next session',
    lastMessageTime: '11:40',
    unreadCount: 0,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'Hi! I\'ve reviewed your recent submission. Good work overall.',
        senderId: 'contact-2',
        senderName: 'Pippins McGray',
        senderInitials: 'PM',
        timestamp: '10:30',
        isFromLearner: false,
      },
      {
        id: 'm2',
        content: 'Thank you so much, that\'s reassuring to hear.',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '10:45',
        isFromLearner: true,
      },
      {
        id: 'm3',
        content: 'Please review your portfolio before next session and ensure all attachments are labelled correctly.',
        senderId: 'contact-2',
        senderName: 'Pippins McGray',
        senderInitials: 'PM',
        timestamp: '11:40',
        isFromLearner: false,
      },
    ],
  },
  {
    id: '3',
    contactId: 'contact-3',
    contactName: 'McKinsey Vermillion',
    contactInitials: 'MV',
    contactRole: 'Assessor',
    avatarColor: '#E53935',
    status: 'busy',
    lastSeen: 'Last seen 1h ago',
    programme: 'Business Administrator Apprenticeship',
    lastMessage: 'Your EPA date has been confirmed',
    lastMessageTime: '09:15',
    unreadCount: 8,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'Your EPA date has been confirmed for 12th June 2025. Please ensure all gateway criteria are met.',
        senderId: 'contact-3',
        senderName: 'McKinsey Vermillion',
        senderInitials: 'MV',
        timestamp: '09:00',
        isFromLearner: false,
      },
      {
        id: 'm2',
        content: 'Thank you! I\'ll make sure everything is in order. Could you send me the checklist?',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '09:05',
        isFromLearner: true,
      },
      {
        id: 'm3',
        content: 'Of course, I\'ll email it over today. In the meantime, focus on your project presentation.',
        senderId: 'contact-3',
        senderName: 'McKinsey Vermillion',
        senderInitials: 'MV',
        timestamp: '09:10',
        isFromLearner: false,
      },
      {
        id: 'm4',
        content: 'Brilliant, I\'ve already started drafting the slides.',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '09:12',
        isFromLearner: true,
      },
      {
        id: 'm5',
        content: 'Your EPA date has been confirmed — see previous message.',
        senderId: 'contact-3',
        senderName: 'McKinsey Vermillion',
        senderInitials: 'MV',
        timestamp: '09:15',
        isFromLearner: false,
      },
    ],
  },
  {
    id: '4',
    contactId: 'contact-4',
    contactName: 'Benedict Combersmacks',
    contactInitials: 'BC',
    contactRole: 'Support',
    avatarColor: '#4A90D9',
    status: 'online',
    lastSeen: 'Active now',
    programme: 'General Enquiries',
    lastMessage: 'Let us know if you need further help',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isResolved: true,
    messages: [
      {
        id: 'm1',
        content: 'Hi, I\'m having trouble accessing the off-the-job log. Could you assist?',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '14 Apr 2025, 14:00',
        isFromLearner: true,
      },
      {
        id: 'm2',
        content: 'Hello! I\'ve reset your access. You should now be able to log in.',
        senderId: 'contact-4',
        senderName: 'Benedict Combersmacks',
        senderInitials: 'BC',
        timestamp: '14 Apr 2025, 14:30',
        isFromLearner: false,
      },
      {
        id: 'm3',
        content: 'Let us know if you need further help with anything.',
        senderId: 'contact-4',
        senderName: 'Benedict Combersmacks',
        senderInitials: 'BC',
        timestamp: '14 Apr 2025, 14:31',
        isFromLearner: false,
      },
    ],
  },
  {
    id: '5',
    contactId: 'contact-5',
    contactName: 'Saylor Twift',
    contactInitials: 'ST',
    contactRole: 'Trainer',
    avatarColor: '#43A047',
    status: 'offline',
    lastSeen: 'Last seen 3h ago',
    programme: 'Business Administrator Apprenticeship',
    lastMessage: 'Great progress this month, keep it up!',
    lastMessageTime: 'Mon',
    unreadCount: 0,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'Just reviewed your monthly progress. You\'re tracking really well!',
        senderId: 'contact-5',
        senderName: 'Saylor Twift',
        senderInitials: 'ST',
        timestamp: 'Mon, 14 Apr 2025, 16:00',
        isFromLearner: false,
      },
      {
        id: 'm2',
        content: 'That\'s great to hear! I\'ve been putting in the extra hours.',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: 'Mon, 14 Apr 2025, 16:15',
        isFromLearner: true,
      },
      {
        id: 'm3',
        content: 'Great progress this month, keep it up!',
        senderId: 'contact-5',
        senderName: 'Saylor Twift',
        senderInitials: 'ST',
        timestamp: 'Mon, 14 Apr 2025, 16:20',
        isFromLearner: false,
      },
    ],
  },
  {
    id: '6',
    contactId: 'contact-6',
    contactName: 'Miranda Blue',
    contactInitials: 'MB',
    contactRole: 'Coach',
    avatarColor: '#AB47BC',
    status: 'online',
    lastSeen: 'Active now',
    programme: 'Business Administrator Apprenticeship',
    lastMessage: 'Your next coaching session is 22nd April',
    lastMessageTime: 'Sun',
    unreadCount: 2,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'Hi! Just a reminder that your next coaching session is booked for 22nd April at 10am.',
        senderId: 'contact-6',
        senderName: 'Miranda Blue',
        senderInitials: 'MB',
        timestamp: 'Sun, 13 Apr 2025, 09:00',
        isFromLearner: false,
      },
      {
        id: 'm2',
        content: 'Thank you for the reminder. I\'ll have my notes ready.',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: 'Sun, 13 Apr 2025, 09:30',
        isFromLearner: true,
      },
      {
        id: 'm3',
        content: 'Perfect! We\'ll focus on your development plan and upcoming EPA prep.',
        senderId: 'contact-6',
        senderName: 'Miranda Blue',
        senderInitials: 'MB',
        timestamp: 'Sun, 13 Apr 2025, 09:35',
        isFromLearner: false,
      },
      {
        id: 'm4',
        content: 'Your next coaching session is 22nd April — looking forward to it!',
        senderId: 'contact-6',
        senderName: 'Miranda Blue',
        senderInitials: 'MB',
        timestamp: 'Sun, 13 Apr 2025, 09:40',
        isFromLearner: false,
      },
    ],
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const learnerMessagesService = {
  async getConversations(): Promise<LearnerConversation[]> {
    await delay(400);
    return [...MOCK_CONVERSATIONS];
  },

  async getConversation(id: string): Promise<LearnerConversation | undefined> {
    await delay(300);
    return MOCK_CONVERSATIONS.find((c) => c.id === id);
  },
};
