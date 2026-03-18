/**
 * Dashboard Page Component
 * Learner module main dashboard - matches Figma design exactly
 */

import React from 'react';
import { Box, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import {
  HelpOutline as HelpIcon,
  ChevronRight as ChevronRightIcon,
  ArrowCircleRight as ArrowCircleRightIcon,
  Public as PublicIcon,
  Description as DocumentIcon,
  DateRange as CalendarIcon,
  LocationOn as LocationIcon,
  EmojiObjects as LightbulbIcon,
  Assignment as ClipboardIcon,
  BarChart as BarChartIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { COLORS } from '@/modules/learner/theme/tokens';
import { useDashboard } from './useDashboard';
import { TAB_QUICK_ACCESS } from './Dashboard.data';
import {
  WelcomeBannerWrapper,
  WelcomeHeading,
  TabsAndTrainerWrapper,
  TabsCardWrapper,
  TabBarWrapper,
  TabItem,
  QuickAccessChipsWrapper,
  QuickAccessChip,
  TrainerCardWrapper,
  TrainerAvatar,
  TrainerInfoColumn,
  TrainerName,
  TrainerTitle,
  OnlineStatus,
  StatisticsCardWrapper,
  StatCardWrapper,
  ColumnDivider,
  StatColumn,
  StatLabel,
  StatTitle,
  DonutChartWrapper,
  DonutChartSvg,
  DonutPercentage,
  DonutLabel,
  LegendWrapper,
  LegendItem,
  LegendDot,
  CalendarWrapper,
  CalendarHeader,
  CalendarMonthDisplay,
  CalendarNavButton,
  CalendarGrid,
  CalendarDayHeader,
  CalendarDayCell,
  TaskDueWrapper,
  TaskDueRow,
  TaskDueLabel,
  TaskDueBarContainer,
  TaskDueBar,
  TaskDueCount,
  TaskDueScale,
  TaskDueLegend,
  TaskDueLegendItem,
  InfoCardsRowWrapper,
  InfoCardWrapper,
  InfoCardIcon,
  InfoCardTitle,
  InfoCardDescription,
  InfoCardStats,
  InfoCardStatGroup,
  InfoCardStatLabel,
  InfoCardStatValue,
  WorkplaceBarWrapper,
  WorkplaceInfoItem,
  WorkplaceInfoLabel,
  WorkplaceInfoValue,
  BottomSectionWrapper,
  LearningAimsTableWrapper,
  StyledTable,
  ActionChevron,
  InformationOptionsWrapper,
  InformationOptionsTitle,
  InformationOptionsList,
  InformationOptionItem,
  InformationOptionLabel,
  InformationOptionChevron,
} from './Dashboard.style';

const TABS = ['Activity', 'Manage', 'Progress', 'Forms'] as const;
const CALENDAR_DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Get quick access icon based on type
 */
const getQuickAccessIcon = (iconType?: string) => {
  const iconProps = { sx: { fontSize: '18px' } };
  switch (iconType) {
    case 'public':
      return <PublicIcon {...iconProps} />;
    case 'document':
      return <DocumentIcon {...iconProps} />;
    case 'calendar':
      return <CalendarIcon {...iconProps} />;
    case 'location':
      return <LocationIcon {...iconProps} />;
    default:
      return null;
  }
};

/**
 * Get info card icon based on type
 */
const getInfoCardIcon = (iconType?: string) => {
  switch (iconType) {
    case 'lightbulb':
      return <LightbulbIcon sx={{ fontSize: 28, color: '#1E1E2D' }} />;
    case 'clipboard':
      return <ClipboardIcon sx={{ fontSize: 28, color: '#1E1E2D' }} />;
    case 'barchart':
      return <BarChartIcon sx={{ fontSize: 28, color: '#1E1E2D' }} />;
    default:
      return null;
  }
};

/**
 * Section 1: Welcome Banner & Safeguarding Info
 */
const WelcomeBanner: React.FC = () => {
  return (
    <WelcomeBannerWrapper>
      <WelcomeHeading>
        Welcome John
        <HelpIcon sx={{ fontSize: '32px', color: COLORS.text.secondary, cursor: 'pointer' }} />
      </WelcomeHeading>
    </WelcomeBannerWrapper>
  );
};

/**
 * Section 2: Content Tabs & Trainer Card
 */
interface TabsAndTrainerProps {
  activeTab: string;
  onTabChange: (tab: typeof TABS[number]) => void;
}

const TabsAndTrainer: React.FC<TabsAndTrainerProps> = ({ activeTab, onTabChange }) => {
  const { state } = useDashboard();

  return (
    <TabsAndTrainerWrapper>
      <TabsCardWrapper>
        {/* Tab Bar */}
        <TabBarWrapper>
          {TABS.map((tab) => (
            <TabItem
              key={tab}
              isActive={activeTab === tab}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </TabItem>
          ))}
        </TabBarWrapper>

        {/* Quick Access Chips - show relevant items per tab */}
        {TAB_QUICK_ACCESS[activeTab] && (
          <QuickAccessChipsWrapper>
            {TAB_QUICK_ACCESS[activeTab].map((item) => (
              <QuickAccessChip key={item.id}>
                {getQuickAccessIcon(item.iconType)}
                {item.label}
                <ChevronRightIcon sx={{ fontSize: '16px' }} />
              </QuickAccessChip>
            ))}
          </QuickAccessChipsWrapper>
        )}
      </TabsCardWrapper>

      {/* Trainer Card */}
      <TrainerCardWrapper>
        <TrainerAvatar style={{ backgroundImage: `url(${state.trainerInfo.avatar})` }} />
        <TrainerInfoColumn>
          <TrainerName>{state.trainerInfo.name}</TrainerName>
          <TrainerTitle>{state.trainerInfo.title}</TrainerTitle>
          <OnlineStatus>{state.trainerInfo.status === 'online' ? 'Online' : 'Offline'}</OnlineStatus>
        </TrainerInfoColumn>
      </TrainerCardWrapper>
    </TabsAndTrainerWrapper>
  );
};

/**
 * Section 3: Statistics Row - Single Card with 3 Columns & Dividers
 */
const StatisticsSection: React.FC = () => {
  const { state, previousMonth, nextMonth } = useDashboard();
  const totalProgress = 70;

  // Render Donut Chart SVG
  const renderDonutChart = () => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const progressStroke = (totalProgress / 100) * circumference;
    const gapStroke = circumference - progressStroke;

    return (
      <DonutChartSvg viewBox="0 0 160 160">
        {/* Background circle */}
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#E8E8E8" strokeWidth="20" />
        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#4CAF50"
          strokeWidth="20"
          strokeDasharray={`${progressStroke} ${gapStroke}`}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '80px 80px' }}
        />
      </DonutChartSvg>
    );
  };

  return (
    <StatisticsCardWrapper>
      {/* Column 1: Overall & Target Progress */}
      <StatCardWrapper>
        <StatLabel>Statistics</StatLabel>
        <StatTitle>Overall & target progress</StatTitle>
        <DonutChartWrapper>
          <Box sx={{ position: 'relative', width: '200px', height: '200px' }}>
            {renderDonutChart()}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <DonutLabel>Total Progress</DonutLabel>
              <DonutPercentage>{totalProgress}%</DonutPercentage>
            </Box>
          </Box>
          <LegendWrapper>
            <LegendItem>
              <LegendDot color="#4CAF50" />
              <span>Progress {totalProgress}%</span>
            </LegendItem>
            <LegendItem>
              <LegendDot color="#E8E8E8" />
              <span>Due {100 - totalProgress}%</span>
            </LegendItem>
          </LegendWrapper>
        </DonutChartWrapper>
      </StatCardWrapper>

      {/* Column 2: Calendar */}
      <StatCardWrapper>
        <StatLabel>Calendar</StatLabel>
        <CalendarWrapper>
          <CalendarHeader>
            <CalendarMonthDisplay>
              {MONTH_NAMES[state.calendarMonth]} {state.calendarYear}
            </CalendarMonthDisplay>
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <CalendarNavButton onClick={previousMonth}>{'<'}</CalendarNavButton>
              <CalendarNavButton onClick={nextMonth}>{'>'}</CalendarNavButton>
            </Box>
          </CalendarHeader>

          <CalendarGrid>
            {/* Day headers */}
            {CALENDAR_DAY_NAMES.map((day) => (
              <CalendarDayHeader key={day}>{day}</CalendarDayHeader>
            ))}

            {/* Calendar days */}
            {state.calendarDays.map((day, idx) => (
              <CalendarDayCell
                key={idx}
                isToday={day.isToday}
                hasEvent={day.hasEvent}
                isCurrentMonth={day.isCurrentMonth}
                isHighlighted={day.isHighlighted}
              >
                {day.date}
              </CalendarDayCell>
            ))}
          </CalendarGrid>
        </CalendarWrapper>
      </StatCardWrapper>

      {/* Column 3: Task Due */}
      <StatCardWrapper>
        <StatLabel>Statistics</StatLabel>
        <StatTitle>Task Due</StatTitle>
        <TaskDueWrapper>
          {state.tasksDue.map((task) => (
            <TaskDueRow key={task.category}>
              <TaskDueLabel>{task.category}</TaskDueLabel>
              <TaskDueBarContainer lightColor={task.lightColor}>
                <TaskDueBar filledPercent={(task.count / 4) * 100} color={task.color} lightColor={task.lightColor} />
              </TaskDueBarContainer>
              <TaskDueCount>{task.count}</TaskDueCount>
            </TaskDueRow>
          ))}

          <TaskDueScale>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </TaskDueScale>

          <TaskDueLegend>
            {state.tasksDue.map((task) => (
              <TaskDueLegendItem key={task.category}>
                <LegendDot color={task.color} />
                <span>
                  {task.category}: {task.count}
                </span>
              </TaskDueLegendItem>
            ))}
          </TaskDueLegend>
        </TaskDueWrapper>
      </StatCardWrapper>
    </StatisticsCardWrapper>
  );
};

