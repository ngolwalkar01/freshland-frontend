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
            onAccept: () => {
              if (!window.gaScriptLoaded) {
                const script = document.createElement('script');
                script.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-MQQPRTX';
                script.async = true;
                document.head.appendChild(script);
                window.gaScriptLoaded = true;
                script.onload = () => {
                  window.dataLayer = window.dataLayer || [];
                  function gtag() { dataLayer.push(arguments); }
                  gtag('js', new Date());
                  gtag('config', 'GTM-MQQPRTX');
                };
              }

              if (!window.fbqScriptLoaded) {
                const fbqScript = document.createElement('script');
                fbqScript.innerHTML = `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${588900118705548}');
                  fbq('track', 'PageView');
                `;
                document.head.appendChild(fbqScript);
                window.fbqScriptLoaded = true;
              }
            },
            onReject: () => {
              document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              document.cookie = '_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            },
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
                        <a href="/se/sekretesspolicy">Sekretesspolicy</a>
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
                description: `I denna panel kan du välja några inställningar gällande hanteringen av din personliga information. Du kan när som helst granska och ändra dessa val genom att gå tillbaka till denna panel via den angivna länken. För att neka ditt samtycke till de specifika behandlingsaktiviteter som beskrivs nedan, ändra knapparna till "av" eller använd knappen "Neka alla" och bekräfta att du vill spara dina val.`,
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
