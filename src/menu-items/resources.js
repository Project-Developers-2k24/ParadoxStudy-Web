import { IconFileText } from '@tabler/icons-react';

// constant
const icons = { IconFileText };

// ==============================|| Resources MENU ITEMS ||============================== //

const resources = {
  id: 'resources',
  title: 'Resources',
  type: 'group',
  icon: icons.IconFileText,
  children: [
    {
      id: 'view-resource',
      title: 'Resources',
      type: 'collapse',
      icon: icons.IconFileText,
      children: [
        {
          id: 'view-resource',
          title: 'Resources',
          type: 'item',
          url: '/resources/view-resource',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default resources;
