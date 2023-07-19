### Как запускать?

1. Убедитесь что у вас установлен `node`, `docker` и `Docker Compose v2 и выше`
2. Выполните из корня проекта команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)

Далее необходимо собрать приложение с помощью докер контейнеров для этого:

3. На основании файла .env.sample создайте ваш .env в корне проекта.

Для разработки вам может быть не нужно запускать все контейнеры, для работы с БД вы можете запустить отдельный контейнер postgres `sudo docker compose postgres up -d`. Подробнее в п.5

Для сборки и запуска всех контейнеров используем команду `docker compose up` для Linux `sudo docker compose up`. В этом режиме вы будете видеть логи сборки и запуска контейнеров. Параметры сборки и список контейнеров смотри в docker-compose.yml. Для запуска контейнеров в фоновом режиме необходимо остановить текущие через `ctrl+ C`  и запустить заново командой `docker compose up -d` для Linux `sudo docker compose up -d`. В фоновом режиме логи контейнеров можно смотреть через `docker logs id_контейнера`. 

    После сборки должно запуститься 4-ре контейнера:
    * praktikum-client - нужен только для прохождения PR, можно остановить.
    * praktikum-server - наш сервер с SSR, он же отдает и клиентские файлы
    * praktikum-game-postgres - БД
    * pgadmin - UI для БД (Особенности настройки смотри в [./docs/pgadmin.md](./docs/pgadmin.md))


4. Если нужно что-то поменять в приложении:
    На текущем этапе приложение собрано в образе praktikum-server, чтобы изменения появились в контейнере необходимо будет пересобрать образ и запустить новый контейнер. См. п.5 для отладки приложение без пересборки.

    Для пересборки образа praktikum-server сначала лучше очтановить текущий и удалить его. `docker ps`, чтоб посмотреть id_контейнера `docker rm -f id_контейнера` чтоб удалить контейнер, `docker images`, чтоб посмотреть id_образа `docker image rm id_образа`, чтоб удалить его. Еще можно очистить место на диске от удаленных контейнеров и образов через `docker system prune`. После применения изменений в приложении заново запускаем его сборку `docker compose up server`, для Linux `sudo docker compose up server`.Как увидите в логе, что сервер успешно запустился, можете перезапустить его в фоновом режиме `docker compose up server -d`

5. Можно проводить изменения в приложении, запуская сервер локально. Т.к. в этом режиме нам нужно будет подключиться к БД не из сети контейнера, необходимо будет изменить данные для подключения в файле .env, обычно это localhost `POSTGRES_HOST=localhost`.
    Собираем сначала клиент ` cd ./packages/client/ && yarn build`. Если ранее не делали ссылку на клиент как локальный пакет для сервера то делаем ее из клиентской папки `yarn link`
    После сборки клиента переходим в папку с сервером `cd ../server`. Если ранее не подключали клиент как пакет, далем это через команду `yarn link client`. Собираем локально сервер `yarn build`, для Linux `yarn build-l`.
    - После сборки для режима `DEV` запускаем командой `yarn dev` или `cross-env NODE_ENV=development node dist/index.js`.
    - Для режима `PROD` режима запускаем через `node ./dist/index.js`


### Запуск отдельных частей проекта (вам нужно будет потрудиться, чтоб это заработало)

1. Выполните команду `yarn dev`
2. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
3. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Описание API

форум: [./docs/api-forum.md](./docs/api-forum.md)

### Для запуска локального сервера с SSR
1. Перейти в папку с клиентом cd `packages/client` и выполнить команду `yarn unlink` (на всякий случай)
2. Собрать клиентскую часть, выполнив команду yarn `build:all`
3. Создать символическую ссылку на пакет клиентской части `yarn link`

4. Перейти в папку с сервером `cd ../server` и добавить ссылку на пакет клиентской части приложения `yarn link client`
5. Собрать сервер `yarn build`
6. `Prod` Запустить локально сервер командой `node dist/index.js` (сервер запустится по адресу http://localhost:3000)</br>

`DEV` Для запуска локального сервера с SSR в режиме разработки необходимо:
* остановить сервер (если он запущен)
* очистить кэш приложения в браузере
* запустить локально сервер командой `yarn dev` или `yarn cross-env NODE_ENV=development node dist/index.js` (сервер запустится по адресу http://localhost:3000)

### Для запуска локального сервера с SSR
1. Перейти в папку с клиентом cd `packages/client` и выполнить команду `yarn unlink` (на всякий случай)
2. Собрать клиентскую часть, выполнив команду yarn `build:all`
3. Создать символическую ссылку на пакет клиентской части `yarn link`

4. Перейти в папку с сервером `cd ../server` и добавить ссылку на пакет клиентской части приложения `yarn link client`
5. Собрать сервер `yarn build`
6. `Prod` Запустить локально сервер командой `node dist/index.js` (сервер запустится по адресу http://localhost:3000)</br>

`DEV` Для запуска локального сервера с SSR в режиме разработки необходимо:
* остановить сервер (если он запущен)
* очистить кэш приложения в браузере
* запустить локально сервер командой `yarn dev` или `yarn cross-env NODE_ENV=development node dist/index.js` (сервер запустится по адресу http://localhost:3000)

5. Можно проводить изменения в приложении, запуская сервер локально. Т.к. в этом режиме нам нужно будет подключиться к БД не из сети контейнера, необходимо будет изменить данные для подключения в файле .env, обычно это localhost `POSTGRES_HOST=localhost`.
    Если изменения затрагивают клиентскую часть, то собираем сначала клиент ` cd ./packages/client/ && yarn build`. Если ранее не делали ссылку на клиент как локальный пакет для сервера то делаем ее из клиентской папки `yarn link`
    После сборки клиента переходим в папку с сервером `cd ../server`. Если ранее не подключали клиент как пакет, далем это через команду `yarn link client`. Собираем локально сервер `yarn build`, для Linux `yarn build-l`. После сборки запускаем сервер `node ./dist/index.js`

### Запуск отдельных частей проекта (вам нужно будет потрудиться, чтоб это заработалоа)

1. Выполните команду `yarn dev`
2. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
3. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
