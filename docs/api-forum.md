## TOPICS
### POST /api/topics (Create Topic)
Example request:
```
fetch('http://localhost:3000/api/topics',{
	method: "POST",
	body: JSON.stringify({topic: "Тест название топика 1", message: "Тест сообщение топика 1"}),
	 headers: {
      "Content-Type": "application/json"
    }
})
```
Example response:

```
{
    "id": 1,
    "topic": "Тест название топика 1",
    "message": "Тест сообщение топика 1",
    "author": "Some user",
    "updatedAt": "2023-07-19T18:06:53.412Z",
    "createdAt": "2023-07-19T18:06:53.412Z"
}
```
<br>

### GET /api/topic/:id (Get Topic by ID)

Example request:
```
http://localhost:3000/api/topic/1
```
Example response:

```
{
    "id":1,
    "topic":"Тест название топика 1",
    "message":"Тест сообщение топика 1",
    "author":"Some user",
    "createdAt":"2023-07-19T18:06:24.366Z",
    "updatedAt":"2023-07-19T18:06:24.366Z"
}

```
</br>

### GET /api/topics/:page/:limit (Get Topics list with page and limits)

Result ordered by lastmessage DESC

Example request:
```
http://localhost:3000/api/topics/2/3
```
Example response:

```
[{"id":3,"topic":"Тест название топика 3","message":"Тест сообщение топика 3","author":"Some user","createdAt":"2023-07-19T18:14:02.267Z","updatedAt":"2023-07-19T18:14:02.267Z","lastmessage":"2023-07-19T18:14:02.267Z"},{"id":2,"topic":"Тест название топика 1","message":"Тест сообщение топика 1","author":"Some user","createdAt":"2023-07-19T18:06:53.412Z","updatedAt":"2023-07-19T18:06:53.412Z","lastmessage":"2023-07-19T18:06:53.412Z"},{"id":1,"topic":"Тест название топика 1","message":"Тест сообщение топика 1","author":"Some user","createdAt":"2023-07-19T18:06:24.366Z","updatedAt":"2023-07-19T18:06:24.366Z","lastmessage":"2023-07-19T18:06:24.366Z"}]

```
