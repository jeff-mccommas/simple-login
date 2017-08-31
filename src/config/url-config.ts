import { environment } from '../environments/environment';

export class UrlConfig {
    getLanguage() {
        return [
                {
                    'languageValue': 'en_US',
                    'desktopLabel': 'English – United States',
                    'mobileLabel': 'English (US)'
                },
                {
                    'languageValue': 'en_GB',
                    'desktopLabel': 'English – Great Britain',
                    'mobileLabel': 'English (UK)'
                },
                {
                    'languageValue': 'es_MX',
                    'desktopLabel': 'Español – Latinoamérica',
                    'mobileLabel': 'Español (LatAm)'
                }
        ];
    }
    getIcons(domainURL) {
        return {
                'firstcol': [
                    {
                        'altText': 'Number One',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column1/PasswordIconsOne.png`,
                        'row':'1',
                        'col':'1'
                    },
                    {
                        'altText': 'Number Two',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column1/PasswordIconsTwo.png`,
                        'row':'2',
                        'col': '1'
                    },
                    {
                        'altText': 'Number Three',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column1/PasswordIconsThree.png`,
                        'row':'3',
                        'col': '1'
                    },
                    {
                        'altText': 'Number Four',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column1/PasswordIconsFour.png`,
                        'row':'4',
                        'col': '1'
                    },
                    {
                        'altText': 'Number Five',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column1/PasswordIconsFive.png`,
                        'row':'5',
                        'col': '1'
                    },
                    {
                        'altText': 'Number Six',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column1/PasswordIconsSix.png`,
                        'row':'6',
                        'col': '1'
                    }
                ],
                'secondcol': [
                    {
                        'altText': 'Fruit - Apple',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column2/PasswordIconsApple.png`,
                        'row': '1',
                        'col': '2'
                    },
                    {
                        'altText': 'Fruit - Banana',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column2/PasswordIconsBannana.png`,
                        'row': '2',
                        'col': '2'
                    },
                    {
                        'altText': 'Fruit - Cherries',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column2/PasswordIconsCherries.png`,
                        'row': '3',
                        'col': '2'
                    },
                    {
                        'altText': 'Fruit - Lemon',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column2/PasswordIconsLemon.png`,
                        'row': '4',
                        'col': '2'
                    },
                    {
                        'altText': 'Fruit - Grapes',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column2/PasswordIconsGrapes.png`,
                        'row': '5',
                        'col': '2'
                    },
                    {
                        'altText': 'Fruit - Orange',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column2/PasswordIconsOrange.png`,
                        'row': '6',
                        'col': '2'
                    }
                ],
                'thirdcol': [
                    {
                        'altText': 'Shape - Diamond',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column3/PasswordIconsDiamond.png`,
                        'row': '1',
                        'col': '3'
                    },
                    {
                        'altText': 'Shape - Circle',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column3/PasswordIconsCircle.png`,
                        'row': '2',
                        'col': '3'
                    },
                    {
                        'altText': 'Shape - Star',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column3/PasswordIconsStar.png`,
                        'row': '3',
                        'col': '3'
                    },
                    {
                        'altText': 'Shape - Heart',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column3/PasswordIconsHeart.png`,
                        'row': '4',
                        'col': '3'
                    },
                    {
                        'altText': 'Shape - Triangle',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column3/PasswordIconsTriangle.png`,
                        'row': '5',
                        'col': '3'
                    },
                    {
                        'altText': 'Shape - Moon',
                        'imageLocation': `//${domainURL}/idm/identity/login-icons/column3/PasswordIconsMoon.png`,
                        'row': '6',
                        'col': '3'
                    }
                ]
            }
    }
}
