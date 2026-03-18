import { ReactNode } from 'react';
import GapAnalysis from '@/modules/learner/pages/GapAnalysis';

function GapAnalysisPage() {
  return <GapAnalysis />;
}

GapAnalysisPage.getLayout = (page: ReactNode) => page;

export default GapAnalysisPage;
