import { KeycloakAdminClient } from '@s3pweb/keycloak-admin-client-cjs';
import { ConfigService } from '@nestjs/config';

const kcAdminClient = async function () {
  const envConfig = new ConfigService();

  const kcAdminClient = new KeycloakAdminClient({
    baseUrl: envConfig.get('KC_BASE_URL'),
    realmName: envConfig.get('KC_REALM_NAME'),
  });
  await kcAdminClient.auth({
    grantType: 'client_credentials',
    clientId: envConfig.get('KC_CLIENT_ID'),
    clientSecret: envConfig.get('KC_CLIENT_SECRET'),
  });

  return kcAdminClient;
};

export default kcAdminClient;
