let config = require('../config');

export class ApplicationConfig {
  public static PORT: string = config.PORT;
  public static API_VERSION: string = config.API_VERSION;
  public static APP_VERSION = config.APP_VERSION;
  public static CONNECT2_BASE_URL = config.CONNECT2_BASE_URL;
  public static ORG_BASE_URL = config.ORG_BASE_URL;
  public static APIKEY = config.APIKEY;
  public static APIUSER = config.APIUSER;
  public static APIPWD: string = config.APIPWD;
  public static IDM_BASE_URL: string = config.IDM_BASE_URL;
  public static IDM_LOGIN_REDIRECT: string = config.IDM_LOGIN_REDIRECT;
  public static IDM_JWT_URL: string = config.idm_jwt_url;
  public static CLIENT_ID: string = config.client_id;
  public static CLIENT_SECRET: string = config.client_secret;
  public static GRANT_TYPE: string = config.grant_type;
  public static GRANT_TYPE_PASSWORD: string = config.grant_type_password;
  public static SCOPE: string = config.scope;
  public static SCOPE_AUTH: string = config.scope_auth;
  public static C2_BASE_URL: string = config.C2_BASE_URL;
  public static C2_APIKEY: string = config.C2_APIKEY;
  public static C2_API: string = config.C2_API;
  public static C2_USER: string = config.C2_USER;
  public static C2_PWD: string = config.C2_PWD;
  public static C2_ENDPOINT: string = config.C2_ENDPOINT;
  public static C2_REMEBER: string = config.C2_REMEBER;
  public static C2_SESSION_APITASK: string = config.C2_SESSION_APITASK;
  public static C2_CLASS_APITASK: string = config.C2_CLASS_APITASK;
  public static C2_CLASS_STU_APITASK: string = config.C2_CLASS_STU_APITASK;
  public static ERR_500:string = config.ERR_500;
  public static ERR_400:string = config.ERR_400;
}

export default ApplicationConfig;


