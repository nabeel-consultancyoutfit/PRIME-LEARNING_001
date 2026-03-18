import React, { ReactNode } from 'react';
import TrainerSidebar from '../Sidebar';
import TrainerHeader from '../Header';
import {
  LayoutContainer,
  LayoutSidebarWrapper,
  LayoutContentWrapper,
  LayoutHeaderWrapper,
  LayoutPageContent,
} from './TrainerLayout.style';

interface TrainerLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const TrainerLayout: React.FC<TrainerLayoutProps> = ({
  children,
  pageTitle = 'Dashboard',
}) => {
  return (
    <LayoutContainer>
      <LayoutSidebarWrapper>
        <TrainerSidebar />
      </LayoutSidebarWrapper>

      <LayoutContentWrapper>
        <LayoutHeaderWrapper>
          <TrainerHeader pageTitle={pageTitle} />
        </LayoutHeaderWrapper>

        <LayoutPageContent>{children}</LayoutPageContent>
      </LayoutContentWrapper>
    </LayoutContainer>
  );
};

export default TrainerLayout;
