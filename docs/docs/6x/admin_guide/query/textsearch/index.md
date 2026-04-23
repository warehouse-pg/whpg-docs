---
title: Using Full Text Search
navigation:
  - intro
  - tables-indexes
  - controlling
  - features
  - parsers
  - dictionaries
  - configuration
  - testing
  - gist-gin
  - psql-support
  - limitations
redirects:
  - full-text-search

---

WarehousePG provides data types, functions, operators, index types, and configurations for querying natural language documents.

-   **[About Full Text Search](intro.md)**  
    This topic provides an overview of WarehousePG full text search, basic text search expressions, configuring, and customizing text search. WarehousePG full text search is compared with WarehousePG Text.
-   **[Searching Text in Database Tables](tables-indexes.md)**  
    This topic shows how to use text search operators to search database tables and how to create indexes to speed up text searches.
-   **[Controlling Text Search](controlling.md)**  
    This topic shows how to create search and query vectors, how to rank search results, and how to highlight search terms in the results of text search queries.
-   **[Additional Text Search Features](features.md)**  
    WarehousePG has additional functions and operators you can use to manipulate search and query vectors, and to rewrite search queries.
-   **[Text Search Parsers](parsers.md)**  
    This topic describes the types of tokens the WarehousePG text search parser produces from raw text.
-   **[Text Search Dictionaries](dictionaries.md)**  
    Tokens produced by the WarehousePG full text search parser are passed through a chain of dictionaries to produce a normalized term or "lexeme". Different kinds of dictionaries are available to filter and transform tokens in different ways and for different languages.
-   **[Text Search Configuration Example](configuration.md)**  
    This topic shows how to create a customized text search configuration to process document and query text.
-   **[Testing and Debugging Text Search](testing.md)**  
    This topic introduces the WarehousePG functions you can use to test and debug a search configuration or the individual parser and dictionaries specified in a configuration.
-   **[GiST and GIN Indexes for Text Search](gist-gin.md)**  
    This topic describes and compares the WarehousePG index types that are used for full text searching.
-   **[psql Support](psql-support.md)**  
    The psql command-line utility provides a meta-command to display information about WarehousePG full text search configurations.
-   **[Limitations](limitations.md)**  
    This topic lists limitations and maximums for WarehousePG full text search objects.

**Parent topic:** [Querying Data](../index.md)
