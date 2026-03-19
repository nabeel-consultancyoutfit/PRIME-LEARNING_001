import { ReactNode } from 'react';
import TrainerProfile from '@/modules/trainer/pages/Profile';

function ProfilePage() {
  return <TrainerProfile />;
}

ProfilePage.getLayout = (page: ReactNode) => page;

export default ProfilePage;
