interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Team Member', 'Graphic Designer', 'Digital Marketer'],
  tenantName: 'Company',
  applicationName: 'Webstar Technologies',
  addOns: ['chat', 'notifications', 'file'],
};
