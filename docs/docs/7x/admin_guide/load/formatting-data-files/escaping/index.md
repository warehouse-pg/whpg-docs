---
title: Escaping
navigation:
  - escaping-in-text-formatted-files
  - escaping-in-csv-formatted-files

---

There are two reserved characters that have special meaning to WarehousePG:

-   The designated delimiter character separates columns or fields in the data file.
-   The newline character designates a new row in the data file.

If your data contains either of these characters, you must escape the character so that WarehousePG treats it as data and not as a field separator or new row. By default, the escape character is a \\ (backslash) for text-formatted files and a double quote (") for csv-formatted files.

-   **[Escaping in Text Formatted Files](escaping-in-text-formatted-files.md)**  

-   **[Escaping in CSV Formatted Files](escaping-in-csv-formatted-files.md)**  

**Parent topic:** [Formatting Data Files](../index.md)
