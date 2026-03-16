import React from 'react';
import {
  Avatar,
  AvatarProps,
} from '@mui/material';

type AvatarSize = 'small' | 'medium' | 'large';

interface UserAvatarProps extends Omit<AvatarProps, 'children'> {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  size?: AvatarSize;
}

const getSizeMap = (size: AvatarSize): number => {
  const sizeMap: Record<AvatarSize, number> = {
    small: 32,
    medium: 40,
    large: 56,
  };
  return sizeMap[size];
};

const getInitials = (firstName: string, lastName: string): string => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return (first + last) || '?';
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  firstName,
  lastName,
  avatarUrl,
  size = 'medium',
  ...props
}) => {
  const sizePixels = getSizeMap(size);
  const initials = getInitials(firstName, lastName);

  return (
    <Avatar
      src={avatarUrl}
      sx={{
        width: sizePixels,
        height: sizePixels,
        fontSize: size === 'small' ? '0.875rem' : size === 'large' ? '1.5rem' : '1rem',
      }}
      {...props}
    >
      {initials}
    </Avatar>
  );
};
