// assets
import { IconUserCircle } from '@tabler/icons-react';

// constant
const icons = { IconUserCircle };

// ==============================|| Profile MENU ITEMS ||============================== //

const profile = {
  id: 'profile',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'user-profile',
      title: 'Profile',
      type: 'item',
      url: '/profile/user-profile',
      icon: icons.IconUserCircle,
      breadcrumbs: false
    }
  ]
};

export default profile;
