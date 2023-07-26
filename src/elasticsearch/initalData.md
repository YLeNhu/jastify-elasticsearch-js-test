##Open your computer terminal, cd to this folder and run following commands
curl -H "Content-Type: application/json" -XPOST "localhost:9200/bookstore/_bulk?pretty&refresh" --data-binary "@data.json"
curl "localhost:9200/_cat/indices?v"