/**
 * Section 4: Info Cards Row
 */
const InfoCardsSection: React.FC = () => {
  const { state } = useDashboard();

  return (
    <InfoCardsRowWrapper>
      {state.infoCards.map((card) => (
        <InfoCardWrapper key={card.id}>
          <Box sx={{ display: 'flex', gap: '10px', flex: 1 }}>
            <InfoCardIcon>{getInfoCardIcon(card.iconType)}</InfoCardIcon>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <InfoCardTitle>{card.title}</InfoCardTitle>
              <InfoCardDescription>{card.description}</InfoCardDescription>

              {card.stats && (
                <InfoCardStats>
                  {card.stats.map((stat, idx) => (
                    <InfoCardStatGroup key={idx}>
                      <InfoCardStatLabel>{stat.label}:</InfoCardStatLabel>
                      <InfoCardStatValue>{stat.value}</InfoCardStatValue>
                    </InfoCardStatGroup>
                  ))}
                </InfoCardStats>
              )}
            </Box>
          </Box>
        </InfoCardWrapper>
      ))}
    </InfoCardsRowWrapper>
  );
};

/**
 * Section 5: Workplace Bar
 */
const WorkplaceBar: React.FC = () => {
  const { state } = useDashboard();

  return (
    <WorkplaceBarWrapper>
      <WorkplaceInfoItem>
        <WorkplaceInfoLabel>Workplace :</WorkplaceInfoLabel>
        <WorkplaceInfoValue>&nbsp;{state.workplaceInfo.workplace}</WorkplaceInfoValue>
      </WorkplaceInfoItem>

      <WorkplaceInfoItem>
        <WorkplaceInfoLabel>Mentor name :</WorkplaceInfoLabel>
        <WorkplaceInfoValue>&nbsp;{state.workplaceInfo.mentorName}</WorkplaceInfoValue>
      </WorkplaceInfoItem>

      <WorkplaceInfoItem>
        <WorkplaceInfoLabel>Phone number:</WorkplaceInfoLabel>
        <WorkplaceInfoValue>&nbsp;{state.workplaceInfo.phone}</WorkplaceInfoValue>
      </WorkplaceInfoItem>

      <WorkplaceInfoItem>
        <WorkplaceInfoLabel>Email:</WorkplaceInfoLabel>
        <WorkplaceInfoValue>
          &nbsp;
          {state.workplaceInfo.email === 'None' ? (
            <span style={{ textDecoration: 'underline' }}>{state.workplaceInfo.email}</span>
          ) : (
            <a href={`mailto:${state.workplaceInfo.email}`}>{state.workplaceInfo.email}</a>
          )}
        </WorkplaceInfoValue>
      </WorkplaceInfoItem>
    </WorkplaceBarWrapper>
  );
};

