import { ReactNode } from 'react';
import ExitReviewCreate from '@/modules/learner/pages/ExitReview/CreateForm';

function ExitReviewCreatePage() {
  return <ExitReviewCreate />;
}

ExitReviewCreatePage.getLayout = (page: ReactNode) => page;

export default ExitReviewCreatePage;
