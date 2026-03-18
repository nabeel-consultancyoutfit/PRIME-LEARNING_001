/**
 * Trainer Messages Mock Service
 * Pixel-perfect to Figma node 40000068:36425
 */

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  timestamp: string;
  isFromTrainer: boolean;
}

export interface Conversation {
  id: string;
  learnerId: string;
  learnerName: string;
  learnerInitials: string;
  avatarColor: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen: string;
  programme: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isResolved: boolean;
  messages: Message[];
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    learnerId: '4',
    learnerName: 'Marcus Taylor',
    learnerInitials: 'MT',
    avatarColor: '#4A90D9',
    status: 'online',
    lastSeen: 'Active now',
    programme: 'Customer Service Specialist L3',
    lastMessage: 'Hi, can we reschedule my review meeting?',
    lastMessageTime: '2h ago',
    unreadCount: 3,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'Hi Sarah, I wanted to ask about the upcoming progress review.',
        senderId: '4',
        senderName: 'Marcus Taylor',
        senderInitials: 'MT',
        timestamp: '09:00',
        isFromTrainer: false,
      },
      {
        id: 'm2',
        content: 'Of course Marcus! Your review is scheduled for 17th March at 2pm. Does that still work for you?',
        senderId: 'trainer',
        senderName: 'Sarah Thompson',
        senderInitials: 'ST',
        timestamp: '09:15',
        isFromTrainer: true,
      },
      {
        id: 'm3',
        content: 'Hi, can we reschedule my review meeting? I have a conflict at work that day.',
        senderId: '4',
        senderName: 'Marcus Taylor',
        senderInitials: 'MT',
        timestamp: '14:00',
        isFromTrainer: false,
      },
    ],
  },
  {
    id: '2',
    learnerId: '1',
    learnerName: 'James Wilson',
    learnerInitials: 'JW',
    avatarColor: '#7B61FF',
    status: 'offline',
    lastSeen: 'Last seen 3h ago',
    programme: 'Team Leader / Supervisor L3',
    lastMessage: 'Thank you for the feedback on my journal entry!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isResolved: true,
    messages: [
      {
        id: 'm1',
        content: "I've just reviewed your reflective account. Great work, James. I especially liked your analysis of the conflict resolution scenario.",
        senderId: 'trainer',
        senderName: 'Sarah Thompson',
        senderInitials: 'ST',
        timestamp: '15:30',
        isFromTrainer: true,
      },
      {
        id: 'm2',
        content: "Thank you for the feedback on my journal entry! I'll work on expanding the section about outcomes.",
        senderId: '1',
        senderName: 'James Wilson',
        senderInitials: 'JW',
        timestamp: '16:45',
        isFromTrainer: false,
      },
    ],
  },
  {
    id: '3',
    learnerId: '3',
    learnerName: 'Olivia Brown',
    learnerInitials: 'OB',
    avatarColor: '#F5A623',
    status: 'busy',
    lastSeen: 'Last seen 1h ago',
    programme: 'Retail Manager L4',
    lastMessage: 'I will try to submit the overdue task by end of week.',
    lastMessageTime: '2 days ago',
    unreadCount: 1,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'Olivia, I noticed your Retail Operations report is now overdue. Is everything okay?',
        senderId: 'trainer',
        senderName: 'Sarah Thompson',
        senderInitials: 'ST',
        timestamp: '10:00',
        isFromTrainer: true,
      },
      {
        id: 'm2',
        content: "Sorry about that. It's been a very busy month at the store. I will try to submit the overdue task by end of week.",
        senderId: '3',
        senderName: 'Olivia Brown',
        senderInitials: 'OB',
        timestamp: '11:30',
        isFromTrainer: false,
      },
    ],
  },
  {
    id: '4',
    learnerId: '5',
    learnerName: 'Priya Patel',
    learnerInitials: 'PP',
    avatarColor: '#F44336',
    status: 'online',
    lastSeen: 'Active now',
    programme: 'Accounting / Finance L3',
    lastMessage: 'See you at the EPA prep session!',
    lastMessageTime: '3 days ago',
    unreadCount: 0,
    isResolved: true,
    messages: [
      {
        id: 'm1',
        content: 'Hi Priya, you are really progressing well. I would like to start preparing you for EPA. When are you free for a planning session?',
        senderId: 'trainer',
        senderName: 'Sarah Thompson',
        senderInitials: 'ST',
        timestamp: '09:00',
        isFromTrainer: true,
      },
      {
        id: 'm2',
        content: 'That is great news! I am free Thursday afternoon or Friday morning.',
        senderId: '5',
        senderName: 'Priya Patel',
        senderInitials: 'PP',
        timestamp: '09:30',
        isFromTrainer: false,
      },
      {
        id: 'm3',
        content: "Perfect — let's say Thursday at 2pm. See you at the EPA prep session!",
        senderId: 'trainer',
        senderName: 'Sarah Thompson',
        senderInitials: 'ST',
        timestamp: '09:45',
        isFromTrainer: true,
      },
    ],
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const messagesService = {
  async getConversations(): Promise<Conversation[]> {
    await delay(400);
    return [...MOCK_CONVERSATIONS];
  },

  async getConversation(id: string): Promise<Conversation | undefined> {
    await delay(300);
    return MOCK_CONVERSATIONS.find((c) => c.id === id);
  },
};
