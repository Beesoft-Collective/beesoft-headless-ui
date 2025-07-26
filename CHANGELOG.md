# Changelog

All notable changes to this project will be documented in this file.

The format is mainly based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## Changed

- Put an undefined check on the value property since that seems to be the place where the issue is happening.

## [0.0.15] - 2025-07-26

## Changed

- Another attempt to fix the checkbox group issue.

## [0.0.14] - 2025-07-26

## Changed

- Found an issue with the checkbox group, it was not checking all items in the array for the individual items value.

## [0.0.13] - 2025-07-26

## Added

- Added a new checkbox group component, this will be a wrapper for managing checkboxes that are meant to work as a group.

## [0.0.12] - 2025-07-19

## Changed

- Fixed an issue where setting readOnly was not being set in the radio button items.

## [0.0.11] - 2025-07-15

## Changed

- Previously forgot to export the new radio group components and types.

## [0.0.10] - 2025-07-13

## Added

- Created a new toggle component and created a simple storybook test.
- Created a new radio group component and a simple storybook test.
- Started using the new `useEvent` hook in place of `useCallback` for the event functions, this will decrease the number of times the event functions are created.

## Changed

- Installed the correct react signals version of the library since the previous version was causing issues.

## [0.0.9] - 2025-06-28

## Changed

- Changed the tailwind imports to allow the library to be used in projects still using Tailwind v3.

## [0.0.8] - 2025-06-21

## Changed

- Added some extra styles to the hidden field, so it won't affect the layout of the HTML and require the user to use absolute positioning to make it looks right.

## [0.0.7] - 2025-06-18

## Changed

- Changed the hidden fields hide method from display:none to appearance:none, so it can be used to set focus-within styles.

## [0.0.7-0] - 2025-06-18

## Changed

- Testing out a change to see if it fixes an issue.

## [0.0.6] - 2025-06-15

## Changed

- Added the important flag to the hidden class in the hidden field, so user styles can't override the setting.

## [0.0.5] - 2025-06-15

## Changed

- Added the feature to allow extra elements in the children; this can be useful for focus styles as well as allowing icons to cause a checkbox to be checked. 

## [0.0.4] - 2025-06-14

## Changed

- Removed the tailwind colors to decrease the size of the produced css.

## [0.0.3] - 2025-06-13

## Changed

- Finished the architecture work, removed the `Headless` prefix from the exported components, and restructured the file system setup.

## [0.0.2] - 2025-05-24

## Added

- Added the missing `HeadlessCheckboxProps` interface.

## [0.0.1] - 2025-05-24

## Added

- Moved the headless code from `beesoft-components` to this library, this will be the location where all headless work is done from now on.

[unreleased]: https://github.com/Beesoft-Collective/beesoft-headless-ui/compare/v0.0.15...develop
[0.0.15]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.15
[0.0.14]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.14
[0.0.13]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.13
[0.0.12]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.12
[0.0.11]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.11
[0.0.10]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.10
[0.0.9]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.9
[0.0.8]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.8
[0.0.7]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.7
[0.0.7-0]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.7-0
[0.0.6]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.6
[0.0.5]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.5
[0.0.4]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.4
[0.0.3]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.3
[0.0.2]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.2
[0.0.1]: https://github.com/Beesoft-Collective/beesoft-headless-ui/releases/tag/v0.0.1