/**
 * Section 6: Learning Aims Table & Information Options
 */
const BottomSection: React.FC = () => {
  const { state } = useDashboard();

  return (
    <BottomSectionWrapper>
      {/* Learning Aims Table */}
      <LearningAimsTableWrapper>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Learning Aim</TableCell>
              <TableCell align="center">Current Progress</TableCell>
              <TableCell align="center">Target Progress</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.learningAims.map((aim) => (
              <TableRow key={aim.id}>
                <TableCell>{aim.name}</TableCell>
                <TableCell align="center">{aim.currentProgress}%</TableCell>
                <TableCell align="center">{aim.targetProgress}%</TableCell>
                <TableCell align="center">
                  <ActionChevron>
                    <ExpandMoreIcon />
                  </ActionChevron>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </LearningAimsTableWrapper>

      {/* Information & Options List */}
      <InformationOptionsWrapper>
        <InformationOptionsTitle>Information & Options</InformationOptionsTitle>
        <InformationOptionsList>
          {state.informationOptions.map((option) => (
            <InformationOptionItem key={option.id}>
              <InformationOptionLabel>
                <ArrowCircleRightIcon sx={{ fontSize: '18px' }} />
                {option.label} ({option.count})
              </InformationOptionLabel>
              <InformationOptionChevron>
                <ChevronRightIcon />
              </InformationOptionChevron>
            </InformationOptionItem>
          ))}
        </InformationOptionsList>
      </InformationOptionsWrapper>
    </BottomSectionWrapper>
  );
};

/**
 * Main Dashboard Component
 */
const Dashboard: React.FC = () => {
  const { state, setActiveTab } = useDashboard();

  return (
    <LearnerLayout pageTitle="Dashboard">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Section 1: Welcome Banner */}
        <WelcomeBanner />

        {/* Section 2: Tabs & Trainer */}
        <TabsAndTrainer activeTab={state.activeTab} onTabChange={setActiveTab} />

        {/* Section 3: Statistics */}
        <StatisticsSection />

        {/* Section 4: Info Cards */}
        <InfoCardsSection />

        {/* Section 5: Workplace Bar */}
        <WorkplaceBar />

        {/* Section 6: Learning Aims & Information */}
        <BottomSection />
      </Box>
    </LearnerLayout>
  );
};

export default Dashboard;
