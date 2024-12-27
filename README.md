# swp-happy-programming

## Getting Started

Install the dependencies by running the following command in the project root

```bash
bun install
```

Run the development server:

```bash
bun  dev # run both client and admin site

bun client:dev # only client site
bun admin:dev # only admin site
```

- The b2c-client site should be running on http://localhost:3000.
- The b2c-admin site should be running on http://localhost:3001

## Development rules

# Technology stack:

- node version v18.17.0
- bun: 1.1.38
- next: 14.2.20
- TypeScript

# Linter, formatter

- Pretter , ESLint are used to format the code.
- The provided configuration extends Airbnb style guide for React, so refer to https://github.com/airbnb/javascript/tree/master/react for more information.
- Automatic code format by using precommit hook.

# Other rules

- TypeScript typing should be use whenever possible, minimize the use of "any" type
- Pages should contain minimal amount of logic, referably only be composite of others components.
- File and folder naming rules:
- React component files and folders: kebab-case
- Folder: kebab-case
- Other source files: kebab-case

# File and folder structure

- 📦repository
- ┣ 📂.vscode <---- IDE settings
- ┣ 📂packages
- ┃ ┣ 📂b2c-admin
- ┃ ┃ ┣ 📂public
- ┃ ┃ ┣ 📂src
- ┃ ┃ ┃ ┣ 📂actions <--- code for calling server actions
- ┃ ┃ ┃ ┣ 📂app
- ┃ ┃ ┃ ┃ ┣ 📂<page1> <--- page should only be composite of others components, don't declare the whole layout in a page file
- ┃ ┃ ┃ ┃ ┗ 📂<page2>
- ┃ ┃ ┃ ┣ 📂components
- ┃ ┃ ┃ ┃ ┣ 📂<page1> <--- components (and their associated .module.css file), used only in page1 on the admin site
- ┃ ┃ ┃ ┃ ┣ 📂<page2>
- ┃ ┃ ┃ ┃ ┗ 📂common <--- components (and their associated .module.css file), used in multiple pages on the admin site
- ┃ ┃ ┃ ┣ 📂hooks
- ┃ ┃ ┃ ┣ 📂hooks <--- React hooks
- ┃ ┃ ┃ ┣ 📂types <--- type files
- ┃ ┃ ┃ ┗ 📂utils <--- files containing typescript type definition
- ┃ ┃ ┗ 📜... Development, admin only configuration files
- ┃ ┣ 📂b2c-client <--- same structure as b2c-admin folder
- ┃ ┗ 📂common <--- same rules and structure as b2c-admin/src folder, but should only contain reusable elements for all sites
- ┗ 📜 ... Development configuration files (ESLint, Prettier, ...)
