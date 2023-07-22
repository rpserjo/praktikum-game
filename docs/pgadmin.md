## Настройка PgAdmin

### Использование PGAdmin
Обычно PgAdmin запускается на порту 8080, если docker располагается на вашей локальной машине, то адрес будет http://127.0.0.1:8080

Для подключениz к PgAdmin и добавления в него сервера БД используйте информацию из файла .env


### Ошибки запуска контейнера
При запуске контейнера в Linux может возникать слудующая ошибка 
```
ERROR  : Failed to create the directory /var/lib/pgadmin/sessions:
pgadmin           |            [Errno 13] Permission denied: '/var/lib/pgadmin/sessions'
pgadmin           | HINT   : Create the directory /var/lib/pgadmin/sessions, ensure it is writeable by
pgadmin           |          'pgadmin', and try again, or, create a config_local.py file
pgadmin           |          and override the SESSION_DB_PATH setting per
pgadmin           |          https://www.pgadmin.org/docs/pgadmin4/7.4/config_py.html
```

В этом случае pgAdmin не хватает прав на создание нужно директории, для решения проблемы нужно сделать группу от которой запускается pgAdmin владелцем этой директории.

Из корня проекта это делается так: `sudo chown -R 5050:5050 ./tmp/pgadmin`

Затем перезапускаем контейнер через `docker compose up pgadmin` или с ключом `-d` для запуска в фоновом режиме `docker compose up pgadmin -d` 
