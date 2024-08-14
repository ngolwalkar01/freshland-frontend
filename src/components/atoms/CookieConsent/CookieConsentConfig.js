const getConfig = () => {
  const config = {
    // root: 'body',
    // autoShow: true,
    // disablePageInteraction: true,
    // hideFromBots: true,
    // mode: 'opt-in',
    // revision: 0,

    cookie: {
      // name: 'cc_cookie',
      // domain: location.hostname,
      // path: '/',
      // sameSite: "Lax",
      // expiresAfterDays: 365,
    },

    /**
     * Callback functions
     */
    onFirstConsent: ({ cookie }) => {
      console.log('onFirstConsent fired', cookie);
    },

    onConsent: ({ cookie }) => {
      console.log('onConsent fired!', cookie);
    },

    onChange: ({ changedCategories, changedServices }) => {
      console.log('onChange fired!', changedCategories, changedServices);
    },

    onModalReady: ({ modalName }) => {
      console.log('ready:', modalName);
    },

    onModalShow: ({ modalName }) => {
      console.log('visible:', modalName);
    },

    onModalHide: ({ modalName }) => {
      console.log('hidden:', modalName);
    },

    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
      consentModal: {
        layout: 'box inline',
        position: 'bottom right',
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: 'box',
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: {
        enabled: true, // this category is enabled by default
        readOnly: true, // this category cannot be disabled
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^_ga/, // regex: match all cookies starting with '_ga'
            },
            {
              name: '_gid', // string: exact cookie name
            },
          ],
        },

        // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
        services: {
          ga: {
            label: 'Google Analytics',
            onAccept: () => {},
            onReject: () => {},
          },
          youtube: {
            label: 'Youtube Bädda in',
            onAccept: () => {},
            onReject: () => {},
          },
        },
      },
      ads: {},
    },

    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'Vi använder cookies',
            description:
              'För att ge en bra upplevelse använder vi teknik som cookies för att lagra och/eller komma åt enhetsinformation. När du samtycker till dessa tekniker kan vi behandla data som surfbeteende eller unika ID:n på denna webbplats. Om du inte samtycker eller om du återkallar ditt samtycke kan detta påverka vissa funktioner negativt.',
            acceptAllBtn: 'Acceptera',
            acceptNecessaryBtn: 'Neka',
            showPreferencesBtn: 'Hantera individuella inställningar',
            // closeIconLabel: 'Reject all and close modal',
            footer: `
                        <a href="/se/integritetspolicy">Sekretesspolicy</a>
                    `,
          },
          preferencesModal: {
            title: 'Hantera individuella inställningar',
            acceptAllBtn: 'Acceptera',
            acceptNecessaryBtn: 'Neka',
            savePreferencesBtn: 'Acceptera aktuellt val',
            closeIconLabel: 'Close modal',
            serviceCounterLabel: 'Service|Services',
            sections: [
              {
                title: 'Dina val gällande personlig information',
                description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`,
              },
              {
                title: 'Strikt nödvändigt',
                description:
                  'Dessa cookies är avgörande för att webbplatsen ska fungera korrekt och kan inte inaktiveras.',

                //this field will generate a toggle linked to the 'necessary' category
                linkedCategory: 'necessary',
              },
              {
                title: 'Prestanda och analys',
                description:
                  'Dessa cookies samlar in information om hur du använder vår webbplats. Alla data är anonymiserade och kan inte användas för att identifiera dig.',
                linkedCategory: 'analytics',
                cookieTable: {
                  caption: 'Cookie table',
                  headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    desc: 'Description',
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: location.hostname,
                      desc: 'Description 1',
                    },
                    {
                      name: '_gid',
                      domain: location.hostname,
                      desc: 'Description 2',
                    },
                  ],
                },
              },
              {
                title: 'Inriktning och reklam',
                description:
                  'Dessa cookies används för att göra reklammeddelanden mer relevanta för dig och dina intressen. Avsikten är att visa annonser som är relevanta och engagerande för den enskilda användaren och därmed mer värdefulla för publicister och tredjepartsannonsörer.',
                linkedCategory: 'ads',
              },
              {
                title: 'Mer information',
                description:
                  'För alla frågor angående min policy om cookies och dina val, vänligen <a href="#contact-page">kontakta oss</a>',
              },
            ],
          },
        },
      },
    },
  };

  return config;
};

export default getConfig;
