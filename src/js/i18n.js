import i18next from 'i18next';

import Settings from './settings.js';

const Resources = {};
const currentLanguage = Settings.language.default;

const TranslationPromise = import(
  /* webpackMode: "eager" */
  /* webpackChunkName: "locales" */
  `../locales/${currentLanguage}.json`
);

TranslationPromise.then((module) => {
  Resources[currentLanguage] = { translation: module.default };
});

TranslationPromise.catch((err) => {
  throw `Not load translation module. Error ${err}`;
});

i18next.init({ lng: currentLanguage, resources: Resources });

class I18n {
  constructor(props) {
    this.adapter = props.adapter;
  }

  t(keys, options = {}) {
    return this.adapter.t(keys, options);
  }
}

export default new I18n({ adapter: i18next });
