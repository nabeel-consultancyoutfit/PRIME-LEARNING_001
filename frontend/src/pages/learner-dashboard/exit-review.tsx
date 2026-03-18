import { ReactNode } from 'react';
import ExitReview from '@/modules/learner/pages/ExitReview';

function ExitReviewPage() {
  return <ExitReview />;
}

ExitReviewPage.getLayout = (page: ReactNode) => page;

export default ExitReviewPage;
