# Zoom Microservice

To create and manage Zoom information and activities.

### Functions

1. Make Zoom
    1. Make Zoom API meeting
    2. Email & SMS Zoom meeting
    3. Return Zoom meeting as well

### How to code

Ensure that the relevant VSCode extensions are installed

1. SQLite Viewer

Watch this tutorial to [learn SQLite](https://www.youtube.com/watch?v=pd-0G0MigUA)

Helpful Documentations

1. [List of HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

2. [Docker COPY multiple files](https://stackoverflow.com/questions/30256386/how-to-copy-multiple-files-in-one-layer-using-a-dockerfile)

3. [Docker Python app prints](https://stackoverflow.com/questions/29663459/why-doesnt-python-app-print-anything-when-run-in-a-detached-docker-container)

API documentation

1. [MailTrap](https://mailtrap.io/sending/)

    - [mailTrap Doc](https://pypi.org/project/mailtrap/)
    - [mailTrap Doc 2](https://mailtrap.io/blog/python-send-email/#How-to-send-emails-with-attachments)
    - [MailTrap API Doc GitHub](https://github.com/railsware/mailtrap-python)

2. [Twilio](https://console.twilio.com/)

    - [twilio-python Doc](https://pypi.org/project/twilio/)
    - [Twilio SMS API Video](https://www.youtube.com/watch?v=0BHsz-J3XSY)

#### (WINDOWS) Run the code in this directory:

```BASH
    python3 -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    python zoom.py
```

#### (DOCKER) Run the code in docker:

```BASH
    docker build -t yata/zoom:1.0 ./
    docker run -p 5009:5009 --name zoom_microservice yata/zoom:1.0
```

### Postman Testing

Import the Postman scripts and test using the correct environment and dataset
