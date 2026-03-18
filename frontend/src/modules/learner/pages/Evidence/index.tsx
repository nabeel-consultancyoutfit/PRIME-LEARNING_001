/**
 * Evidence Page Component
 * Displays learning activity evidence with filtering
 */

import React from 'react';
import { TableHead, TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useEvidence } from './useEvidence';
import { FILTER_OPTIONS } from './Evidence.data';
import {
  EvidenceContainer,
  EvidenceHeader,
  EvidenceTitle,
  CreateButton,
  FilterBar,
  FilterLabel,
  FilterSelect,
  EvidenceCard,
  StyledTable,
  TitleLink,
  CheckboxCell,
} from './Evidence.style';

const Evidence: React.FC = () => {
  const { state, setFilterShow, handleCreateActivity, toggleShowcase } = useEvidence();

  return (
    <LearnerLayout pageTitle="Evidence">
      <EvidenceContainer>
        {/* Header with title and create button */}
        <EvidenceHeader>
          <EvidenceTitle>Evidence</EvidenceTitle>
          <CreateButton onClick={handleCreateActivity}>
            + Create Learning Activity
          </CreateButton>
        </EvidenceHeader>

        {/* Filter Bar */}
        <FilterBar>
          <FilterLabel>Show:</FilterLabel>
          <FilterSelect value={state.filterShow} onChange={(e) => setFilterShow(e.target.value)}>
            {FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>
        </FilterBar>

        {/* Evidence Table */}
        <EvidenceCard>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Ref</TableCell>
                <TableCell>Learning Activity Title</TableCell>
                <TableCell>Method</TableCell>
                <TableCell align="center">Trainer Learning Activity Time (minutes)</TableCell>
                <TableCell align="center">Learner's Learning Activity Time (minutes)</TableCell>
                <TableCell>Related Plan Of Activity/action</TableCell>
                <TableCell>Action Required By</TableCell>
                <TableCell align="center">Add to showcase</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.evidenceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.ref}</TableCell>
                  <TableCell>
                    <TitleLink href="#">{item.title}</TitleLink>
                  </TableCell>
                  <TableCell>{item.method}</TableCell>
                  <TableCell align="center">{item.trainerTime}</TableCell>
                  <TableCell align="center">{item.learnerTime}</TableCell>
                  <TableCell>{item.planOfActivity}</TableCell>
                  <TableCell>{item.actionRequiredBy}</TableCell>
                  <CheckboxCell>
                    <Checkbox
                      checked={item.addToShowcase}
                      onChange={() => toggleShowcase(item.id)}
                    />
                  </CheckboxCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </EvidenceCard>
      </EvidenceContainer>
    </LearnerLayout>
  );
};

export default Evidence;
