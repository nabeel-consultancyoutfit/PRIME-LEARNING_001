/**
 * Resources module interfaces and types
 */

export interface ResourceFolder {
  id: string;
  name: string;
  type: 'folder';
}

export interface ResourcesState {
  folders: ResourceFolder[];
  viewMode: string;
  sortBy: string;
  searchTerm: string;
}
