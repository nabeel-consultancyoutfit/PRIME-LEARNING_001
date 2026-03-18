import React, { ReactNode } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import {
  LayoutContainer,
  LayoutSidebarWrapper,
  LayoutContentWrapper,
  LayoutHeaderWrapper,
  LayoutPageContent,
} from './LearnerLayout.style';

interface LearnerLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const LearnerLayout: React.FC<LearnerLayoutProps> = ({
  children,
  pageTitle = 'Dashboard',
}) => {
  return (
    <LayoutContainer>
      {/* Sidebar Navigation */}
      <LayoutSidebarWrapper>
        <Sidebar />
      </LayoutSidebarWrapper>

      {/* Main Content Area - Header and Page Content */}
      <LayoutContentWrapper>
        {/* Header with Breadcrumbs, Search, and Profile */}
        <LayoutHeaderWrapper>
          <Header pageTitle={pageTitle} />
        </LayoutHeaderWrapper>

        {/* Page Content */}
        <LayoutPageContent>{children}</LayoutPageContent>
      </LayoutContentWrapper>
    </LayoutContainer>
  );
};

export default LearnerLayout;
