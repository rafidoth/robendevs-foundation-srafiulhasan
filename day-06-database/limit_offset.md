```
SELECT select_list
    FROM table_expression
    [ ORDER BY ... ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start ]
```

How LIMIT works
---
* If you give a limit count the query returns no more than that number of rows
* The query can return fewer rows if it has fewer rows
* LIMIT ALL is the same as no LIMIT clause
* LIMIT with a NULL value is also the same as no LIMIT clause

How OFFSET works
---
* OFFSET tells the system to skip that number of rows before it starts to return rows
* OFFSET 0 is the same as no OFFSET clause
* OFFSET with a NULL value is also the same as no OFFSET clause

When you use both
---
* The system first skips the OFFSET rows
* Then it counts and returns the LIMIT rows

Important rule about order
---
* Always use an ORDER BY clause when you use LIMIT
* The ORDER BY clause must put the rows in a unique order
* If you do not use ORDER BY you get an unpredictable set of rows
* Different LIMIT or OFFSET values can give different plans and different row orders
* This is not a bug
* SQL does not promise any special order unless you use ORDER BY
