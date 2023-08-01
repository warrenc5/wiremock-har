//https://github.com/ahmadnassri/har-spec
//https://github.com/ahmadnassri/har-cli
//https://github.com/ahmadnassri/har-schema
//https://wiremock.org/docs/standalone/admin-api-reference/

if (!_)
    throw '_ undefined';
$ = {
    "log": {
        "version": "1.3",
        "creator": {
            "name": "wiremock",
            "version": "",
            "comment": ""
        },
        "browser": {
            "name": "wiremock",
            "version": "",
            "comment": ""
        },
        "pages": _.requests.flatMap($ => {
            return {
                "startedDateTime": $.request.loggedDateString,
                "id": $.id,
                "title": $.stubMapping.id,
                "pageTimings": {},
                "comment": ""
            }
        }),
        "entries": _.requests.flatMap($ => {
            return {
                "pageref": $.id,
                "startedDateTime": $.request.loggedDateString,
                "time": $.timing.totalTime,
                "request": {
                    "method": $.request.method,
                    "url": $.request.absoluteUrl,
                    "httpVersion": $.request.protocol,
                    "cookies": [],
                    "headers": Object.entries($.request.headers).map(header_template = ([key, value]) => {
                        return {
                            "name": key,
                            "value": value,
                            "comment": ""
                    }
                    }),
                    "queryString": [],
                    "postData": {
                        "mimeType": $.request.headers['Content-Type'] ?? "plain/text",
                        "text": $.request.body, //bodyAsBase64,
                        "encoding": "text", //"base64",
                        "comment": ""
                    },
                    "headersSize": 0,
                    "bodySize": Number($.request.headers['Content-Length'] ?? 0),
                    "comment": ""
                },
                "response": {
                    "status": $.response.status,
                    "statusText": "",
                    "httpVersion": $.request.protocol,
                    "cookies": [],
                    "headers": Object.entries($.response.headers).map(header_template),
                    "content": {
                        "size": Number($.response.headers['Content-Length'] ?? $.response.body.length),
                        "compression": 0,
                        "mimeType": $.response.headers['Content-Type'] ?? "plain/text",
                        //"text": $.response.bodyAsBase64,
                        "text": $.response.body,
                        "encoding": "text", //"base64",
                        "comment": ""
                    },
                    "redirectURL": "",
                    "headersSize": 0,
                    "bodySize": Number($.response.headers['Content-Length'] ?? 0),
                    "comment": ""
                },
                "cache": {},
                "timings": {
                    wait: 0,
                    send: 0,
                    receive: 0
                },
                "serverIPAddress": "10.0.0.1",
                "connection": "",
                "comment": ""
            }
        }),
        "comment": ""
    }
}
