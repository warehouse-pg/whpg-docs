---
# https://vitepress.dev/reference/default-theme-home-page
layout: home



hero:
  name: "WarehousePG"
  text: "WarehousePG "
  tagline: An Open Source alternative to<br>Greenplum Database® 
  image:
    src: dark_gray_logo_no_text.png
    alt: WarehousePG
  actions:
    - theme: brand
      text: Docs
      link: /docs/7x/
    - theme: brand
      text: GitHub
      link: "https://github.com/warehouse-pg"

    - theme: brand
      text: Slack
      link: "https://warehouse-pg.slack.com"


features:
  - title: Postgres DNA
    details: WarehousePG is many (dozens or even hundreds) of Postgres instances working in a massively parralel manner
    icon: 🐘🧬️

  - title: PolyMorphic Storage
    details: Not just a great way to query GraphQL APIs. Execute documents against in-memory schemas just as easily with the same interface.
    icon: 📦
  - title: Platform Extension Framework
    details: Powerful type-safe extension system. Intercept and manipulate inputs, outputs, and core with hooks; Add new methods; And more.
    icon: 🪜
  - title: Partner Ecosystem
    details: Unlock a large partner ecosystem already supporting Posgres
    icon: 🧰️
  - title: Proven tech, not a new mousestrap
    details: Easily add client-side codecs for custom scalars in the schema to enable automatic encoding of arguments and decoding of data on every request.
    icon: 🪤
  - title: MADlib
    details: Optional TypeScript alternative to GQL syntax for building type-safe documents including tailored methods for root fields, batch method for multiple root fields, an a document method for 1:1 with GraphQL.
    icon: 🧲️
  - title: Open Source
    details: Evaluate, inspect the code, always know that this project will remain FOSS
    icon: 🔍








---



```sql
SELECT * FROM foo;
```


## Getting Started

Clone Warehous ePG Today

```sh
git clone https://github.com/warehouse-pg/warehouse-pg.git
```




 ![WarehousePG with MADlib](public/text_transparent_nobuffer.png "WarehousePG MADlib Analytics Architecture")