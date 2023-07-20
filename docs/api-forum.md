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

### GET /api/topics/:page/:limit (Get Topic list with page and limits)

Result ordered by lastmessage DESC

Example request:
```
http://localhost:3000/api/topics/2/3
```
Example response:

```
[
    {
        "author": "Some user",
        "commentsCount": "0",
        "createdAt": "2023-07-20T08:25:30.254Z",
        "id": 5,
        "lastMessageDate": "2023-07-20T08:25:30.254Z",
        "message": "Тест сообщение топика 5",
        "topic": "Тест название топика 5",
        "updatedAt": "2023-07-20T08:25:30.254Z"
    },
    {
        "author": "Some user",
        "commentsCount": "0",
        "createdAt": "2023-07-20T08:25:09.943Z",
        "id": 4,
        "lastMessageDate": "2023-07-20T08:25:09.943Z",
        "message": "Тест сообщение топика 4",
        "topic": "Тест название топика 4",
        "updatedAt": "2023-07-20T08:25:09.943Z"
    },
    {
        "author": "Some user",
        "commentsCount": "0",
        "createdAt": "2023-07-20T08:24:44.143Z",
        "id": 2,
        "lastMessageDate": "2023-07-20T08:24:44.143Z",
        "message": "Тест сообщение топика 2",
        "topic": "Тест название топика 2",
        "updatedAt": "2023-07-20T08:24:44.143Z"
    }
]

```
</br>

## COMMENTS
### POST /api/commets (Create Comment)

Example request:
```
fetch('http://localhost:3000/api/comments',{
	method: "POST",
	body: JSON.stringify({topicId: 2, message: "Тест комментарий к топику 2"}),
	 headers: {
      "Content-Type": "application/json"
    }
})
```
Example response:

```
{
    "id": 4,
    "message": "Тест комментарий к топику 2",
    "TopicId": 2,
    "author": "some user",
    "updatedAt": "2023-07-20T10:25:03.243Z",
    "createdAt": "2023-07-20T10:25:03.243Z"
}
```
<br>

### GET /api/comments/:topicId/:page/:limit (Get Comments and Replies By TopicId)

Example request:
```
http://localhost:3000/api/comments/3/2/3
```
Example response:

```
[
    {
        "author": "some user",
        "commentCreatedAt": "2023-07-20T09:49:57.140Z",
        "commentId": null,
        "message": "Тест ответ 3 к комментарию 1 к топику 3",
        "replyCreatedAt": "2023-07-20T11:48:57.037Z",
        "replyId": 4
    },
    {
        "author": "some user",
        "commentCreatedAt": "2023-07-20T09:49:57.140Z",
        "commentId": null,
        "message": "Тест ответ 2 к комментарию 1",
        "replyCreatedAt": "2023-07-20T10:43:55.033Z",
        "replyId": 2
    },
    {
        "author": "some user",
        "commentCreatedAt": "2023-07-20T09:49:57.140Z",
        "commentId": null,
        "message": "Тест ответ 1 к комментарию 1",
        "replyCreatedAt": "2023-07-20T10:38:42.387Z",
        "replyId": 1
    }
]
```
<br>

## REPLIES
### POST /api/replies (Create Reply)

Example request:
```
fetch('http://localhost:3000/api/replies',{
	method: "POST",
	body: JSON.stringify({commentId: 1, message: "Тест ответ 1 к комментарию 1"}),
	 headers: {
      "Content-Type": "application/json"
    }
})
```
Example response:

```
{
    "id": 1,
    "message": "Тест ответ 1 к комментарию 1",
    "CommentId": 1,
    "updatedAt": "2023-07-20T10:38:42.387Z",
    "createdAt": "2023-07-20T10:38:42.387Z"
}
```
<br>
