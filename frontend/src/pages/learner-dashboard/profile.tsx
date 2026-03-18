import { ReactNode } from 'react';
import Profile from '@/modules/learner/pages/Profile';

function ProfilePage() {
  return <Profile />;
}

ProfilePage.getLayout = (page: ReactNode) => page;

export default ProfilePage;
