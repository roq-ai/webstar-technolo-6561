const mapping: Record<string, string> = {
  companies: 'company',
  'digital-marketings': 'digital_marketing',
  users: 'user',
  visuals: 'visual',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
