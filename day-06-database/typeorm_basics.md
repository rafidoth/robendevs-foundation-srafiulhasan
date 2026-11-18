typeorm 
----
```
AppDataSource.getRepository(TitleBasics)
```
* TitleBasics is an entity. It is a class that maps to one database table.
* AppDataSource is your database connection.
* getRepository(TitleBasics) gives you a repository. A repository is a tool to read and write one table.


Join
----
```
.leftJoin(TitleRatings, "rating", "rating.tconst = film.tconst")
```
* The entity to join (TitleRatings).
* The alias for that table ("rating").
* The join condition, as text.


Where 
----
```
qb.where("film.tconst > :afterTconst", { afterTconst });
```
* :afterTconst is a named parameter. It is a placeholder.
* The second argument is an object with the real value. { afterTconst } is short for { afterTconst: afterTconst }.
* TypeORM sends the value separately from the SQL text. This stops SQL injection. Never put user input directly in the string.
* To add more conditions, use andWhere(...) or orWhere(...). A second where(...) replaces the first one.