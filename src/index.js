const GitBook       = require('gitbook-core');
const MethodBlock   = require('./components/MethodBlock');
const PageContainer = require('./components/PageContainer');
const DisplayButton = require('./components/DisplayButton');
// const LanguageButtons = require('./components/LanguageButtons');
const actions       = require('./actions');
const reduce        = require('./reducers');

module.exports = GitBook.createPlugin({
    activate: (dispatch, getState, { Components }) => {
        dispatch(Components.registerComponent(MethodBlock, { role: 'block:method' }));
        dispatch(Components.registerComponent(PageContainer, { role: 'page:container' }));
        dispatch(Components.registerComponent(DisplayButton, { role: 'toolbar:buttons:left' }));

        // Get default language in config
        const configLanguages = getState().config.getIn(['pluginsConfig', 'theme-api', 'languages']);
        let defaultLanguage = configLanguages.find((language) => {
            return Boolean(language.get('default'));
        });

        // Or use first language in list
        if (!defaultLanguage) {
            defaultLanguage = configLanguages.get(0);
        }

        // Set as selected language
        dispatch(actions.selectLanguage(defaultLanguage.get('lang')));
    },
    reduce
});