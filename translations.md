# Languages

BackIssue's interface can be shown in several languages. Series and issue
data (titles, descriptions, publisher names) stay in whatever language the
metadata source provides; what changes is everything BackIssue itself says:
menus, buttons, settings, messages and help text.

## Picking a language

Open your **Profile** (click your username in the sidebar) and look for
**Language**. The default is **Match the browser**: BackIssue uses the first
language your browser asks for that it has a translation of, and English
otherwise. Pick a specific language to override that.

A signed-in account keeps the choice on every device it signs in from, and
the page arrives already translated rather than switching after it loads. In
open mode (no accounts yet) the choice is remembered in the browser.

Languages shipped today: English, Chinese (Simplified), Dutch, French, German,
Italian, Japanese, Polish, Portuguese (Portugal and Brazil) and Spanish. The
list in the picker is always what your server actually has.

## What is translated, and what is not

- The web app, including every settings screen, dialog and notification you
  read in the app.
- Plugins that ship their own translations (see below). A plugin without a
  translation for your language shows English for its own screens and your
  language everywhere else.
- Numbers and dates follow the chosen language.
- Labels the server defines, such as job and tool names, permission names and
  error messages, are translated when the catalog knows their English.

Not translated: data from metadata sources, file names, log lines on the
System page, and this documentation.

## Improving a translation

Translations start as a machine draft and are corrected by people who use
BackIssue in that language. Each language is a folder of small JSON files in
the app repository, one per screen:

```
frontend/src/locales/
  en/   ← the source of truth
  fr/
  de/
  …
```

Every file maps a key to a sentence. Keep placeholders such as `{count}` or
`{name}` exactly as they are; they are filled in at runtime. A few messages
have plural forms:

```json
"nIssues": { "one": "{count} issue", "other": "{count} issues" }
```

Use the forms your language needs (English has `one` and `other`; Polish
also uses `few` and `many`; Japanese only `other`). To fix a sentence, edit
it and open a pull request. The test suite checks that every file is valid
JSON and that no language has keys English lacks.

## Adding a language

Create a folder named after the language's code in lowercase (`sv`, `ko`, `zh-hant`) under
`frontend/src/locales/`, copy the English files into it and translate. A
partial translation is fine: any key you leave out falls back to English, so
you can start with the screens people see most. The language appears in the
picker as soon as its folder exists.

Maintainers can draft a whole language in one go:

```
cd frontend
ANTHROPIC_API_KEY=… node scripts/i18n-translate.mjs pl
```

The script fills only keys the language is missing, so it never overwrites a
correction, and it keeps the English for any draft that lost a placeholder.
`node scripts/i18n-translate.mjs --check` lists what is missing without
calling anything.

## For plugin authors

See [Plugin API → translations](plugin-api#translations). In short: put a
`locales/<lang>.json` next to your `index.js`, read strings in your client
code with `api.t('yourplugin.key')`, and English is used for anything you
have not translated yet.
