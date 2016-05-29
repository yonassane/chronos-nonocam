CREATE TABLE `message` (
    `id`                INTEGER PRIMARY KEY,
    `creationDate`      DATETIME DEFAULT CURRENT_TIMESTAMP,
    `text`              TEXT,
    `textColor`         VARCHAR(20),
    `backgroundColor`   VARCHAR(20),
    `rows`              INTEGER
);
