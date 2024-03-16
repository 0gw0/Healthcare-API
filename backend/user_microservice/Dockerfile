FROM python:3-slim
WORKDIR /usr/src/app/user_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["user.py", "./"]
COPY ["database", "./database"]
CMD [ "python", "-u", "./user.py" ]