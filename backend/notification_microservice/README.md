# Notification Microservice

To create and manage notification information and activities.

### Functions

1. Create database with existing dataset template
2. 1 data type - Notification
3. CRUD operations
    1. CREATE 'new' notification
    2. GET all 'new' notification
    3. UPDATE 'new' to 'completed' notification
    4. GET 'completed' notification then UPDATE to 'received'
4. API activities
    1. Email API w/ MailTrap
    2. SMS API w/ Twilio

### How to code

Ensure that the relevant VSCode extensions are installed

1. SQLite Viewer

Watch this tutorial to [learn SQLite](https://www.youtube.com/watch?v=pd-0G0MigUA)

Helpful Documentations

1. [List of HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

2. [SQLite Datatypes and its Corresponding Python Types](https://www.geeksforgeeks.org/sqlite-datatypes-and-its-corresponding-python-types/)

3. [How to correctly set AUTO INCREMENT fo a column in SQLite, using Python?](https://stackoverflow.com/questions/7905859/is-there-auto-increment-in-sqlite)

4. [How can I get dict from sqlite query?](https://stackoverflow.com/questions/3300464/how-can-i-get-dict-from-sqlite-query)

5. [Python string interpolation](https://www.programiz.com/python-programming/string-interpolation#google_vignette)

6. [Importing files from different folder](https://stackoverflow.com/questions/4383571/importing-files-from-different-folder)

7. [Creating database file one directory above current](https://stackoverflow.com/questions/36784897/creating-database-file-one-directory-above-current)

8. [Docker COPY multiple files](https://stackoverflow.com/questions/30256386/how-to-copy-multiple-files-in-one-layer-using-a-dockerfile)

9. [Docker Python app prints](https://stackoverflow.com/questions/29663459/why-doesnt-python-app-print-anything-when-run-in-a-detached-docker-container)

API documentation

1. [MailTrap](https://mailtrap.io/sending/)

    - [mailTrap Doc](https://pypi.org/project/mailtrap/)
    - [MailTrap API Doc GitHub](https://github.com/railsware/mailtrap-python)

2. [Twilio](https://console.twilio.com/)

    - [twilio-python Doc](https://pypi.org/project/twilio/)
    - [Twilio SMS API Video](https://www.youtube.com/watch?v=0BHsz-J3XSY)

#### (WINDOWS) Run the code in this directory:

```BASH
    python3 -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    python notification.py
```

#### (DOCKER) Run the code in docker:

```BASH
    docker build -t yata/notification:1.0 ./
    docker run -p 5004:5004 --name notification_microservice yata/notification:1.0
```

### Postman Testing

Import the Postman scripts and test using the correct environment and dataset
