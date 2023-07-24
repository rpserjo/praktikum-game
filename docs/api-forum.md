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
    "UserId": 897,
    "updatedAt": "2023-07-22T16:02:31.210Z",
    "createdAt": "2023-07-22T16:02:31.210Z"
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
    "topicData": {
        "createdAt": "2023-07-24T09:34:17.177Z",
        "id": 1,
        "message": "Тест сообщение топика 1",
        "topic": "Тест название топика 1",
        "updatedAt": "2023-07-24T09:34:17.177Z",
        "User": {
            "avatar": null,
            "login": "MorskoyVolk"
        },
        "UserId": 722
    },
    "сommentsCount": 2
}

```
</br>

### GET /api/topics/:page/:limit (Get Topic list with page and limits)

Result ordered by lastmessage DESC

Example request:
```
http://localhost:3000/api/topics/1/3
```
Example response:

```
{
    "LastPage": 1,
    "topics": [
        {
            "author": "TestBest",
            "commentsCount": "2",
            "createdAt": "2023-07-22T16:30:41.776Z",
            "id": 3,
            "lastMessageDate": "2023-07-22T17:09:58.750Z",
            "message": "Тест сообщение топика три",
            "topic": "Тест название топика три",
            "updatedAt": "2023-07-22T16:30:41.776Z"
        },
        {
            "author": "TestBest",
            "commentsCount": "1",
            "createdAt": "2023-07-22T16:02:31.210Z",
            "id": 1,
            "lastMessageDate": "2023-07-22T17:08:52.833Z",
            "message": "Тест сообщение топика 1",
            "topic": "Тест название топика 1",
            "updatedAt": "2023-07-22T16:02:31.210Z"
        },
        {
            "author": "MorskoyVolk",
            "commentsCount": "0",
            "createdAt": "2023-07-22T16:31:55.341Z",
            "id": 6,
            "lastMessageDate": "2023-07-22T16:31:55.341Z",
            "message": "Тест сообщение топика шесть от Волка",
            "topic": "Тест название топика шесть от Волка",
            "updatedAt": "2023-07-22T16:31:55.341Z"
        }
    ]
}

```
</br>

## COMMENTS
### POST /api/comments (Create Comment)

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
http://localhost:3000/api/comments/1/1/10
```
Example response:

```
{
    "Comments": [
        {
            "author": "MorskoyVolk",
            "commentCreatedAt": "2023-07-24T10:44:14.714Z",
            "commentId": 2,
            "message": "Тест комментарий 2 к топику 1",
            "replies": [
                {
                    "author": "MorskoyVolk",
                    "commentCreatedAt": "2023-07-24T10:44:14.714Z",
                    "commentId": 2,
                    "message": "Тест ответ 1 к комментарию 2",
                    "replyCreatedAt": "2023-07-24T10:54:17.633Z",
                    "replyId": 3
                }
            ]
        },
        {
            "author": "MorskoyVolk",
            "commentCreatedAt": "2023-07-24T09:53:49.031Z",
            "commentId": 1,
            "message": "Тест комментарий к топику 1",
            "replies": [
                {
                    "author": "MorskoyVolk",
                    "commentCreatedAt": "2023-07-24T09:53:49.031Z",
                    "commentId": 1,
                    "message": "Тест ответ 2 к комментарию 1",
                    "replyCreatedAt": "2023-07-24T10:54:01.957Z",
                    "replyId": 2
                },
                {
                    "author": "MorskoyVolk",
                    "commentCreatedAt": "2023-07-24T09:53:49.031Z",
                    "commentId": 1,
                    "message": "Тест ответ 1 к комментарию 1",
                    "replyCreatedAt": "2023-07-24T10:53:53.584Z",
                    "replyId": 1
                }
            ]
        }
    ],
    "LastPage": 1
}
```
<br>

## REPLIES
### POST /api/replies (Create Reply)

Example request:
```
fetch('http://localhost:3000/api/replies',{
	method: "POST",
	body: JSON.stringify({commentId: 1, message: "Тест ответ 2 к комментарию 1"}),
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
    "UserId": 897,
    "updatedAt": "2023-07-22T17:14:35.139Z",
    "createdAt": "2023-07-22T17:14:35.139Z"
}
```
<br>

## REACTIONS
### POST /api/reactions (Create Reaction)

Example request:
```
fetch('http://localhost:3000/api/reactions',{
	method: "POST",
	body: JSON.stringify({reaction: "fire", commentId:1}),
	 headers: {
      "Content-Type": "application/json"
    }
})
```
Example response:

```
[
    {
        "id": 2,
        "reaction": "🔥",
        "createdAt": "2023-07-22T14:49:01.855Z",
        "CommentId": 1,
        "UserId": 722
    },
    {
        "id": 3,
        "reaction": "🔥",
        "createdAt": "2023-07-22T14:49:34.809Z",
        "CommentId": 1,
        "UserId": 897
    }
]
```
<br>
