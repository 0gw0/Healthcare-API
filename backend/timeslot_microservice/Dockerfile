FROM python:3-slim
WORKDIR /usr/src/app/timeslot_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["timeslot.py", "./"]
COPY ["database", "./database"]
CMD [ "python", "./timeslot.py" ]