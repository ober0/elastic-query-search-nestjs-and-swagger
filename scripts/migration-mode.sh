#!/usr/bin/env bash
set -eo pipefail

MIGRATIONS_DIR="./prisma/schema/migrations"

echo "Проверка наличия миграций в ${MIGRATIONS_DIR}"

if [ -d "${MIGRATIONS_DIR}" ]; then
    FOUND_COUNT=$(find "${MIGRATIONS_DIR}" -mindepth 1 -maxdepth 1 -type d | wc -l)
    FOUND_COUNT=$(tr -d '[:space:]' <<<$FOUND_COUNT)
else
    FOUND_COUNT=0
fi

if [ "${FOUND_COUNT}" -gt 0 ]; then
    echo "Найдена хотя бы одна миграция — применяю `npm run migrate:prod`."
    npm run migrate:prod
else
    echo "Миграций не найдено — выполняю `npm run migrate:dev`."
    npm run migrate:dev
fi

