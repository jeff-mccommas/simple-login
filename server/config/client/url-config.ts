export class UrlConfig {
     environment = process.env.NODE_ENV || 'dev';
     env: string =  this.environment === 'prod' ? 'www' :  this.environment ;

    getConfig() {
        const policy = `//${this.env}.mheducation.com/privacy.html`,
            termsOfUse = `//${this.env}.mheducation.com/terms-use.html`,
            reportPiracy = `//${this.env}.mheducation.com/permissions.html`,
            rightsNpermission = `//${this.env}.mheducation.com/report-piracy.html`,
            minimumRequirements = `//help.k12.mhedu.com/systemcheck/`,
            platformStatus = `//status.mheducation.com/`;
        let helpUrl = '',
            exitUrl = '',
            s3BucketImageDomain = 's3.amazonaws.com/ecommerce-nonprod.mheducation.com';
        switch (this.env) {
            case 'local':
                helpUrl = 'https://calss.zendesk.com/hc/en-us';
                exitUrl = 'signout/local';
                s3BucketImageDomain = 'local.s3.amazonaws.com/ecommerce-nonprod.mheducation.com';
                break;
            case 'dev':
                helpUrl = 'https://calss.zendesk.com/hc/en-us';
                exitUrl = 'signout/dev';
                break;
            case 'prod':
                helpUrl = 'https://calss.zendesk.com/hc/en-us';
                exitUrl = 'signout/prod';
                s3BucketImageDomain = 's3.amazonaws.com/ecommerce-prod.mheducation.com';
                break;
            case 'qastg':
                helpUrl = 'https://calss.zendesk.com/hc/en-us';
                exitUrl = 'signout/qastg';
                break;
            case 'qalv':
                helpUrl = 'https://calss.zendesk.com/hc/en-us';
                exitUrl = 'signout';
                break;
            default:
                helpUrl = 'https://calss.zendesk.com/hc/en-us';
                exitUrl = 'signout';
                s3BucketImageDomain = 's3.amazonaws.com/ecommerce-nonprod.mheducation.com';
        }
        return {
                    'helpUrl': helpUrl,
                    'exitUrl' : exitUrl,
                    'policy' : policy,
                    'termsOfUse': termsOfUse,
                    'reportPiracy': reportPiracy,
                    'rightsNpermission': rightsNpermission,
                    'minimumRequirements': minimumRequirements,
                    'platformStatus' : platformStatus,
                    's3BucketImageDomain' : s3BucketImageDomain
                };
    }
}
