## Структура проекта ##
```sh
- docs
  - structure.md  - описание структуры проекта
  - game.md - описание механики игры
- packages
  - client
    - public
    - src
      - api
      - assets
        - variables.scss
        - global.scss     
      - components
        { component }
          { component }.tsx
          { component }.module.scss
        - ui                          # элементы интерфейса
          - { component }
            - { component }.tsx
            - { component }.module.scss
          - index.ts                  # импорт всех UI-компонентов и их реэкспорт
      - controllers
      - helpers
      - hooks
      - pages
        - { page }
          - { page }.tsx
          - { page }.module.scss
      - store
      - utils
  - server
    [TODO]
```