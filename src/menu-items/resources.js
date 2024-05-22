import { IconFileText } from '@tabler/icons-react';

// constant
const icons = { IconFileText };

// ==============================|| Resources MENU ITEMS ||============================== //

const resources = {
  id: 'resources',
  title: 'Resources',
  type: 'group',
  children: [
    {
      id: 'view-resource',
      title: 'Resources',
      type: 'item',
      url: '/resources/view-resource',
      icon: icons.IconFileText,
      breadcrumbs: false
    }
  ]
};

export default resources;
