
## Быстрый старт

```bash
docker compose up --build -d
```
- При запуске через ```dcoker-compose``` url БД можно не заполнять

##### Сервер будет запущен по Адресу ```http://localhost:<PORT указанный в .env>/api```

## Зачем нужен кастомный query

- Разбирать параметры запроса в одном месте и не размазывать `if`/`switch` по контроллерам или сервисам.
- Поддерживать диапазоны (`field[min]`, `field[max]`), массивы, обычные значения и общий `q` в виде одной конструкции.
- Легко расширять фильтры: достаточно описать DTO и отразить поля в генераторе, без ручного маппинга.

## Что делает кастомный query

1. `GenerateQueryDto` создаёт на лету DTO с дополнительными полями (`[min]`, `[max]`, массивы), добавляет Swagger-экземпляры и методы валидации.
2. `mapSearch` принимает DTO-фильтры, исключения и массив полей для `q`, а затем собирает Prisma-совместимый `where`: диапазоны (`gte`/`lte`), `contains`, `in`, вложенные пути, `OR`/`AND`.
3. `mapSort` и `mapPagination` переводят параметры сортировки/пагинации в `orderBy`, `skip`, `take`.
4. `@Contains` (из `contains.decorator.ts`) подчёркивает, какие поля нужно искать с точным совпадением

## Где искать основу query

- `src/common/tools/src/generate-query.func.ts` — генерация DTO со всеми нужными декораторами (Swagger, validation, transform).
- `src/common/decorators/src/search-query.decorator.ts` - генерация и валидация объектов для сервисов
- `src/common/tools/src/map.search.ts` — поблочная сборка `where`, включая диапазоны, списки, `contains` и текстовый поиск.
- `src/common/tools/src/map.sort.ts` / `map.pagination.ts` — привязка сортировки/пагинации к Prisma.
- `src/common/tools/src/contains.decorator.ts` — маркер для полей, которые должны искать через `contains`.
- `src/modules/user/dto/search.dto.ts` — пример: `UserSearchDto` описывает фильтры/сортировку, `UserQuerySearchDto` — кастомный query.
## Что ещё полезно знать

- Расширить функциональность можно добавлением новых DTO-фильтров и деклараций `@Contains`.
- @Contains используются для енамов в БД
