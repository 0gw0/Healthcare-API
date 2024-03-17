FROM python:3-slim
WORKDIR /usr/src/app/notification_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["notification.py", "./"]
COPY ["database", "./database"]
CMD [ "python", "-u", "./notification.py" ]