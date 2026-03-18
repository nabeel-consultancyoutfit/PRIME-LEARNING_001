/**
 * Mock data for Resources module
 */

import { ResourceFolder } from './Resources.interface';

export const MOCK_FOLDERS: ResourceFolder[] = [
  {
    id: '1',
    name: 'Test',
    type: 'folder',
  },
];

export const VIEW_MODE_OPTIONS = [
  { value: 'icons', label: 'Icons' },
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
];

export const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name (ascending)' },
  { value: 'name_desc', label: 'Name (descending)' },
  { value: 'date_new', label: 'Newest First' },
  { value: 'date_old', label: 'Oldest First' },
];
