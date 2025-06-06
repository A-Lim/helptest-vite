import { KubeUser } from './types/kube/kube-user.type';

export const DATE_FORMAT = 'dd MMM yyyy';
export const DATETIME_FORMAT = 'dd MMM yyyy HH:mm';

export const SEVERITY_COLOR: Record<string, string> = {
  '1 - Critical': '#e76e50',
  '2 - High': '#f4a462',
  '3 - Medium': '#e8c468',
  '4 - Low': '#274754',
};

export const STATUS_BADGE_BG_COLOR = '#B8E9EF';
export const STATUS_BADGE_TEXT_COLOR = '#688084';

// DEV USAGE ONLY
export const DEV_TOKEN = import.meta.env.VITE_TOKEN;
export const DEV_USER: KubeUser & Record<string, any> = {
  accountName: 'globaladmin@kube365.com',
  displayName: 'Global Administrator',
  email: 'globaladmin@kube365.com',
  formView: 'grid',
  managerAccountName: null,
  managerDisplayName: null,
  templateIndex: 0,
  theme: 'standard',
  sideMenuState: 'show',
  isAuthenticated: true,
  userProfileId: 1,
  userProfileFields: [
    {
      title: 'Company',
      code: 'Company',
      value: 'ISA Innovation',
    },
  ],
  timezone: '+800',
  languageCode: 'en-US',
  webUrl: 'https://helpdesk.kube365.com',
  apiUrl: 'https://helpdesk.kube365.com/api',
  graphapiUrl: 'https://helpdesk.kube365.com/graph.api',
  authenticationType: 'Forms',
  sessionId: '37D450AADFE75BABB5232360E26B5B05',
  allowUserOtp: false,
  scriptLoadTimeout: 8000,
  permissions: {
    delegationPermission: {
      delegateOwnTask: true,
      delegateTasksOnBehalfOfOtherApprovers: true,
      viewLink: true,
    },
    systemPermissions: [
      {
        systemPermissionCode: 'createformdesign',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'adminforms',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'formcategories',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'featuredforms',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'holidays',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'matrixes',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'masterlists',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'multilingualresources',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'notifications',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'quicklinks',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'tags',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'license',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'smtp',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'generalsettings',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'userdomains',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'usergroups',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'usergrouppermissions',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'userprofiles',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'userprofileproperties',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'auditlogs',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'systemlogs',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'appearancesettings',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'connectors',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'usagereport',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'userdashboard',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'apipermissions',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'assetscustomfiles',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'datasetting',
        canView: true,
        canManage: true,
        canExport: true,
      },
      {
        systemPermissionCode: 'datapatch',
        canView: true,
        canManage: true,
        canExport: false,
      },
    ],
  },
  clientTimezoneName: '(UTC+08:00) Kuala Lumpur, Singapore',
  tenant: {
    name: 'KUBE 365 Helpdesk',
    tenantGuid: 'bff9cc6c-b1e8-4c8d-a79a-b81b86b904ce',
    companyName: 'ISATEC Innovation Sdn Bhd',
    supportedTenants: [
      {
        name: 'KUBE 365 Support',
        companyName: 'ISATEC Innovation Sdn Bhd',
        tenantGuid: '97d32182-fe50-45f0-b7d6-f988ff1726d4',
        subDomainUrls: ['https://support.kube365.com'],
      },
    ],
  },
  adminTenant: {
    name: 'KUBE 365 Administration',
    companyName: 'KUBE 365 Global Administration',
    tenantGuid: 'f637d5f9-33e5-4d2f-aa7a-87422d08edfb',
    subDomainUrls: ['https://helpdeskadmin.kube365.com'],
  },
  isSystemAdmin: true,
  pagingSizeDefault: 10,
  pagingSizeList: [10, 20, 30, 50, 100],
  dropdownListSizeDefault: 50,
  maxDisplaySelectedItem: 3,
  systemDateFormat: 'dd MMM yyyy',
  systemDatetimeFormat: 'dd MMM yyyy HH:mm:ss',
  systemTimezone: '+0800',
  systemLanguage: 'en-US',
  availableLanguages: [
    {
      languageCode: 'en-US',
      isActive: true,
    },
  ],
  openNewTab: false,
  showDatatablePageLength: true,
  redirectToPageWithSideMenu: false,
  appearance: {
    published: [
      {
        settingType: 'custom',
        pageType: 'dashboard',
        htmlUrl:
          'https://helpdesk.kube365.com:443/api/contents/2/c-dashboard-html.html?t=1744959605860',
        scriptUrls: [
          'https://helpdesk.kube365.com:443/api/contents/2/c-dashboard-js.js?t=1744959605860',
        ],
      },
    ],
  },
  systemTheme: 'orange',
  actionableMessage: false,
  isCustomLogo: false,
  customLogoUpdated: 1725852768718,
  allowStageIntegrationTest: false,
  pdfTableSize: 500,
  datePickerMinYear: 1920,
  datePickerMaxYear: 2060,
  allowPushNotification: false,
  formDesignerFieldsSoftLimit: 100,
  formDesignerFieldsHardLimit: 250,
  formDesignerTableSoftLimit: 2,
  formDesignerTableHardLimit: 10,
  formDesignerTableColsSoftLimit: 12,
  formDesignerTableColsHardLimit: 15,
  allowReportCustomRendering: false,
  isCustomDashboard: false,
  isRestrictReapprovalAction: false,
  appVersion: '4.2.1.118',
  isEnterprise: true,
  allowPhysicalDiskStorage: true,
  activeEvents: ['keyup', 'click', 'scroll'],
};
