/**
 * Learner Messages Mock Service
 * Conversations are between the learner and their trainer/support staff
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
    contactId: 'trainer-1',
    contactName: 'Sarah Thompson',
    contactInitials: 'ST',
    contactRole: 'Trainer',
    avatarColor: '#4A90D9',
    programme: 'Business Administrator Apprenticeship',
    lastMessage: 'Hi, can we reschedule my review meeting?',
    lastMessageTime: '2 hours ago',
    unreadCount: 0,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'Hi Sarah, I wanted to ask about the upcoming progress review.',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '14 Mar 2025, 9:00 AM',
        isFromLearner: true,
      },
      {
        id: 'm2',
        content: 'Of course John! Your review is scheduled for 17th March at 2pm. Does that still work for you?',
        senderId: 'trainer-1',
        senderName: 'Sarah Thompson',
        senderInitials: 'ST',
        timestamp: '14 Mar 2025, 9:15 AM',
        isFromLearner: false,
      },
      {
        id: 'm3',
        content: 'Hi, can we reschedule my review meeting? I have a conflict at work that day.',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '15 Mar 2025, 2:00 PM',
        isFromLearner: true,
      },
    ],
  },
  {
    id: '2',
    contactId: 'trainer-1',
    contactName: 'Sarah Thompson',
    contactInitials: 'ST',
    contactRole: 'Trainer',
    avatarColor: '#4A90D9',
    programme: 'Business Administrator Apprenticeship',
    lastMessage: 'Thank you for the feedback on my journal entry!',
    lastMessageTime: 'Yesterday',
    unreadCount: 2,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'I\'ve just reviewed your reflective account. Great work, John. I especially liked your analysis of the stakeholder management scenario.',
        senderId: 'trainer-1',
        senderName: 'Sarah Thompson',
        senderInitials: 'ST',
        timestamp: '13 Mar 2025, 3:30 PM',
        isFromLearner: false,
      },
      {
        id: 'm2',
        content: 'Thank you for the feedback on my journal entry! I\'ll work on expanding the section about outcomes.',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '13 Mar 2025, 4:45 PM',
        isFromLearner: true,
      },
      {
        id: 'm3',
        content: 'That sounds great! Also, please make sure your off-the-job hours are up to date before our next review.',
        senderId: 'trainer-1',
        senderName: 'Sarah Thompson',
        senderInitials: 'ST',
        timestamp: '13 Mar 2025, 5:00 PM',
        isFromLearner: false,
      },
      {
        id: 'm4',
        content: 'Will do! I\'ll update them by end of this week.',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '13 Mar 2025, 5:10 PM',
        isFromLearner: true,
      },
    ],
  },
  {
    id: '3',
    contactId: 'iqa-1',
    contactName: 'Tahmidul Hassan',
    contactInitials: 'TH',
    contactRole: 'IQA',
    avatarColor: '#F5A623',
    programme: 'Business Administrator Apprenticeship',
    lastMessage: 'Good job on your recent portfolio submission.',
    lastMessageTime: '2 days ago',
    unreadCount: 1,
    isResolved: false,
    messages: [
      {
        id: 'm1',
        content: 'Good job on your recent portfolio submission. The evidence for KSB B3 was particularly strong.',
        senderId: 'iqa-1',
        senderName: 'Tahmidul Hassan',
        senderInitials: 'TH',
        timestamp: '14 Mar 2025, 10:00 AM',
        isFromLearner: false,
      },
      {
        id: 'm2',
        content: 'Thank you! I worked really hard on that section. Is there anything I should improve for the next submission?',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '14 Mar 2025, 11:00 AM',
        isFromLearner: true,
      },
    ],
  },
  {
    id: '4',
    contactId: 'support-1',
    contactName: 'Prime Learning Support',
    contactInitials: 'PL',
    contactRole: 'Support',
    avatarColor: '#7B61FF',
    programme: 'General Enquiries',
    lastMessage: 'Your query has been resolved. Let us know if you need further help.',
    lastMessageTime: '5 days ago',
    unreadCount: 0,
    isResolved: true,
    messages: [
      {
        id: 'm1',
        content: 'Hi, I am having trouble accessing my portfolio section. Could you help?',
        senderId: 'learner',
        senderName: 'John Doe',
        senderInitials: 'JD',
        timestamp: '11 Mar 2025, 9:00 AM',
        isFromLearner: true,
      },
      {
        id: 'm2',
        content: 'Hello John, thank you for getting in touch. We have looked into your account and the access has now been restored.',
        senderId: 'support-1',
        senderName: 'Prime Learning Support',
        senderInitials: 'PL',
        timestamp: '11 Mar 2025, 10:30 AM',
        isFromLearner: false,
      },
      {
        id: 'm3',
        content: 'Your query has been resolved. Let us know if you need further help.',
        senderId: 'support-1',
        senderName: 'Prime Learning Support',
        senderInitials: 'PL',
        timestamp: '11 Mar 2025, 10:31 AM',
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
